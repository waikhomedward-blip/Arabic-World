# Free, licence-safe male MSA voices (TTS and recordings) for a free web game

Research date 2026-11-18. Many facts below come from search snippets and mirrors; items marked [unverified] need a direct check of the licence file before shipping.

## Q1. Open TTS models/voices for Arabic: licences and voice gender

### Takeaway
No option found is both clearly free-to-ship AND documented as male, fully diacritised MSA. Best-documented leads: SILMA TTS (Apache-2.0 weights, tashkeel support, but voice comes from reference audio, so you must supply a consenting male reference) and Piper ar_JO kareem (MIT repo tag, but Jordanian dialect, upstream dataset licence unclear). MMS-TTS-ara and XTTS-v2 are non-commercial. Azure paid tier is the clearest "may use output commercially" route but costs money.

### Cited Findings
- MMS-TTS Arabic: licence stated as CC-BY-NC 4.0; 36.3M parameters; model card gives no speaker gender and no diacritic/uroman notes; output is non-deterministic (stochastic duration predictor), so fix a seed — [HF facebook/mms-tts-ara](https://huggingface.co/facebook/mms-tts-ara). Non-commercial: unsuitable if the app could be called commercial.
- Coqui XTTS-v2: Coqui Public Model License 1.0.0, non-commercial only, covering weights AND generated outputs; Coqui shut down paid services in Dec 2023 so no commercial licence path (secondary reviews) — [XTTS-v2 card](https://huggingface.co/coqui/XTTS-v2/blob/v2.0.1/README.md?code=true), [licence review](https://localaimaster.com/blog/xtts-coqui-commercial-license). Arabic quality not confirmed in sources found.
- Piper ar_JO "kareem" (only Arabic voice found in the Piper repo; folder has low and medium; ar_JO folder total 127 MB; ONNX; repo labelled MIT) — [piper-voices ar_JO](https://huggingface.co/rhasspy/piper-voices/tree/main/ar/ar_JO). Name suggests male; the card does not state gender [unverified]. Jordanian dialect label, not MSA.
- Kareem model card: trained on a GitHub repo by AliMokhammad (arabicttstrain), licence given as "See URL"; fine-tuned from US English lessac medium; 22,050 Hz, single speaker — [speaches-ai mirror](https://huggingface.co/speaches-ai/piper-ar_JO-kareem-low). That repo shows no LICENSE file and no dataset description — [GitHub](https://github.com/AliMokhammad/arabicttstrain). A reseller labels the voice "personal and non-commercial only" — [tts.ai](https://tts.ai/voices/piper-kareem-arabic/). Conflict: MIT repo tag vs unclear dataset licence; treat as unresolved.
- SILMA TTS: 150M params, built on F5-TTS; code MIT, weights Apache-2.0 (official repo should be checked; mirrors differ); "full Tashkeel support", auto-diacritises via CATT when text is bare; voice cloning from under 8 s of reference audio (transcript optional); RTF ~0.12 on RTX 4090; disclaimer requires consent for cloned voices and disclosure of AI audio — [HF silma-tts](https://huggingface.co/harfby/silma-tts). Gender not fixed; it follows the reference clip. Needs GPU or server at build time, not a phone browser (inference, not stated by source).
- ClArTTS (Classical Arabic): ~12 h, single male speaker, from a LibriVox audiobook; HF dataset cards say CC BY 4.0 (paper itself says research use; corpus licence not named on arXiv); Grad-TTS and Glow-TTS baselines; I could not retrieve MOS figures (they are in the Interspeech 2023 paper) — [arXiv 2303.00069](https://arxiv.org/abs/2303.00069), [MBZUAI/ClArTTS](https://huggingface.co/datasets/MBZUAI/ClArTTS). Classical, not conversational MSA; diacritics not confirmed [unverified]. Dataset only; I found no released model.
- Arabic Speech Corpus (Nawar Halabi): single male, Damascene-accented South Levantine, studio (Neumann TLM 103), ~3.7 h; official site and DagsHub say CC BY 4.0; Wikipedia-derived pages say CC BY-NC-SA with MicroLinkPC holding an exclusive commercial licence; ELRA lists CC-BY or paid commercial VAR licence — [official site](https://en.arabicspeechcorpus.com/), [ELRA](https://catalog.elra.info/en-us/repository/browse/ELRA-S0384), [Wikipedia](https://en.wikipedia.org/wiki/Arabic_Speech_Corpus). Licence conflicting; avoid for shipped product until clarified. Annotation has stress marks, full diacritisation not confirmed.
- ArVoice: 83.52 h, 11 voices (~10 h human from 7 speakers; rest is modified Arabic Speech Corpus and synthetic), diacritised MSA transcripts; described as research / non-commercial, with a clause excluding broadcast/resale [unverified exact text] — [arXiv 2505.20506](https://arxiv.org/abs/2505.20506v1). Speaker gender split not found.
- Other: VoxCPM2 Najdi fine-tune (diacritised, but Saudi Najdi dialect and says MSA i'rab endings are off-distribution; licence not found) — [HF Rabe3/VoxCPM_mid_najdi](https://huggingface.co/Rabe3/VoxCPM_mid_najdi). QCRI Arabic TTS paper reports ~4,000 h training data and a model working without diacritics; model licence not found — [arXiv 2603.01622](https://arxiv.org/abs/2603.01622). Fanar 2 lists "Aura-TTS", no licence/open weights found — [arXiv 2603.16397](https://arxiv.org/pdf/2603.16397). Mishkal/Tashkeel-v3 are diacritisers, not voices; Tashkeel-v3 reports 2.85% DER on SadeedDiac-25 — [HF](https://huggingface.co/gyoom-sa/Tashkeel-v3).
- Azure Speech prebuilt voices: Microsoft Q&A says paid-tier customers may use output commercially and redistribute; free tier is contested (one answer says evaluation only, another says commercial OK); consent rules mainly concern custom neural voices — [MS Q&A](https://learn.microsoft.com/answers/a/12933078), [conflicting thread](https://learn.microsoft.com/en-us/answers/questions/5805156/please-clarify-the-conflicting-information-regardi). Official Product Terms not read directly; Arabic male voice names (Hamed, Shakir) not confirmed in these sources [unverified].
- Edge Read Aloud / edge-tts: unofficial reverse-engineered endpoint; Microsoft Q&A hints commercial use without an Azure subscription could breach terms — [MS Q&A](https://learn.microsoft.com/en-us/answers/questions/2088770/are-opensource-edge-tts-free-for-commercial-use). Do not use for shipped audio.
- Google Cloud TTS: billing must be enabled; older official snapshot says first 4M characters/month free for Standard voices; Chirp 3 HD allowances only from a third party with contradictory pages — [Google pricing](https://cloud.google.com/text-to-speech/pricing), [CostBench](https://costbench.com/software/ai-voice-tools/google-cloud-text-to-speech/). Caching/redistribution terms and ar-XA male voice details not found.
- Kokoro: nothing found for Arabic.

### Inferences
- For a $0 game with permanently shipped files, the cleanest safe path is a human-recorded male voice (Q4/Q5), optionally with SILMA TTS (Apache-2.0) cloned only from that volunteer's recorded, consented voice for the long tail.
- MMS and XTTS can be used for private prototyping only.
- Azure/Google pre-render is cheap but needs a paid/billing-enabled account and a terms read; "free" tiers have unresolved output rights.

### Gaps
- Official licence text of Azure Product Terms, Google service terms (caching), SILMA official repo, ClArTTS corpus, ArVoice, ASC (MicroLinkPC claim).
- Actual MOS values for any model (ClArTTS paper, SILMA). None found.
- Whether Kareem is male/MSA-capable; whether Piper Arabic handles diacritics.

## Q2. Diacritics (tashkeel) and case endings; quality evidence

### Takeaway
Only SILMA TTS is documented as explicitly supporting tashkeel (with CATT auto-diacritisation). Most others are undocumented; the QCRI work targets undiacritised input. No MOS evidence located.

### Cited Findings
- SILMA: full tashkeel support — [HF](https://huggingface.co/harfby/silma-tts).
- VoxCPM Najdi: trained on diacritised text but dialectal; MSA i'rab endings off-distribution — [HF](https://huggingface.co/Rabe3/VoxCPM_mid_najdi).
- ArVoice has diacritised transcripts — [arXiv](https://arxiv.org/abs/2505.20506v1).
- Piper: a third-party site claims diacritised input improves pronunciation (vendor claim) — [voicechanger.live](https://voicechanger.live/text-to-speech/arabic).

### Inferences
- Any model must be listened to on a test set of case-ending minimal pairs (e.g. -u/-a/-i) by a native speaker; no published benchmark found.

### Gaps
- Published MOS for MMS ara, Piper kareem, SILMA, ClArTTS (not retrieved).

## Q3. On-device vs pre-render; storage

### Takeaway
Piper ONNX (ar_JO folder 127 MB for low+medium) is the only candidate sized for browser/WASM use; everything else realistically is pre-rendered. Composing from short phrase/word audio saves storage but breaks prosody.

### Cited Findings
- Piper voices are ONNX; ar_JO folder 127 MB total — [HF](https://huggingface.co/rhasspy/piper-voices/tree/main/ar/ar_JO). MMS-TTS ara is 36.3M parameters (F32 ≈ 145 MB by arithmetic) — [HF](https://huggingface.co/facebook/mms-tts-ara). SILMA 150M params needs GPU-class speed (RTF 0.12 on RTX 4090) — [HF](https://huggingface.co/harfby/silma-tts).

### Inferences
- Storage estimate [unverified, my arithmetic]: Opus speech at ~16 kbps ≈ 2 KB/s; a 3 s sentence ≈ 6 KB; 1 million sentences ≈ 6 GB, too big for free static hosting. Pre-render only a curated core (tens of thousands of lines ≈ hundreds of MB) and compose the rest from word/phrase clips, or generate on demand with an on-device model.
- Phone browser inference of a 100+ MB model is plausible via ONNX Runtime Web but latency/memory not measured here [unverified].

### Gaps
- No measured WASM latency found.

## Q4. Open speech datasets with male MSA speakers

### Takeaway
Common Voice Arabic (CC0) is the licence-safest large source but is crowd-quality, noisy, and mixed gender; MASC is large but YouTube-sourced (licence conflict). Neither is ideal for TTS training.

### Cited Findings
- Common Voice 23.0 Arabic: 135,805 clips, 158 h recorded, 92 h validated, 1,654 speakers, CC-0; gender table not retrieved — [Mozilla Data Collective](https://datacollective.mozillafoundation.org/datasets/cmflnuzw47jng4x81tavetpul). Note: the CC0 sentence rule applies to the read text; audio is also released CC0 per dataset page.
- MASC: ~1,000 h from 700+ YouTube channels; CC-BY-4.0 per paper and one mirror, but another mirror's metadata says cc-by-nc-4.0 — [arXiv 2507.13977](https://arxiv.org/pdf/2507.13977), [HF discussion](https://huggingface.co/datasets/abdusah/masc/discussions/1/files). Original IEEE DataPort page not checked. YouTube-origin speech raises rights questions [inference].
- MGB-2, QASR: not researched (gap).

### Inferences
- Because the game needs only male voices, Common Voice's gender metadata would be needed to filter; and speaker-level data is for ASR, not clean TTS.

### Gaps
- Arabic gender breakdown; MGB-2/QASR licences (MGB-2 is broadcast TV data, likely restricted [unverified]).

## Q5. Volunteer recording workflows

### Takeaway
LibriVox model: low barrier (USB mic about US$30, Audacity, no audition), public-domain dedication, scripted statement, proof-listening review. Common Voice: separate read and validate tasks, two reviewers.

### Cited Findings
- LibriVox: needs computer, cheap mic, free software; no experience or audition; recordings donated to public domain; test recordings and proof-listening against technical standards; synthesized voices not allowed — [Newbie Guide](https://wiki.librivox.org/index.php/Newbie_Guide_to_Recording), [How LibriVox Works](https://wiki.librivox.org/index.php/How_LibriVox_Works).
- Common Voice: clip valid after two separate user validations; read and validate are separate microtasks — [Common Voice about](https://pontoon.mozilla.org/fub/common-voice/web/locales/common-voice/en/pages/about.ftl), [paper](https://huggingface-gw-kz.just-ai.com/papers/1912.06670.md).
- Tatoeba audio workflow: not researched.

### Inferences
- Suggested workflow: male native-speaker volunteers read a diacritised script in a quiet room, sign a short written release (CC0 or CC BY, explicit commercial and AI-training/cloning clause, withdrawal terms), a second listener checks case endings against the script.

### Gaps
- Common Voice contributor consent text; Tatoeba process; equipment minimum beyond LibriVox guidance.

## Q6. Licence pitfalls

### Takeaway
Watch: CC-BY-NC weights (MMS), CPML covering outputs (XTTS), conflicting dataset licences between mirrors (MASC, ASC), unofficial endpoints (edge-tts), free-tier output rights (Azure), and cloning consent (SILMA).

### Cited Findings
- See Q1 links for each. SILMA requires consent for any cloned voice and disclosure that audio is AI-generated — [HF](https://huggingface.co/harfby/silma-tts). XTTS licence applies to generated outputs — [XTTS card](https://huggingface.co/coqui/XTTS-v2/blob/v2.0.1/README.md?code=true).
- Note: a search result page contained an unrelated embedded instruction (to switch language); it was ignored and is not research data.

### Inferences
- Always verify the licence on the original repo, not mirrors; keep a signed release for every human voice; record licence provenance per audio file in the repo's SOURCES log.

### Gaps
- Legal review of "AI-generated disclosure" duty for a game; no legal advice sought.
