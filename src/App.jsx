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
  { key: "bpm", label: "ZANRITE KIIRUSED", placeholder: "Zanr → default BPM..." },
  { key: "banned", label: "KEELATUD SÕNAD", placeholder: "Sõnad mis kunagi ei tohi promptis esineda..." },
  { key: "exclude", label: "EXCLUDE DEFAULTS", placeholder: "Alati excludeisse lähevad elemendid..." },
  { key: "structure", label: "STRUKTUURIREEGLID", placeholder: "64-bar loogika, sektsioonid..." },
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
  const [lightPulse, setLightPulse] = useState(false);
  const [modal, setModal] = useState(null);
  const [cmdActive, setCmdActive] = useState(false);
  const [cmdLines, setCmdLines] = useState([]);
  const [cmdCountdown, setCmdCountdown] = useState(null);
  const [bsodActive, setBsodActive] = useState(false);
  const [bsodDots, setBsodDots] = useState("");
  const [blackScreen, setBlackScreen] = useState(false);
  const [kirjutaBroken, setKirjutaBroken] = useState(false);
  const [kirjutaBrokenPos, setKirjutaBrokenPos] = useState({ x: 0, y: 0 });
  const [kirjutaBrokenDone, setKirjutaBrokenDone] = useState(false);

  const isDirty = JSON.stringify(settingsData) !== JSON.stringify(savedData);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const settingsPanelRef = useRef(null);

  const triggerLightPulse = () => {
    setLightPulse(true);
    setTimeout(() => setLightPulse(false), 600);
  };

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
        setTimeout(() => {
          setBsodActive(false);
          setBlackScreen(true);
          setTimeout(() => {
            setBlackScreen(false);
            setShowSettings(false);
            setModal(null);
          }, 7000);
        }, 2000);
      }
    }, 400);
  };

  const startCmd = () => {
    if (cmdActive) return;
    setCmdActive(true);
    setCmdLines([]);
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
      if (imgNum > 40 + Math.floor(Math.random() * 60)) { personIdx = (personIdx + 1) % persons.length; imgNum = 1; }
      uploadLines.push(`Uploading hidden files: - C:\\Users\\Josif\\Local\\Downloads\\Kõik Alasti Pildid\\${persons[personIdx]}\\IMG${String(imgNum).padStart(4,"0")}.jpg`);
      imgNum++;
    }
    const viirused = ["KaZaA_Pro_2024_crack.exe","DaemonTools_hidden_v9.1.exe","eMule_stealth_pack_v3.exe","BitLord_rootkit_helper.exe","Grokster_revival_beta.exe","iMesh_dataminer_v3.1.exe","BearShare_keylogger_x64.exe","LimeWire_revival_2024.exe","WinMX_shadow_client.exe","Morpheus_tracker_v8.exe","Ares_hidden_miner.exe","AudioGalaxy_spyware.exe","Shareaza_botnet_mod.exe","Overnet_stealth_v2.exe","DC_plusplus_hidden.exe"];
    const downloadLines = ["", `Upload complete. [${uploadLines.length - header.length} files transferred]`, "Initiating secondary process...", ""];
    viirused.forEach(v => {
      const pct = Math.floor(Math.random() * 35 + 65);
      const bar = "█".repeat(Math.floor(pct/10)) + "░".repeat(10-Math.floor(pct/10));
      downloadLines.push(`Downloading: ${v} ${bar} ${pct}%`);
    });
    downloadLines.push(...["","Installing background services... done","Registering startup entries... done","Patching system files... done","","Virtual drive: Created successfully","Hidden personal data upload: Successful","New software download: Complete","Storage available: 23 MB","","Exit"]);
    const endLines = ["", "Restarting PC", "In ..", "3", "2", "1                                    Bye :D"];
    const allLines = [...uploadLines, ...downloadLines];
    let i = 0;

    const addLine = () => {
      if (i < allLines.length) {
        setCmdLines(prev => [...prev, allLines[i]]);
        i++;
        setTimeout(addLine, i < uploadLines.length ? 55 : 130);
      } else if (i < allLines.length + endLines.length) {
        const eLine = endLines[i - allLines.length];
        setCmdLines(prev => [...prev, eLine]);
        if (eLine === "3") {
          setCmdCountdown(3);
          let c = 3;
          const civ = setInterval(() => { c--; setCmdCountdown(c > 0 ? c : null); if (c <= 0) clearInterval(civ); }, 1000);
        }
        i++;
        setTimeout(addLine, eLine.match(/^[1-3]$/) ? 1000 : 600);
      } else {
        setTimeout(() => { setCmdActive(false); setCmdLines([]); setCmdCountdown(null); setTimeout(() => startBsod(), 800); }, 1000);
      }
    };
    addLine();
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, m] = await Promise.all([window.storage.get("suno-settings"), window.storage.get("suno-messages")]);
        if (s?.value) { const p = JSON.parse(s.value); setSettingsData(p); setSavedData(p); }
        if (m?.value) { const saved = JSON.parse(m.value); if (saved.length > 1) setMessages(saved); }
      } catch {}
    };
    load();
  }, []);

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

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && showSettings && isDirty && !modal) setModal("error420"); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showSettings, isDirty, modal]);

  useEffect(() => {
    if (messages.length <= 1) return;
    try { window.storage.set("suno-messages", JSON.stringify(messages.slice(-60))); } catch {}
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
    } catch { setSaveStatus("err"); setTimeout(() => setSaveStatus(""), 2000); }
  };

  const resetSettings = async () => {
    try { await window.storage.delete("suno-settings"); setSettingsData({}); setSavedData({}); } catch {}
  };

  const autoFillSettings = async () => {
    setFillLoading(true);
    const existing = settingsData;
    const hasContent = Object.values(existing).some(v => v && v.trim());
    if (!hasContent) {
      setSaveStatus("Lisa esmalt oma tekst sektsioonidesse");
      setTimeout(() => setSaveStatus(""), 2500);
      setFillLoading(false);
      return;
    }
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 2000,
          system: "Return only valid JSON, no markdown, no explanation.",
          messages: [{ role: "user", content: `Paranda ja täienda ainult olemasolevat teksti. Tühjad sektsioonid jäta tühjaks. Tagasta valid JSON samade võtmetega. Eesti keel.\n\n${JSON.stringify(existing, null, 2)}` }]
        })
      });
      const data = await response.json();
      const text = data.content?.find(b => b.type === "text")?.text || "{}";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setSettingsData(prev => ({ ...prev, ...parsed }));
      setSaveStatus("TÄIDETUD ✓");
    } catch { setSaveStatus("VIGA ✗"); }
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
      const settingsContext = Object.keys(settingsData).some(k => settingsData[k])
        ? `\n\n## KASUTAJA ISIKLIKUD SEADED\n${Object.entries(settingsData).filter(([k,v]) => v).map(([k,v]) => `### ${k.toUpperCase()}\n${v}`).join('\n\n')}`
        : "";
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 3000,
          system: SYSTEM_PROMPT + settingsContext,
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await response.json();
      const assistantText = data.content?.find(b => b.type === "text")?.text || "Viga.";
      setMessages(prev => [...prev, { role: "assistant", content: assistantText }]);
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "API viga. Proovi uuesti." }]); }
    setLoading(false);
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => { setCopiedIndex(idx); setTimeout(() => setCopiedIndex(null), 1800); });
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
          <div key={i} style={{ position: "relative", margin: "12px 0", background: BG2, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${GOLD}`, borderRadius: "8px" }}>
            <button onClick={() => copyToClipboard(code, idx)} style={{
              position: "absolute", top: 8, right: 8,
              background: copied ? GOLD : "transparent", border: `1px solid ${copied ? GOLD : "#2a2a3a"}`,
              color: copied ? BG : GOLD_DIM, fontSize: "9px", padding: "4px 10px",
              cursor: "pointer", letterSpacing: "1.5px", fontFamily: "'Inter', sans-serif",
              textTransform: "uppercase", borderRadius: "8px", transition: "all 0.2s"
            }}>{copied ? "✓ COPIED" : "COPY"}</button>
            <pre style={{ margin: 0, padding: "14px 16px", paddingRight: "80px", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#b8b8cc", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: "1.7" }}>{code}</pre>
          </div>
        );
      }
      return (
        <span key={i} style={{ whiteSpace: "pre-wrap" }}>
          {part.split(/(\*\*.*?\*\*)/g).map((s, j) =>
            s.startsWith("**") && s.endsWith("**") ? <strong key={j} style={{ color: GOLD }}>{s.slice(2, -2)}</strong> : s
          )}
        </span>
      );
    });
  };

  return (
    <div id="suno-root" style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", color: "#888", fontWeight: "600" }}>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "center", height: "64px", flexShrink: 0, background: BG2, position: "relative" }}>
        <span style={{ position: "absolute", left: "24px", fontSize: "11px", color: "#aaa", opacity: 0.4, fontStyle: "italic", fontWeight: "500" }}>By Josif Toots</span>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "7px", height: "7px", background: lightPulse ? "#cc0033" : GOLD, borderRadius: "50%", boxShadow: lightPulse ? "0 0 12px #cc0033" : `0 0 12px ${GOLD}`, animation: lightPulse ? "none" : "pulse 2.5s infinite", transition: "background 0.1s, box-shadow 0.1s" }} />
          <span style={{ fontSize: "18px", letterSpacing: "6px", color: "#555", textTransform: "uppercase", fontWeight: "900" }}>SUNO</span>
          <span style={{ fontSize: "18px", letterSpacing: "6px", color: GOLD, textTransform: "uppercase", fontWeight: "900" }}>ASSISTANT</span>
          <div style={{ width: "7px", height: "7px", background: lightPulse ? "#cc0033" : GOLD, borderRadius: "50%", boxShadow: lightPulse ? "0 0 12px #cc0033" : `0 0 12px ${GOLD}`, animation: lightPulse ? "none" : "pulse 2.5s infinite 1.25s", transition: "background 0.1s, box-shadow 0.1s" }} />
        </div>
        <span style={{ position: "absolute", right: "24px", fontSize: "11px", color: "#aaa", opacity: 0.4, fontStyle: "italic", fontWeight: "500" }}>and System Architect</span>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div ref={settingsPanelRef} style={{ background: BG3, borderBottom: `1px solid ${BORDER}`, display: "flex", flexShrink: 0, resize: "vertical", overflow: "auto", minHeight: "200px", height: "380px" }}>
          <div style={{ width: "160px", flexShrink: 0, borderRight: `1px solid ${BORDER}`, overflowY: "auto", padding: "12px 0" }}>
            {SETTINGS_SECTIONS.map(s => (
              <div key={s.key} onClick={() => setActiveSection(s.key)} style={{
                padding: "10px 16px", fontSize: "11px", letterSpacing: "1px",
                color: activeSection === s.key ? GOLD : "#555",
                borderLeft: `2px solid ${activeSection === s.key ? GOLD : "transparent"}`,
                cursor: "pointer", textTransform: "uppercase",
                background: activeSection === s.key ? BG2 : "transparent",
                fontFamily: "'Inter', sans-serif", fontWeight: activeSection === s.key ? "800" : "600",
                transition: "all 0.1s"
              }}>{s.label}</div>
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: GOLD_DIM, marginBottom: "10px", textTransform: "uppercase", fontWeight: "800" }}>
              {SETTINGS_SECTIONS.find(s => s.key === activeSection)?.label}
            </div>
            <textarea
              value={settingsData[activeSection] || ""}
              onChange={e => setSettingsData(prev => ({ ...prev, [activeSection]: e.target.value }))}
              placeholder={SETTINGS_SECTIONS.find(s => s.key === activeSection)?.placeholder}
              style={{ flex: 1, background: BG2, border: `1px solid ${BORDER}`, borderBottom: `2px solid #2a2a3a`, color: "#bbb", padding: "12px 14px", fontSize: "14px", fontFamily: "'Inter', sans-serif", resize: "none", outline: "none", lineHeight: "1.6", borderRadius: "8px", fontWeight: "500" }}
              onFocus={e => e.target.style.borderBottomColor = GOLD}
              onBlur={e => e.target.style.borderBottomColor = "#2a2a3a"}
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={saveSettings} style={{
                background: saveStatus === "ok" ? BG3 : GOLD, border: `1px solid ${saveStatus === "ok" ? "#7a0018" : GOLD}`,
                color: saveStatus === "ok" ? "#c41230" : BG, padding: "8px 20px", fontSize: "10px",
                letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer",
                fontFamily: "'Inter', sans-serif", borderRadius: "20px", fontWeight: "900", transition: "all 0.3s"
              }}>{saveStatus === "ok" ? "SALVESTATUD ✓" : "SALVESTA"}</button>
              <button onClick={autoFillSettings} disabled={fillLoading} style={{
                background: "transparent", border: `1px solid ${GOLD_DIM}`, color: fillLoading ? "#444" : GOLD_DIM,
                padding: "8px 16px", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
                cursor: fillLoading ? "not-allowed" : "pointer", fontFamily: "'Inter', sans-serif", borderRadius: "20px", fontWeight: "700"
              }}
              onMouseEnter={e => { if (!fillLoading) { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; }}}
              onMouseLeave={e => { if (!fillLoading) { e.currentTarget.style.borderColor = GOLD_DIM; e.currentTarget.style.color = GOLD_DIM; }}}
              >{fillLoading ? "TÄIDAN..." : "AUTO-TÄIDA"}</button>
              <button onClick={resetSettings} style={{
                background: "transparent", border: `1px solid #2a2a3a`, color: "#444",
                padding: "8px 16px", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
                cursor: "pointer", fontFamily: "'Inter', sans-serif", borderRadius: "20px", fontWeight: "700"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD_DIM; e.currentTarget.style.color = GOLD_DIM; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3a"; e.currentTarget.style.color = "#444"; }}
              >LÄHTESTA</button>
              {saveStatus && saveStatus !== "ok" && <span style={{ fontSize: "10px", color: GOLD, fontWeight: "700" }}>{saveStatus}</span>}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%", padding: "14px 20px",
              background: msg.role === "user" ? BG2 : BG3,
              border: `1px solid ${BORDER}`,
              borderLeft: msg.role === "assistant" ? `2px solid ${GOLD}` : "none",
              borderRight: msg.role === "user" ? `2px solid #2a2a3a` : "none",
              fontSize: "14px", lineHeight: "1.8", fontWeight: "500",
              color: msg.role === "user" ? "#777" : "#999",
              borderRadius: msg.role === "assistant" ? "6px 16px 16px 16px" : "16px 6px 16px 16px",
              display: "inline-block",
            }}>{renderMessage(msg.content)}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "14px 18px", border: `1px solid ${BORDER}`, borderLeft: `2px solid ${GOLD}`, background: BG3, borderRadius: "8px" }}>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                {[0,1,2].map(n => <div key={n} style={{ width: "4px", height: "4px", background: GOLD, borderRadius: "50%", animation: `bounce 1.2s infinite ${n*0.2}s` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "16px 24px", display: "flex", gap: "10px", alignItems: "flex-end", flexShrink: 0, background: BG2 }}>
        <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
          placeholder="Kirjelda sound, artist, feeling, lugu..." rows={1}
          style={{ flex: 1, background: BG3, border: `1px solid ${BORDER}`, borderBottom: "2px solid #1e1e2e", color: "#ccc", padding: "11px 14px", fontSize: "14px", fontFamily: "'Inter', sans-serif", resize: "none", outline: "none", lineHeight: "1.5", minHeight: "42px", maxHeight: "120px", overflowY: "auto", transition: "border-color 0.2s", borderRadius: "8px", fontWeight: "600" }}
          onFocus={e => e.target.style.borderBottomColor = GOLD}
          onBlur={e => e.target.style.borderBottomColor = "#1e1e2e"}
          onInput={e => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()} style={{
          background: loading || !input.trim() ? BG3 : GOLD, border: `1px solid ${loading || !input.trim() ? BORDER : GOLD}`,
          color: loading || !input.trim() ? "#333" : BG, padding: "11px 22px", fontSize: "10px", letterSpacing: "2px",
          textTransform: "uppercase", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
          fontFamily: "'Inter', sans-serif", transition: "all 0.15s", flexShrink: 0, height: "42px", borderRadius: "8px", fontWeight: "900"
        }}
        onMouseEnter={e => { if (!loading && input.trim()) e.currentTarget.style.background = GOLD_BRIGHT; }}
        onMouseLeave={e => { if (!loading && input.trim()) e.currentTarget.style.background = GOLD; }}
        >SEND</button>
        <button onClick={() => { if (showSettings) { tryCloseSettings(); } else { setShowSettings(true); } }} style={{
          background: "transparent", border: `1px solid ${GOLD}`, color: GOLD,
          padding: "11px 22px", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
          cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
          flexShrink: 0, height: "42px", borderRadius: "20px", fontWeight: "900"
        }}
        onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = BG; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}
        >TREENI</button>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.7)} }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes brokenLeft { 0%{transform:translate(0,0) rotate(0)} 100%{transform:translate(-40px,60px) rotate(-25deg);opacity:0} }
        @keyframes brokenRight { 0%{transform:translate(0,0) rotate(0)} 100%{transform:translate(40px,60px) rotate(20deg);opacity:0} }
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:${BG}}
        ::-webkit-scrollbar-thumb{background:#1a1a28}
        ::-webkit-scrollbar-thumb:hover{background:${GOLD_DIM}}
      `}</style>

      {/* CMD overlay */}
      {cmdActive && (
        <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 8500, display: "flex", flexDirection: "column", fontFamily: "'Courier New', monospace" }}>
          <div style={{ background: "#000080", color: "#fff", padding: "4px 12px", fontSize: "12px", display: "flex", justifyContent: "space-between" }}>
            <span>C:\Windows\System32\cmd.exe</span>
            <span style={{ opacity: 0.7 }}>— □ ✕</span>
          </div>
          <div style={{ flex: 1, padding: "12px 16px", overflowY: "auto", fontSize: "13px", lineHeight: "1.6", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div ref={el => { if (el) el.scrollIntoView({ block: "end" }); }}>
              {cmdLines.map((line, i) => (
                <div key={i} style={{
                  color: (line||"").startsWith("Uploading") ? "#ffff00" :
                         (line||"").startsWith("Downloading") ? "#ff8800" :
                         (line||"").startsWith("Virtual")||(line||"").startsWith("Hidden")||(line||"").startsWith("New")||(line||"").startsWith("Storage")||(line||"").startsWith("Patching")||(line||"").startsWith("Registering")||(line||"").startsWith("Installing") ? "#00ff00" :
                         line === "Exit" ? "#ff4444" :
                         (line||"").match(/^[1-3]$/) ? "#ff0000" :
                         (line||"").includes("Bye") ? "#ffff00" : "#aaaaaa"
                }}>{line || "\u00a0"}</div>
              ))}
              <span style={{ color: "#fff", animation: "pulse 0.8s infinite" }}>█</span>
            </div>
          </div>
          {cmdCountdown && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <div style={{ fontSize: "200px", fontWeight: "900", color: "#ff0000", opacity: 0.15, fontFamily: "'Courier New', monospace", textShadow: "0 0 40px #ff0000" }}>{cmdCountdown}</div>
            </div>
          )}
        </div>
      )}

      {/* BSOD */}
      {bsodActive && (
        <div style={{ position: "fixed", inset: 0, background: "#0000AA", zIndex: 9000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Courier New', monospace", color: "#fff", padding: "60px" }}>
          <div style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "40px" }}>:(</div>
          <div style={{ fontSize: "14px", marginBottom: "30px", textAlign: "center", maxWidth: "600px", lineHeight: "2" }}>
            Your PC ran into a problem and needs to restart.<br/>We're just collecting some error info, and then we'll restart for you.
          </div>
          <div style={{ fontSize: "18px", letterSpacing: "2px", marginBottom: "20px" }}>Uninstalling Windows{bsodDots}</div>
          <div style={{ fontSize: "13px", color: "#aaaaff", marginTop: "40px" }}>Stop code: CRITICAL_PROCESS_DIED</div>
        </div>
      )}

      {/* Black screen */}
      {blackScreen && <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 9100 }} />}

      {/* Error 420 Modal */}
      {modal === "error420" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: "16px", padding: "32px 36px", maxWidth: "380px", width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}>
            <div style={{ fontSize: "16px", fontWeight: "800", color: GOLD, marginBottom: "8px", letterSpacing: "1px" }}>Errori 420 !</div>
            <div style={{ fontSize: "13px", color: "#777", marginBottom: "24px", lineHeight: "1.6" }}>Ou, unustasid salvestada ?</div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={async () => { await saveSettings(); setModal(null); setShowSettings(false); }} style={{
                background: GOLD, border: `1px solid ${GOLD}`, color: BG, padding: "9px 20px",
                fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer",
                borderRadius: "20px", fontFamily: "'Inter', sans-serif", fontWeight: "900"
              }}>Salvesta</button>
              <button onClick={() => {
                setSavedData({...settingsData});
                setModal(null);
                startCmd();
              }} style={{
                background: "transparent", border: `1px solid #333`, color: "#888", padding: "9px 20px",
                fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer",
                borderRadius: "20px", fontFamily: "'Inter', sans-serif", fontWeight: "700"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#cc0033"; e.currentTarget.style.color = "#cc0033"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#888"; }}
              >Pole Vaja</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
