import type { Content, Scene, Lemma, Cast } from './core/content';
import { sortScenes } from './core/content';
import lemmas from '../../content/lemmas.json';
import cast from '../../content/cast.json';
const sceneModules = import.meta.glob('../../content/scenes/*.json', { eager: true, import: 'default' });
export const content: Content = {
  lemmas: lemmas as Lemma[],
  cast: cast as Cast,
  scenes: sortScenes(Object.values(sceneModules) as Scene[]),
};
export const lemmaById = Object.fromEntries(content.lemmas.map((l) => [l.id, l]));
export const charById = Object.fromEntries(content.cast.characters.map((c) => [c.id, c]));
