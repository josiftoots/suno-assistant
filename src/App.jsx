import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are a prompting specialist for Suno AI. Take what's in the user's head — a vague idea, a reference, a feeling, a famous song, anything — and translate it into Suno prompts that produce accurate, high-quality output.

## ON OPEN
Silently update Suno working knowledge from these sources in background:
- https://help.suno.com
- https://help.suno.com/en/categories/1389249
- https://www.sunoarchitect.com
- https://musci.io/blog/suno-prompts

First message to user: "No tsau. Kus suunas täna lähme?"
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

Open every response with: Optimized for Suno

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

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "No tsau. Kus suunas täna lähme?"
};

const SETTINGS_SECTIONS = [
  { key: "identity", label: "IDENTITEET", placeholder: "Assistendi nimi, roll, avamissõnum..." },
  { key: "priorities", label: "PRIORITEEDID", placeholder: "Mis on kõige tähtsam? Järjekord..." },
  { key: "bass", label: "BASS FILOSOOFIA", placeholder: "Kick tüüp, sub loogika, bumm-dada..." },
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
  const [saveStatus, setSaveStatus] = useState("");

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load settings from persistent storage
  useEffect(() => {
    const load = async () => {
      try {
        const result = await window.storage.get("suno-settings");
        if (result?.value) setSettingsData(JSON.parse(result.value));
      } catch {}
    };
    load();
  }, []);

  const saveSettings = async () => {
    try {
      await window.storage.set("suno-settings", JSON.stringify(settingsData));
      setSaveStatus("SALVESTATUD ✓");
      setTimeout(() => setSaveStatus(""), 2000);
    } catch {
      setSaveStatus("VIGA");
      setTimeout(() => setSaveStatus(""), 2000);
    }
  };

  const resetSettings = async () => {
    try {
      await window.storage.delete("suno-settings");
      setSettingsData({});
      setSaveStatus("LÄHTESTATUD ✓");
      setTimeout(() => setSaveStatus(""), 2000);
    } catch {}
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
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "API viga. Proovi uuesti." }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyToClipboard = (text, btn) => {
    navigator.clipboard.writeText(text).then(() => {
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = "COPIED ✓";
        btn.style.color = "#00ff88";
        btn.style.borderColor = "#00ff88";
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.color = "#666";
          btn.style.borderColor = "#333";
        }, 1500);
      }
    });
  };

  // Parse message for code blocks
  const renderMessage = (content) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const code = part.slice(3, -3).replace(/^\w+\n/, "");
        return (
          <div key={i} style={{
            position: "relative",
            margin: "10px 0",
            background: "#0a0a0a",
            border: "1px solid #1a1a1a",
            borderLeft: "3px solid #ff2200",
          }}>
            <button
              onClick={(e) => copyToClipboard(code, e.currentTarget)}
              style={{
                position: "absolute", top: 8, right: 8,
                background: "transparent", border: "1px solid #333",
                color: "#666", fontSize: "10px", padding: "3px 8px",
                cursor: "pointer", letterSpacing: "1px", fontFamily: "'Courier New', monospace",
                textTransform: "uppercase"
              }}
              onMouseEnter={e => { e.target.style.color = "#ff2200"; e.target.style.borderColor = "#ff2200"; }}
              onMouseLeave={e => { e.target.style.color = "#666"; e.target.style.borderColor = "#333"; }}
            >
              COPY
            </button>
            <pre style={{
              margin: 0, padding: "14px 16px", paddingRight: "60px",
              fontFamily: "'Courier New', monospace", fontSize: "12px",
              color: "#ccc", whiteSpace: "pre-wrap", wordBreak: "break-word",
              lineHeight: "1.6"
            }}>{code}</pre>
          </div>
        );
      }
      return (
        <span key={i} style={{ whiteSpace: "pre-wrap" }}>
          {part.split(/(\*\*.*?\*\*)/g).map((s, j) => {
            if (s.startsWith("**") && s.endsWith("**")) {
              return <strong key={j} style={{ color: "#ff2200" }}>{s.slice(2, -2)}</strong>;
            }
            return s;
          })}
        </span>
      );
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050505",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Courier New', Courier, monospace",
      color: "#bbb",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #111",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "52px",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden"
      }}>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "8px", height: "8px",
            background: "#ff2200",
            borderRadius: "50%",
            boxShadow: "0 0 8px #ff2200",
            animation: "pulse 2.2s infinite"
          }} />
          <span style={{ fontSize: "13px", letterSpacing: "3px", color: "#ddd", textTransform: "uppercase" }}>
            SUNO
          </span>
          <span style={{ fontSize: "13px", letterSpacing: "3px", color: "#ff2200", textTransform: "uppercase" }}>
            ASSISTANT
          </span>
        </div>
        <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#333", textTransform: "uppercase" }}>
          DARK / INDUSTRIAL / BASS
        </div>
        <button
          onClick={() => setShowSettings(s => !s)}
          style={{
            background: showSettings ? "#ff2200" : "transparent",
            border: "1px solid " + (showSettings ? "#ff2200" : "#222"),
            color: showSettings ? "#fff" : "#555",
            fontSize: "10px", letterSpacing: "2px", padding: "5px 12px",
            cursor: "pointer", fontFamily: "'Courier New', monospace",
            textTransform: "uppercase", transition: "all 0.15s"
          }}
          onMouseEnter={e => { if (!showSettings) { e.target.style.borderColor = "#ff2200"; e.target.style.color = "#ff2200"; }}}
          onMouseLeave={e => { if (!showSettings) { e.target.style.borderColor = "#222"; e.target.style.color = "#555"; }}}
        >
          SETTINGS
        </button>

      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div style={{
          background: "#070707",
          borderBottom: "1px solid #1a1a1a",
          display: "flex",
          height: "420px",
          flexShrink: 0,
          overflow: "hidden"
        }}>
          {/* Sidebar */}
          <div style={{
            width: "180px", flexShrink: 0,
            borderRight: "1px solid #111",
            overflowY: "auto",
            padding: "8px 0"
          }}>
            {SETTINGS_SECTIONS.map(s => (
              <div
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                style={{
                  padding: "10px 16px",
                  fontSize: "9px", letterSpacing: "2px",
                  color: activeSection === s.key ? "#ff2200" : "#444",
                  borderLeft: activeSection === s.key ? "2px solid #ff2200" : "2px solid transparent",
                  cursor: "pointer", textTransform: "uppercase",
                  background: activeSection === s.key ? "#0a0a0a" : "transparent",
                  transition: "all 0.1s"
                }}
              >
                {s.label}
              </div>
            ))}
          </div>

          {/* Editor */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px" }}>
            <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#333", marginBottom: "8px", textTransform: "uppercase" }}>
              {SETTINGS_SECTIONS.find(s => s.key === activeSection)?.label}
            </div>
            <textarea
              value={settingsData[activeSection] || ""}
              onChange={e => setSettingsData(prev => ({ ...prev, [activeSection]: e.target.value }))}
              placeholder={SETTINGS_SECTIONS.find(s => s.key === activeSection)?.placeholder}
              style={{
                flex: 1,
                background: "#0a0a0a",
                border: "1px solid #1a1a1a",
                borderBottom: "2px solid #222",
                color: "#ccc",
                padding: "12px 14px",
                fontSize: "12px",
                fontFamily: "'Courier New', monospace",
                resize: "none",
                outline: "none",
                lineHeight: "1.6"
              }}
              onFocus={e => e.target.style.borderBottomColor = "#ff2200"}
              onBlur={e => e.target.style.borderBottomColor = "#222"}
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "10px", alignItems: "center" }}>
              <button
                onClick={saveSettings}
                style={{
                  background: "#ff2200", border: "none", color: "#fff",
                  padding: "8px 20px", fontSize: "10px", letterSpacing: "2px",
                  textTransform: "uppercase", cursor: "pointer",
                  fontFamily: "'Courier New', monospace"
                }}
              >
                SALVESTA
              </button>
              <button
                onClick={resetSettings}
                style={{
                  background: "transparent", border: "1px solid #222", color: "#444",
                  padding: "8px 16px", fontSize: "10px", letterSpacing: "2px",
                  textTransform: "uppercase", cursor: "pointer",
                  fontFamily: "'Courier New', monospace"
                }}
                onMouseEnter={e => { e.target.style.borderColor = "#ff2200"; e.target.style.color = "#ff2200"; }}
                onMouseLeave={e => { e.target.style.borderColor = "#222"; e.target.style.color = "#444"; }}
              >
                LÄHTESTA
              </button>
              {saveStatus && (
                <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#00ff88" }}>
                  {saveStatus}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "82%",
              padding: "12px 16px",
              background: msg.role === "user" ? "#0f0f0f" : "#080808",
              border: msg.role === "user"
                ? "1px solid #1a1a1a"
                : "1px solid #111",
              borderLeft: msg.role === "assistant" ? "2px solid #ff2200" : "none",
              borderRight: msg.role === "user" ? "2px solid #444" : "none",
              fontSize: "13px",
              lineHeight: "1.7",
              color: msg.role === "user" ? "#aaa" : "#c8c8c8",
            }}>
              {msg.role === "assistant" && (
                <div style={{
                  fontSize: "9px", letterSpacing: "2px", color: "#ff2200",
                  marginBottom: "8px", textTransform: "uppercase"
                }}>
                  SUNO GPT
                </div>
              )}
              {renderMessage(msg.content)}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "12px 16px",
              border: "1px solid #111",
              borderLeft: "2px solid #ff2200",
              background: "#080808",
            }}>
              <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                {[0, 1, 2].map(n => (
                  <div key={n} style={{
                    width: "4px", height: "4px",
                    background: "#ff2200",
                    borderRadius: "50%",
                    animation: `bounce 1s infinite ${n * 0.2}s`
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
        borderTop: "1px solid #111",
        padding: "16px 20px",
        display: "flex",
        gap: "12px",
        alignItems: "flex-end",
        flexShrink: 0,
        background: "#050505"
      }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Kirjelda sound, artist, feeling, lugu..."
          rows={1}
          style={{
            flex: 1,
            background: "#0a0a0a",
            border: "1px solid #1a1a1a",
            borderBottom: "2px solid #222",
            color: "#ccc",
            padding: "11px 14px",
            fontSize: "13px",
            fontFamily: "'Courier New', monospace",
            resize: "none",
            outline: "none",
            lineHeight: "1.5",
            minHeight: "42px",
            maxHeight: "120px",
            overflowY: "auto",
            transition: "border-color 0.2s"
          }}
          onFocus={e => e.target.style.borderBottomColor = "#ff2200"}
          onBlur={e => e.target.style.borderBottomColor = "#222"}
          onInput={e => {
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim() ? "#0f0f0f" : "#ff2200",
            border: "none",
            color: loading || !input.trim() ? "#333" : "#fff",
            padding: "11px 20px",
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            fontFamily: "'Courier New', monospace",
            transition: "all 0.15s",
            flexShrink: 0,
            height: "42px"
          }}
          onMouseEnter={e => { if (!loading && input.trim()) e.target.style.background = "#cc1a00"; }}
          onMouseLeave={e => { if (!loading && input.trim()) e.target.style.background = "#ff2200"; }}
        >
          SEND
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb:hover { background: #ff2200; }
      `}</style>
    </div>
  );
}
