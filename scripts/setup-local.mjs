import {existsSync,copyFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
process.chdir(root);
if(Number(process.versions.node.split('.')[0])<24)throw new Error('Install Node.js 24 or newer first.');
if(!existsSync('node_modules/vinext'))throw new Error('Run npm run install:ci first.');
if(!existsSync('.env'))copyFileSync('.env.example','.env');
function run(args){const r=spawnSync(process.execPath,args,{stdio:'inherit',cwd:root});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status||1);}
run(['scripts/run-framework.mjs','build']);
mkdirSync('.sites-runtime',{recursive:true});
writeFileSync('.sites-runtime/local-database.json',JSON.stringify({name:'binqiling-local',compatibility_date:'2026-05-15',d1_databases:[{binding:'DB',database_name:'site-creator-d1',database_id:'00000000-0000-4000-8000-000000000000',migrations_dir:'../drizzle'}]},null,2));
run(['--import','./scripts/sites-env.mjs','./node_modules/wrangler/bin/wrangler.js','d1','migrations','apply','DB','--local','--config','.sites-runtime/local-database.json','--persist-to','.wrangler/state']);
console.log('\nReady. Run npm run dev and open the Local URL printed in the terminal.');
