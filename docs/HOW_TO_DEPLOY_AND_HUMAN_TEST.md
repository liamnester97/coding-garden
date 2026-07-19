# How to Deploy and Human-Test Code Garden

This guide is for trying the current standalone Code Garden release locally or through Vercel.
The normal public workflow does not require a fork, GitHub login, or `OPENAI_API_KEY`.

## What you need

- Node.js and npm.
- The public GitHub repository: `liamnester97/coding-garden`.
- A Vercel account only if you want to deploy your own preview.
- `OPENAI_API_KEY` is optional. Without it, deterministic report-grounded explanations remain
  available.

Public repository analysis is read-only. Code Garden fetches bounded public GitHub source files,
does not install or execute the target repository, and does not need permission to modify it.

## Test locally

From the repository root:

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js, normally `http://localhost:3000`.
If `http://127.0.0.1:3000` does not respond, use `http://localhost:3000` exactly; some local
browser or network-permission configurations treat the two loopback hostnames differently.

To test the production build locally instead:

```bash
npm run build
npm run start
```

Open the URL printed by `next start`. Stop either server with `Ctrl-C`.

The automated quality suite is:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run analysis:validate
npm run build
```

## Deploy a Vercel preview

1. Sign in to Vercel and choose **Add New → Project**.
2. Import `liamnester97/coding-garden`.
3. Keep the detected **Next.js** framework and default build settings.
4. Add `OPENAI_API_KEY` only if you want to exercise live server-side explanations. Do not add it
   to client-side code or commit it to the repository.
5. Deploy and open the preview URL.
6. If the preview is protected by Vercel SSO or deployment protection, disable protection for the
   preview you are testing or use a public production deployment. The app itself remains login-free.

The deployed app supports these routes:

- `/` — garden UI and human test flow.
- `/api/health` — service health and current mode.
- `/api/explain` — validated report-grounded explanation.
- `/api/repository/analyze` — bounded, read-only public GitHub analysis.
- `/api/challenge` — sample-only, report-grounded learning questions and answer proofs.
- `/api/tend` — explicit demo-rehearsal command lifecycle.

A separate demo fork is not required for deployment or normal human testing.

## Human test checklist

Record failures in the evidence table below. Test once on a wide screen and once on a phone-sized
viewport when possible.

### Initial sample mode

- [ ] The page loads without a login or API key.
- [ ] The header says **sample mode**.
- [ ] Three sample plants and their health summary are visible.
- [ ] The report source says the sample is offline and requires no credentials.
- [ ] No browser console errors or uncaught page errors appear.

### Stage 11 pixel-garden visuals

Test this section against the local build or the current branch’s Vercel preview. The production URL may
still serve the earlier verified release until the visual bundle is deliberately promoted.

- [ ] The map uses cozy pixel-art sprites rather than placeholder circles for the gardener, plants, and
      tool stations.
- [ ] The authored garden includes visible terrain/ground texture, paths, a learning greenhouse, tool
      shed, entrance, pond, roots, trees, flower beds, and classroom/payoff decorations.
- [ ] The three analyzed sample plants remain visibly distinct: healthy, stressed, and withered.
- [ ] Plant health visuals agree with the summary chips, plant cards, and Inspector text.
- [ ] The gardener sprite appears inside the map and moves without leaving the map boundary.
- [ ] Magnifying Glass, Clippers, and Watering Can have distinct visual tool sprites and matching text
      labels.
- [ ] Roots remain tied to analyzed imports; decorative roots do not create additional findings or nodes.
- [ ] The map remains readable as a wide shot before opening the Inspector.
- [ ] Resize to a phone-sized viewport: sprites remain visible, the map does not create horizontal page
      overflow, and the controls remain usable.
- [ ] Enable reduced motion and confirm the sprite map remains usable without requiring animation.
- [ ] Open the browser Network panel and confirm both pixel-garden atlas assets load successfully:
      `terrain-landmarks.webp` and `characters-tools-states.webp`.

### Stage 12 authored garden map

- [ ] The wide shot clearly reads as one fixed garden with a gate, learning greenhouse, code beds,
      root crossing, tool shed, and reflection/payoff area.
- [ ] Authored walking paths are visually distinct from the analyzed import roots.
- [ ] Zone labels explain what a player does there without requiring source-code knowledge.
- [ ] Reloading the same report keeps the map zones and plant placement stable.
- [ ] Changing the report changes only report-derived plants, roots, findings, and health—not the
      authored map structure.
- [ ] No decorative path, landmark, or zone is presented as a code finding.

### Stage 13 map-first controls and learning

- [ ] Movement buttons and tool-station controls are inside the map; there is no second movement toolbar below it.
- [ ] Arrow keys/WASD and the in-map buttons move the gardener; the sprite faces the last direction pressed.
- [ ] The gardener stops at the greenhouse, shed, pond, trees, beds, bench, and classroom scroll instead of walking
      through them.
- [ ] Clicking a visible plant opens its evidence/Inspector state, and the learning question opens as a map overlay.
- [ ] Easy uses a short, simple prompt; Medium and Hard remain available for older learners.
- [ ] The map overlay supports keyboard focus, Escape cancellation, and readable mobile layout.
- [ ] Move near a plant, station, greenhouse, or reflection bench and verify the in-map proximity status changes.
- [ ] Press Enter or the in-map interaction button and verify the nearby target is inspected without leaving the map.
- [ ] Move the gardener and verify the camera-follow layer shifts the authored world while the HUD stays usable.

### Magnifying Glass

- [ ] Select a plant and confirm the Inspector opens.
- [ ] The explanation describes the selected module in plain language.
- [ ] Findings identify their evidence source.
- [ ] A healthy plant does not receive invented warnings.
- [ ] With no `OPENAI_API_KEY`, the deterministic fallback still works.

### Stage 14 exploration-to-learning journey

- [ ] The in-map **Learning journey** shows eight steps: Enter, Explore, Inspect, Answer, Confirm, Tend,
      Re-analyze, and Reflect.
- [ ] Move the gardener and select a plant; Explore and Inspect become complete without changing report health.
- [ ] On the sample, answer the question, review the proposed scope, and confirm before the rehearsal begins.
- [ ] Watch the journey advance through Tend and Re-analyze only as the server lifecycle responds; the final report
      update is the event that changes the garden.
- [ ] Visit the reflection/payoff surface and confirm the before/after explanation is visible.
- [ ] Analyze a public repository and confirm its journey explains read-only exploration/inspection; it never offers
      a tending rehearsal or synthetic healing.
- [ ] Trigger a failed or expired rehearsal and confirm the readable error leaves the original report unchanged.
- [ ] Repeat the journey with keyboard focus, reduced motion, and a phone-sized viewport.

### Stage 15 grade-band levels and map-only controls

- [ ] Level 1 / Early spring identifies **Grades 1–5** and uses Easy notice-and-count questions.
- [ ] Level 2 / Mid-summer identifies **Grades 6–8** and uses Medium clue-connection questions.
- [ ] Level 3 / Late summer identifies **Grades 9–12** and uses Hard safe-next-step questions.
- [ ] The level and age-band selectors are in the compact toolbar above the map; the season palette changes without
      changing report truth.
- [ ] Walk to a finding plant and press Enter or E; the challenge opens without using controls below the map.
- [ ] Press H or **Show hint** to reveal help. Submit an incorrect answer and confirm the response explains the idea
      in plain language before retrying.
- [ ] Confirm the gardener sprite faces up, down, left, and right after keyboard movement, and solid map objects block
      movement.
- [ ] Confirm the lower plant list and Inspector are informational fallbacks only; game actions stay in the map.

### Stage 16–18 map readability and navigation

- [ ] Confirm the map is large enough to read as the dominant game surface on desktop; the HUD does not make the
      world feel tiny.
- [ ] Confirm zone borders are subtle, guided walkways are visible, and the soft yellow halo identifies the next
      target without obscuring the plant or landmark.
- [ ] Confirm the compact objective ribbon names the next target and key action while leaving the map visible.
- [ ] Open a learning question and confirm its bounded in-map card does not hide the entire garden; close it with
      Escape and reopen it with Enter/E near the target.
- [ ] Walk from the entrance to the greenhouse, Magnifying Glass, Clippers, Watering Can, plants, and reflection
      area; confirm every destination has a clear walkway.
- [ ] Walk into buildings, ponds, bushes, trees, beds, and landmarks; confirm the gardener stops outside them.
- [ ] Press each direction, including into a blocked object, and confirm the avatar faces the last direction pressed.
- [ ] Open the Garden Journal after moving, inspecting, answering, or rehearsing; confirm it is a local session recap
      and does not claim server persistence or repository mutation.
- [ ] Confirm the classroom comparison names the current grade band/learning focus and preserves the read-only/public
      report boundary.
- [ ] Resize to a phone-sized viewport and repeat the map, halo, collision, overlay, keyboard, and reduced-motion
      checks without horizontal overflow.

### Stages 19–22 teaching repository and gameplay clarity

- [ ] Confirm the local teaching fixture contains lessons for Grades 1–5, 6–8, and 9–12 and loads without network
      access.
- [ ] Use the Lesson selector to compare First Sprouts, Root Riddles, and Safe Harvest; confirm the default demo shows
      five plants while the older comparison lessons remain available.
- [ ] Confirm the future public teaching repository contains no secrets, student data, private code, or unlicensed
      assets, and record the pinned commit once published.
- [ ] Verify the top toolbar contains the controls and instructions; the map remains the dominant surface.
- [ ] Click a plant and confirm it only selects/inspects the plant. Walk close to a target and press E or Enter to
      open the question; proximity alone must not open it.
- [ ] Use Fullscreen, then Escape or the exit button; confirm focus and keyboard movement still work.
- [ ] Open and close the optional Magnifying Glass details; confirm the concise in-game teaching card remains readable.
- [ ] Test each grade band with a learner or reviewer: notice/count, connect evidence, and explain a safe next step.
- [ ] Submit wrong answers and confirm the learner receives a kind explanation, hint, and retry path without health loss.
- [ ] Repeat on desktop keyboard, phone-sized touch, reduced motion, and a second browser.

### Public repository analysis

- [ ] Enter a public URL such as `https://github.com/ColorlibHQ/gentelella`.
- [ ] Submit it without signing in to GitHub.
- [ ] The garden changes to **public report** mode after analysis completes.
- [ ] The report shows the resolved commit and analysis methods.
- [ ] If the intake is bounded, the UI explicitly states analyzed, supported, and omitted files.
- [ ] The page never asks for a GitHub token.

### Demo-rehearsal tools

- Return to the offline sample garden before using a tool. Public GitHub reports are strictly
  read-only and do not show tending controls.
- [ ] Walk to the sample withered plant and press **E** (or Enter) to begin the Clippers lesson.
- [ ] Confirm the Magnifying Glass explanation is visible before the confirmation card appears.
- [ ] Try Easy, Medium, and Hard; an incorrect answer shows a hint and keeps confirmation locked.
- [ ] Answer correctly and verify the proposed-scope confirmation becomes available.
- [ ] Review the proposed file scope and choose **Confirm and rehearse**; verify no `/api/tend`
      request occurs before confirmation.
- [ ] Confirm the status advances through the lifecycle and ends at `landed`.
- [ ] Confirm the dead-code finding disappears only after the rehearsal re-analysis response.
- [ ] Walk to the sample stressed plant and press **E** (or Enter) to begin the Watering Can lesson.
- [ ] Confirm the coverage finding disappears only after its rehearsal re-analysis.
- [ ] Confirm the payoff panel records both completed rehearsals.
- [ ] Let a command or challenge expire/restart and verify the UI reports a recoverable error without
      changing garden health.
- [ ] Reuse a learning proof or forge a lifecycle state and verify the server rejects it.

These are intentionally labeled **demo rehearsals**. They do not create a real branch or PR, do not
mutate the analyzed repository, and do not claim that a real code change landed. Real branch/PR
execution remains a future/live integration gate. An in-progress rehearsal can expire after a
server restart; restart it from the sample garden if that happens.

### Current-release recording run-of-show

Use this sequence for a truthful sub-three-minute recording of the public release:

1. Open the production URL in sample mode and show the sick plants, roots, findings, and offline source
   label.
2. Select a plant with the Magnifying Glass and read one plain-language explanation, naming GPT-5.6 as
   the optional grounded narrator and the deterministic fallback as the no-key path.
3. Visit Clippers, answer the authored challenge, show that confirmation is locked before the answer,
   review the proposed scope, and confirm the sample rehearsal.
4. Show the lifecycle status reaching `landed`, then show the finding disappearing only after the
   re-analysis response and the payoff/classroom comparison.
5. Repeat the learning-gated Watering Can path briefly, then close on the before/after garden.
6. Say explicitly that Codex built and verified the experience, while this public release remains
   read-only for analyzed repositories and does not create real branches or PRs.

If a future credentialed live integration is recorded, keep it as a separately labeled segment and
show the actual branch, checks, PR, and re-analysis evidence rather than blending it with rehearsal
behavior.

### Payoff, seasons, and voices

- [ ] The payoff panel shows the original-versus-current finding comparison.
- [ ] The classroom comparison remains understandable without reading source code.
- [ ] Switch between Early spring, Mid-summer, and Late summer.
- [ ] Confirm the selected season changes the report and garden consistently, and recommends Level 1/Easy,
      Level 2/Medium, then Level 3/Hard.
- [ ] Select plants and confirm their voice text is grounded in their current findings.
- [ ] After a rehearsal, confirm the classroom panel explains the learning loop and counts completed
      demo rehearsals without claiming a real PR.
- [ ] Focus the garden map and move the gardener with arrow keys or WASD; verify the avatar stays
      inside the map and the three tool stations remain visible.

### Accessibility and failure behavior

- [ ] Use only the keyboard to move through links, controls, plant cards, and tool buttons.
- [ ] Focus remains visible and selected plant state is announced clearly.
- [ ] Enable reduced motion in the operating system/browser and confirm the interface remains usable.
- [ ] Test an invalid GitHub URL and confirm a readable error appears.
- [ ] Test a repository that times out or exceeds limits and confirm the sample/current garden is not
      falsely marked healthy.
- [ ] On a narrow viewport, confirm the form, garden, Inspector, and payoff content remain usable.
- [ ] Confirm there are zero browser console errors and zero uncaught page errors.

### Wave 1 in-map trust and recovery checks

- [ ] On a fresh session, read the small First visit guide; dismiss it with `Got it` and reopen it from `Help / pause`.
- [ ] Confirm the map always labels the current mode as `Sample rehearsal` or `Public read-only`.
- [ ] Open `Help / pause` and confirm it stays inside the map, explains the golden path, and does not hide the whole world.
- [ ] Use `Reset lesson` after moving or starting a challenge; confirm the gardener, journal, season, and local
      rehearsal state return to the sample starting point without a page refresh.
- [ ] Confirm reset does not claim a repository change, branch, PR, or live health update.

### Wave 2 learning progression checks

- [ ] Choose each learner age band and confirm the label explains Grades 1–5, 6–8, and 9–12 in plain language.
- [ ] Confirm the recommended challenge depth is visible and can be overridden locally.
- [ ] Open a sample challenge and reveal clues one at a time; confirm clues do not reveal the answer or unlock tending.

### Evidence-first teaching and quieter map

- [ ] Load each teaching lesson and confirm five curated findings show short, real code excerpts.
- [ ] Choose a multiple-choice answer and confirm only a server-validated correct answer unlocks the next step.
- [ ] Type an accepted answer without an OpenAI key and confirm the deterministic fallback works.
- [ ] Submit a wrong answer and confirm the explanation is grounded in the displayed code and report evidence.
- [ ] Confirm tool stations and distracting labels are absent from the map, while the in-map tool-ready surface names
      the metaphorical tool when a finding is nearby.
- [ ] Confirm the Garden dialogue card remains visible before, during, and after a question.
- [ ] Complete a sample rehearsal and open **Review possible fixes**. Confirm it lists proposed scopes but claims no
      branch, commit, PR, or repository mutation.
- [ ] Analyze a public repository and confirm no challenge or proposed fix can write to it.
- [ ] Submit a wrong answer and confirm the feedback explains the idea to revisit without shame or health loss.
- [ ] Submit the correct answer and confirm only then does `Confirm and tend` become available.

### Automated browser smoke checks

After installing dependencies, run:

```text
npx playwright install chromium
npm run test:browser
```

The smoke suite starts the local Next.js server and checks desktop plus Chromium-based mobile emulation for plant
pointer inspection, the in-map challenge overlay, keyboard-facing updates, horizontal overflow, reduced-motion
behavior, public read-only mode, and page/console errors. If port 3000 is occupied by an old development server,
stop that server and rerun the command so the suite can manage its own server.

## Troubleshooting

| Symptom                                    | Check                                                                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `npm` or Node command missing              | Install a current Node.js release, reopen the terminal, and rerun `npm install`.                                                |
| Invalid repository message                 | Use exactly `https://github.com/owner/repository` for a public repository; do not paste a branch, issue, query, or private URL. |
| Analysis timeout or rate-limit response    | Wait and retry; the endpoint is bounded and best-effort rate-limited. The offline sample remains available.                     |
| Explanation works but live GPT is not used | This is expected without `OPENAI_API_KEY`; deterministic fallback is the supported path.                                        |
| Vercel asks for login                      | Check deployment protection/SSO settings for that preview. This is separate from Code Garden’s public app behavior.             |
| Browser/API failure                        | Check the browser Network and Console panels, confirm the deployment is ready, then try `/api/health`.                          |
| Tool action does not produce a PR          | This release is in demo-rehearsal mode; no real PR is claimed or required for ordinary testing.                                 |

## Test evidence

| Field                   | Result |
| ----------------------- | ------ |
| Deployment URL          |        |
| Commit tested           |        |
| Date and device/browser |        |
| Local or Vercel         |        |
| Checklist result        |        |
| Known limitations       |        |

For project status and stage gates, use the root [PROJECT_STATUS.md](../PROJECT_STATUS.md) and
[STAGE_TRACKER.md](../STAGE_TRACKER.md). This document is a how-to and test record template, not a
second execution plan.

### Wave 3 loop clarity checks

- [ ] Confirm the in-map Current action card clearly changes from learning question to confirmation/rehearsal,
      re-analysis, and verified health change.
- [ ] Complete a sample rehearsal and verify the optional Reflection bench saves a short note only to the local
      Garden Journal session; it must not claim a repository change or require an account.

### Bundle 11 open-ended teaching demo checks

- [ ] Confirm the dedicated teaching demo loads by default without GitHub login, an API key, or network access.
- [ ] Confirm the guide clearly labels `Sprout / Easy — Grades 1–5`, `Growing / Medium — Grades 6–8`, and
      `Master Gardener / Hard — Grades 9–12`.
- [ ] Confirm all five plants/questions are visible before answering anything and can be completed in any order.
- [ ] Confirm every playable question uses four multiple-choice answers and mixes Find it, Plan it, and Execute it
      activities for the selected level.
- [ ] Confirm the active dialogue expands inside the game surface and shows the bounded code excerpt, direct action
      wording, choices, hint, small example, and explanation after a wrong answer.
- [ ] Confirm wrong answers are non-punitive, retries remain available, and a correct answer blooms only its own plant.
- [ ] Solve all five targets and confirm the separate completion window shows all blooms, before/after code,
      proposed fixes, re-analysis results, and the healthier-garden summary.
- [ ] Close the completion window and confirm the learner can replay or reset at another level without refreshing.
- [ ] Confirm reset clears only local session state and does not claim a remote repository change.
- [ ] Confirm unsupported real findings are labeled `More to explore` rather than presented as playable lessons.
- [ ] Confirm the demo never silently overwrites source files; output choices are explicit and reviewable.
- [ ] Record whether the demo produced the expected corrected copy/diff. ZIP/folder and authenticated branch/PR
      outputs remain future gates unless separately enabled and evidenced.

### Bundle 12 Easy-first feedback checks

- [ ] Confirm the map is not overly zoomed and remains the dominant surface in full-screen and normal browser views.
- [ ] Confirm there are no unexplained lines, overlapping objects, duplicate grade controls, stale panels, or
      distracting content outside the game surface.
- [ ] Walk from the entrance to every plant; confirm the visible walkway matches collision behavior and no target is
      trapped behind a solid object.
- [ ] Confirm only unfinished plants have golden halos; after a correct answer the plant visibly blooms and its halo
      disappears.
- [ ] Approach a plant and press `E`/`Enter`; confirm a short dialogue appears. Press the key again and confirm the
      full question opens inside the map.
- [ ] Test Easy first with short questions, simple intentional bugs, four answer boxes where applicable, hints,
      examples, wrong-answer retry, and optional `Y` explanation review.
- [ ] Solve all five in a non-sequential order; confirm every solved plant heals immediately and completion shows the
      before/after code, proposed fixes, re-analysis evidence, and safe output choices.
- [ ] Reset and confirm the five-question session returns to the initial state without changing a repository.
- [ ] Confirm Growing and Master Gardener can be unlocked after Easy, but are not required for the first-run demo.
- [ ] Confirm the title/framing reads as a garden adventure for finding and fixing bugs in code.
