import {test} from 'node:test';
import assert from 'node:assert/strict';
import handler from './api/analyze.js';
import {scenarios} from './scenarios.js';

async function send(body){let status=200,data;const res={setHeader(){},status(v){status=v;return this},json(v){data=v;return this}};await handler({method:'POST',body},res);return {status,data};}
test('all demo cases and languages work with invalid inference configuration without provider calls',async()=>{
 const oldProvider=process.env.AI_PROVIDER,oldEnable=process.env.ENABLE_BASETEN,oldFetch=globalThis.fetch;let calls=0;
 process.env.AI_PROVIDER='invalid';process.env.ENABLE_BASETEN='1';globalThis.fetch=async()=>{calls++;throw Error('network not permitted');};
 try{for(const scenario_id of ['connections','certificate','unknown'])for(const locale of ['en','ja']){const r=await send({scenario_id,locale});assert.equal(r.status,200);assert.equal(r.data.mode,'demo');assert.ok(r.data.result.evidence.every(n=>Number.isInteger(n)&&n>=1&&n<=scenarios[scenario_id].logs.length));}assert.equal(calls,0);}
 finally{if(oldProvider===undefined)delete process.env.AI_PROVIDER;else process.env.AI_PROVIDER=oldProvider;if(oldEnable===undefined)delete process.env.ENABLE_BASETEN;else process.env.ENABLE_BASETEN=oldEnable;globalThis.fetch=oldFetch;}
});
