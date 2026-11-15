// Content validator: runs Suite C and prints failures. Usage: npm run validate
import { loadContentFromDisk } from '../app/src/core/loadDisk';
import { suiteC } from '../lab/suites/C';
const r = suiteC(loadContentFromDisk(process.cwd()));
const fails = r.cases.filter((c) => c.status === 'fail');
console.log(`Suite C: ${r.cases.length - fails.length}/${r.cases.length} pass`, r.metrics);
for (const f of fails) console.log(' ✗', f.id, f.detail ?? '');
