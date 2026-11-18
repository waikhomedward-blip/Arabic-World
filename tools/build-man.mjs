// Builds app/public/models/man.glb from two CC0 Quaternius packs (see docs/ASSET_LOG.md):
// the male base body (Universal Base Characters) + a small set of everyday clips (Universal Animation Library).
// Eyes and eyebrows are removed here; the face itself is smoothed away at load time (hard rule 1).
import { NodeIO } from '@gltf-transform/core';
import { prune, dedup, quantize, resample } from '@gltf-transform/functions';
const BODY = 'research-private/downloads/ubc/x/Universal Base Characters[Standard]/Base Characters/Godot - UE/Superhero_Male_FullBody.gltf';
const ANIM = 'research-private/downloads/ual/x/Universal Animation Library[Standard]/Unreal-Godot/UAL1_Standard.glb';
const KEEP = ['Idle_Loop', 'Idle_Talking_Loop', 'Walk_Loop', 'Walk_Formal_Loop', 'Sitting_Idle_Loop', 'Sitting_Talking_Loop', 'Interact', 'PickUp_Table', 'Fixing_Kneeling', 'Push_Loop'];
const io = new NodeIO();
// the free pack's .gltf points at some textures it doesn't include: read it without images (colours come from the game)
import fs from 'fs';
const json = JSON.parse(fs.readFileSync(BODY, 'utf8'));
delete json.images; delete json.textures; delete json.samplers;
for (const m of json.materials ?? []) { if (m.pbrMetallicRoughness) { delete m.pbrMetallicRoughness.baseColorTexture; delete m.pbrMetallicRoughness.metallicRoughnessTexture; } delete m.normalTexture; delete m.occlusionTexture; delete m.emissiveTexture; }
const bodyDir = BODY.slice(0, BODY.lastIndexOf('/') + 1);
const resources = {}; for (const b of json.buffers) resources[b.uri] = new Uint8Array(fs.readFileSync(bodyDir + b.uri));
const doc = await io.readJSON({ json, resources });
const anim = await io.read(ANIM);
const info = (d, n) => { const x = d.getRoot().listNodes().find((k) => k.getName() === n); return x ? { t: x.getTranslation(), s: x.getScale() } : null; };
console.log('body pelvis', info(doc, 'pelvis'), 'root', info(doc, 'root'), 'Armature', info(doc, 'Armature'));
console.log('anim pelvis', info(anim, 'pelvis'), 'root', info(anim, 'root'), 'Armature', info(anim, 'Armature'));
if (process.argv[2] === '--info') process.exit(0);
// drop eyes and eyebrows (and every texture: colours are set in the game)
for (const n of doc.getRoot().listNodes()) if (['Eyes', 'Eyebrows'].includes(n.getName())) { n.getMesh()?.dispose(); n.dispose(); }
const before = new Set(doc.getRoot().listNodes());
doc.merge(anim);
const bodyNodes = new Map([...before].map((n) => [n.getName(), n]));
const animNodes = new Set(doc.getRoot().listNodes().filter((n) => !before.has(n)));
for (const a of doc.getRoot().listAnimations()) {
  if (!animNodes.size) break;
  const fromAnim = a.listChannels().some((c) => animNodes.has(c.getTargetNode()));
  if (!fromAnim) continue;
  if (!KEEP.includes(a.getName())) { a.listChannels().forEach((c) => c.dispose()); a.listSamplers().forEach((s) => s.dispose()); a.dispose(); continue; }
  for (const c of a.listChannels()) {
    const target = bodyNodes.get(c.getTargetNode()?.getName());
    // keep rotations on every bone; keep translation only on the pelvis (hip sway), never scale
    if (!target || c.getTargetPath() === 'scale' || (c.getTargetPath() === 'translation' && target.getName() !== 'pelvis')) { c.getSampler()?.dispose(); c.dispose(); continue; }
    c.setTargetNode(target);
  }
}
for (const n of animNodes) { n?.getMesh()?.dispose(); n?.getSkin()?.dispose(); }
// keep only the body's scene, and make it the default one
const scenes = doc.getRoot().listScenes();
const bodyScene = scenes.find((s) => s.listChildren().some((n) => before.has(n)));
for (const s of scenes) if (s !== bodyScene) s.dispose();
doc.getRoot().setDefaultScene(bodyScene);
for (const n of animNodes) n?.dispose();
await doc.transform(resample(), prune(), dedup(), quantize({ quantizeNormal: 10, quantizePosition: 14 }));
console.log('animations', doc.getRoot().listAnimations().map((a) => a.getName()));
console.log('meshes', doc.getRoot().listMeshes().map((m) => m.getName()), 'nodes', doc.getRoot().listNodes().length);
// a .glb holds one buffer: move every accessor into the first one
const [buf, ...extra] = doc.getRoot().listBuffers();
for (const a of doc.getRoot().listAccessors()) a.setBuffer(buf);
extra.forEach((b) => b.dispose());
buf.setURI('');
await io.write('app/public/models/man.glb', doc);
