// Day 7 rewritten for the 08:00–11:00 rule (was a night scene). Run: npx tsx content/authoring/day07-morning.ts
import { readFileSync, writeFileSync } from 'node:fs';
import { L, greet, thanks, yn, scene, save, addLemmas } from '../../tools/author';

addLemmas([
  { id: 'hawa', ar: 'هَوَاءٌ', en: 'air', tier: 1, root: 'ه و ي', targetRung: 4 },
  { id: 'tair', ar: 'طَائِرٌ', en: 'bird', tier: 1, root: 'ط ي ر', targetRung: 4 },
  { id: 'sahaba', ar: 'سَحَابَةٌ', en: 'cloud', tier: 'everyday', root: 'س ح ب', targetRung: 2 },
]);
// retire the night words
const lem = JSON.parse(readFileSync('content/lemmas.json', 'utf8')).filter((l: { id: string }) => !['layl', 'qamar', 'najm'].includes(l.id));
writeFileSync('content/lemmas.json', JSON.stringify(lem, null, 1));

save([
  scene('d7-home', 7, 'home', { ar: 'عَلَى السَّطْحِ صَبَاحًا', en: 'Morning on the roof' }, ['faisal', 'majid'], [
    L('faisal', 'صَبَاحُ الْخَيْرِ! السَّمَاءُ جَمِيلَةٌ.', 'Good morning! The sky is beautiful.', ['sabah', 'khayr', 'sama', 'jamil'], 'point:sky'),
    L('faisal', 'هٰذِهِ سَحَابَةٌ.', 'This is a cloud.', ['hadhihi', 'sahaba'], 'point:cloud'),
    L('majid', 'وَهٰذَا طَائِرٌ صَغِيرٌ!', 'And this is a small bird!', ['wa', 'hadha', 'tair', 'saghir'], 'point:bird'),
    yn('d7h-bird', 'faisal', { ar: 'هَلِ الطَّائِرُ كَبِيرٌ؟', en: 'Is the bird big?', lemmas: ['hal', 'tair', 'kabir'] },
      ['لَا، الطَّائِرُ صَغِيرٌ.', 'No, the bird is small.', ['la', 'tair', 'saghir']], ['نَعَمْ، الطَّائِرُ كَبِيرٌ.', 'Yes, the bird is big.', ['naam', 'tair', 'kabir']],
      ['لَا', 'الطَّائِرُ', 'صَغِيرٌ', 'كَبِيرٌ'], { ar: 'الطَّائِرُ… كَبِيرٌ؟', en: 'The bird… big?', gesture: 'hands_small' }),
    L('faisal', 'الْهَوَاءُ جَمِيلٌ.', 'The air is lovely.', ['hawa', 'jamil'], 'breathe_in'),
    L('faisal', 'الْمَاءُ وَالْهَوَاءُ لِلنَّاسِ.', 'Water and air are for everyone.', ['maa', 'wa', 'hawa', 'li', 'nas'], 'open_palms'),
    L('faisal', 'أَنَا ابْنُ أَبِي فَيْصَلٍ، وَأَنْتَ صَدِيقِي.', "I am Abu Faisal's son, and you are my friend.", ['ana', 'ibn', 'ab', 'wa', 'anta', 'sadiq', 'ii'], 'hand_on_heart'),
  ]),
  scene('d7-souq', 7, 'souq', { ar: 'صَبَاحُ السُّوقِ', en: 'Morning at the souq' }, ['saeed'], [
    L('saeed', 'السَّلَامُ عَلَيْكُمْ! الْهَوَاءُ جَمِيلٌ.', 'Peace be upon you! The air is lovely.', ['salam', 'ala', 'kum', 'hawa', 'jamil'], 'raise_hand'),
    greet('d7s-greet', 'saeed'),
    L('saeed', 'الشَّمْسُ فِي السَّمَاءِ.', 'The sun is in the sky.', ['shams', 'fi', 'sama'], 'point:sun'),
    L('saeed', 'سَحَابَةٌ صَغِيرَةٌ فِي السَّمَاءِ.', 'A small cloud in the sky.', ['sahaba', 'saghir', 'fi', 'sama'], 'point:cloud'),
    yn('d7s-bird', 'saeed', { ar: 'هَلْ هٰذَا طَائِرٌ؟', en: 'Is this a bird? (he holds up bread)', lemmas: ['hal', 'hadha', 'tair'] },
      ['لَا، هٰذَا خُبْزٌ.', 'No, this is bread.', ['la', 'hadha', 'khubz']], ['نَعَمْ، هٰذَا طَائِرٌ.', 'Yes, this is a bird.', ['naam', 'hadha', 'tair']],
      ['لَا', 'هٰذَا', 'خُبْزٌ', 'طَائِرٌ'], { ar: 'طَائِرٌ؟ خُبْزٌ؟', en: 'A bird? Bread?', gesture: 'hold_up:bread' }),
    L('saeed', 'خُذْ خُبْزًا لِلْبَيْتِ.', 'Take some bread for the house.', ['khudh', 'khubz', 'li', 'bayt'], 'hand_over:bread'),
    thanks('d7s-thanks', 'saeed'),
  ]),
]);
