import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeAdmission } from './lib/admission.js';

test('guard uses parameterized queries and fails closed on database failure', async () => {
  const calls = [];
  const loader = async () => ({neon: () => ({query: async (sql, args) => {
    calls.push({sql, args});
    if (sql.includes('complete')) throw new Error('database unavailable');
    return [{ok: true}];
  }})});
  const guard = await makeAdmission('placeholder-not-a-secret', loader);
  const id = 'f8f3a52d-69c2-4b31-9257-330e20e6f141';
  assert.equal(await guard.reserve(id), true);
  assert.deepEqual(calls[0].args, [id]);
  assert.match(calls[0].sql, /\$1::uuid/);
  assert.equal(await guard.complete(id), false);
});

test('missing database configuration and unavailable driver prevent admission', async () => {
  await assert.rejects(makeAdmission(''));
  await assert.rejects(makeAdmission('placeholder-not-a-secret', async () => { throw new Error('driver unavailable'); }));
});
