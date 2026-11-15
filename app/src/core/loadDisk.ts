import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { Content } from './content';
import { sortScenes } from './content';

export function loadContentFromDisk(root = process.cwd()): Content {
  const dir = join(root, 'content');
  const scenes = readdirSync(join(dir, 'scenes')).filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(dir, 'scenes', f), 'utf8')));
  return {
    lemmas: JSON.parse(readFileSync(join(dir, 'lemmas.json'), 'utf8')),
    cast: JSON.parse(readFileSync(join(dir, 'cast.json'), 'utf8')),
    scenes: sortScenes(scenes),
  };
}
