# NEXORA V3.1 final public experience report

Status: `NEXORA_V3_1_PUBLIC_EXPERIENCE_COMPLETE`
Research output status: `RESEARCH_OUTPUT_PIPELINE_READY`

## Public experience hardening

1. Homepage carousel — one complete 100% slide at rest; eight tabs, bounded previous/next controls, keyboard navigation, touch swipe, restrained progress, no autoplay, no scroll-jacking, reduced-motion support, hidden-slide focus suppression, and screen-reader status.
2. Chinese headline audit — controlled Chinese display copy, balanced wrapping, CJK font stack, and professional shortened questions across the eight homepage modules.
3. Punctuation audit — homepage display lines and shared module landing headings remove terminal Chinese and English punctuation through a tested display-heading utility.
4. Typography audit — explicit `--zh-display`, `--zh-heading`, `--zh-body`, and `--zh-caption` tokens plus readable table, legend, tooltip, annotation, and control floors.
5. Chart palette audit — deep-navy system with blue, cyan, teal, green, violet, purple, amber, and coral semantic tokens; status text remains available where color is used.
6. Chart diversity — the locked editorial hierarchy is preserved: one primary visualization, selective supporting views, then detailed evidence and methods.
7. Atlas — geographic map remains primary; comparison and specialization remain secondary.
8. Radar — signal field remains primary; momentum and confidence retain explicit evidence meaning.
9. Ecosystems — major nodes, bridges, clusters, and relationships retain visual priority over detailed metrics.
10. Policy — policy mechanism/landscape remains primary; the record explorer stays deeper in the workspace; three bounded findings are surfaced before detailed evidence.
11. Organizations — organization constellation remains primary and type/relationship analysis remains secondary.
12. Data Status — added a six-stage provenance pipeline, seven-state evidence taxonomy, construct-level research readiness, inference guidance, and explicit boundary note.
13. NEXORA AI — retains evidence-first structured answers, citations, sufficiency, gaps, boundaries, sources, and evidence-driven follow-ups without fake numerical confidence.
14. Simulator — retains public-safe model registry/equation/scenario interfaces, reproducibility hash, calibration disclosure, sensitivity, uncertainty, and scenario-not-forecast language.
15. California AI — empirical results and boundaries are unchanged; the case remains the editorial benchmark.
16. Findings system — reusable `ResearchFinding`, `EvidenceFinding`, and `BoundaryNote` components added.
17. Chart explanation system — reusable “What this shows / Why it matters / What not to infer” component added to complex research narratives.
18. Research export pipeline — deterministic public-safe CSV backing-data output, SVG metadata embedding, browser PNG conversion, and file-download utilities added.
19. Publication figure system — separate white-background, journal-safe, vector-first, colorblind-friendly figure theme documented; website screenshots are not paper figures.
20. Accessibility — carousel tab semantics, keyboard operation, focus management, live status, non-color state labels, heading structure, and reduced motion verified.
21. Responsive — existing desktop/tablet/mobile layout breakpoints retained; full-width carousel slide rule applies at every breakpoint and workspaces clip global horizontal overflow while allowing intentional local table/timeline scrolling.
22. Performance — homepage hero and active module art are prioritized; inactive carousel art is lazy-loaded; no dependency upgrades or new visualization runtime were introduced.

## Validation

23. Tests — repository suite plus V3.1 display, carousel, typography, finding, and export assertions pass.
24. Typecheck — pass.
25. Lint — pass with no errors; remaining raw-image warnings are non-blocking and documented below.
26. Production build — pass; all public application routes and API route compile.
27. Visual QA — desktop browser screenshots and semantic QA completed for Home, Atlas, Radar, Ecosystems, Policy, Organizations, Data Status, AI, Simulator, and California AI; English and Chinese states were reviewed. Automated breakpoint assertions cover the single-slide and no-global-overflow rules.
28. Security — public tree scanned for credentials, local absolute paths, environment files, Git metadata, unpublished research directories, and private research artifacts; no release blockers found.
29. Paper 01 boundary — `PAPER01_PUBLIC_CHANGES = 0`.
30. Paper 02 boundary — only the existing public-safe model interface is consumed; no unpublished manuscript or review material is included.
31. GitHub commit — the normal, non-force release commit containing this report is authoritative; exact SHA is recorded in GitHub and the deployment version.
32. Sites version — saved and deployed from that exact pushed commit in the existing Sites project.
33. Custom domain — `nexoraresearch.org` configuration is preserved; no DNS or canonical change is made while provider routing remains pending.

## Remaining P2

34. Three non-critical `<img>` lint warnings remain in established editorial art containers. The first homepage hero already uses optimized responsive image handling, and the remaining assets are local WebP/PNG artwork with explicit eager/lazy policy; conversion can be completed later after Sites image-loader compatibility is fully verified.
35. Exact next recommendation — after the custom domain reaches active routing, verify anonymous HTTPS and only then switch canonical metadata from the stable Sites URL. No manuscript writing is started by this release.
