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

### Magnifying Glass

- [ ] Select a plant and confirm the Inspector opens.
- [ ] The explanation describes the selected module in plain language.
- [ ] Findings identify their evidence source.
- [ ] A healthy plant does not receive invented warnings.
- [ ] With no `OPENAI_API_KEY`, the deterministic fallback still works.

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
- [ ] Select the sample withered plant and choose **Use Clippers**.
- [ ] Confirm the Magnifying Glass explanation is visible before the confirmation card appears.
- [ ] Review the proposed file scope and choose **Confirm demo rehearsal**; verify no `/api/tend`
  request occurs before confirmation.
- [ ] Confirm the status advances through the lifecycle and ends at `landed`.
- [ ] Confirm the dead-code finding disappears only after the rehearsal re-analysis response.
- [ ] Select the sample stressed plant and choose **Use Watering Can**.
- [ ] Confirm the coverage finding disappears only after its rehearsal re-analysis.
- [ ] Confirm the payoff panel records both completed rehearsals.

These are intentionally labeled **demo rehearsals**. They do not create a real branch or PR, do not
mutate the analyzed repository, and do not claim that a real code change landed. Real branch/PR
execution remains a future/live integration gate. An in-progress rehearsal can expire after a
server restart; restart it from the sample garden if that happens.

### Payoff, seasons, and voices

- [ ] The payoff panel shows the original-versus-current finding comparison.
- [ ] The classroom comparison remains understandable without reading source code.
- [ ] Switch between Early spring, Mid-summer, and Late summer.
- [ ] Confirm the selected season changes the report and garden consistently.
- [ ] Select plants and confirm their voice text is grounded in their current findings.

### Accessibility and failure behavior

- [ ] Use only the keyboard to move through links, controls, plant cards, and tool buttons.
- [ ] Focus remains visible and selected plant state is announced clearly.
- [ ] Enable reduced motion in the operating system/browser and confirm the interface remains usable.
- [ ] Test an invalid GitHub URL and confirm a readable error appears.
- [ ] Test a repository that times out or exceeds limits and confirm the sample/current garden is not
      falsely marked healthy.
- [ ] On a narrow viewport, confirm the form, garden, Inspector, and payoff content remain usable.
- [ ] Confirm there are zero browser console errors and zero uncaught page errors.

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
