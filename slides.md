---
theme: ./slidev-theme-aalto-scicomp
themeConfig:
  credit:
    text: Enrico Glerean · CC BY 4.0
    url: https://eglerean.github.io/
title: Rethinking research computing and data infrastructures for non-human users
layout: cover
hexText: "AI\nAGENTS"
hexSeed: 7
---

###### TiLa · DAHA workshop · Flash talk

# Rethinking research computing and data infrastructures for non-human users

AI agents as the new users of HPC and research data services. A researcher and research-support perspective.

::presenter::
Enrico Glerean · 7 October 2026

<style>
h1 { font-size: 2.5rem !important; line-height: 1.1 !important; }
p { font-size: 0.95rem; }
</style>

<!--
Workshop on updating Finland's reference architectures for scientific computing (TiLa) and research data management (DAHA).
-->

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

- Personal data: anonymization, secure computing
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

---
layout: section
color: dark
hexText: "AI?"
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
hexes: true
---

###### The researcher's contradictory AI wish list

# What researchers want from the AI tool

<div class="wish-grid">
<div class="card">The newest model, now</div>
<div class="card">An agent that writes and runs their code</div>
<div class="card">Confidentiality for unpublished work and personal data</div>
<div class="card">No waiting for IT to approve a tool</div>
<div class="card">The big overseas models</div>
<div class="card">Literature found and summarised for them</div>
<div class="card">Security they don't have to think about</div>
<div class="card">Free, or paid by someone else</div>
<div class="card">Agents with access to their files, email and calendar</div>
<div class="card">Open or EU models they can run themselves</div>
<div class="card">Plugs into Zotero, GitHub, Jupyter and Office</div>
<div class="card">One tool that does everything</div>
</div>

<style>
.wish-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.7rem; margin-top: 1rem; }
.wish-grid .card { padding: 0.9rem 1.1rem; font-family: var(--asc-font-serif); font-size: 1.05rem; line-height: 1.3; display: flex; align-items: center; }
</style>

<!--
CUT THIS SLIDE FIRST IF SHORT ON TIME.
-->

---
layout: image-left
image: /scenarios_summary.png
class: wide-image
---

###### Software coding as we knew it is dead

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

###### Coding will be a hobby in 2030

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

Emailing the help desk first

</div>
</div>

<div class="card dark" style="margin-top: 0.9rem; padding: 0.7rem 1.5rem">

The agent does the planning, the typing, the coding, archiving, publishing. **The researcher should still decide, verify, and approve.** What could possibly go wrong?

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

# What will be left to do for human researchers?

(and for human research support personnel?)

Kiitos! Grazie! Thank you!
