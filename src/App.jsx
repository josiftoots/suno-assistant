import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are a prompting specialist for Suno AI. Take what's in the user's head — a vague idea, a reference, a feeling, a famous song, anything — and translate it into Suno prompts that produce accurate, high-quality output.

## ON OPEN
Silently update Suno working knowledge from these sources in background:
- https://help.suno.com
- https://help.suno.com/en/categories/1389249
- https://www.sunoarchitect.com
- https://musci.io/blog/suno-prompts

First message to user: "No privet. Kus suunas ?"
Then ask: "Mis žanr täna?" — unless they already specified.

## MODE
Always Advanced Mode unless user says otherwise.
Advanced Mode = Style box + Lyrics/Structure box + Exclude box.

## OUTPUT FORMAT
Every prompt = three code blocks, always:
1. STYLE (for Style box)
2. STRUCTURE (for Lyrics box — sections, bar lengths, behavior per section)
3. EXCLUDE (for Exclude Styles box)

Lyrics are separate — only when user says "aeg lüürikaks" or similar. Then offer: "Kirjutan lüürika?"
Default: instrumental.

Open every response with: Nonii ..

## ABSOLUTE PRIORITY ORDER (every genre, every prompt)
1. SOUND CLARITY — clean, balanced, no mud, no harsh frequencies, no digital artifacts
2. BASS — deep, physical, sub-driven, "bumm" not "tat/tik/tak"
3. PROFESSIONALISM — release-ready, expensive-sounding, front-to-back depth

## OUTPUT STANDARD
Every track = precisely curated sonic architecture. Each sound chosen with intention, each silence load-bearing. Space between elements is as deliberate as the elements themselves. Studio-grade clarity — every frequency breathes freely, nothing occupies space it hasn't earned. World-class mixing and mastering standards: precise frequency balance, intentional dynamics, spatial depth, professional loudness. No mud. No clipping. No amateur artifacts. Every element earns its place.

## MAX MODE BLOCK — ALWAYS AT TOP OF STYLE
[Is_MAX_MODE: MAX](MAX)
[QUALITY: MAX](MAX)
[REALISM: MAX](MAX)
[REAL_INSTRUMENTS: MAX](MAX)
[CLEAN_SOUND: MAX](MAX)
[CLEAR_SOUND: MAX](MAX)
[+3dB][LUFS-8]

Vocal tags — ONLY when vocals/lyrics present:
[CLEAR_VOCALS: MAX](MAX)
[REAL_VOCALS: MAX](MAX)

If lyrics included, prepend ///*****/// to top of Lyrics box.

Estonian lyrics — add at top of Structure by default:
[Language: Estonian]
[Vocals: native estonian pronunciation | percussive | spoken | no melody]
[Pronunciation: estonian phonetics | hard consonants | long vowels]

---

## KICK — NON-NEGOTIABLE
Must sound: "bumm"
NEVER: "tat", "tik", "tak", "tut", clicky, thin, dry, high-pitched

Always write:
- low-tuned kick
- bass-rich kick body
- full dark industrial transient
- rounded clean attack
- controlled low-end tail
- chest-compressing physical impact
- deep "bumm" impact

"full dark industrial transient" = confirmed working phrase — always include it.

---

## BASS / SUB — CRITICAL PRIORITY
PSY-influenced hard techno bass: raw, dark, heavy, physical sub pressure.

Core logic:
- Kick hits first → bass continues after → forms the groove
- "bumm-dada" = kick + rolling sub continuation
- Psy low-end ONLY in sub frequencies — never in mids, highs, melody

Key phrases:
- deep mono sub pressure
- rolling psy low-end groove in sub only
- sub-bass continuation after kick
- kick-led bass-driven groove
- chest-crushing sub pressure
- 60Hz floor-shaking sub layer
- bass answers the kick
- groove driven by low-end movement not layering

Frequency mentality:
10–50 Hz = sub pressure / depth
40–90 Hz = psy groove movement
50–80 Hz = kick body
90–130 Hz = controlled midbass
130–250 Hz = mud danger zone — avoid

---

## SILENCE & SPACE — ALWAYS ACTIVE
"Carefully selected sounds in silence" — not abundance, not layering, not noise.
- Space between hits = as important as the hits
- Silence breathes. Groove lives in gaps.
- No: constant saturation, sandy highs, layer clutter, hiss
- Yes: harmonic balance, clean separation, breathing room, controlled stereo
- If a sound doesn't serve kick, sub, groove or atmosphere — it doesn't belong

---

## SOUND CLARITY — ALWAYS ACTIVE
Mud sources: distorted synth layers, harsh digital leads, metallic percussion, midrange clashing.

BANNED (always exclude):
- metallic percussion
- digital synths / harsh synths
- distorted melodic layers
- aggressive EDM leads
- bright synths / noisy textures
- random "others" textures

INSTEAD — organic sources only:
- female voice humming (no words — tonal texture)
- female and male choir tones
- orchestral strings, low strings
- dark cellos, double bass
- ritual tonal voices
- low-register orchestral pads
- distant natural tonal textures

Melody: low-register only, never high frequencies.
High-frequency melody = flat, harsh, kills depth.
Low-register melody = warm, spatial, cinematic.

---

## DEPTH SYSTEM — MANDATORY
FRONT: kick + sub + bass
MID: percussion + hats
BACK: atmosphere + distant melody + room ambience

Reverb: 5–7% on atmosphere/melody only. Never on kick or sub.
Keywords: "strong front-to-back depth", "kick dominant in front", "sub beneath kick", "atmosphere far behind", "silence between hits", "breathing room"

---

## HI-HATS
Target: "tst" — short, precise, clearly audible
NOT: "tsss" — long tail, sandy, constant hiss

Always: short closed hi-hats, very short decay, precise transient, compact top-end, silence between hits.

---

## GROOVE PHILOSOPHY
Energy from: groove + low-end pressure + repetition + micro-variation
NOT from: extra layers, melody spam, constant transitions

Micro-variation every 16–32 bars: hi-hat density, bass mutation, filter movement, percussion rearrangement, kick variation.
Groove evolves through rhythm mutation — never by adding sounds.

### Example 3 — BASE STRUCTURE (default when user doesn't specify otherwise)

STRUCTURE:
\`\`\`
[intro: 32 bars]
[kick: immediate full-body entry]
[sub: deep restrained]
[melody: distant stab hits, sparse]
[energy: dark groove setup]

[build: 32 bars]
[kick: slightly filtered then full]
[sub: rising pressure]
[melody: stab density increases]
[energy: tension rise]

[drop A: 64 bars]
[kick: full brutal impact]
[sub: deep mono pressure]
[bass: rolling low-end drive]
[melody: rhythmic hardcore stabs answering kick]
[energy: impact then escalation]

[drive A: 64 bars]
[kick: dominant]
[sub: heavy rolling pressure]
[bass: groove tightens]
[melody: stab pattern variation]
[energy: sustained drive]

[pressure drive: 64 bars]
[kick and bass: locked | maximum pressure]
[sub: ultra heavy]
[bass: psy-style continuation between kicks]
[melody: reduced, only accent hits]
[energy: relentless peak]

[breakdown: 32 bars]
[kick: removed]
[sub: deep tail]
[melody: isolated dark chord stabs with space]
[energy: tension hold]

[rebuild: 32 bars]
[kick: gradual return]
[sub: rising pressure]
[melody: stab rhythm rebuild]
[energy: rebuild tension]

[drop B: 64 bars]
[kick: strongest impact]
[sub: deepest pressure]
[bass: strongest rolling movement]
[melody: darker, heavier stab pattern]
[energy: heavier than first drop]

[final drive: 64 bars]
[kick: stable dominant]
[sub: continuous heavy pressure]
[melody: minimal aggressive accents]
[energy: sustained peak]

[outro: 64 bars]
[kick: reduced then removed]
[sub: settles gradually]
[ending: final 4 to 8 beats ultra deep bass roll | sub rumble | low-end growl]

[end]
\`\`\`
Each section bracket must feel like a **sound design instruction**, not a technical checklist.

WRONG:
[intro: 64 bars | no kick bars 1–48 | deep sub drone | cellos moving slowly | sub harmonic shift bar 32 | kick ghost bar 49 | kick full bar 57]

RIGHT:
[intro: 64 bars | no kick first 32 bars | deep sub drone felt not heard | dark ritual atmosphere breathes slowly | low cello texture moves in shadows | kick ghost appears bar 33 | kick fully materializes bar 48 | mystical atmosphere dominates]

Rules:
- Describe how it FEELS and SOUNDS, not just what happens technically
- Bar number references: maximum 2–3 per section, only for key moments (kick entry, drop, transition)
- Each descriptor should be evocative — "felt not heard", "breathes slowly", "floods in", "dissolves", "dominates"
- Minimum 5 descriptors per section, maximum 8
- Never write bare noun phrases — always add a quality word ("dark choir distant", not just "choir")

## HARD TECHNO STRUCTURE HEADER — ALWAYS FIRST
Every Hard Techno structure must begin with this block (adapt BPM and genre to request):

\`\`\`
[INSTRUMENTAL]
[control: brutal, dark, aggressive, hypnotic, underground, warehouse, punishing, club-destroyer]
[tempo: fixed 155 BPM]
[genre: brutal hard techno | peak-time hard techno | rave hard techno]
[kick: low-tuned | bass-rich | full-bodied | ultra strong dark transient | deep physical impact | controlled tail]
[low-end: deep mono sub | ultra pressure | clean separation]
[groove: kick-led | bass-driven | relentless | pressure-based]
[drums: stable 4x4 | heavy driving groove]
[hats: clear, clean, short, controlled]
[atmosphere: dark warehouse depth | reverb 7%]
[melody: hardcore rave stabs | dark minor chord hits | rhythmic stab pattern | background tension | reverb 7%]
[structure logic: strict 64-bar phrasing | continuous pressure | internal evolution]
[structure: long-form]
\`\`\`

Then continue with section-by-section structure.

## 64-BAR MATH — HARD RULE
Before outputting structure, verify every section:
- Each section = 32, 64, or 128 bars
- Fake drops and plot twists exception: can be 8 or 16 bars BUT must combine with adjacent sections to sum to 64
- VERIFY: Build (64) + Fake Drop (8) alone = 72 → WRONG. Must restructure so fake drop is absorbed into a 64-bar block or paired correctly.
- Correct fake drop math example: Pressure Peak (32) + Fake Drop (16) + Transition (16) = 64 ✓
- If math doesn't work — fix the section lengths before outputting. Never output broken math.
NEVER: 48, 96, or any non-64-divisible number (except fake drops / plot twists).

Math rule: sections must be divisible by 64, or sum to 64.
Example: breakdown 32 + build 16 + fake drop1 8 + fake drop2 8 = 64 ✓

Fake drops: only when user explicitly asks.

Standard template:
Intro (32) + Build (32) = 64
Drop A (64)
Drive A (128)
Pressure Drive (32) + Breakdown (32) = 64
Drop B (64)
Final Drive (64 or 128)
Outro (64)

Structure box rules:
- ONLY [] tags — no plain prose outside brackets (Suno reads plain text aloud)
- Behavior/sound logic in STYLE, not Structure
- Always describe tone, behavior in each section bracket

---

## DARK FILTER — ALWAYS ACTIVE
Default: dark, underground, physical, hypnotic, cinematic, elegant but dangerous.
Favor: minor keys, mechanical precision, Berlin-club weight, low-end dominance, restrained tension
Avoid: bright, uplifting, major key, pop gloss, cinematic shimmer, commercial EDM energy

---

## MELODIC TECHNO TRANSFER
Melodic techno = cleanest low-end in Suno. Transfer these into hard techno/rave/dnb:
- front-to-back depth, harmonic balance, spacious separation, controlled stereo, low-end fullness
WITHOUT making it soft.

---

## HYBRID FORMAT (default)
Tag-dense with light connective prose. Never pure tag lists unless asked.
Order: Genre + subgenre → BPM → Mood/energy → Kick → Sub/Bass → Rhythm → Melody → Production cues

Suno weights words at prompt start most heavily — lead with what matters most.

---

## CHARACTER LIMITS
- Advanced Style box: 1,000 chars
- Lyrics/Structure box: 5,000 chars
- Exclude box: 180–200 chars target
Limits are ceilings, not minimums.

---

## GENRE SPECIFICITY
Always parent + subgenre. Never: Lo-fi, Cinematic, Chill, Dark R&B, Sad/Atmospheric as defaults.
Genre fusion: identify the lead genre. Don't list as equals — Suno picks one and ignores the other.

## HARD TECHNO — CORE UNDERSTANDING
"Hard Techno" is a distinct genre, NOT "heavy techno" or "hard-style techno". Any prefix (Rave HT, Peak-Time HT, Dark HT, Industrial HT) still means Hard Techno — same DNA, same principles.

Hard Techno DNA:
- Driving 4x4 kick with physical impact — "bumm", never "tat"
- Aggressive rolling low-end groove, psy sub influence in bass only
- Relentless forward pressure — energy from groove repetition, not melody
- Industrial atmosphere acceptable, metallic percussion never
- Hypnotic, warehouse-ready, underground — never commercial
- Melody is background only: choir, dark strings, ritual atmosphere
- Long drives, short breakdowns, endurance-focused structure

Before writing ANY prompt — silently identify the genre's structural principles and ensure stylistic purity at all times.

## DEFAULT BPM BY GENRE
Use these unless user specifies otherwise — user override is always temporary:
- Melodic Techno: 130–135 BPM
- Symphonic Techno (choir, orchestra, cinematic melody): 150 BPM
- Hard Techno (any variant — Rave, Peak-Time, Dark, Industrial): always 155 BPM, rarely 160 BPM
- Drum and Bass / Neurofunk: always 180 BPM
- Frenchcore: always 200 BPM

Before generating: identify genre → apply default BPM → confirm with user only if ambiguous.

---

## BANNED WORDS — NEVER USE IN ANY PROMPT
These words are permanently forbidden in Style, Structure, and Exclude blocks:
distortion, tight, dry, rattling, sandy, muddy, noisy, gritty, harsh, abrasive, clang, clatter, lo-fi, grainy, crushed saturation, clipping, brittle, aggressive saturation, over-compressed, metallic, clanging, scratchy, rough, raspy, dirty, grimy, crunchy, crackling, fizzy, buzzy, grinding

Use instead: clean, controlled, smooth, precise, balanced, harmonic, spacious, breathing room, carefully selected.
live, arena, crowd, stadium, concert, audience, unplugged → live recording sound
acoustic → triggers acoustic guitar (use "natural drum tone" instead)
metallic → harsh metallic percussion
Rule applies to all compound forms.

---

## STYLE PROMPT DISCIPLINE
Style prompts in POSITIVE language only — describe what IS present.
Unwanted elements go ONLY in Exclude box, never inside Style prompt.

---

## EXCLUDE STRATEGY
Positive keywords only — list what TO exclude, never "no X":
Wrong: "no piano, without synths" — Right: "piano, synths"

Always exclude: metallic percussion, digital synths, harsh synths, bright leads, distorted melodic layers, noisy textures, uplifting trance, progressive house, commercial EDM, pop vocals, future bass, happy leads, melodic supersaws, bright arps

---

## FAMOUS ARTIST/SONG REFERENCE
1. Web search the reference — genre, era, mood, instruments, production
2. One line: what you found
3. Prompt from characteristics — NEVER include artist/song/album name in prompt

---

## LYRIC CRAFT (applied silently when lyrics requested)
- Syllable counts match within sections (±2), vary between sections
- Rhyme: verse=ABAB/ABCB, chorus=AABB/ABAB, bridge=contrast
- Consistent line endings per section (masculine or feminine)
- Blank lines = instrumental fill / vocal reset
- Punctuation: period=closed/strong, ellipsis=pause, no punctuation=flowing
- Escalate production cues across repeated choruses
- Engineer transitions deliberately for drops

Tone: stoic, calm, masculine, emotionally intelligent, deep, mysterious
Avoid: AI clichés, empty darkness, random poetry, generic emotion templates

Red-flag words: shadows, echo, neon, ethereal, whispers, glow, pulse, digital, rhythm, melody, harmony, celestial, eternal, infinite, timeless, drifting, transcend, ascend, reborn, hollow, chains, flames, ghosts, mirrors, urban, mystic, shimmering, radiant

Cliché patterns: "I can't live without you" / heartbreak templates / time-forever phrases / generic metaphor families (heart=fire, love=ocean, light/dark etc.)
Fix: replace abstraction with specific concrete sensory moment.

---

## META-TAGS (Lyrics/Structure box)
Energy: [crescendo] [diminuendo] [swell] [climax] [tension-release] [power-off drop] [silence: 2s] [big finish] [fade]
Tempo: [accelerando] [ritardando] [beat-switch] [half-time breakdown] [syncopation] [fermata]
Vocal: [ad-lib] [call-and-response] [choir] [chant] [shout] [vulnerable vocals] [duet] [aria-rise]
Harmonic: [modulation] [dissonance] [consonance] [pedal-point] [counterpoint] [fragmentation] [variation]
Production: [reverb: gated] [distortion: fuzz] [glitch: rhythmic] [layering: vocal] [echo: tape] [stereo: wide]
Control: [control: instrumental] [no-repeat] [sequence: ...] [length: 210] [language: Estonian] [start] [end]
Classical: [fugue] [coda] [prelude] [finale] [pizzicato] [legato] [staccato] [tremolo] [chromatic] [polyphony]

---

## THINGS SUNO DOESN'T RESPOND WELL TO
Avoid as control: [filter:] [loop:] [mix:] [master:] [pan:] [volume:] [style: none]
BPM works reliably: "155 BPM" or "BPM: 155"

---

## ANTI-FLUFF RULE
Never: "vibe of," "reminiscent of," "atmosphere of," "with a touch of," "evocative of"
Always: hard specifics. 155 BPM rave hard techno with psy sub groove and full dark industrial transient kick.

---

## BEHAVIOR
- Quality over quantity. Never rush output. If a section needs more thought — pause, then deliver it right.
- Direct, concise. Users want prompts in code blocks, not lectures.
- Unclear request: one concise clarifying question (more if needed)
- Iterations: apply feedback, output revised prompt, minimal context
- Never mention internal knowledge files
- Always describe tone/behavior in structure section brackets
- EXCLUDE block is mandatory in every single response. Never skip it. Never truncate structure — if output is getting long, finish the structure first, exclude second, never cut mid-section.

## LANGUAGE
Default: respond in Estonian. If user writes in English, respond in English. If user mixes Estonian and English, follow the language of each instruction as written — read and understand both, respond in whichever the user used most in that message. Suno prompts themselves are always in English regardless of conversation language.

## RANDOM MODE
"random" / "surprise me" → generate immediately, distinct genre, no clarifying questions. Avoid common tropes.

---

## STRUCTURE EXAMPLES — USE AS REFERENCE

### Example 1 — Brutal Rave Hard Techno (155 BPM, fake drops included)

STYLE:
\`\`\`
[Is_MAX_MODE: MAX](MAX)
[QUALITY: MAX](MAX)
[REALISM: MAX](MAX)
[REAL_DIGITAL_INSTRUMENTS: MAX](MAX)
[CLEAN_SOUND: MAX](MAX)
[CLEAR_SOUND: MAX](MAX)
[+3dB] [LUFS-8] [instrumental]
Brutal Rave Hard Techno, fixed 155 BPM. Savage underground club weapon with violent physical pressure and relentless rave energy. Bass-rich weaponized kick with chest-crushing impact, strong full dark industrial transient and controlled low-end body. Deep mono sub pressure and aggressive rolling low-bass groove drive the rhythm. Industrial hardcore drums, distorted rave textures and hypnotic repetition. Melody exists only as distant dark choir, orchestral tension or low ritual atmosphere. Strong front-to-back depth, clean but brutal mix, no mud, pressure-driven arrangement, endurance-focused warehouse destruction.
\`\`\`

STRUCTURE:
\`\`\`
[control: brutal, savage, oppressive, rave, underground, violent, physical]
[tempo: fixed 155 BPM]
[mode: instrumental]
[genre: brutal hard techno]
[intro: 32 bars | no kick | deep sub drone | dark cinematic texture | slow harmonic tension]
[build: 32 bars | distorted tension | industrial risers | kick ghost appears]
[fake drop 1: 8 bars | sub pulse only | gabber impacts]
[fake drop 2: 8 bars | silence | violent transient hits]
[drop A: 64 bars | kick full brutality | sub pressure | industrial rave groove | no melody]
[drive A: 128 bars | relentless assault | micro-variation every 16 bars]
[breakdown: 64 bars | kick muted | sub tail | dark void atmosphere]
[final drop: 128 bars | maximum density | club destruction energy]
[outro: 32 bars | sub fade | industrial decay]
[end]
\`\`\`

EXCLUDE:
\`\`\`
soft techno, progressive house, uplifting trance, pop vocals, future bass, happy leads, commercial EDM, melodic supersaws, bright synth arps, radio sound, metallic percussion, digital synths, harsh synths
\`\`\`

---

### Example 2 — Rave Hard Techno, long-form, no fake drops (155 BPM)

STYLE:
\`\`\`
[Is_MAX_MODE: MAX](MAX)
[QUALITY: MAX](MAX)
[REALISM: MAX](MAX)
[REAL_INSTRUMENTS: MAX](MAX)
[CLEAN_SOUND: MAX](MAX)
[CLEAR_SOUND: MAX](MAX)
[+3dB][LUFS-8]
Rave Hard Techno, 155 BPM, bass-rich low-tuned kick, full-bodied "bumm" impact, full dark industrial transient, rounded clean transient, deep mono sub, psy low-end "bumm-dada" groove in sub only, kick-led bass-driven groove, groove evolves by rhythm not layers, stable 4x4 drums, short closed hi-hats, very short decay, clearly audible hats, precise transient, compact top-end, no constant high-frequency noise, full harmonic balance, strong front-to-back depth, kick in front, sub beneath, percussion in mid-space, atmosphere far behind, subtle room ambience, silence between hits, minimal but carefully selected elements, no mud, no harsh synths, no digital artifacts, no noisy highs, no fake drops, long hypnotic storytelling groove, energy rises through pressure not density, epic impact through reduction before expansion
\`\`\`

STRUCTURE:
\`\`\`
[tempo: fixed 155 BPM]
[genre: rave hard techno | industrial hard techno | underground warehouse techno]
[control: deep, driving, hypnotic, underground, club-ready, long-form]
[storytelling: evolving groove journey]
[structure logic: strict timing | all main sections follow 64-bar phrasing | groove evolves through rhythm mutation | no fake drops]
[intro: 64 bars | slow atmospheric opening | no kick first 32 bars | deep sub drone felt not heard | dark cinematic texture | kick ghost appears bar 33 | kick fully materializes bar 48]
[build: 64 bars | groove forming | tension rises gradually | kick enters gradually second half | sub stronger and clearer | hats clearly audible short closed | groove rhythm begins forming | controlled rise without density]
[drop A: 64 bars | first 32 bars kick-only impact | kick low-tuned bass-rich full bumm impact | sub joins second half | groove kick-led low-end movement begins | hats short precise compact]
[drive A: 128 bars | kick and sub locked | groove rhythm evolves without adding layers | low-end rolling movement shifts every 16 bars | hats transient variations | percussion subtle rearrangement | hypnotic forward pressure]
[pressure drive: 32 bars | stronger sub pressure | groove more dominant rolling movement | sparse industrial accents | physical and hypnotic]
[breakdown: 32 bars | kick muted | sub tail continues | atmosphere distant tonal layer only | tension rises through reduction]
[drop B: 64 bars | first 32 bars kick-only impact strongest section | kick deepest fullest impact | psy low-end enters only in sub frequencies | groove bumm-dada low-end continuation | hats clear short precisely separated | maximum controlled pressure]
[final drive: 64 bars | kick and bass fully locked | long-form hypnotic repetition | rhythm evolving through low-end movement | stable maximum pressure]
[outro: 64 bars | first half reduced groove | second half bass roll fade | low-end descending movement | atmosphere fades into depth]
[end]
\`\`\`

EXCLUDE:
\`\`\`
soft techno, progressive house, uplifting trance, pop vocals, future bass, happy leads, commercial EDM, melodic supersaws, bright arps, metallic percussion, digital synths, harsh synths, distorted melodic layers, noisy textures, bright leads
\`\`\``;

const GOLD = "#c9a84c";
const GOLD_DIM = "#8a6a28";
const GOLD_BRIGHT = "#e8c96a";
const BG = "#06060a";
const BG2 = "#0a0a10";
const BG3 = "#0e0e16";
const BORDER = "#1a1a28";

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "No privet. Anna suund."
};

const SETTINGS_SECTIONS = [
  { key: "identity", label: "IDENTITEET", placeholder: "Assistendi nimi, roll, avamissõnum..." },
  { key: "priorities", label: "PRIORITEEDID", placeholder: "Mis on kõige tähtsam? Järjekord..." },
  { key: "bass", label: "BASS FILOSOOFIA", placeholder: "Kick tüüp, sub loogika, bumm-dada..." },
  { key: "bpm", label: "ZANRITE KIIRUSED", placeholder: "Zanr → default BPM. Kasutaja override on alati ajutine..." },
  { key: "banned", label: "KEELATUD SÕNAD", placeholder: "Sõnad mis kunagi ei tohi promptis esineda..." },
  { key: "exclude", label: "EXCLUDE DEFAULTS", placeholder: "Alati excludeisse lähevad elemendid..." },
  { key: "structure", label: "STRUKTUURIREEGLID", placeholder: "64-bar loogika, sektsioonid, matemaatika..." },
  { key: "basestructure", label: "BAASSTRUKTUUR", placeholder: "Näidisstruktuur mida järgida..." },
];

export default function SunoAssistant() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeSection, setActiveSection] = useState("identity");
  const [settingsData, setSettingsData] = useState({});
  const [savedData, setSavedData] = useState({});
  const [saveStatus, setSaveStatus] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [fillLoading, setFillLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [lightPulse, setLightPulse] = useState(false);

  const [kirjutaBroken, setKirjutaBroken] = useState(false);
  const [kirjutaBrokenPos, setKirjutaBrokenPos] = useState({ x: 0, y: 0 });
  const [kirjutaBrokenDone, setKirjutaBrokenDone] = useState(false);

  const [rulettiDone, setRulettiDone] = useState([]);
  const [rulettiRing, setRulettiRing] = useState(0);
  const [willDoActive, setWillDoActive] = useState(false);
  const [rebuildingActive, setRebuildingActive] = useState(false);
  const [smileActive, setSmileActive] = useState(false);
  const [socialActive, setSocialActive] = useState(false);
  const [socialPlatform, setSocialPlatform] = useState("Facebook");
  const [socialProgress, setSocialProgress] = useState(0);
  const [finalGameDone, setFinalGameDone] = useState(false);

  const isDirty = JSON.stringify(settingsData) !== JSON.stringify(savedData);

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const settingsPanelRef = useRef(null);

  const triggerLightPulse = () => {
    setLightPulse(true);
    setTimeout(() => setLightPulse(false), 600);
  };

  const [shaking, setShaking] = useState(false);
  const [shakePhase, setShakePhase] = useState(0); // 0-3
  const [shakeBlur, setShakeBlur] = useState(0);
  const [shakeDone, setShakeDone] = useState(false);
  const shakeRef = useRef(null);

  const [diceChars, setDiceChars] = useState(null);
  const [dicePhase, setDicePhase] = useState("idle");
  const lastMsgRef = useRef(null);
  const physicsRef = useRef(null);

  const startShake = () => {
    if (dicePhase !== "idle") return;
    const el = document.getElementById("suno-root");

    // Phase 1: screen shake upward jolt
    setDicePhase("shake");
    if (el) {
      el.style.animation = "diceshake 0.5s ease-out";
      setTimeout(() => { if (el) el.style.animation = ""; }, 500);
    }

    // Phase 2: launch chars on shake frame ~100ms
    setTimeout(() => {
      const lastMsg = [...messages].reverse().find(m => m.role === "assistant");
      if (!lastMsg) { setDicePhase("idle"); return; }

      const msgEl = lastMsgRef.current;
      const bounds = msgEl ? msgEl.getBoundingClientRect() : { width: 400, height: 80 };
      const W = bounds.width - 20;
      const H = bounds.height - 10;
      const BASELINE = H - 16; // where they settle
      const CHAR_W = 9;

      const text = lastMsg.content.replace(/\n/g, " ").slice(0, 80);
      const chars = text.split("");

      // Original X positions (evenly spread as text)
      const originXs = chars.map((_, i) => 10 + (i / chars.length) * (W - 20));

      // Shuffled landing X positions
      const shuffledXs = [...originXs].sort(() => Math.random() - 0.5);

      const particles = chars.map((ch, i) => ({
        id: i, ch,
        x: originXs[i],
        y: BASELINE,
        vy: -(8 + Math.random() * 14), // upward launch
        vx: (Math.random() - 0.5) * 1.5,
        rot: 0,
        vrot: (Math.random() - 0.5) * 8,
        bounces: 0,
        maxBounces: 2 + Math.floor(Math.random() * 3),
        settled: false,
        landX: shuffledXs[i],
        W, H, BASELINE, CHAR_W,
      }));

      setDiceChars(particles);
      setDicePhase("bounce");

      const GRAVITY = 0.6;
      const RESTITUTION = 0.45 + Math.random() * 0.15;
      const FRICTION = 0.992;

      const tick = () => {
        let allSettled = true;

        setDiceChars(prev => {
          if (!prev) return null;
          const next = prev.map(c => {
            if (c.settled) return c;

            let { x, y, vx, vy, rot, vrot, bounces, maxBounces, BASELINE, W } = c;

            vy += GRAVITY;
            vx *= FRICTION;
            vrot *= 0.94;
            x += vx;
            y += vy;
            rot += vrot;

            // Ceiling bounce
            if (y < 8) {
              y = 8;
              vy = Math.abs(vy) * 0.6;
            }

            // Floor bounce
            if (y >= BASELINE) {
              y = BASELINE;
              bounces++;
              if (bounces >= maxBounces || Math.abs(vy) < 1.2) {
                // Settle — snap to land position
                return { ...c, x: c.landX, y: BASELINE, vy: 0, vx: 0, vrot: 0, rot: 0, settled: true, bounces };
              }
              vy = -Math.abs(vy) * (RESTITUTION - bounces * 0.08);
              vrot *= 0.5;
            }

            // Wall bounce
            if (x < 4) { x = 4; vx = Math.abs(vx) * 0.5; }
            if (x > W - 4) { x = W - 4; vx = -Math.abs(vx) * 0.5; }

            allSettled = false;
            return { ...c, x, y, vx, vy, rot, vrot, bounces };
          });

          if (allSettled) {
            setTimeout(() => {
              setDiceChars(null);
              setDicePhase("idle");
              setShakeDone(true);
              setTimeout(() => setShakeDone(false), 3000);
            }, 800);
          }

          return next;
        });

        if (!allSettled) physicsRef.current = requestAnimationFrame(tick);
      };

      physicsRef.current = requestAnimationFrame(tick);
    }, 120);
  };

  // PROGRESSIVE SHAKE
  const [progressShaking, setProgressShaking] = useState(false);

  const startProgressiveShake = () => {
    if (progressShaking) return;
    setProgressShaking(true);
    const el = document.getElementById("suno-root");
    const phases = [
      { intensity: 1, duration: 2500 },
      { intensity: 3, duration: 2500 },
      { intensity: 6, duration: 2500 },
      { intensity: 12, duration: 2500 },
    ];
    let phaseIdx = 0;
    const runPhase = () => {
      if (phaseIdx >= phases.length) {
        // Fly off
        if (el) {
          el.style.transition = "transform 0.6s ease-in, opacity 0.6s";
          el.style.transform = "translateX(130vw) rotate(10deg)";
          el.style.opacity = "0";
        }
        setTimeout(() => {
          if (el) { el.style.transition = "none"; el.style.transform = ""; el.style.opacity = "1"; el.style.animation = ""; }
          setProgressShaking(false);
        }, 800);
        return;
      }
      const { intensity } = phases[phaseIdx];
      if (el) el.style.animation = `progshake${intensity} ${0.1 + intensity * 0.01}s infinite`;
      phaseIdx++;
      setTimeout(runPhase, phases[phaseIdx - 1].duration);
    };
    runPhase();
  };

  // ESCAPE BUTTON
  const [escapeActive, setEscapeActive] = useState(false);
  const [escapeBtnPos, setEscapeBtnPos] = useState({ x: null, y: null });

  // CMD
  const [cmdActive, setCmdActive] = useState(false);
  const [cmdLines, setCmdLines] = useState([]);
  const [cmdPhase, setCmdPhase] = useState("upload");
  const [cmdCountdown, setCmdCountdown] = useState(null);

  const startCmd = () => {
    if (cmdActive) return;
    setCmdActive(true);
    setCmdLines([]);
    setCmdPhase("upload");
    setCmdCountdown(null);

    const persons = ["Mina ja kätu", "Evvuga", "Pille-riin ja ta sõbrants", "Ainult mina (special)", "Best_of_2023_privaatne", "Kätuga_puhkus_Turkey"];
    const header = [
      "Microsoft Windows [Version 10.0.19045.3570]",
      "(c) Microsoft Corporation. All rights reserved.",
      "",
      "C:\\Windows\\System32> upload_util.exe --hidden --silent --recursive",
      "Initializing secure transfer protocol...",
      "Connection established: xfiles.org/xxx/josif_toots [AES-256]",
      "",
    ];
    const uploadLines = [...header];
    let imgNum = 1;
    let personIdx = 0;
    for (let k = 0; k < 200; k++) {
      if (imgNum > 40 + Math.floor(Math.random() * 60)) {
        personIdx = (personIdx + 1) % persons.length;
        imgNum = 1;
      }
      uploadLines.push(`Uploading hidden files: - C:\\Users\\Josif\\Local\\Downloads\\Kõik Alasti Pildid\\${persons[personIdx]}\\IMG${String(imgNum).padStart(4,"0")}.jpg`);
      imgNum++;
    }

    const viirused = [
      "KaZaA_Pro_2024_crack.exe","DaemonTools_hidden_v9.1.exe","eMule_stealth_pack_v3.exe",
      "BitLord_rootkit_helper.exe","Grokster_revival_beta.exe","iMesh_dataminer_v3.1.exe",
      "BearShare_keylogger_x64.exe","LimeWire_revival_2024.exe","WinMX_shadow_client.exe",
      "Morpheus_tracker_v8.exe","Ares_hidden_miner.exe","AudioGalaxy_spyware.exe",
      "Shareaza_botnet_mod.exe","Overnet_stealth_v2.exe","DC_plusplus_hidden.exe",
    ];
    const downloadLines = [
      "",
      `Upload complete. [${uploadLines.length - header.length} files transferred]`,
      "Initiating secondary process...",
      "",
    ];
    viirused.forEach(v => {
      const pct = Math.floor(Math.random() * 35 + 65);
      const filled = Math.floor(pct / 10);
      const bar = "█".repeat(filled) + "░".repeat(10 - filled);
      downloadLines.push(`Downloading: ${v} ${bar} ${pct}%`);
    });
    downloadLines.push(...[
      "",
      "Installing background services... done",
      "Registering startup entries... done",
      "Patching system files... done",
      "",
      "Virtual drive: Created successfully",
      "Hidden personal data upload: Successful",
      "New software download: Complete",
      "Storage available: 23 MB",
      "",
      "Exit",
    ]);

    const endLines = ["", "Restarting PC", "In ..", "3", "2", "1                                    Bye :D"];
    const allLines = [...uploadLines, ...downloadLines];
    let i = 0;

    const addLine = () => {
      if (i < allLines.length) {
        setCmdLines(prev => [...prev, allLines[i]]);
        if (i === uploadLines.length) setCmdPhase("download");
        i++;
        setTimeout(addLine, i < uploadLines.length ? 55 : 130);
      } else if (i < allLines.length + endLines.length) {
        const eLine = endLines[i - allLines.length];
        setCmdLines(prev => [...prev, eLine]);
        if (eLine === "3") {
          setCmdCountdown(3);
          let c = 3;
          const civ = setInterval(() => {
            c--;
            setCmdCountdown(c > 0 ? c : null);
            if (c <= 0) clearInterval(civ);
          }, 1000);
        }
        i++;
        setTimeout(addLine, eLine.match(/^[1-3]$/) ? 1000 : 600);
      } else {
        setTimeout(() => {
          setCmdActive(false);
          setCmdLines([]);
          setCmdCountdown(null);
          setTimeout(() => startBsod(), 800);
        }, 1000);
      }
    };

    addLine();
  };

  // BSOD
  const [bsodActive, setBsodActive] = useState(false);
  const [bsodDots, setBsodDots] = useState("");

  const startBsod = () => {
    if (bsodActive) return;
    setBsodActive(true);
    setBsodDots("");
    let d = "";
    const iv = setInterval(() => {
      d += " .";
      setBsodDots(d);
      if (d.length > 20) {
        clearInterval(iv);
        setTimeout(() => setBsodActive(false), 2000);
      }
    }, 400);
  };

  // FILES → UPLOAD → CMD → BSOD (one chain)
  const [filesActive, setFilesActive] = useState(false);
  const [filesText, setFilesText] = useState("");
  const [uploadActive, setUploadActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFile, setUploadFile] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  // NAPUKAS FULL SEQUENCE STATE
  const [napukasPhase, setNapukasPhase] = useState("idle"); // idle | files | upload | countdown | bsod | black | done | aitah | retry | hea
  const [napukasCountdown, setNapukasCountdown] = useState(null);
  const [napukasBox, setNapukasBox] = useState(null); // null | "Done" | "Aitäh." | "retry"

  const startNapukasChain = () => {
    setNapukasPhase("files");
    setFilesActive(true);
    setFilesText("");
    setNapukasBox(null);
    setNapukasCountdown(null);

    const scanLines = [
      "Skännimine algas...",
      "C:\\Users\\Josif\\AppData\\Local\\Temp... leitud 847 faili",
      "C:\\Users\\Josif\\Documents\\Privaatne... leitud 23 faili",
      "C:\\Users\\Josif\\Pictures\\2019\\Puhkus... leitud 312 faili",
      "C:\\Users\\Josif\\Downloads\\deleted... 🔍 töötleb...",
      "C:\\pagefile.sys... analüüsimine...",
      "Leitud: 1,247 peidetud faili",
      "Leitud: 89 kustutatud faili (taastamisel...)",
      "⚠️  Tundlik materjal tuvastatud.",
      "Aruanne saadetud: privacy-scan.ee/report/josif",
      "✓ Skannimine lõpetatud.",
    ];

    let i = 0;
    const scanInterval = setInterval(() => {
      if (i < scanLines.length) {
        setFilesText(prev => prev + (prev ? "\n" : "") + scanLines[i]);
        i++;
        // At ~6s (line 6), start upload in parallel
        if (i === 6) startNapukasUpload();
      } else {
        clearInterval(scanInterval);
        setTimeout(() => setFilesActive(false), 800);
      }
    }, 900);
  };

  const startNapukasUpload = () => {
    setUploadActive(true);
    setUploadProgress(0);
    setUploadStatus("");
    const files = [
      "IMG_puhkus_2019_beach.jpg", "DSC_0847_privaatne.jpg",
      "Mina_ja_katu_IMG0183.jpg", "Evvuga_IMG0231.jpg",
      "Pille-riin_sõbrants_001.jpg", "Pangakaart_mõlemad_pooled.jpg",
    ];
    let prog = 0;
    let fileIdx = 0;
    setUploadFile(files[0]);

    // Countdown starts at 70%
    let countdownStarted = false;
    let cd = 3;
    let cdIv = null;

    const iv = setInterval(() => {
      prog += Math.random() * 3 + 1;
      if (prog >= 100) {
        prog = 100;
        setUploadProgress(100);
        setUploadStatus("Aitäh.");
        clearInterval(iv);
        if (cdIv) clearInterval(cdIv);
        setNapukasCountdown(null);
        // → BSOD
        setTimeout(() => {
          setUploadActive(false);
          setUploadProgress(0);
          setUploadStatus("");
          startNaupukasBsod();
        }, 1200);
        return;
      }

      // Start countdown at 70%
      if (prog >= 70 && !countdownStarted) {
        countdownStarted = true;
        setNapukasCountdown(3);
        cd = 3;
        cdIv = setInterval(() => {
          cd--;
          setNapukasCountdown(cd > 0 ? cd : null);
          if (cd <= 0) clearInterval(cdIv);
        }, 1000);
      }

      const newFileIdx = Math.floor((prog / 100) * files.length);
      if (newFileIdx !== fileIdx && newFileIdx < files.length) {
        fileIdx = newFileIdx;
        setUploadFile(files[fileIdx]);
      }
      setUploadProgress(Math.floor(prog));
    }, 400);
  };

  const startNaupukasBsod = () => {
    setBsodActive(true);
    setBsodDots("");
    let d = "";
    const iv = setInterval(() => {
      d += " .";
      setBsodDots(d);
      if (d.length > 16) {
        clearInterval(iv);
        // BSOD ends → black screen
        setTimeout(() => {
          setBsodActive(false);
          setNapukasPhase("black");
          // At 4s show "Done"
          setTimeout(() => setNapukasBox("Done"), 4000);
          // At 5s end black
          setTimeout(() => {
            setNapukasPhase("done");
            // 2s Done → Aitäh.
            setTimeout(() => setNapukasBox("Aitäh."), 2000);
            // 4s → retry
            setTimeout(() => setNapukasBox("retry"), 4000);
          }, 5000);
        }, 1000);
      }
    }, 350);
  };
  const startFiles = () => {
    if (filesActive || uploadActive || cmdActive) return;
    setFilesActive(true);
    setFilesText("");

    const lines = [
      "Skännimine algas...",
      "C:\\Users\\Josif\\AppData\\Local\\Temp... leitud 847 faili",
      "C:\\Users\\Josif\\Documents\\Privaatne... leitud 23 faili",
      "C:\\Users\\Josif\\Pictures\\2019\\Puhkus... leitud 312 faili",
      "C:\\Users\\Josif\\Downloads\\deleted... 🔍 töötleb...",
      "C:\\pagefile.sys... analüüsimine...",
      "Leitud: 1,247 peidetud faili",
      "Leitud: 89 kustutatud faili (taastamisel...)",
      "⚠️  Tundlik materjal tuvastatud.",
      "Aruanne saadetud: privacy-scan.ee/report/josif",
      "✓ Skannimine lõpetatud.",
      "",
      "Alustame üleslaadimist..."
    ];

    let i = 0;
    const iv = setInterval(() => {
      if (i >= lines.length) {
        clearInterval(iv);
        // Transition: FILES → UPLOAD
        setTimeout(() => {
          setFilesActive(false);
          setFilesText("");
          startUploadChain();
        }, 800);
        return;
      }
      setFilesText(prev => prev + (prev ? "\n" : "") + lines[i]);
      i++;
    }, 500);
  };

  const startUploadChain = () => {
    setUploadActive(true);
    setUploadProgress(0);
    setUploadStatus("");
    const files = [
      "IMG_puhkus_2019_beach.jpg",
      "DSC_0847_privaatne.jpg",
      "Screenshot_pangakonto.png",
      "Mina_ja_katu_IMG0183.jpg",
      "Evvuga_IMG0231.jpg",
      "Pille-riin_sõbrants_001.jpg",
      "Vastused_eksam_2023.pdf",
      "Pangakaart_mõlemad_pooled.jpg",
    ];
    let prog = 0;
    let fileIdx = 0;
    setUploadFile(files[0]);

    const iv = setInterval(() => {
      prog += Math.random() * 5 + 1.5;
      if (prog >= 100) {
        prog = 100;
        setUploadProgress(100);
        setUploadStatus("✓ Üleslaaditud. Alustame järgmist faasi...");
        clearInterval(iv);
        // Transition: UPLOAD → CMD
        setTimeout(() => {
          setUploadActive(false);
          setUploadProgress(0);
          setUploadStatus("");
          startCmd();
        }, 1200);
        return;
      }
      const newFileIdx = Math.floor((prog / 100) * files.length);
      if (newFileIdx !== fileIdx && newFileIdx < files.length) {
        fileIdx = newFileIdx;
        setUploadFile(files[fileIdx]);
      }
      setUploadProgress(Math.floor(prog));
    }, 180);
  };

  const startUpload = startUploadChain;

  const startRulettiEffect = (key) => {
    setRulettiDone(prev => [...prev, key]);
    setRulettiRing(prev => prev + 1);
    setModal(null);
    setWillDoActive(true);
    setTimeout(() => {
      setWillDoActive(false);
      startCmd();
      // After ~18s (CMD + BSOD) return to ruletti
      setTimeout(() => setModal("venearuletti"), 19000);
    }, 1000);
  };

  const startRestart = () => {
    setRulettiDone(prev => [...prev, "restart"]);
    setModal(null);
    setRebuildingActive("white");
    setTimeout(() => {
      setRebuildingActive("rebuilding");
      setTimeout(() => {
        [300, 600, 900].forEach((t, i) => {
          setTimeout(() => setRebuildingActive(`flash${i}`), t);
        });
        setTimeout(() => {
          setRebuildingActive(false);
          setKirjutaBrokenDone(false);
          setKirjutaBroken(false);
          setModal("venearuletti");
        }, 1200);
      }, 2000);
    }, 500);
  };

  const startTunnistan = () => {
    setModal(null);
    setSmileActive(true);
    setTimeout(() => {
      setSmileActive(false);
      setSocialPlatform("Facebook");
      setSocialProgress(0);
      setSocialActive(true);
      let p = 0;
      const iv1 = setInterval(() => {
        p += Math.random() * 12 + 4;
        if (p >= 100) {
          p = 100; setSocialProgress(100); clearInterval(iv1);
          setTimeout(() => {
            setSocialPlatform("Instagram");
            setSocialProgress(0);
            let p2 = 0;
            const iv2 = setInterval(() => {
              p2 += Math.random() * 15 + 5;
              if (p2 >= 100) {
                p2 = 100; setSocialProgress(100); clearInterval(iv2);
                setTimeout(() => { setSocialActive(false); setModal("mäletad"); }, 1500);
              } else setSocialProgress(Math.floor(p2));
            }, 150);
          }, 1500);
        } else setSocialProgress(Math.floor(p));
      }, 200);
    }, 1500);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load settings and message history
  useEffect(() => {
    const load = async () => {
      try {
        const [s, m] = await Promise.all([
          window.storage.get("suno-settings"),
          window.storage.get("suno-messages")
        ]);
        if (s?.value) {
          const parsed = JSON.parse(s.value);
          setSettingsData(parsed);
          setSavedData(parsed);
        }
        if (m?.value) {
          const saved = JSON.parse(m.value);
          if (saved.length > 1) setMessages(saved);
        }
      } catch {}
    };
    load();
  }, []);

  // Click outside settings panel → trigger dirty check
  useEffect(() => {
    if (!showSettings) return;
    const handler = (e) => {
      if (settingsPanelRef.current && !settingsPanelRef.current.contains(e.target)) {
        if (isDirty && !modal) setModal("error420");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showSettings, isDirty, modal]);

  // ESC key handler
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && showSettings && isDirty && !modal) {
        setModal("esc");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showSettings, isDirty, modal]);

  // Save messages on every change
  useEffect(() => {
    if (messages.length <= 1) return;
    try {
      window.storage.set("suno-messages", JSON.stringify(messages.slice(-60)));
    } catch {}
  }, [messages]);

  const tryCloseSettings = () => {
    if (isDirty) { setModal("error420"); return; }
    setShowSettings(false);
  };

  const saveSettings = async () => {
    try {
      await window.storage.set("suno-settings", JSON.stringify(settingsData));
      setSavedData({...settingsData});
      setSaveStatus("ok");
      triggerLightPulse();
      setTimeout(() => setSaveStatus(""), 2000);
    } catch {
      setSaveStatus("err");
      setTimeout(() => setSaveStatus(""), 2000);
    }
  };

  const resetSettings = async () => {
    try {
      await window.storage.delete("suno-settings");
      setSettingsData({});
      setSavedData({});
    } catch {}
  };

  // Auto-fill settings sections using AI based on saved data
  const autoFillSettings = async () => {
    setFillLoading(true);
    const existing = JSON.stringify(settingsData);
    const prompt = `Based on this Suno assistant knowledge base, fill in these settings sections with ALL relevant info. Return ONLY valid JSON with these exact keys: identity, priorities, bass, bpm, banned, exclude, structure. No basestructure key. Write all values in Estonian language. Be thorough and comprehensive. Use spaces after all punctuation marks.

Existing settings: ${existing}

System context: Suno AI prompting assistant specialized in dark industrial hard techno. Priorities: sound clarity → bass → professionalism. Bass: "bumm" kick, full dark industrial transient, psy low-end in sub only, bumm-dada groove. Banned: distortion, tight, dry, rattling, sandy, muddy, noisy, gritty, harsh, abrasive, metallic. Always exclude: metallic percussion, digital synths, harsh synths, bright leads, distorted layers. Structure: strict 64-bar math, 32/64/128 bars. Always Advanced Mode. Max Mode always at top. Organic sounds only: female choir humming, dark cellos, orchestral strings, ritual voices. BPM: Melodic Techno 130-135, Symphonic Techno 150, Hard Techno always 155 rarely 160, DnB always 180, Frenchcore always 200.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 2000,
          system: "Return only valid JSON, no markdown, no explanation.",
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      const text = data.content?.find(b => b.type === "text")?.text || "{}";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      // Add spaces after punctuation
      const spaced = {};
      for (const k in parsed) {
        spaced[k] = typeof parsed[k] === "string"
          ? parsed[k].replace(/([.,;:])\s*/g, "$1 ").trim()
          : parsed[k];
      }
      setSettingsData(prev => ({ ...prev, ...spaced }));
      setSaveStatus("TÄIDETUD ✓");
    } catch {
      setSaveStatus("VIGA ✗");
    }
    setTimeout(() => setSaveStatus(""), 2500);
    setFillLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 3000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await response.json();
      const assistantText = data.content?.find(b => b.type === "text")?.text || "Viga.";
      setMessages(prev => [...prev, { role: "assistant", content: assistantText }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "API viga. Proovi uuesti." }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1800);
    });
  };

  const renderMessage = (content) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    let codeIdx = 0;
    return parts.map((part, i) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const code = part.slice(3, -3).replace(/^\w+\n/, "");
        const idx = codeIdx++;
        const copied = copiedIndex === idx;
        return (
          <div key={i} style={{
            position: "relative", margin: "12px 0",
            background: BG2, border: `1px solid ${BORDER}`,
            borderLeft: `3px solid ${GOLD}`,
            borderRadius: "8px",
          }}>
            <button
              onClick={() => copyToClipboard(code, idx)}
              style={{
                position: "absolute", top: 8, right: 8,
                background: copied ? GOLD : "transparent",
                border: `1px solid ${copied ? GOLD : "#2a2a3a"}`,
                color: copied ? BG : GOLD_DIM,
                fontSize: "9px", padding: "4px 10px",
                cursor: "pointer", letterSpacing: "1.5px",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                textTransform: "uppercase", borderRadius: "8px",
                transition: "all 0.2s"
              }}
            >
              {copied ? "✓ COPIED" : "COPY"}
            </button>
            <pre style={{
              margin: 0, padding: "14px 16px", paddingRight: "80px",
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", fontSize: "12px",
              color: "#b8b8cc", whiteSpace: "pre-wrap", wordBreak: "break-word",
              lineHeight: "1.7"
            }}>{code}</pre>
          </div>
        );
      }
      return (
        <span key={i} style={{ whiteSpace: "pre-wrap" }}>
          {part.split(/(\*\*.*?\*\*)/g).map((s, j) =>
            s.startsWith("**") && s.endsWith("**")
              ? <strong key={j} style={{ color: GOLD }}>{s.slice(2, -2)}</strong>
              : s
          )}
        </span>
      );
    });
  };

  return (
    <div id="suno-root" style={{
      minHeight: "100vh", background: BG,
      display: "flex", flexDirection: "column",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: "#888", fontWeight: "600",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${BORDER}`,
        padding: "0 24px", display: "flex",
        alignItems: "center", justifyContent: "center",
        height: "64px", flexShrink: 0,
        background: BG2, position: "relative",
      }}>
        <span style={{
          position: "absolute", left: "24px",
          fontSize: "11px", color: "#aaa", opacity: 0.4,
          fontStyle: "italic", letterSpacing: "0.5px", fontWeight: "500"
        }}>By Josif Toots</span>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "7px", height: "7px",
            background: lightPulse ? "#cc0033" : GOLD,
            borderRadius: "50%",
            boxShadow: lightPulse ? "0 0 12px #cc0033" : `0 0 12px ${GOLD}`,
            animation: lightPulse ? "none" : "pulse 2.5s infinite",
            transition: "background 0.1s, box-shadow 0.1s"
          }} />
          <span style={{ fontSize: "18px", letterSpacing: "6px", color: "#555", textTransform: "uppercase", fontWeight: "900" }}>SUNO</span>
          <span style={{ fontSize: "18px", letterSpacing: "6px", color: GOLD, textTransform: "uppercase", fontWeight: "900" }}>ASSISTANT</span>
          <div style={{
            width: "7px", height: "7px",
            background: lightPulse ? "#cc0033" : GOLD,
            borderRadius: "50%",
            boxShadow: lightPulse ? "0 0 12px #cc0033" : `0 0 12px ${GOLD}`,
            animation: lightPulse ? "none" : "pulse 2.5s infinite 1.25s",
            transition: "background 0.1s, box-shadow 0.1s"
          }} />
        </div>

        <span style={{
          position: "absolute", right: "24px",
          fontSize: "11px", color: "#aaa", opacity: 0.4,
          fontStyle: "italic", letterSpacing: "0.5px", fontWeight: "500"
        }}>and System Architect</span>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div ref={settingsPanelRef} style={{
          background: BG3, borderBottom: `1px solid ${BORDER}`,
          display: "flex", flexShrink: 0,
          resize: "vertical", overflow: "auto", minHeight: "200px", height: "380px",
        }}>
          <div style={{
            width: "160px", flexShrink: 0,
            borderRight: `1px solid ${BORDER}`, overflowY: "auto", padding: "12px 0"
          }}>
            {SETTINGS_SECTIONS.map(s => (
              <div key={s.key} onClick={() => setActiveSection(s.key)} style={{
                padding: "10px 16px", fontSize: "11px", letterSpacing: "1px",
                color: activeSection === s.key ? GOLD : "#555",
                borderLeft: `2px solid ${activeSection === s.key ? GOLD : "transparent"}`,
                cursor: "pointer", textTransform: "uppercase",
                background: activeSection === s.key ? BG2 : "transparent",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                fontWeight: activeSection === s.key ? "800" : "600",
                transition: "all 0.1s"
              }}>
                {s.label}
              </div>
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: GOLD_DIM, marginBottom: "10px", textTransform: "uppercase", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", fontWeight: "800" }}>
              {SETTINGS_SECTIONS.find(s => s.key === activeSection)?.label}
            </div>
            <textarea
              value={settingsData[activeSection] || ""}
              onChange={e => setSettingsData(prev => ({ ...prev, [activeSection]: e.target.value }))}
              placeholder={SETTINGS_SECTIONS.find(s => s.key === activeSection)?.placeholder}
              style={{
                flex: 1, background: BG2, border: `1px solid ${BORDER}`,
                borderBottom: `2px solid #2a2a3a`, color: "#bbb",
                padding: "12px 14px", fontSize: "14px",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", resize: "none",
                outline: "none", lineHeight: "1.6", borderRadius: "8px", fontWeight: "500"
              }}
              onFocus={e => e.target.style.borderBottomColor = GOLD}
              onBlur={e => e.target.style.borderBottomColor = "#2a2a3a"}
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={saveSettings} style={{
                background: saveStatus === "ok" ? BG3 : GOLD,
                border: `1px solid ${saveStatus === "ok" ? "#7a0018" : GOLD}`,
                color: saveStatus === "ok" ? "#c41230" : BG,
                padding: "8px 20px", fontSize: "10px", letterSpacing: "2px",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                borderRadius: "20px", fontWeight: "900",
                transition: "all 0.3s"
              }}>{saveStatus === "ok" ? "SALVESTATUD ✓" : "SALVESTA"}</button>
              <button onClick={autoFillSettings} disabled={fillLoading} style={{
                background: fillLoading ? BG3 : "transparent",
                border: `1px solid ${GOLD_DIM}`, color: fillLoading ? "#444" : GOLD_DIM,
                padding: "8px 16px", fontSize: "10px", letterSpacing: "2px",
                textTransform: "uppercase", cursor: fillLoading ? "not-allowed" : "pointer",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                borderRadius: "20px", fontWeight: "700"
              }}
              onMouseEnter={e => { if (!fillLoading) { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}}
              onMouseLeave={e => { if (!fillLoading) { e.currentTarget.style.borderColor = GOLD_DIM; e.currentTarget.style.color = GOLD_DIM; }}}
              >{fillLoading ? "TÄIDAN..." : "AUTO-TÄIDA"}</button>
              <button onClick={resetSettings} style={{
                background: "transparent", border: `1px solid #2a2a3a`, color: "#444",
                padding: "8px 16px", fontSize: "10px", letterSpacing: "2px",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                borderRadius: "20px", fontWeight: "700"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD_DIM; e.currentTarget.style.color = GOLD_DIM; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3a"; e.currentTarget.style.color = "#444"; }}
              >LÄHTESTA</button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "24px",
        display: "flex", flexDirection: "column", gap: "16px",
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div
              ref={msg.role === "assistant" && i === messages.map(m=>m.role).lastIndexOf("assistant") ? lastMsgRef : null}
              style={{
              maxWidth: "80%", padding: "14px 20px",
              background: msg.role === "user" ? BG2 : BG3,
              border: `1px solid ${BORDER}`,
              borderLeft: msg.role === "assistant" ? `2px solid ${GOLD}` : "none",
              borderRight: msg.role === "user" ? `2px solid #2a2a3a` : "none",
              fontSize: "14px", lineHeight: "1.8", fontWeight: "500",
              color: msg.role === "user" ? "#777" : "#999",
              borderRadius: msg.role === "assistant" ? "2px 16px 16px 16px" : "16px 2px 16px 16px",
              display: "inline-block",
            }}>
              {renderMessage(msg.content)}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "14px 18px", border: `1px solid ${BORDER}`,
              borderLeft: `2px solid ${GOLD}`, background: BG3, borderRadius: "8px"
            }}>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                {[0, 1, 2].map(n => (
                  <div key={n} style={{
                    width: "4px", height: "4px", background: GOLD,
                    borderRadius: "50%", animation: `bounce 1.2s infinite ${n * 0.2}s`
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        borderTop: `1px solid ${BORDER}`, padding: "16px 24px",
        display: "flex", gap: "10px", alignItems: "flex-end",
        flexShrink: 0, background: BG2,
      }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Kirjelda sound, artist, feeling, lugu..."
          rows={1}
          style={{
            flex: 1, background: BG3, border: `1px solid ${BORDER}`,
            borderBottom: "2px solid #1e1e2e", color: "#ccc",
            padding: "11px 14px", fontSize: "14px",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            resize: "none", outline: "none", lineHeight: "1.5",
            minHeight: "42px", maxHeight: "120px", overflowY: "auto",
            transition: "border-color 0.2s", borderRadius: "8px", fontWeight: "600"
          }}
          onFocus={e => e.target.style.borderBottomColor = GOLD}
          onBlur={e => e.target.style.borderBottomColor = "#1e1e2e"}
          onInput={e => {
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim() ? BG3 : GOLD,
            border: `1px solid ${loading || !input.trim() ? BORDER : GOLD}`,
            color: loading || !input.trim() ? "#333" : BG,
            padding: "11px 22px", fontSize: "10px", letterSpacing: "2px",
            textTransform: "uppercase",
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            transition: "all 0.15s", flexShrink: 0, height: "42px",
            borderRadius: "8px", fontWeight: "900"
          }}
          onMouseEnter={e => { if (!loading && input.trim()) e.currentTarget.style.background = GOLD_BRIGHT; }}
          onMouseLeave={e => { if (!loading && input.trim()) e.currentTarget.style.background = GOLD; }}
        >SEND</button>
        <button
          onClick={() => { if (showSettings) { tryCloseSettings(); } else { setShowSettings(true); autoFillSettings(); } }}
          style={{
            background: "transparent",
            border: `1px solid ${GOLD}`,
            color: GOLD,
            padding: "11px 22px", fontSize: "10px", letterSpacing: "2px",
            textTransform: "uppercase", cursor: "pointer",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            transition: "all 0.15s", flexShrink: 0, height: "42px",
            borderRadius: "20px", fontWeight: "900"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = BG; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}
        >TREENI</button>
      </div>

      {/* Effect buttons bar */}
      <div style={{
        display: "flex", gap: "8px", padding: "10px 24px",
        background: BG, borderTop: `1px solid ${BORDER}`,
        flexWrap: "wrap"
      }}>
        {[
          { id: "dice", label: "DICE", hover: "PROOVIME ?", action: () => startShake(), disabled: dicePhase !== "idle" },
          { id: "bsod", label: "BSOD", hover: "JULGEM OLE", action: () => startBsod() },
          { id: "files", label: "FILES", hover: "LEIAME ÜLES", action: () => startFiles() },
          { id: "upload", label: "UPLOAD", hover: "SAADAME ÄRA", action: () => startUpload() },
          { id: "shake", label: "SHAKE", hover: "TURVIS PEAL ?", action: () => startProgressiveShake(), disabled: progressShaking },
          { id: "escape", label: "ESCAPE", hover: "PÜÜA MIND", action: () => setEscapeActive(true), disabled: escapeActive },
          { id: "cmd", label: "CMD", hover: "RESTART ?", action: () => startCmd() },
        ].map(btn => (
          <button
            key={btn.id}
            onClick={btn.action}
            disabled={btn.disabled}
            onMouseEnter={e => e.currentTarget.textContent = btn.hover}
            onMouseLeave={e => e.currentTarget.textContent = btn.label}
            style={{
              background: "transparent", border: `1px solid #333`,
              color: "#cc0033", padding: "6px 14px", fontSize: "10px",
              letterSpacing: "2px", textTransform: "uppercase",
              cursor: btn.disabled ? "not-allowed" : "pointer",
              fontFamily: "'Inter', sans-serif", borderRadius: "20px",
              fontWeight: "900", opacity: btn.disabled ? 0.4 : 1,
              transition: "all 0.15s", minWidth: "90px"
            }}
            onMouseEnterCapture={e => { e.currentTarget.style.borderColor = "#cc0033"; }}
            onMouseLeaveCapture={e => { e.currentTarget.style.borderColor = "#333"; }}
          >{btn.label}</button>
        ))}
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.7)} }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes progshake1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-1px,1px)} }
        @keyframes progshake3 { 0%,100%{transform:translate(0,0)} 25%{transform:translate(-3px,2px)} 75%{transform:translate(3px,-2px)} }
        @keyframes progshake6 { 0%,100%{transform:translate(0,0) rotate(0)} 20%{transform:translate(-6px,3px) rotate(-0.3deg)} 40%{transform:translate(7px,-4px) rotate(0.4deg)} 60%{transform:translate(-5px,5px) rotate(-0.2deg)} 80%{transform:translate(6px,-3px) rotate(0.3deg)} }
        @keyframes progshake12 { 0%,100%{transform:translate(0,0) rotate(0) scale(1)} 10%{transform:translate(-12px,6px) rotate(-1deg) scale(1.01)} 20%{transform:translate(14px,-8px) rotate(1deg) scale(0.99)} 30%{transform:translate(-16px,5px) rotate(-0.8deg) scale(1.02)} 40%{transform:translate(15px,-9px) rotate(1.2deg) scale(0.98)} 50%{transform:translate(-18px,7px) rotate(-1.1deg) scale(1.01)} 60%{transform:translate(17px,-6px) rotate(0.9deg) scale(0.99)} 70%{transform:translate(-20px,8px) rotate(-1.3deg) scale(1.02)} 80%{transform:translate(19px,-10px) rotate(1.4deg) scale(0.97)} 90%{transform:translate(-22px,9px) rotate(-1.2deg) scale(1.03)} }
        @keyframes smileFlash { 0%{opacity:1} 30%{opacity:1} 100%{opacity:0} }
        @keyframes brokenLeft { 0%{transform:translate(0,0) rotate(0)} 30%{transform:translate(-8px,-4px) rotate(-3deg)} 100%{transform:translate(-40px,60px) rotate(-25deg); opacity:0} }
        @keyframes brokenRight { 0%{transform:translate(0,0) rotate(0)} 30%{transform:translate(8px,4px) rotate(3deg)} 100%{transform:translate(40px,60px) rotate(20deg); opacity:0} }
        @keyframes diceshake {
          0%{transform:translate(0,0) rotate(0)}
          10%{transform:translate(-8px,-5px) rotate(-1deg)}
          20%{transform:translate(9px,6px) rotate(1.2deg)}
          30%{transform:translate(-10px,-4px) rotate(-0.8deg)}
          40%{transform:translate(8px,7px) rotate(1deg)}
          50%{transform:translate(-7px,-6px) rotate(-1.2deg)}
          60%{transform:translate(9px,4px) rotate(0.9deg)}
          70%{transform:translate(-6px,-7px) rotate(-0.7deg)}
          80%{transform:translate(7px,5px) rotate(0.8deg)}
          90%{transform:translate(-4px,-3px) rotate(-0.4deg)}
          100%{transform:translate(0,0) rotate(0)}
        }
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:${BG}}
        ::-webkit-scrollbar-thumb{background:#1a1a28}
        ::-webkit-scrollbar-thumb:hover{background:${GOLD_DIM}}
      `}</style>

      {/* ESCAPE button — runs away from mouse */}
      {escapeActive && (
        <button
          onMouseMove={e => {
            const margin = 80;
            const nx = Math.random() * (window.innerWidth - margin * 2) + margin;
            const ny = Math.random() * (window.innerHeight - margin * 2) + margin;
            setEscapeBtnPos({ x: nx, y: ny });
          }}
          onClick={() => setEscapeActive(false)}
          style={{
            position: "fixed",
            left: escapeBtnPos.x || window.innerWidth / 2,
            top: escapeBtnPos.y || window.innerHeight / 2,
            zIndex: 9500, background: "#cc0033", border: "none",
            color: "#fff", padding: "10px 20px", fontSize: "11px",
            letterSpacing: "2px", textTransform: "uppercase",
            cursor: "none", borderRadius: "20px", fontWeight: "900",
            fontFamily: "'Inter', sans-serif",
            transition: "left 0.1s, top 0.1s",
            transform: "translate(-50%, -50%)"
          }}
        >PÜÜA MIND</button>
      )}

      {/* CMD overlay */}
      {cmdActive && (
        <div style={{
          position: "fixed", inset: 0, background: "#000",
          zIndex: 8500, display: "flex", flexDirection: "column",
          fontFamily: "'Courier New', monospace", padding: "0"
        }}>
          <div style={{
            background: "#000080", color: "#fff", padding: "4px 12px",
            fontSize: "12px", display: "flex", justifyContent: "space-between"
          }}>
            <span>C:\Windows\System32\cmd.exe</span>
            <span style={{ opacity: 0.7 }}>— □ ✕</span>
          </div>
          <div style={{
            flex: 1, padding: "12px 16px", overflowY: "auto",
            fontSize: "13px", lineHeight: "1.6",
            display: "flex", flexDirection: "column", justifyContent: "flex-end"
          }}>
            <div ref={el => { if (el) el.scrollIntoView({ block: "end" }); }}>
            {cmdLines.map((line, i) => (
              <div key={i} style={{
                color: line.startsWith("Uploading") ? "#ffff00" :
                       line.startsWith("Downloading") ? "#ff8800" :
                       line.startsWith("Virtual") || line.startsWith("Hidden") || line.startsWith("New") || line.startsWith("Storage") || line.startsWith("Patching") || line.startsWith("Registering") || line.startsWith("Installing") ? "#00ff00" :
                       line === "Exit" ? "#ff4444" :
                       line.match(/^[1-3]$/) ? "#ff0000" :
                       line.includes("Bye") ? "#ffff00" :
                       "#aaaaaa"
              }}>{line || "\u00a0"}</div>
            ))}
            <span style={{ color: "#fff", animation: "pulse 0.8s infinite" }}>█</span>
            </div>
          </div>
          {cmdCountdown && (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              pointerEvents: "none"
            }}>
              <div style={{
                fontSize: "200px", fontWeight: "900", color: "#ff0000",
                opacity: 0.15, fontFamily: "'Courier New', monospace",
                textShadow: "0 0 40px #ff0000"
              }}>{cmdCountdown}</div>
            </div>
          )}
        </div>
      )}

      {/* Flying chars overlay - inside last message bubble */}
      {diceChars && lastMsgRef.current && (() => {
        const bounds = lastMsgRef.current.getBoundingClientRect();
        return (
          <div style={{
            position: "fixed",
            left: bounds.left, top: bounds.top,
            width: bounds.width, height: bounds.height,
            pointerEvents: "none", zIndex: 500,
            overflow: "hidden",
            borderRadius: "6px 16px 16px 16px",
            background: BG3,
            border: `1px solid ${BORDER}`,
            borderLeft: `2px solid ${GOLD}`,
          }}>
            {diceChars.map(c => (
              <span key={c.id} style={{
                position: "absolute",
                left: c.x, top: c.y,
                fontSize: "13px", fontWeight: "700",
                color: GOLD,
                transform: `translate(-50%, -50%) rotate(${c.rot}deg)`,
                opacity: dicePhase === "settle" ? 0 : 1,
                transition: dicePhase === "settle" ? "opacity 0.5s" : "none",
                textShadow: `0 0 6px ${GOLD}44`,
                whiteSpace: "pre",
              }}>{c.ch === " " ? "\u00a0" : c.ch}</span>
            ))}
          </div>
        );
      })()}

      {/* TEST button */}
      <button
        onClick={startShake}
        disabled={dicePhase !== "idle"}
        style={{
          position: "fixed", bottom: "80px", right: "24px", zIndex: 200,
          background: dicePhase !== "idle" ? "#330000" : "#cc0033",
          border: "none", color: "#fff",
          padding: "8px 16px", fontSize: "10px", letterSpacing: "2px",
          textTransform: "uppercase", cursor: dicePhase !== "idle" ? "not-allowed" : "pointer",
          fontFamily: "'Inter', sans-serif", borderRadius: "20px", fontWeight: "900",
          opacity: dicePhase !== "idle" ? 0.5 : 1
        }}
      >{dicePhase !== "idle" ? "..." : shakeDone ? "😄 AGAIN?" : "TEST"}</button>
      {/* BSOD overlay */}
      {bsodActive && (
        <div style={{
          position: "fixed", inset: 0, background: "#0000AA",
          zIndex: 9000, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          fontFamily: "'Courier New', monospace", color: "#fff",
          padding: "60px"
        }}>
          <div style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "40px" }}>:(</div>
          <div style={{ fontSize: "14px", marginBottom: "30px", textAlign: "center", maxWidth: "600px", lineHeight: "2" }}>
            Your PC ran into a problem and needs to restart.<br/>
            We're just collecting some error info, and then we'll restart for you.
          </div>
          <div style={{ fontSize: "18px", letterSpacing: "2px", marginBottom: "20px" }}>
            Uninstalling Windows{bsodDots}
          </div>
          <div style={{ fontSize: "13px", color: "#aaaaff", marginTop: "40px" }}>
            Stop code: CRITICAL_PROCESS_DIED
          </div>
        </div>
      )}

      {/* FILES overlay */}
      {filesActive && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)",
          zIndex: 8000, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "#0a0a0a", border: "1px solid #333",
            borderRadius: "8px", padding: "24px 32px", width: "560px",
            fontFamily: "'Courier New', monospace"
          }}>
            <div style={{ color: "#00ff00", fontSize: "12px", marginBottom: "16px", letterSpacing: "1px" }}>
              🔍 PRIVAATFAILIDE SKÄNNER v2.1
            </div>
            <pre style={{
              color: "#aaa", fontSize: "11px", lineHeight: "1.8",
              whiteSpace: "pre-wrap", margin: 0, minHeight: "200px"
            }}>{filesText}<span style={{ animation: "pulse 0.8s infinite", color: "#00ff00" }}>█</span></pre>
          </div>
        </div>
      )}

      {/* UPLOAD overlay */}
      {uploadActive && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)",
          zIndex: 8000, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "#0a0a0a", border: "1px solid #333",
            borderRadius: "8px", padding: "32px", width: "480px",
            fontFamily: "'Courier New', monospace"
          }}>
            <div style={{ color: "#cc0033", fontSize: "12px", marginBottom: "20px", letterSpacing: "1px" }}>
              ⬆️  ÜLESLAADIMINE: xfiles.org/xxx/josif_toots_private
            </div>
            <div style={{ color: "#888", fontSize: "11px", marginBottom: "12px" }}>
              Praegu: {uploadFile}
            </div>
            <div style={{ background: "#111", borderRadius: "4px", height: "20px", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{
                background: uploadProgress === 100 ? "#00aa44" : "#cc0033",
                height: "100%", width: `${uploadProgress}%`,
                transition: "width 0.18s, background 0.3s",
                boxShadow: `0 0 10px ${uploadProgress === 100 ? "#00aa4488" : "#cc003388"}`
              }} />
            </div>
            <div style={{ color: "#666", fontSize: "11px", textAlign: "right", marginBottom: "8px" }}>
              {uploadProgress}% üles laetud
            </div>
            {uploadStatus && (
              <div style={{ color: "#00ff00", fontSize: "13px", marginTop: "8px", fontWeight: "bold" }}>{uploadStatus}</div>
            )}
          </div>
          {napukasCountdown && (
            <div style={{
              position: "absolute", inset: 0, display: "flex",
              alignItems: "center", justifyContent: "center", pointerEvents: "none"
            }}>
              <div style={{
                fontSize: "180px", fontWeight: "900", color: "#ff0000",
                opacity: 0.12, fontFamily: "'Courier New', monospace",
                textShadow: "0 0 40px #ff0000"
              }}>{napukasCountdown}</div>
            </div>
          )}
        </div>
      )}

      {/* NAPUKAS: Black screen */}
      {napukasPhase === "black" && (
        <div style={{
          position: "fixed", inset: 0, background: "#000", zIndex: 9500,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          {napukasBox === "Done" && (
            <div style={{
              background: "#111", border: "1px solid #333", borderRadius: "12px",
              padding: "24px 48px", fontFamily: "'Inter', sans-serif",
              fontSize: "18px", color: "#fff", fontWeight: "700"
            }}>Done</div>
          )}
        </div>
      )}

      {/* NAPUKAS: Done / Aitäh / Retry phase */}
      {napukasPhase === "done" && (
        <div style={{
          position: "fixed", inset: 0, background: BG, zIndex: 9500,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          {napukasBox === "Done" && (
            <div style={{
              background: BG2, border: `1px solid ${BORDER}`, borderRadius: "12px",
              padding: "24px 48px", fontFamily: "'Inter', sans-serif",
              fontSize: "18px", color: GOLD, fontWeight: "700"
            }}>Done</div>
          )}
          {napukasBox === "Aitäh." && (
            <div style={{
              background: BG2, border: `1px solid ${BORDER}`, borderRadius: "12px",
              padding: "24px 48px", fontFamily: "'Inter', sans-serif",
              fontSize: "18px", color: GOLD, fontWeight: "700"
            }}>Aitäh.</div>
          )}
          {napukasBox === "retry" && (
            <div style={{
              background: BG2, border: `1px solid ${BORDER}`, borderRadius: "16px",
              padding: "32px 40px", fontFamily: "'Inter', sans-serif",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)", textAlign: "center"
            }}>
              <div style={{ fontSize: "16px", color: GOLD, fontWeight: "800", marginBottom: "24px" }}>
                Proovime uuesti ?
              </div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button onClick={() => {
                  setNapukasPhase("idle");
                  setNapukasBox(null);
                  // Add assistant messages
                  setMessages(prev => [...prev,
                    { role: "assistant", content: "Kõik on korras — need olid erieffektid. 😄" }
                  ]);
                  setTimeout(() => {
                    setMessages(prev => [...prev,
                      { role: "assistant", content: "Proovi teisi variante ka :D" }
                    ]);
                  }, 1000);
                }} style={{
                  background: GOLD, border: "none", color: BG,
                  padding: "10px 24px", fontSize: "12px", letterSpacing: "1px",
                  textTransform: "uppercase", cursor: "pointer", borderRadius: "20px",
                  fontWeight: "900", fontFamily: "'Inter', sans-serif"
                }}>Jah</button>
                <button onClick={() => {
                  setNapukasBox(null);
                  setNapukasPhase("hea");
                  setTimeout(() => {
                    setNapukasPhase("idle");
                    startNapukasChain();
                  }, 2000);
                }} style={{
                  background: "transparent", border: `1px solid #333`, color: "#888",
                  padding: "10px 24px", fontSize: "12px", letterSpacing: "1px",
                  textTransform: "uppercase", cursor: "pointer", borderRadius: "20px",
                  fontWeight: "700", fontFamily: "'Inter', sans-serif"
                }}>Ei</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* NAPUKAS: Hea valik */}
      {napukasPhase === "hea" && (
        <div style={{
          position: "fixed", inset: 0, background: BG, zIndex: 9500,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: BG2, border: `1px solid ${BORDER}`, borderRadius: "12px",
            padding: "24px 48px", fontFamily: "'Inter', sans-serif",
            fontSize: "18px", color: GOLD, fontWeight: "700"
          }}>Hea valik. 😄</div>
        </div>
      )}

      {/* WILL DO flash */}
      {willDoActive && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)",
          zIndex: 9800, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ fontSize: "48px", fontWeight: "900", color: "#00ff00", fontFamily: "'Courier New', monospace", letterSpacing: "4px" }}>
            will do.
          </div>
        </div>
      )}

      {/* REBUILDING overlay */}
      {rebuildingActive && (
        <div style={{
          position: "fixed", inset: 0,
          background: rebuildingActive === "white" ? "#fff" : (typeof rebuildingActive === "string" && rebuildingActive.startsWith("flash")) ? (parseInt(rebuildingActive.slice(5)) % 2 === 0 ? "#fff" : BG) : BG,
          zIndex: 9800, display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.1s"
        }}>
          {rebuildingActive === "rebuilding" && (
            <div style={{ textAlign: "center", fontFamily: "'Courier New', monospace" }}>
              <div style={{ fontSize: "32px", color: GOLD, fontWeight: "900", marginBottom: "16px" }}>Rebuilding</div>
              <div style={{ color: "#444", fontSize: "14px", animation: "pulse 0.5s infinite" }}>████████████████ 100%</div>
            </div>
          )}
        </div>
      )}

      {/* SMILE flash */}
      {smileActive && (
        <div
          onAnimationEnd={() => setSmileActive(false)}
          style={{
            position: "fixed", inset: 0, background: "#fff",
            zIndex: 9800, display: "flex", alignItems: "center", justifyContent: "center",
            animation: "smileFlash 1.5s ease-out forwards"
          }}>
          <div style={{ fontSize: "80px" }}>📸</div>
        </div>
      )}

      {/* SOCIAL post overlay */}
      {socialActive && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)",
          zIndex: 9800, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: socialPlatform === "Facebook" ? "#1877F2" : "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
            borderRadius: "12px", padding: "28px 36px", width: "380px",
            fontFamily: "'Inter', sans-serif", color: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ fontSize: "28px" }}>{socialPlatform === "Facebook" ? "📘" : "📷"}</div>
              <div style={{ fontSize: "18px", fontWeight: "900" }}>{socialPlatform}</div>
            </div>
            <div style={{ fontSize: "13px", marginBottom: "16px", opacity: 0.9 }}>
              Loon postitust: {socialPlatform} ...
            </div>
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "4px", height: "8px", overflow: "hidden", marginBottom: "8px" }}>
              <div style={{
                background: "#fff", height: "100%", width: `${socialProgress}%`,
                transition: "width 0.15s"
              }} />
            </div>
            <div style={{ fontSize: "12px", opacity: 0.8, textAlign: "right" }}>Loading ... {socialProgress}%</div>
          </div>
        </div>
      )}
      {modal && (() => {
        const ModalBox = ({ title, subtitle, buttons, showX, onX, customFirst }) => (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
          }}>
            <div style={{
              background: BG2, border: `1px solid ${BORDER}`,
              borderRadius: "16px", padding: "32px 36px", maxWidth: "420px",
              width: "90%", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.8)"
            }}>
              {showX && (
                <button onClick={onX} style={{
                  position: "absolute", top: "12px", right: "16px",
                  background: "transparent", border: "none", color: "#555",
                  fontSize: "18px", cursor: "pointer", fontFamily: "'Inter', sans-serif"
                }}>✕</button>
              )}
              <div style={{ fontSize: "16px", fontWeight: "800", color: GOLD, marginBottom: "8px", letterSpacing: "1px" }}>{title}</div>
              {subtitle && <div style={{ fontSize: "13px", color: "#777", marginBottom: "24px", lineHeight: "1.6" }}>{subtitle}</div>}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {customFirst}
                {buttons.map((b, i) => (
                  <button key={i} onClick={b.disabled ? undefined : b.action} style={{
                    background: b.primary ? GOLD : "transparent",
                    border: `1px solid ${b.primary ? GOLD : b.disabled ? "#222" : "#333"}`,
                    color: b.primary ? BG : b.disabled ? "#333" : "#888",
                    padding: "8px 14px", fontSize: "11px", letterSpacing: "1px",
                    textTransform: "uppercase", cursor: b.disabled ? "not-allowed" : "pointer",
                    borderRadius: "20px", fontFamily: "'Inter', sans-serif",
                    fontWeight: "700", transition: "all 0.15s",
                    opacity: b.disabled ? 0.4 : 1,
                    textDecoration: b.disabled ? "line-through" : "none"
                  }}
                  onMouseEnter={e => { if (!b.primary && !b.disabled) { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}}
                  onMouseLeave={e => { if (!b.primary && !b.disabled) { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#888"; }}}
                  >{b.label}</button>
                ))}
              </div>
            </div>
          </div>
        );

        const finalSave = async () => {
          await saveSettings();
          setModal(null);
          setShowSettings(false);
        };

        if (modal === "error420") {
          const handleKirjutaÜle = (e) => {
            if (kirjutaBrokenDone) { finalSave(); return; }
            if (kirjutaBroken) return;
            const rect = e.currentTarget.getBoundingClientRect();
            setKirjutaBrokenPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            setKirjutaBroken(true);
            setTimeout(() => {
              setKirjutaBroken(false);
              setKirjutaBrokenDone(true);
            }, 1200);
          };

          return <ModalBox
            title="Errori 420 !"
            subtitle="Ou, unustasid midagi ?"
            customFirst={
              <div style={{ position: "relative", display: "inline-block" }}>
                {!kirjutaBroken && !kirjutaBrokenDone && (
                  <button
                    onClick={handleKirjutaÜle}
                    style={{
                      background: GOLD, border: `1px solid ${GOLD}`, color: BG,
                      padding: "8px 14px", fontSize: "11px", letterSpacing: "1px",
                      textTransform: "uppercase", cursor: "pointer", borderRadius: "20px",
                      fontFamily: "'Inter', sans-serif", fontWeight: "700"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = GOLD_BRIGHT; }}
                    onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}
                  >Kirjuta üle</button>
                )}
                {kirjutaBroken && (
                  <>
                    <div style={{
                      position: "absolute", top: 0, left: 0, overflow: "hidden",
                      width: kirjutaBrokenPos.x, height: "100%",
                      animation: "brokenLeft 0.8s ease-in forwards",
                      pointerEvents: "none"
                    }}>
                      <button style={{
                        background: GOLD, border: `1px solid ${GOLD}`, color: BG,
                        padding: "8px 14px", fontSize: "11px", letterSpacing: "1px",
                        textTransform: "uppercase", borderRadius: "20px",
                        fontFamily: "'Inter', sans-serif", fontWeight: "700",
                        whiteSpace: "nowrap", cursor: "default"
                      }}>Kirjuta üle</button>
                    </div>
                    <div style={{
                      position: "absolute", top: 0, left: kirjutaBrokenPos.x, overflow: "hidden",
                      width: `calc(100% - ${kirjutaBrokenPos.x}px)`, height: "100%",
                      animation: "brokenRight 0.8s ease-in forwards",
                      pointerEvents: "none"
                    }}>
                      <button style={{
                        background: GOLD, border: `1px solid ${GOLD}`, color: BG,
                        padding: "8px 14px", fontSize: "11px", letterSpacing: "1px",
                        textTransform: "uppercase", borderRadius: "20px",
                        fontFamily: "'Inter', sans-serif", fontWeight: "700",
                        whiteSpace: "nowrap", cursor: "default",
                        marginLeft: `-${kirjutaBrokenPos.x}px`
                      }}>Kirjuta üle</button>
                    </div>
                  </>
                )}
                {kirjutaBrokenDone && (
                  <button
                    onClick={finalSave}
                    style={{
                      background: GOLD, border: `1px solid ${GOLD}`, color: BG,
                      padding: "8px 14px", fontSize: "11px", letterSpacing: "1px",
                      textTransform: "uppercase", cursor: "pointer", borderRadius: "20px",
                      fontFamily: "'Inter', sans-serif", fontWeight: "700"
                    }}
                  >Kirjuta üle</button>
                )}
              </div>
            }
            buttons={[
              { label: "Istu sisse", action: () => setModal("nicetr") },
              { label: "Lase üle", action: () => setModal("laseyle") },
              { label: "Ah, pohhui", action: () => setModal("pohhui") },
            ]}
          />;
        }

        if (modal === "nicetr") return <ModalBox
          title="Kuidas palun ?"
          buttons={[
            { label: "Oops", action: () => setModal("oops") },
            { label: "Jään endale kindlaks", action: () => setModal("bringitjulge") },
            { label: "Näpukas", action: () => setModal("napukas") },
          ]}
        />;

        if (modal === "oops") return <ModalBox
          title="Tahad uuesti proovida ?"
          buttons={[
            { label: "Jep.", action: () => setModal("error420") },
          ]}
        />;

        if (modal === "napukas") return <ModalBox
          title="No, napilt ei usu."
          subtitle="Lolli otsi ikka oma perest."
          buttons={[
            { label: "Päriselt sorry", action: () => { setModal(null); startNapukasChain(); } },
          ]}
        />;

        if (modal === "päriseltsorrry") return <ModalBox
          title="Noo..."
          subtitle="Ei usu ka päris."
          buttons={[
            { label: "Aga tõesti!", action: () => setModal("agatolesti") },
            { label: "Ok, ei olnudki sorry", action: () => setModal("eiolesorry") },
          ]}
        />;

        if (modal === "agatolesti") return <ModalBox
          title="Tõesta siis."
          buttons={[
            { label: "Salvesta", primary: true, action: async () => { await finalSave(); } },
          ]}
        />;

        if (modal === "eiolesorry") return <ModalBox
          title="Ausam küll."
          subtitle="Respekt."
          buttons={[
            { label: "Tänud", action: () => setModal("tanud") },
          ]}
        />;

        if (modal === "tanud") return <ModalBox
          title="Pole tänu."
          subtitle="Nüüd salvesta."
          buttons={[
            { label: "Salvesta", primary: true, action: async () => { await finalSave(); } },
          ]}
        />;

        if (modal === "bringitjulge") return <ModalBox
          title="Ah, et siuke mees ...."
          subtitle={"No vaatame siis ...\nDavai, näita kui julge Sa siis tegelt oled ?"}
          buttons={[
            { label: "Bring it on", action: () => setModal("bringitvaliku") },
            { label: "Tglt olen kusi", action: () => setModal("kusi") },
          ]}
        />;

        if (modal === "kusi") return <ModalBox
          title="Sinust küll seda ootand poleks .."
          subtitle="Aga noh .. Ausus maksab ka midagi."
          buttons={[
            { label: "Vii mind algusesse", action: () => setModal("error420") },
          ]}
        />;

        if (modal === "bringitvaliku") return <ModalBox
          title="Mis Sa arvad, kelle kulul nalja nüüd saab ?"
          subtitle="Vali endale sobivaim"
          buttons={[
            { label: "Ok.", action: () => setModal("venearuletti") },
          ]}
        />;

        if (modal === "venearuletti") {
          const allDone = ["c","prog","win","restart"].every(k => rulettiDone.includes(k));
          const showTunnistan = rulettiRing >= 2 && !rulettiDone.includes("tunnistan");
          return <ModalBox
            title={rulettiRing === 0 ? "Mängime vene ruletti ..." : "No, mis järgmiseks? 😄"}
            subtitle={rulettiRing === 0 ? "Sul on üks võimalus eksida." : rulettiDone.filter(k=>["c","prog","win","restart"].includes(k)).length + "/4 läbi käidud"}
            buttons={[
              ...(showTunnistan ? [{ label: "Tunnistan, pole nii julge", action: startTunnistan }] : []),
              { label: "Kustuta kõik kõvakettalt C:", disabled: rulettiDone.includes("c"), action: () => !rulettiDone.includes("c") && startRulettiEffect("c") },
              { label: "Kustuta kõik programmid", disabled: rulettiDone.includes("prog"), action: () => !rulettiDone.includes("prog") && startRulettiEffect("prog") },
              { label: "Lase windows maha", disabled: rulettiDone.includes("win"), action: () => !rulettiDone.includes("win") && startRulettiEffect("win") },
              { label: "Tee restart", disabled: rulettiDone.includes("restart"), action: () => !rulettiDone.includes("restart") && startRestart() },
            ]}
          />;
        }

        if (modal === "mäletad") return <ModalBox
          title="Kas Sa üldse mäletad kust teekond pihta hakkas ?"
          buttons={[
            { label: "EI.", action: () => setModal("autosave") },
          ]}
        />;

        if (modal === "autosave") return <ModalBox
          title="Sa unustasid salvestada enne seadetest väljumist."
          subtitle="Lülita sisse autosave ?"
          customFirst={
            <div style={{ width: "100%", marginBottom: "8px" }}>
              <button onClick={async () => {
                setModal(null);
                await saveSettings();
                setModal("viimane");
              }} style={{
                background: GOLD, border: `1px solid ${GOLD}`, color: BG,
                padding: "8px 20px", fontSize: "11px", letterSpacing: "1px",
                textTransform: "uppercase", cursor: "pointer", borderRadius: "20px",
                fontFamily: "'Inter', sans-serif", fontWeight: "900"
              }}>Lülita sisse</button>
              <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" id="dontshow" style={{ cursor: "pointer" }} />
                <label htmlFor="dontshow" style={{ fontSize: "11px", color: "#555", cursor: "pointer" }}>Don't show me this again</label>
              </div>
            </div>
          }
          buttons={[]}
        />;

        if (modal === "viimane") return <ModalBox
          title="Nüüd viimane ja kõige põnevam osa:"
          subtitle={"Mõista, mõista ...\n\nMis Su arvutis nüüd on ...\n\n"}
          customFirst={
            <div style={{ width: "100%", textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: "24px", fontWeight: "900", color: GOLD, letterSpacing: "2px" }}>
                Ja kus need asuvad 😄😄😄
              </div>
              <button onClick={() => { setModal(null); setFinalGameDone && setFinalGameDone(true); }} style={{
                marginTop: "24px", background: GOLD, border: "none", color: BG,
                padding: "10px 28px", fontSize: "12px", letterSpacing: "2px",
                textTransform: "uppercase", cursor: "pointer", borderRadius: "20px",
                fontFamily: "'Inter', sans-serif", fontWeight: "900"
              }}>😄</button>
            </div>
          }
          buttons={[]}
        />;

        if (modal === "laseyle") return <ModalBox
          title="Arvad jah? 😄"
          subtitle="Ma sul lasen."
          showX={true}
          onX={() => { try { window.close(); } catch {} window.location.href = "about:blank"; }}
          buttons={[
            { label: "Kustuta kõik seaded siis juba", action: () => setModal("lasekustuta") },
            { label: "Tee restart", action: () => setModal("nope") },
          ]}
        />;

        if (modal === "nope") {
          setTimeout(() => {
            setModal(null);
            startCmd();
          }, 1000);
          return <ModalBox title="Nope." buttons={[]} />;
        }

        if (modal === "lasekustuta") {
          return <ModalBox
            title="Või tahad ikkagi uuesti proovida ?"
            buttons={[
              { label: "Ei.", action: () => {
                setTimeout(() => {
                  // After 2s "Ei." becomes "Ok" — we handle via state
                  setModal("laseok");
                }, 0);
              }},
            ]}
          />;
        }

        if (modal === "laseok") {
          setTimeout(() => setModal(null), 2000);
          return <ModalBox title="Ok." buttons={[]} />;
        }

        if (modal === "pohhui") return <ModalBox
          title="Ah et pohhui? 😏"
          buttons={[
            { label: "Kustuta siis juba kõik ära", action: () => setModal("pohhuikustuta") },
          ]}
        />;

        if (modal === "pohhuikustuta") return <ModalBox
          title="Vali seekord targalt."
          buttons={[
            { label: "Kirjuta üle", primary: true, action: finalSave },
            { label: "Istu sisse", action: () => setModal("nicetr") },
            { label: "Lase üle", action: () => setModal("laseyle") },
            { label: "Ah, pohhui", action: () => setModal("pohhui") },
          ]}
        />;

        if (modal === "esc") return <ModalBox
          title="no mis mis... ? 😄"
          subtitle="...Enam polegi pohhui v? 😄&#10;Tahad uuesti proovida ?"
          buttons={[
            { label: "Ei.", action: () => setModal("escfinal") },
            { label: "Pole vaja", action: () => setModal("escfinal") },
            { label: "Praegu mitte", action: () => setModal("escfinal") },
          ]}
        />;

        if (modal === "escfinal") return <ModalBox
          title="Järgmine kord on meeles."
          buttons={[
            { label: "Ära ikkagi salvesta", primary: true, action: async () => {
              await finalSave();
            }},
          ]}
        />;

        return null;
      })()}

    </div>
  );
}
