---
theme: ./
title: Aalto Scientific Computing Slidev Theme
---

###### Aalto Scientific Computing

# Computing for research, made approachable

Triton, research software engineering and training at Aalto

::presenter::
Presenter Name · October 2026 · Espoo

---
layout: cover
color: dark
hexText: "HPC\nKICKSTART"
hexSeed: 21
---

# HPC Kickstart 2026

A dark cover with custom honeycomb letters

::presenter::
Presenter Name · Department of Computer Science

---
layout: section
---

###### Part one

# Getting started on Triton

---
layout: section
color: dark
hexText: "RSE"
---

###### Part two

# Research software engineering

---
layout: default
hexes: true
---

###### Overview

# Default content slide

Headings are set in Besley, body text in Inter.

- Bullets use small clay hexagons
- Second bullet point with **strong text** and a [link](https://scicomp.aalto.fi)
  - Nested bullet
- Third bullet point

1. Numbered item one
2. Numbered item two

---
layout: default
---

# Rounded cards

<div class="card-grid">
<div class="card">

### Triton

Aalto's high-performance computing cluster.

</div>
<div class="card">

### RSE

Research software engineers you can hire for your project.

</div>
<div class="card dark">

### Garage

Daily drop-in help sessions, online.

</div>
</div>

> Use `<div class="card">` (and `card dark` / `card clay`) for boxes in any slide.

---
layout: default
color: dark
---

# Dark content slide

White text on a very dark warm gray.

- Every layout accepts `color: dark`
- Also `ivory` (default), `white`, `sand` and `clay`

```python
import numpy as np

def mean(x):
    return np.asarray(x).mean()
```

---
layout: default
color: sand
---

# Table and quote

| Resource | Cores | Memory |
| --- | --- | --- |
| CPU node | 128 | 512 GB |
| GPU node | 48 | 1 TB |
| Login node | 32 | 256 GB |

> Good research needs good tools.

---
layout: two-cols
---

::header::
# Two column layout

::left::

### Left card

- Point A
- Point B
- Point C

::right::

### Right card

- Point D
- Point E
- Point F

---
layout: three-cols
color: sand
---

::header::
# Three column layout

::left::

### Compute

Run jobs on Triton with Slurm.

::center::

### Data

Store and share research data safely.

::right::

### People

Get help from the RSE team.

---
layout: bullets-content
---

::header::
# Bullets and content

::bullets::

- Key insight one
- Key insight two
- Key insight three
- Key insight four

::content::

### Content card

This side is a rounded card for charts, images, code or anything else that complements the bullets.

---
layout: image-right
image: https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800
---

# Image right

Content on the left, image in a rounded inset box on the right.

- Great for combining text with visuals

---
layout: image-left
color: dark
image: https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800
---

# Image left

Same idea, mirrored, on a dark slide.

---
layout: cover-picture
image: https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800
---

###### Workshop

# Cover with picture

Subtitle for the picture cover

---
layout: picture
background: https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=1600
---

# Full-bleed picture

Caption in a rounded card

---
layout: blank
---

# Inline honeycomb

<div class="card" style="height: 300px; padding: 0; overflow: hidden">
  <Honeycomb :width="860" :height="300" :radius="32" text="TRITON" :seed="4" fade="right" />
</div>

---
layout: end
---

# Kiitos!

scicomp.aalto.fi

---
layout: end
color: ivory
hexText: "ASC"
---

# Thank you

Questions? Join the daily garage.
