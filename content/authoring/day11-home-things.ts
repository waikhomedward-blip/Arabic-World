// Day 11: things at home and drinks (door, window, glass, milk, hot, cold). Run: npx tsx content/authoring/day11-home-things.ts
import { L, greet, thanks, yn, scene, save, addLemmas } from '../../tools/author';

addLemmas([
  { id: 'bab', ar: 'بَابٌ', en: 'door', tier: 1, root: 'ب و ب', targetRung: 4, label: 'universal' },
  { id: 'nafidha', ar: 'نَافِذَةٌ', en: 'window', tier: 1, root: 'ن ف ذ', targetRung: 4, label: 'universal' },
  { id: 'kass', ar: 'كَأْسٌ', en: 'glass (for drinking)', tier: 1, root: 'ك أ س', targetRung: 4, label: 'universal' },
  { id: 'halib', ar: 'حَلِيبٌ', en: 'milk', tier: 1, root: 'ح ل ب', targetRung: 4, label: 'universal' },
  { id: 'barid', ar: 'بَارِدٌ', en: 'cold', tier: 1, root: 'ب ر د', targetRung: 4, label: 'universal' },
  { id: 'sakhin', ar: 'سَاخِنٌ', en: 'hot (warm)', tier: 1, root: 'س خ ن', targetRung: 4, label: 'universal' },
]);

save([
  scene('d11-home', 11, 'home', { ar: 'فِي الْبَيْتِ', en: 'Inside the house' }, ['faisal', 'majid'], [
    L('faisal', 'صَبَاحُ الْخَيْرِ! هٰذَا بَابٌ.', 'Good morning! This is a door.', ['sabah', 'khayr', 'hadha', 'bab'], 'point:door'),
    L('faisal', 'وَهٰذِهِ نَافِذَةٌ. النَّافِذَةُ كَبِيرَةٌ.', 'And this is a window. The window is big.', ['wa', 'hadhihi', 'nafidha', 'kabir'], 'point:window'),
    L('majid', 'هٰذِهِ كَأْسٌ. فِيهَا مَاءٌ.', 'This is a glass. There is water in it.', ['hadhihi', 'kass', 'fi', 'maa'], 'hold_up:glass'),
    L('majid', 'الْمَاءُ بَارِدٌ.', 'The water is cold.', ['maa', 'barid'], 'hold_out:glass'),
    yn('d11h-cold', 'faisal', { ar: 'هَلِ الْمَاءُ سَاخِنٌ؟', en: 'Is the water hot?', lemmas: ['hal', 'maa', 'sakhin'] },
      ['لَا، الْمَاءُ بَارِدٌ.', 'No, the water is cold.', ['la', 'maa', 'barid']], ['نَعَمْ، الْمَاءُ سَاخِنٌ.', 'Yes, the water is hot.', ['naam', 'maa', 'sakhin']],
      ['لَا', 'الْمَاءُ', 'بَارِدٌ', 'سَاخِنٌ'], { ar: 'الْمَاءُ… سَاخِنٌ؟', en: 'The water… hot?', gesture: 'shake_head_hand' }),
    L('faisal', 'هٰذَا بَابٌ. هٰذِهِ نَافِذَةٌ. هٰذِهِ كَأْسٌ.', 'This is a door. This is a window. This is a glass.', ['hadha', 'bab', 'hadhihi', 'nafidha', 'kass'], 'point:door'),
    L('majid', 'هٰذِهِ كَأْسٌ وَهٰذِهِ نَافِذَةٌ. الْبَابُ كَبِيرٌ.', 'This is a glass and this is a window. The door is big.', ['hadhihi', 'kass', 'wa', 'nafidha', 'bab', 'kabir'], 'point:window'),
    L('majid', 'النَّافِذَةُ كَبِيرَةٌ وَالْبَابُ كَبِيرٌ.', 'The window is big and the door is big.', ['nafidha', 'kabir', 'wa', 'bab'], 'point:window'),
    L('faisal', 'الشَّايُ سَاخِنٌ.', 'The tea is hot.', ['shay', 'sakhin'], 'hold_up:tea'),
    L('faisal', 'خُذْ كَأْسًا مِنَ الْحَلِيبِ.', 'Take a glass of milk.', ['khudh', 'kass', 'min', 'halib'], 'hand_over:glass'),
    L('faisal', 'الْحَلِيبُ بَارِدٌ فِي الْكَأْسِ.', 'The milk is cold in the glass.', ['halib', 'barid', 'fi', 'kass'], 'hold_up:glass'),
    thanks('d11h-thanks', 'faisal'),
  ]),
  scene('d11-souq', 11, 'souq', { ar: 'صَبَاحُ السُّوقِ', en: 'Morning at the souq' }, ['saeed'], [
    L('saeed', 'السَّلَامُ عَلَيْكُمْ! تَفَضَّلْ.', 'Peace be upon you! Here you are.', ['salam', 'ala', 'kum', 'tafaddal'], 'raise_hand'),
    greet('d11s-greet', 'saeed'),
    yn('d11s-milk', 'saeed', { ar: 'هَلْ هٰذَا حَلِيبٌ؟', en: 'Is this milk? (he holds up water)', lemmas: ['hal', 'hadha', 'halib'] },
      ['لَا، هٰذَا مَاءٌ.', 'No, this is water.', ['la', 'hadha', 'maa']], ['نَعَمْ، هٰذَا حَلِيبٌ.', 'Yes, this is milk.', ['naam', 'hadha', 'halib']],
      ['لَا', 'هٰذَا', 'مَاءٌ', 'حَلِيبٌ'], { ar: 'حَلِيبٌ؟ مَاءٌ؟', en: 'Milk? Water?', gesture: 'hold_up:glass' }),
    L('saeed', 'الْبَابُ كَبِيرٌ وَالنَّافِذَةُ صَغِيرَةٌ.', 'The door is big and the window is small.', ['bab', 'kabir', 'wa', 'nafidha', 'saghir'], 'point:shop'),
    L('saeed', 'هٰذِهِ كَأْسٌ. الْقَهْوَةُ سَاخِنَةٌ.', 'This is a glass. The coffee is hot.', ['hadhihi', 'kass', 'qahwa', 'sakhin'], 'hold_up:glass'),
    L('saeed', 'الْحَلِيبُ بَارِدٌ وَالشَّايُ سَاخِنٌ. الْكَأْسُ صَغِيرَةٌ.', 'The milk is cold and the tea is hot. The glass is small.', ['halib', 'barid', 'wa', 'shay', 'sakhin', 'kass', 'saghir'], 'hold_up:glass'),
    thanks('d11s-thanks', 'saeed'),
  ]),
]);
