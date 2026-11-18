# Free speaking practice for Arabic (MSA) learners in a phone web browser

Research method note: about 14 tool calls. Search was rate-limited partway, so several questions (Whisper tiny/base Arabic WER, Arabic on-device packs on iOS/Android, Meta MMS ASR in browser, ONNX sizes for wav2vec2) are Gaps. Numbers not found at a source are marked [unverified] or left out.

## 1. Web Speech API SpeechRecognition (ar-SA) on iOS Safari and Android Chrome

### Takeaway
The API exists on both phones (iOS Safari from 14.5, prefixed; Chrome Android partial) and by default sends audio to the vendor's servers (Apple/Google). On-device mode (`processLocally`) is new and unconfirmed for Arabic on both phones. Home-screen PWA on iOS is contested. Treat it as a convenient, non-private, optional tier, not the core.

### Cited Findings
- caniuse lists iOS Safari as unsupported through 14.4 and partial from 14.5 through 27.2; Chrome Android is partial; the feature is flagged unofficial, and a Chromium bug to unprefix it is linked. — [caniuse](https://caniuse.com/speech-recognition)
- MDN: SpeechRecognition is "Limited availability", not Baseline. By default some browsers use a server-based engine where audio goes to a web service. On-device needs `processLocally`, `SpeechRecognition.available()` and `install()` (language packs). `grammars` is deprecated and has no effect; `phrases` offers contextual biasing. — [MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- MDN usage guide: on-device recognition needs a one-time language pack download per language; if the pack is missing the call fails with a language-not-supported error. — [MDN guide](https://developer.mozilla.org/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)
- Chromium's intent-to-ship states on-device recognition lets sites ensure neither audio nor transcript goes to a third-party service. — [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/c/VNOok2dbmHM)
- A mailing-list message (undated in results) says Android and ChromeOS did not support on-device Web Speech; a 2026 W3C message says Chrome plans to phase out cloud-based recognition over time. Both need checking against current release notes. — [blink-dev](https://go.mail-archive.com/blink-dev@chromium.org/msg16502.html); [W3C list 2026](https://lists.w3.org/Archives/Public/public-webapps-github/2026Apr/0113.html)
- Chromium discussion: sites may only install a language pack if it matches the user's primary language, otherwise the user is asked for permission (relevant to Arabic for non-Arabic-locale phones). — [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/c/VNOok2dbmHM)
- iOS PWA: caniuse-style compatibility site says it works in Safari on iOS but not (yet) for installed web apps, while a later note on the same page says it works in Home Screen PWAs and contradicts caniuse. Conflicting. — [whatpwacando.today](https://whatpwacando.today/speech-recognition)
- Apple developer forum thread and WebKit bug 239816: Web Speech is enabled in Safari on iOS but not for other WKWebView embedders; standalone PWA problems reported (2021-2023, no fix found). — [Apple forums](https://developer.apple.com/forums/thread/748048); [WebKit 239816](https://bugs.webkit.org/show_bug.cgi?id=239816); [WebKit 225298](https://bugs.webkit.org/show_bug.cgi?id=225298)
- Apple's WWDC 2019 talk: server recognition supports more languages than on-device and has limits on request count and audio duration. — [WWDC19 session 256](https://developer.apple.com/videos/play/wwdc2019/256)
- Safari prompts the user before sending audio to Apple's service (secondary summary of WebKit behaviour). — [mobilexweb iOS 14.5](https://mobilexweb.com/ios-14.5/)

### Inferences
- Apple's iOS Dictation covers Arabic on server; whether Safari's `ar-SA` is available and works on-device is not confirmed here. Plan to detect and test on real devices.
- Because `grammars` is dead, constrained recognition cannot be done through the spec; use `maxAlternatives` and match the alternatives against the expected phrase list in our own code, and `phrases` where supported (Chrome only, unverified on mobile).
- Make the Web Speech tier opt-in with a clear "your voice is sent to Apple/Google" notice, and run the check in the Safari tab, not only the installed PWA.

### Gaps
- No source confirmed `ar-SA` (or any Arabic) works in iOS Safari SpeechRecognition, on which iOS versions, or whether it ever runs on-device. Must be tested on hardware.
- No source on Android Chrome Arabic on-device packs or reliability for Arabic.
- Accuracy of Apple/Google engines on learner MSA: not found.

## 2. On-device browser options: Whisper, Vosk, MMS, wav2vec2

### Takeaway
Whisper tiny/base via transformers.js (WASM) is feasible on phones for download size (~120-210 MB hybrid-quantised) but small models are weak on Arabic and hallucinate on short phrases; Vosk Arabic models are too large (318 MB+) and not shown to run in browser; MMS is non-commercial licence; the Arabic wav2vec2 fine-tune is Apache-2.0 but mediocre (39.6% WER). None is a clean fit for open-ended speech; they suit constrained checking only.

### Cited Findings
- Whisper tiny: 39M parameters, Apache-2.0; card does not list Arabic WER; warns of hallucinated text, repetition, lower accuracy on low-resource languages and accents. — [HF openai/whisper-tiny](https://huggingface.co/openai/whisper-tiny)
- In-browser Whisper download sizes (hybrid quantisation): tiny ~120 MB, base ~210 MB, small ~590 MB; WebGPU real-time factors roughly tiny 10-15x, base 5-8x, small 2-4x (laptop-class, not phone numbers); WebGPU said to be 5-10x faster than WASM; article claims Safari lacks WebGPU as of 2026. — [offlinetts.com](https://offlinetts.com/blog/browser-speech-recognition-whisper-comparison/)
- Safari WebGPU support claims conflict across sources; iOS terminates pages under memory pressure; an iPhone report saw Safari reload during generation with maxBufferSize about 715 MB; advice: feature-detect and fall back to WASM on iOS, test on real devices. — [WebKit bug 311598](https://bugs.webkit.org/show_bug.cgi?id=311598); [WebKit 302711](https://bugs.webkit.org/show_bug.cgi?id=302711); [search roundup via transformers.js WebGPU guide](https://huggingface.co/docs/transformers.js/en/guides/webgpu)
- Whisper-large-v3 (large, not phone-sized) on MSA: MASC 13.82, MCV 16.74, FLEURS 8.28, MGB2 21.52 WER; NVIDIA's open FastConformer MSA models beat it (MASC 8.50, MCV 8.20, FLEURS 5.01). — [arXiv 2507.13977](https://arxiv.org/html/2507.13977v1)
- Third-party: zero-shot whisper-small on Egyptian Arabic FLEURS 28.02% normalised WER (33.07% raw). Dialect, not MSA. — [HF zainab11/whisper-small-ar-fleurs](https://huggingface.co/zainab11/whisper-small-ar-fleurs)
- Vosk Arabic: vosk-model-ar-mgb2-0.4 is 318 MB, 16.40% WER on MGB-2 dev, Apache-2.0; vosk-model-ar-0.22-linto-1.1.0 is 1.3 GB, 52.87% WER on Common Voice test, AGPL; smallest Arabic is Tunisian-dialect 158 MB. No MSA small model listed; browser/WASM use not stated. — [Vosk models](https://alphacephei.com/vosk/models)
- Meta MMS-1b-all: 1B params, includes Arabic ("ara"), licence CC-BY-NC 4.0 (non-commercial); adapters used per language; no Arabic-specific accuracy on card. — [HF facebook/mms-1b-all](https://huggingface.co/facebook/mms-1b-all)
- jonatasgrosman wav2vec2-large-xlsr-53-arabic: Apache-2.0, 39.59% WER / 18.18% CER on Common Voice Arabic (self-reported, 2021, no LM), expects 16 kHz audio, errors on longer sentences; size not stated on card (XLSR-53 large is about 300M params, [unverified]). — [HF model card](https://huggingface.co/jonatasgrosman/wav2vec2-large-xlsr-53-arabic)

### Inferences
- A free-form transcriber at phone-friendly size (tiny/base) will probably give high WER on learner Arabic [unverified; no direct number found]. Whisper-large-class accuracy is out of reach on a phone browser.
- Vosk's 318 MB MSA model is too heavy for casual mobile web play, and the 16.4% WER is on broadcast speech, not learners.
- MMS is unusable if the game is ever commercial; CC-BY-NC may be acceptable for a free hobby game but is a licence risk.

### Gaps
- Whisper tiny/base/small Arabic WER from the original paper (arXiv 2212.04356) not retrieved.
- Real measured latency of transformers.js Whisper (WASM) on iPhone/Android mid-range phones: none found.
- ONNX export sizes/feasibility for XLS-R Arabic and wav2vec2 in-browser: not found.
- Vosk WASM/browser builds for Arabic: not found.

## 3. Accuracy on learner speech and short isolated phrases; constrained recognition

### Takeaway
No source measured learner MSA on short phrases. The strongest, cheapest lever is constraining the answer space (compare the recogniser output or phoneme/character posteriors against a small list of expected phrases) rather than trusting free transcription.

### Cited Findings
- Whisper's own card warns of hallucination and uneven accuracy across accents/dialects, which applies to short, non-native clips. — [HF openai/whisper-tiny](https://huggingface.co/openai/whisper-tiny)
- The Web Speech `grammars` feature is deprecated/no effect; `phrases` provides contextual biasing. — [MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- Arabic ASR evaluation depends heavily on diacritics and punctuation handling (Whisper-large-v3 WER on EveryAyah jumps to about 99% when diacritics are scored). — [arXiv 2507.13977](https://arxiv.org/html/2507.13977v1)

### Inferences
- Score without diacritics, normalise alef/ya/ta marbuta forms, and accept match if any of the top N alternatives is within a small edit distance of the expected phrase.
- Use a closed list of expected answers per prompt (typically 1-5), so even a weak recogniser can be graded as "close enough".
- Whisper's decoder can be biased or scored against candidate phrases (forced scoring of candidate texts by likelihood) [unverified idea, not sourced].

### Gaps
- No published accuracy for non-native learner MSA on isolated words/phrases for any of these systems.
- No source on Whisper prompt/hotword biasing quality for Arabic.

## 4. Pronunciation scoring (GOP, forced alignment, phoneme recognisers)

### Takeaway
Arabic MSA mispronunciation detection is an active research area with open data and models (IqraEval), built on wav2vec2/XLS-R/Wav2Vec2-BERT phoneme recognisers, but it is Quran-recitation-centred and research-grade; a free, phone-sized, everyday-speech scorer is not shown to exist. Realistic: a coarse "was it close" signal, not phoneme-level grading.

### Cited Findings
- IqraEval.2 (Interspeech 2026): learners read vowelised MSA sentences; model predicts the spoken phoneme sequence and flags deviations from reference. Prior shared task (ArabicNLP 2025) ranked by phoneme-level F1 across detection and diagnosis. — [IqraEval.2](https://iqraeval-iqraeval-interspeech-26.static.hf.space/index.html); [Iqra'Eval 2025](https://iqraeval-arabicnlp2025.static.hf.space/index.html)
- Systems: Hafs2Vec fine-tuned wav2vec2-xls-r-1b (about 1.3% absolute PER better than the 300M variant in internal tests); another MSA paper starts from wav2vec2-XLSR-300m; AraS2P (Wav2Vec2-BERT, two-stage) reportedly ranked first. — [Fusion-aware two-stage MDD paper](https://arxiv.org/pdf/2606.24086); [ACL Anthology paper 62](https://preview.aclanthology.org/ingest-emnlp/2025.arabicnlp-sharedtasks.62.pdf); [ACL Anthology paper 66](https://preview.aclanthology.org/ingest-emnlp/2025.arabicnlp-sharedtasks.66.pdf)
- Data: Iqra_train (about 79 h native MSA), Iqra_TTS (about 80 h synthetic), Iqra_Extra_IS26 (about 2 h real mispronunciations); test set QuranMB.v2 (98 verses x 18 speakers, about 2 h). Resources under huggingface.co/IqraEval. — [Fusion-aware paper](https://arxiv.org/pdf/2606.24086); [ar5iv 2506.07722](https://ar5iv.labs.arxiv.org/html/2506.07722)

### Inferences
- Their data is Quran-based; per CLAUDE.md the project must not ship QAC data and must keep Quran out of everyday scenes. Using models trained on Quran audio for everyday phrases needs licence and policy checks before adoption (flag to Edward only if shipped).
- A 300M-1B parameter phoneme recogniser is too big for a free phone browser; a distilled/quantised model would need our own work. Server inference breaks the $0 and privacy goals.
- Cheap alternative: compare recording against a reference with DTW on MFCC/pitch-free features for a rough similarity check [unverified; no source], clearly labelled as "rough".

### Gaps
- No leaderboard PER/F1 numbers read; model licences on HF IqraEval repos not checked.
- No source on GOP implementations that run in a browser.
- No source on phone-size Arabic phoneme models.

## 5. Recommended architecture (fallback order, consent, audio on device)

### Takeaway
Make speaking optional and self-checking: default to "record and compare to the model reading" with no upload; add Web Speech only after explicit consent; add heavy on-device Whisper only as a download opt-in; never store or send audio without consent.

### Cited Findings
- Web Speech defaults to server processing; on-device needs `processLocally` plus a language pack. — [MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- Whisper tiny/base are about 120/210 MB in browser; the iOS WebGPU path is risky, so use WASM. — [offlinetts.com](https://offlinetts.com/blog/browser-speech-recognition-whisper-comparison/); [WebKit 311598](https://bugs.webkit.org/show_bug.cgi?id=311598)

### Inferences (proposed order; all untested on devices)
1. Tier 0, no recognition: tap to play the reference, record yourself with MediaRecorder, play both back and self-rate (all audio stays in memory on device). Works everywhere, $0, fully private, no hard-rule risk.
2. Tier 1, on-device Web Speech: if `SpeechRecognition.available({langs:['ar-SA'], processLocally:true})` reports ready, use it; no audio leaves the phone.
3. Tier 2, optional server Web Speech (Apple/Google): only after an explicit consent screen saying the voice is sent to Apple or Google; fuzzy-match against the expected phrase list.
4. Tier 3, optional download of Whisper tiny/base via transformers.js (WASM) with constrained matching; show size (about 120-210 MB) and run on Wi-Fi only.
5. Skip Vosk (size), MMS (non-commercial), and server-hosted phoneme scorers ($ and privacy).
- Consent: one plain sentence per tier, off by default, no mic until tap; remember choice; works with no speaking at all (the game must not require it). Feature-detect, never user-agent sniff.
- Test the Safari tab and installed PWA separately on iPhone.
- Keep language-specific code (normaliser, phrase list) in the Arabic language pack per CLAUDE.md.

### Gaps
- Everything in this section is design reasoning, unverified on hardware; needs a small spike on one iPhone and one Android.
- No data on Apple/Google retention of audio for the Web Speech path; their privacy policies were not read.
