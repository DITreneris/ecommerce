# UI/UX iteration backlog (Spin-off Nr. 8)

**Paskirtis:** ilgalaikė UX/UI kritika, zona po zona, ir 8 iteracijų aprašai su sėkmės kriterijais.

**Susiję:** [UI_UX_ITERATION_PLAN.md](UI_UX_ITERATION_PLAN.md) (ciklinis procesas ir kanoninė vykdymo eilė), [UI_UX_AUDIT_CHECKLIST.md](UI_UX_AUDIT_CHECKLIST.md) (a11y, klaviatūra, funkcinis LT/EN/ET/LV).

**Pastaba:** turinys perkeltas iš repo šaknies `ui_ux_itteration.txt` (2026-04). Po įgyvendinimo etapų čia galima trumpai žymėti datą / PR nuorodą prie atitinkamos iteracijos.

**2026-04-07:** dalinai uždaryta **Iteration 3** kryptis — neutrali SaaS paletė, vieningos SVG skyrių ikonos, pašalinti `categories[].icon` ir emoji iš užduočių JSON visoms kalboms (`CHANGELOG.md` [Unreleased]).

---

Direct critique

1. The visual hierarchy is weak

The page has too many competing layers near the top:

bright lime strip
strong purple header
search
language switcher
icon-heavy category nav
red badge
large hero
stats cards
feature row
usage steps

Nothing clearly wins.

Premium SaaS pages usually do one thing first:

state value
prove relevance
drive one primary action

Here, the user lands and sees several “important” things at once. Result: cognitive drag.

2. The product positioning is still too generic

“Ne teorija — paruoštos DI užduotys…” is decent, but not sharp enough for a premium feel.

Why:

it explains format, not transformation
it sounds useful, but not differentiated
it does not answer: why this instead of ChatGPT + your own prompting?

You are selling speed, structure, reliability, and ready-to-use workflows. The interface should make that obvious in 3 seconds.

3. The page feels visually dated in its spacing and component language

Main issues visible from the screenshot:

too much flat gray background area
container widths feel generic
cards are serviceable, not premium
icon row feels like an older portal / directory pattern
buttons lack contrast in meaning and priority
typography scale is not doing enough work
everything feels centered and evenly weighted instead of deliberately composed

That creates a “website builder / info portal” feel instead of “high-value product system.”

4. User journey is fragmented

You currently make the user do too much interpretation:

Should I search?
Should I browse category icons?
Should I click “Rasti užduotį”?
Should I read “Kaip naudotis”?
Should I scroll to all prompts?
Should I use the library link?

This is not fatal, but it leaks energy.

A better journey would be:

Understand value
Pick one clear entry path
See relevant examples
Trust the quality
Copy and use immediately

Right now, you have the ingredients, but the order is wrong.

5. Trust is underbuilt

For a premium SaaS-like product, I would expect early proof like:

who this is for
what kinds of tasks it solves
how many workflows/templates exist
how fast I get output
concrete examples before/after
why the prompts are better than ad hoc prompting

You have numbers like 107 / 13 / 100%, but they do not yet feel meaningful enough emotionally.

“107 užduotys” is useful.
“100% kopijuojama vienu paspaudimu” is functional.
But where is:

saved time
reduced friction
role relevance
use-case certainty
What the product should feel like instead

Not “library.”
Not “directory.”
Not “educational resource.”

It should feel like:

Operational AI workflow system for e-commerce teams.

That shift matters because premium SaaS quality is not mostly colors or rounded corners. It is:

sharp positioning
ruthless hierarchy
fewer choices at once
stronger proof
clearer next step
cleaner interaction model
Deep UI audit
A. Header / top area
What is failing
the lime announcement bar is visually aggressive and cheapens the look
the purple header is heavy and saturated
the search bar is good in principle, but visually cramped
the icon navigation feels small and scattered
language switcher is too close to primary product controls
Why it matters

The first screen sets product credibility. Right now the top area feels like multiple independent systems stacked together.

Fix

Reduce the top area to 3 clear layers:

slim utility nav
primary value/search section
optional category shortcuts
Low-hanging fruit
remove or soften the lime strip
reduce header height
increase whitespace around search
simplify category icon row
move language switcher to a quieter corner
make the logo/title area breathe more
B. Hero section
What is failing

The hero is structurally okay, but weak for premium conversion.

Problems:

headline is descriptive, not high-impact
subtext is fragmented
bullets are okay but not visually persuasive
CTA pair is acceptable, but secondary action is too close in weight to primary
stats cards help, but feel generic
Why it matters

The hero should answer:

what is this
who it is for
why it is better
what I do next

Currently it answers all four only partially.

Fix

Rebuild hero around one core promise.

Example structure:

Headline: transformation
Subheadline: who + speed + use case
Search as primary action
3 trust/value bullets
1 featured example block directly below
Low-hanging fruit
rewrite headline to focus on outcome, not format
shorten subtext
make one primary CTA dominant
replace generic stats row with proof-oriented metrics or benefit cards
add “Popular tasks” chips below search
C. Category navigation
What is failing

The icon-based categories are too small, too many, and visually weak.

This looks like a content portal taxonomy, not a polished SaaS workflow entry system.

Why it matters

If the taxonomy is too broad and visually light, users do not confidently choose a path.

Fix

Prioritize 5–7 top categories and demote the rest.

Better patterns:

pills/tabs
segmented filter bar
two-row chip system
featured categories + “all”
Low-hanging fruit
increase font size
reduce number of visible categories
group long-tail categories into “More”
highlight active category more clearly
remove emoji/icon clutter if it does not aid scannability
D. “How to use” section
What is failing

It is useful, but it appears too early and too neutrally styled.

For new users, instruction is less important than confidence.
For ready users, instruction is friction.

Why it matters

Good products minimize explanation before value proof.

Fix

Compress this into a compact inline pattern:

Search
Copy
Paste
Customize

Make it lighter and less central.

Low-hanging fruit
shrink vertical space
reduce text size
turn into a mini horizontal explainer
place after first real examples, not before all content
E. Task list / cards
What is working

This section is closer to the real value.
The card layout is understandable.
Copy button is good.
The grouping is useful.

What is failing

It still looks like a database block, not a premium workflow surface.

Problems:

card density is high
typography inside cards is small
prompt previews look text-heavy
the “copy” action is functional, but not satisfying
category container styling feels generic
Fix

Turn each card into a “task asset” rather than a text box.

Each card should feel like:

use case
expected outcome
quick preview
one-click action
Low-hanging fruit
add “best for” micro-labels
increase preview readability
use 2-line title + 2-line snippet structure
add hover states
improve copy success feedback
use better section framing than a giant bordered container
Deep UX / user journey audit
Current likely journey
User lands
Sees many interface layers
Understands vaguely that this is a prompt/task library
May scroll
Finds a task
Copies it
Pastes into AI
Leaves

This is functional.
But it is not sticky, premium, or especially persuasive.

Main journey issues

1. No strong “start here” path

There are multiple entry points, but no dominant flow.

2. Search-first UX is underleveraged

Search is visually present but not behaviorally supported.

Missing:

example queries
autocomplete feel
trending searches
quick tags
zero-state guidance 3) Not enough contextual reassurance

Users need to know:

what kind of result they will get
how much editing they need
whether it works for their role
whether it is beginner-safe 4) No visible success loop

After copying a task, what then?
There is no sense of progression, workflow completion, or “I succeeded.”

5. The product does not yet feel adaptive

Premium SaaS UX often guides by role, intent, or urgency.

Here, all users seem to get the same structure, whether they are:

marketer
seller
analyst
ops manager
founder

That weakens relevance.

Top low-hanging fruits

These are the changes with best ROI before any big redesign.

1. Rebuild the first screen

This is the biggest win.

Do:

stronger headline
tighter subheadline
one dominant CTA
better search presentation
fewer visible competing elements

Impact:

improves clarity
improves premium feel
improves first-click confidence 2) Simplify category navigation

Too many categories + icons = clutter.

Do:

show top 6
move rest into secondary browse layer
improve active state
reduce visual noise

Impact:

faster discovery
cleaner UI
more deliberate hierarchy 3) Upgrade task cards

Current cards are usable, but not premium.

Do:

improve spacing
improve typography scale
add clearer card hierarchy
make copy action more satisfying
add metadata like “for SEO / customer support / ops”

Impact:

better scanability
higher perceived value
easier action 4) Add proof-oriented microcopy

Right now too much copy explains mechanics.
More copy should explain outcomes.

Examples:

“Paruošta naudoti per <1 min.”
“Tinka ChatGPT, Claude, Gemini”
“Mažiau tuščio promptinimo, daugiau darbo rezultatų”
“Pritaikyta e-komercijos ir operacijų darbams”

Impact:

better differentiation
higher trust
stronger perceived ROI 5) Reorder sections

You are showing instruction before enough value.

Better order:

hero
top categories / popular tasks
featured examples
how it works
full library

Impact:

less friction
faster comprehension
better conversion flow
Better option: the right redesign direction

Do not overdesign this into a flashy landing page.
That would be the wrong move.

Better direction:
functional premium SaaS
not
marketing-heavy visual theater

Meaning:

more whitespace
fewer colors
fewer icons
stronger type hierarchy
better component consistency
sharper role/use-case pathways
stronger evidence of usefulness

Think:

Linear clarity
Stripe discipline
Notion calm
modern B2B utility

Not:

portal
course platform
template marketplace chaos
Detailed iteration plan
Iteration 1 — Information architecture cleanup

Goal: remove confusion before touching aesthetics.

Tasks:

define one primary page goal
decide primary entry: search or category
reduce visible first-screen actions
reorder sections based on user intent
decide which content is core vs secondary

Deliverables:

new homepage wireframe
clear section priority
reduced element count above the fold

Success criteria:

user understands value in 3 seconds
user sees one clear first action
page feels lighter without losing content
Iteration 2 — Hero rewrite + conversion hierarchy

Goal: sharpen first impression.

Tasks:

rewrite headline around outcome
rewrite subheadline around role + benefit
make primary CTA visually dominant
add search examples or suggested queries
improve stats/proof language

Deliverables:

3 hero variants
CTA hierarchy
trust/value microcopy set

Success criteria:

stronger perceived value
less explanation required
better first-click confidence
Iteration 3 — Visual system upgrade

Goal: make it feel premium without heavy redesign.

Tasks:

neutralize over-saturated colors
refine spacing system
unify border radius / shadows / surface levels
improve typography scale
reduce “boxed” feel
simplify icon usage

Deliverables:

design tokens
updated color/spacing/type system
revised button/card/input styles

Success criteria:

calmer interface
stronger visual hierarchy
less “template site” feeling
Iteration 4 — Search UX upgrade

Goal: make search the smartest path, not just a text field.

Tasks:

add placeholder examples
add quick search chips
improve empty state
make search visually more central
consider live filtering or category-assisted querying

Deliverables:

search interaction spec
zero-results and empty-state patterns
suggested search list

Success criteria:

users start with search more often
discovery time drops
more relevant first interactions
Iteration 5 — Category/navigation redesign

Goal: reduce portal feel.

Tasks:

prioritize categories by usage
demote long-tail categories
switch to cleaner chip/tab design
improve active/inactive states
test reduced navigation count

Deliverables:

simplified category bar
active state system
top-category shortlist

Success criteria:

less clutter
quicker scanning
stronger product polish
Iteration 6 — Task card redesign

Goal: improve scanability and actionability.

Tasks:

redesign cards with better hierarchy
clarify title/snippet/action structure
add use-case metadata
add hover/copy feedback
reduce text fatigue

Deliverables:

new card component
section container redesign
microinteraction states

Success criteria:

faster task selection
more satisfying use
higher perceived usefulness
Iteration 7 — User journey optimization

Goal: move from browsing to successful task execution.

Tasks:

add “Popular now” or “Start here”
add featured workflows
add beginner / advanced paths
add role-based entry points
improve post-copy guidance

Deliverables:

guided entry modules
role-specific shortcuts
success confirmation flow

Success criteria:

users reach value faster
lower hesitation
more repeat behavior
Iteration 8 — Trust and proof layer

Goal: elevate from useful to credible.

Tasks:

add examples of outputs
show supported AI tools
show who it is for
add “why these prompts work”
add concrete use-case proof

Deliverables:

trust strip
sample output blocks
proof microcopy

Success criteria:

stronger confidence
lower skepticism
better premium perception
Concrete UX recommendations by page section
Above the fold

Keep:

product identity
search
headline
one CTA
2–3 proof points

Remove or demote:

too many categories
overly bright announcement strip
secondary explanations
duplicate actions
Middle of page

Show:

featured tasks by category
popular workflows
role-based browsing
a compact “how it works”
Lower page

Show:

full library
all categories
detailed instructions
FAQ or support layer
Premium SaaS quality checklist for this product

You are not there yet if:

more than one thing shouts at once
categories feel like directory taxonomies
instructional copy dominates outcome copy
cards feel like storage, not assets
the interface explains too much before delivering value
the user has to decide too much too early

You are getting there when:

the page feels lighter
first action is obvious
content is easier to scan
search feels like the main engine
tasks feel curated, not dumped
typography and spacing carry the product
Top 3 pitfalls

1. Over-scoping the redesign

Do not jump into a full design system rewrite first.
Fix hierarchy and journey first.

2. Polishing visuals before fixing structure

A prettier confusing page is still confusing.

3. Keeping too many equal-priority elements

Premium UX comes from subtraction.
Not everything deserves above-the-fold presence.

Recommended execution order
Rework homepage structure and section order
Rewrite hero and CTA hierarchy
Simplify category navigation
Redesign task cards
Improve search UX
Add proof and trust layer
Only then do visual refinement passes

If you want maximum ROI, start with the first screen and category/task discovery layer. That is where most of the perceived “not premium SaaS” problem is coming from.
