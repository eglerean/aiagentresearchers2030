---
theme: ./slidev-theme-aalto-scicomp
themeConfig:
  palette: aalto-classic
  credit:
    text: Enrico Glerean · CC BY 4.0
    url: https://eglerean.github.io/
  download:
    url: /slides.pdf
    text: Download PDF
title: Rethinking research computing and data infrastructures for non-human users
author: Enrico Glerean
info: |
  Slides by Enrico Glerean (https://eglerean.github.io/), CC BY 4.0.
  Flash talk, TiLa · DAHA workshop, 7 October 2026.
  Source: https://github.com/eglerean/aiagentresearchers2030
keywords: AI agents, research computing, HPC, research data management, Enrico Glerean, https://eglerean.github.io/
layout: cover
class: no-footer
hexText: "AI\nAGENTS"
hexSeed: 7
---

###### TiLa · DAHA workshop · Flash talk

# Rethinking research computing and data infrastructures for non-human users

AI agents as the new users of research computing and data services. 

::presenter::
**Enrico Glerean**, Staff Scientist, Aalto University · 7 October 2026

<div class="license-line"><CcBy /> <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> · <a href="https://github.com/eglerean/aiagentresearchers2030" class="gh-link" title="Slides on GitHub" aria-label="Slides on GitHub"><carbon-logo-github class="gh-icon" /></a></div>

<style>
h1 { font-size: 2.5rem !important; line-height: 1.1 !important; }
p { font-size: 0.95rem; }
.cover-presenter p { font-size: 0.85rem; }
.license-line { margin-top: 0.45rem; font-size: 0.75rem; white-space: nowrap; }
.gh-icon { vertical-align: -0.2em; width: 1.15em; height: 1.15em; }
.license-line a.gh-link { border-bottom: none; text-decoration: none; color: inherit; }
</style>

<!--
Workshop on updating Finland's reference architectures for scientific computing (TiLa) and research data management (DAHA).
-->

---
layout: section
color: dark
hexText: "AI?"
class: title-middle
---

# What is AI?

---
layout: three-cols
---

::header::
###### AI means everything and nothing

# What is AI in research? Topic, method, tool

<div class="ref-line">Reference: <a href="https://www.aalto.fi/en/research-art/best-practices-for-ai-use-in-research-work">Best practices for AI use in research work (Aalto.fi)</a></div>

<style>
.ref-line { font-size: 0.7rem; opacity: 0.75; margin: -0.6rem 0 0.8rem; }
.col li { line-height: 1.4; margin: 0.2rem 0; }
</style>

::left::

### AI as a topic

AI is what is being studied.

- A new ML model or architecture
- A new algorithm for training
- How people interact with AI chatbots

::center::

### AI as a method

AI is how the data are analysed.

- A deep neural network that classifies tissue in cancer imaging data
- scikit-learn models in the analysis of a dataset

::right::

### AI as a tool

AI is something that helps with the work.

- Brainstorming with ChatGPT
- Claude Code writing analysis scripts
- An AI assistant helping to fill in a data management plan

<!--
Today I am talking about the third column, the tool, and about how the tool turns into a user.
-->

---
layout: default
---

###### The researcher's AI wish list

# What do researchers want AI help with?

<div class="chart-wrap">
<BarChart unit="%" :max="70" :items="[
  { label: 'Project-specific research help', value: 47.54 },
  { label: 'Literature search and synthesis', value: 65.03 },
  { label: 'Planning and grant writing', value: 32.24 },
  { label: 'Research data management, ethics or compliance', value: 22.4 },
  { label: 'Software coding', value: 56.83 },
  { label: 'Data analysis', value: 54.64 },
  { label: 'Lab, fieldwork or instrument workflows', value: 12.02 },
  { label: 'Manuscript writing/editing', value: 50.82 },
  { label: 'Citation checking', value: 28.96 },
  { label: 'Project administration or reporting', value: 24.04 },
  { label: 'Other', value: 7.65 }
]" />
</div>

<div class="chart-source">Share of respondents per task, multiple choices per respondent. Source: Aalto University survey on AI agents, 2026 (N = 183).</div>

<style>
.chart-wrap { margin-top: 0.6rem; max-width: 46rem; }
.chart-source { font-size: 0.6rem; opacity: 0.7; margin-top: 0.6rem; }
</style>

<!--
CUT THIS SLIDE FIRST IF SHORT ON TIME.

Data (% of respondents):
- Literature search and synthesis: 65.03%
- Software coding: 56.83%
- Data analysis: 54.64%
- Manuscript writing/editing: 50.82%
- Project-specific research help: 47.54%
- Planning and grant writing: 32.24%
- Citation checking: 28.96%
- Project administration or reporting: 24.04%
- Research data management, ethics or compliance: 22.40%
- Lab, fieldwork or instrument workflows: 12.02%
- Other: 7.65%
-->

---
layout: image-left
image: /scenarios_summary.png
class: wide-image fit-image
---

###### Software coding as a case study

# The tool became a user

1. **Chat window**: copy and paste
2. **Coding assistant**: in the editor
3. **Agent**: logs in, reads files, submits jobs

<div class="card clay" style="margin-top: 1rem">

**Next, the fourth role:** AI as a *user* acting for a researcher.

</div>

<div style="font-size: 0.6rem; opacity: 0.7; margin-top: 1rem">Figure: <a href="https://coderefinery.github.io/coding-with-ai/">CodeRefinery, Coding with AI</a></div>

---
layout: default
color: dark
---

###### Concepts

# What is an AI agent?

<div style="display: grid; grid-template-columns: 1fr 1.05fr; gap: 1.75rem; margin-top: 0.75rem; align-items: start">
<div style="font-size: 0.9rem">

An AI agent pairs the model with more components so that it can **take real actions**.

- **The model**, the "intelligence box": the LLM itself.
- **The scaffolding**, between the two: system prompts, tool descriptions, and the rules for how context is assembled and formatted before it reaches the model.
- **The harness**, the "body": the code around the model that calls it, carries out whatever it asks for, and decides when the task is done.

</div>
<div>
<div class="agent-diagram">
  <div class="ad-harness">
    <div class="ad-label">Harness · the body</div>
    <div class="ad-sub">calls the model · runs its actions · decides when done</div>
    <div class="ad-scaffold">
      <div class="ad-label">Scaffolding</div>
      <div class="ad-sub">system prompt · tool descriptions · context assembly</div>
      <div class="ad-model">
        <div class="ad-label">Model</div>
        <div class="ad-sub">the LLM · the intelligence box</div>
      </div>
    </div>
  </div>
  <div class="ad-arrows">⇅</div>
  <div class="ad-env">
    <div class="ad-label">Environment</div>
    <div class="ad-chips"><span>files</span><span>shell</span><span>Slurm</span><span>APIs</span><span>web</span></div>
  </div>
</div>
<div class="ad-source">Adapted from Hugging Face, <a href="https://huggingface.co/blog/agent-glossary">"Harness, Scaffold, and the AI Agent Terms Worth Getting Right"</a>, 2026</div>
</div>
</div>

<style>
.agent-diagram { display: flex; flex-direction: column; align-items: stretch; gap: 0.4rem; font-size: 0.8rem; }
.agent-diagram .ad-label { font-family: var(--asc-font-serif); font-weight: 600; font-size: 1rem; }
.agent-diagram .ad-sub { opacity: 0.75; font-size: 0.72rem; margin-bottom: 0.5rem; }
.ad-harness { border: 2px solid var(--asc-clay); border-radius: var(--asc-radius-lg); padding: 0.8rem 1rem; }
.ad-scaffold { border: 1.5px dashed rgba(250, 249, 245, 0.45); border-radius: var(--asc-radius-md); padding: 0.7rem 0.9rem; background: var(--asc-night-raised); }
.ad-model { background: var(--asc-clay); color: var(--asc-ink); border-radius: var(--asc-radius-md); padding: 0.6rem 0.9rem; }
.ad-model .ad-sub { margin-bottom: 0; opacity: 0.85; }
.ad-arrows { text-align: center; font-size: 1.4rem; line-height: 1; color: var(--asc-clay); }
.ad-env { border: 1px solid rgba(250, 249, 245, 0.3); border-radius: var(--asc-radius-md); padding: 0.55rem 0.9rem; display: flex; align-items: center; gap: 1rem; }
.ad-chips { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.ad-chips span { background: rgba(250, 249, 245, 0.12); border-radius: 999px; padding: 0.1rem 0.6rem; font-size: 0.72rem; }
.ad-source { font-size: 0.65rem; opacity: 0.7; margin-top: 0.6rem; text-align: right; }
</style>

---
layout: default
---

###### Machines as users

# Machines were clients, agents become users

<div class="mu-grid">
<div class="card">

### Today

<div class="mu-chips"><span>APIs</span><span>scripts</span><span>workflows</span><span>CI</span><span>schedulers</span></div>

...already query machines.

</div>
<div class="card dark">

### Agents

- persistent
- adaptive
- retrying
- parallel
- capable of spawning more activity

</div>
</div>

<div class="card clay mu-claim">

The novelty is not machine access; it is that machines can now **act, adapt, and repeat at a scale humans cannot.**

</div>

<style>
h1 { font-size: 2.15rem !important; }
.mu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.75rem; }
.mu-grid .card h3 { margin-bottom: 0.6rem; }
.mu-grid ul { margin: 0; }
.mu-grid li { line-height: 1.35; margin: 0.1rem 0; }
.mu-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.8rem; }
.mu-chips span { background: var(--asc-sunken); border: 1px solid var(--asc-border); border-radius: 999px; padding: 0.15rem 0.7rem; font-size: 0.8rem; }
.mu-claim { margin-top: 1rem; padding: 0.9rem 1.5rem; font-family: var(--asc-font-serif); font-size: 1.3rem; line-height: 1.3; }
</style>

---
layout: default
---

###### Scaling infrastructures

# One researcher ≠ one workload

<div class="ow-top">
<div class="ow-fan">
  <div class="ow-stage">
    <div class="ow-count">1</div>
    <div class="ow-viz"><span class="ow-person" /></div>
    <div class="ow-cap">researcher</div>
  </div>
  <div class="ow-arrow">→</div>
  <div class="ow-stage">
    <div class="ow-count">10</div>
    <div class="ow-viz ow-agents"><span v-for="i in 10" :key="i" class="ow-hex" /></div>
    <div class="ow-cap">agents</div>
  </div>
  <div class="ow-arrow">→</div>
  <div class="ow-stage">
    <div class="ow-count">100</div>
    <div class="ow-viz ow-actions"><span v-for="i in 100" :key="i" class="ow-dot" /></div>
    <div class="ow-cap">concurrent actions</div>
  </div>
  <div class="ow-chips">
    <span>login-node sessions</span><span>scheduler queries &amp; submissions</span><span>disk quota</span><span>filesystem metadata operations</span><span>catalogue &amp; API requests</span><span>model calls</span>
  </div>
</div>
<div class="ow-assume">
<div class="card">

###### The old assumption

1 account ≈ 1 human ≈ human-speed interaction

</div>
<div class="card clay">

###### The 2030 assumption

1 researcher → N agents → N×M concurrent actions

</div>
</div>
</div>

<div class="card dark ow-bottom">

A service designed for **5,000 users** faces activity from **500,000 concurrent actions**. 

<b>What will break first?</b>

</div>

<style>
.ow-top { display: grid; grid-template-columns: 1.45fr 1fr; gap: 1rem; margin-top: 0.2rem; align-items: stretch; }
.ow-fan { display: grid; grid-template-columns: auto auto auto auto auto; align-items: center; justify-content: start; column-gap: 0.7rem; }
.ow-stage { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
.ow-count { font-family: var(--asc-font-serif); font-size: 1.6rem; line-height: 1; color: var(--asc-text); }
.ow-cap { font-size: 0.72rem; color: var(--asc-muted); text-align: center; }
.ow-arrow { font-size: 1.4rem; color: var(--asc-muted); }
.ow-viz { height: 5.2rem; display: flex; align-items: center; justify-content: center; }
.ow-person { width: 1.6rem; height: 1.6rem; border-radius: 50%; background: var(--asc-text); }
.ow-agents { display: grid; grid-template-columns: repeat(2, 0.85rem); gap: 0.18rem; align-content: center; }
.ow-hex { width: 0.85rem; height: 0.92rem; background: var(--asc-clay); clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); }
.ow-actions { display: grid; grid-template-columns: repeat(10, 0.36rem); gap: 0.16rem; align-content: center; }
.ow-dot { width: 0.36rem; height: 0.36rem; border-radius: 50%; background: var(--asc-clay); opacity: 0.85; }
.ow-chips { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.45rem; }
.ow-chips span { background: var(--asc-surface); border: 1px solid var(--asc-border); border-radius: 999px; padding: 0.1rem 0.6rem; font-size: 0.68rem; }
.ow-assume { display: flex; flex-direction: column; gap: 0.6rem; justify-content: center; }
.ow-assume .card { padding: 0.55rem 1rem; font-family: var(--asc-font-serif); font-size: 0.95rem; line-height: 1.3; }
.ow-assume h6 { font-family: var(--asc-font-sans); margin: 0 0 0.25rem 0; }
.ow-assume .card.clay h6 { color: inherit; }
.ow-bottom { margin-top: 0.6rem; padding: 0.6rem 1.3rem; }
.ow-bottom p { font-family: var(--asc-font-serif); font-size: 1.02rem; line-height: 1.3; margin: 0; }
.ow-breaks { margin-top: 0.35rem; font-size: 0.74rem; line-height: 1.45; opacity: 0.9; }
.ow-breaks b { color: inherit; margin-right: 0.3rem; }
</style>

<!--
Frame this as a design scenario, not a prediction: if each researcher runs about 10 agents and each agent about 10 concurrent actions,
a service sized for 5,000 users sees 500,000 concurrent actions.
-->

---
layout: default
color: sand
---

###### Looking ahead

# New opportunities for 2030

<div class="card-grid" style="margin-top: 1.25rem">
<div class="card">

### Compute automates all research tasks

**LLM inference for AI agents will be the biggest use of compute**. Compute is not just data analysis; it automates everything. Researchers become **managers and architects** rather than chiselling code by hand.

</div>
<div class="card dark">

### European AI

Let's stop sending European data (and money) to the USA: **local AI models** are the only way to go. 

Local inference for all researchers and EU citizens.

</div>
<div class="card">

### FAIR for AI agents

FAIR has to speak the language of agentic AI: **MCP servers**, `SKILL.md`, `llms.txt`, machine-readable docs. 

Diversity of interfaces will mean challenges for interoperability.

</div>
</div>

---
layout: end
---

###### Closing question

# How do we design for 2030 when the technology changes every six months?

<p class="end-discuss">Planning for <b>containment, interoperability, and sovereignty</b> <br>rather than trying to predict the next tool or use case.</p>

<p class="end-thanks">Thank you! – Enrico Glerean</p>

<style>
h1 { font-size: 2.3rem !important; line-height: 1.15 !important; max-width: 46rem; margin-left: auto; margin-right: auto; }
.end-discuss { max-width: 42rem; margin: 1rem auto 0; font-size: 0.95rem; line-height: 1.5; }
.end-thanks { margin-top: 1.4rem; font-size: 1.05rem; }
</style>

---
layout: section
hexText: "BONUS"
class: title-middle
---

###### Extra slides

# Bonus materials

---
layout: default
---

###### Research work is going to change

# The things we won't be doing by hand in 2030

<div class="card-grid stop-grid" style="grid-auto-flow: row; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.8rem; margin-top: 1rem">
<div class="card">

###### Plan

Filling in the data management plan, privacy notice, consent forms

</div>
<div class="card">

###### Collect

Writing the data access application, APIs, user interfaces

</div>
<div class="card">

###### Analyse

Writing HPC scripts, watching the queue, debugging and resubmitting

</div>
<div class="card">

###### Store

Moving data between scratch and archive. Git push.

</div>
<div class="card">

###### Publish

Writing metadata, README, documentation, web pages

</div>
<div class="card">

###### Throughout

Emailing the service desk, reading the docs

</div>
</div>

<div class="card dark" style="margin-top: 0.9rem; padding: 0.7rem 1.5rem">

The agent does the planning, typing, coding, archiving and publishing. **The researcher should still decide, verify, and approve.** What could possibly go wrong?

</div>

<style>
.stop-grid .card { padding: 0.8rem 1.2rem; }
.stop-grid h6 { margin: 0 0 0.3rem 0; }
.stop-grid p { margin: 0; line-height: 1.45; }
</style>

---
layout: image-right
image: /risk-domains.png
class: fit-image
---

###### Risks

# The risks

<div style="font-size: 0.82rem">

**Research integrity**: code that runs but is *plausibly wrong*, silent data loss, undisclosed AI use.

**Confidentiality**: unpublished work, participant data and credentials sent to third-party providers.

**Cybersecurity**: prompt injection, hallucinated or typosquatted packages, insecure generated code, agents with too much access.

</div>

<div class="card clay" style="margin-top: 0.75rem; padding: 0.6rem 1.2rem">

**Validate. Minimize. Contain.**

</div>

<div style="font-size: 0.6rem; opacity: 0.7; margin-top: 0.6rem">Source: <a href="https://coderefinery.github.io/coding-with-ai/security/">CodeRefinery, Coding with AI: Security</a></div>

---
layout: default
hexes: true
---

###### About me

# Enrico Glerean, DSc.

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 0.75rem; font-size: 0.82rem">
<div class="card">

### Staff scientist and Data Agent, Aalto University

Background in neuroimaging. I train and support researchers with:

- Personal data: anonymisation, secure computing
- Medical images, clinical trials
- Research ethics and integrity (AI and new technologies)
- Statistics, open science

I coordinate **LUMI AI Factory** trainings at Aalto University.

</div>
<div class="card dark">

### Other affiliations / COI

- **CodeRefinery**: Nordic network teaching computational reproducibility
- **Finnish Reproducibility Network**: national network raising awareness of reproducibility
- **Support Pool of Experts, European Data Protection Board**: open training materials on personal data, AI and cybersecurity
- Member of the **EU AI Act Advisory Forum**
- Teacher in the **Data Steward training programme**, Tampere University

</div>
</div>

<style>
.card ul { margin: 0.4rem 0; }
.card li { line-height: 1.4; margin: 0.15rem 0; }
.card h3 { font-size: 1.05rem; }
</style>
