// Temporary, one-time build check. Never a web route; never logs credentials.
import {randomUUID} from 'node:crypto';

const marker = 'Verify Neon guard concurrency once';
if (process.env.VERCEL_ENV !== 'production' || process.env.VERCEL_GIT_COMMIT_MESSAGE !== marker) {
  console.log('Guard check not requested; skipping.');
} else {
  try {
    if (!process.env.DATABASE_URL) throw new Error('configuration unavailable');
    const {neon} = await import('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL);
    const ids = [randomUUID(), randomUUID()];
    const start = new Date();
    const end = new Date(start.getTime() + 300000);
    const inserted = await sql.query(`INSERT INTO ghost_guard_window(id,enabled,opens_at,closes_at,max_requests)
      SELECT 1,true,$1::timestamptz,$2::timestamptz,2
      WHERE NOT EXISTS (SELECT 1 FROM ghost_guard_requests)
      ON CONFLICT DO NOTHING RETURNING id`, [start.toISOString(),end.toISOString()]);
    if (inserted.length !== 1) throw new Error('guard not empty');
    let closed = false;
    try {
      const responses = await Promise.all(ids.map(id => sql.query('SELECT ghost_reserve($1::uuid) AS ok',[id])));
      if (responses.filter(x => x.length === 1 && x[0].ok === true).length !== 1) throw new Error('race mismatch');
      const state = await sql.query('SELECT requests_started, active_request FROM ghost_guard_window WHERE id=1',[]);
      if (state.length !== 1 || Number(state[0].requests_started) !== 1 || !ids.includes(state[0].active_request)) throw new Error('state mismatch');
      const rows = await sql.query('UPDATE ghost_guard_window SET enabled=false WHERE id=1 RETURNING enabled',[]);
      if (rows.length !== 1 || rows[0].enabled !== false) throw new Error('cannot disable');
      closed = true;
      console.log('NEON_GUARD_RACE_PASS: one accepted, one rejected, test window disabled.');
    } finally {
      if (!closed) {
        try { await sql.query('UPDATE ghost_guard_window SET enabled=false WHERE id=1',[]); } catch {}
      }
    }
  } catch {
    console.error('NEON_GUARD_RACE_UNCERTAIN: inspect dedicated DB before retry.');
    process.exitCode = 1;
  }
}
