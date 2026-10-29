// All writes are independent committed PostgreSQL statements. A lost result
// fails closed: it may have reserved a slot, which must not be auto-released.
export async function makeAdmission(databaseUrl, driverLoader = () => import('@neondatabase/serverless')) {
  if (!databaseUrl) throw new Error('shared guard unavailable');
  const { neon } = await driverLoader();
  const sql = neon(databaseUrl);
  const call = async (query, id) => {
    try {
      const rows = await sql.query(query, [id]);
      return Array.isArray(rows) && rows.length === 1 && rows[0].ok === true;
    } catch { return false; }
  };
  return {
    reserve: id => call('SELECT ghost_reserve($1::uuid) AS ok', id),
    complete: id => call('SELECT ghost_complete($1::uuid) AS ok', id)
  };
}
