# CultureAtlas — design brief

## Design read
For travelers and young Indonesians tired of the same Bali/Yogyakarta feed, who
want to feel like they've found something researched and real, not another
influencer spot. Register: a field expedition dossier, not a glossy travel ad.

## Concept spine
"The site is a living field atlas." Every page reads like a cataloguer's
dossier: numbered entries, stamped approvals, coordinate readouts, hand-drawn
route notes. The user isn't browsing a brochure, they're opening a research
file on a place most tourists have never heard of.

## Delivery tier
**cinema** — the platform is content-heavy (7 distinct page types, real
database-backed browsing), not a single-scroll marketing stunt. Cinema gives
Lenis+GSAP scroll choreography and one strong hero mechanic without
overloading a multi-page product with spectacle-tier WebGL everywhere.

## Locked palette
- Ink (`--ca-ink`) `#171F30` — indigo-black, drawn from batik indigo dye vats
  (tarum), not a graphite/near-black. Primary text + dark surfaces.
- Paper (`--ca-paper`) `#F4E8C1` — warm turmeric-tinted paper, drawn from
  lontar palm-leaf manuscripts. Distinctly more saturated/yellow than the
  banned grayish-beige family; primary light surface.
- Paper-deep (`--ca-paper-deep`) `#EAD89C` — a shade down from paper, for
  cards/panels resting on the paper surface.
- Accent (`--ca-gold`) `#D89A2E` — marigold/turmeric gold, the ONE accent
  color, saturation kept under 80%. Used only for primary interactive
  elements (CTAs, active filters, links, sustainability score ring).
- Ink-soft (`--ca-ink-soft`) `#4A5470` — secondary text on paper.
Defense: this is a Cobalt-adjacent family (indigo + warm gold) but shifted
distinctly warmer/more saturated than any banned list (graphite+ember,
near-black+neon, beige+brass, AI-purple). No previous build in this chat to
differ from — palette derived from the brief's material world (batik dye,
lontar paper, turmeric) rather than a generic AI reach.

## Locked type
**Cabinet Grotesk** (display, via Fontshare, self-hostable free license) +
**Inter Tight** (body/UI, Google Fonts). Geometric-contemporary pairing that
reads "researched dossier," not decorative. No serif: nothing here is
heritage-luxury-editorial in the sense the recipe requires for a serif
justification.

## Tier-1 technique — DEVIATION DOCUMENTED
Selected: **D3 — Kinetic type opener** (`wow-catalog.md`) — the hero headline
"Discover Indonesia Beyond the Crowds" builds in with per-word stagger over an
illustrated archipelago silhouette (hand-authored inline SVG, gold coordinate
pins marking the seed destinations), not a static image.

Why D3 and not the more obvious B1 (cutout parallax hero photo): the site's
photography is real, licensed Wikimedia Commons photography of eight NAMED
villages (see revised asset plan below), not Higgsfield-generated imagery —
compositing a real photo of one specific real place into an abstract
cutout-parallax hero risks misrepresenting it. D3 keeps the hero honest
(illustrated map, not a specific place standing in for "Indonesia") while
still being fully interactive, screenshot-safe, and reduced-motion-safe. This
is the PERMANENT hero decision, not a placeholder awaiting an upgrade.

Anti-convergence ledger: no previous build in this chat, so all six identity
axes are derived fresh from the brief's material world (batik/lontar/turmeric
palette, Cabinet Grotesk/Inter Tight pairing, kinetic-type-over-map hero
architecture, D3 technique, six bespoke CTA garments below, sharp/stamped
corner language).

## Section plan (Landing, 8 sections, 7 distinct layout families, no
consecutive repeats)
1. Hero — kinetic type + illustrated archipelago map (hero family)
2. "Kenapa CultureAtlas" — 3 field-note reasons in a horizontal scroll strip
3. Featured hidden destinations — asymmetric bento grid from live D1 data
4. "The Atlas System" — filter categories explained, split text+illustration
5. Cultural Stories teaser — full-width editorial pull-quote
6. Local Experience + Marketplace — 2-column split
7. Youth Cultural Ambassador — full-width CTA band
8. Footer

Eyebrow budget: ceil(8/3) = 3 max; used on sections 3 and 4 only (2 total).

## Asset plan (revised — real photography instead of generation)
The user opted out of Higgsfield generation for destination photography: it
would mean AI-fabricated images of eight NAMED, real villages on a platform
whose entire pitch is "researched, not recycled" — a bad fit even if credits
were free. Real, properly-licensed photography is both more honest and
avoids the credits/subscription problem entirely.
- 6 of 8 destinations (Wae Rebo, Kete Kesu/Toraja, Kampung Naga, Desa Sade,
  Desa Bena, Kasepuhan Ciptagelar) ship with a real CC BY / CC BY-SA photo
  sourced from Wikimedia Commons, downloaded to
  `app/public/assets/destinations/`, with photographer + license + source
  URL stored in D1 (`migrations/0003_destination_photos.sql`) and rendered
  as a visible attribution caption on every photo
  (`components/site/destination-photo.tsx`) — required by the license, not
  optional styling.
- 2 of 8 (Kajang Ammatoa, Margamulya) have no properly-licensed photo
  available on Commons and keep the illustrated field-plate placeholder
  rather than a mismatched stock substitute standing in for the wrong place.
- Hero: still the illustrated archipelago SVG + kinetic type (D3) — this
  stays as the permanent Tier-1 mechanic, not a placeholder; it was never
  meant to be replaced by a generated photo once the credits blocker turned
  out to be a real-photography decision instead.
- Icon set: hand-authored inline SVG (stamp/compass/leaf motif, single
  stroke weight, ink color) — this is the PERMANENT icon system now, not a
  stand-in for a future generated set (icons for an abstract filter/UI
  system don't have a "real photo" equivalent, and the illustrated style
  reads intentional next to the real destination photography).
- Logo/monogram: shipped now as a typographic wordmark (Cabinet Grotesk "CA"
  monogram in a stamped circle) — pending a generated refinement pass.
- OG/cover image: pending (`app-cover.md` requires a real generated cover;
  `app-meta.json` fields stay null until then — the site is deploy-only per
  the user's choice, not published to the feed, so this does not block ship).

## CTA inventory (bespoke chrome — one component + one interaction identity
each, zero shared button class)
1. **Explore Destinations** (landing primary) — circular wax-stamp button:
   ink-filled gold circle that presses down (scale + slight rotate) on
   press/hover, like a document stamp.
2. **View Destination** (destination cards) — text link, underline draws in
   from the left + arrow glyph slides right on hover.
3. **Reserve Experience** (experience cards/detail) — ticket-stub button:
   dashed perforation edge, corner peels back on hover.
4. **View Product** (marketplace cards) — hang-tag button: die-cut top
   corner + string-hole dot, tilts slightly on hover like a swinging tag.
5. **Submit Application** (ambassador form) — rectangular visa-stamp button:
   an ink-stamp shape drops and "stamps" onto the button on hover/focus.
6. **Read Story** (story cards) — icon-only button, folded-corner arrow that
   unfolds/rotates 45° on hover.

## Corner / border language
Sharp corners everywhere (0 radius) — a stamped-document aesthetic — with ONE
declared exception: photo/media frames get a soft 4px radius, like a printed
photo corner. Hairline 1px rules (`--ca-ink` at low opacity) separate
sections instead of shadows/elevation.

## Motion (Phase 4)
Lenis smooth scroll bridged to GSAP ScrollTrigger (`autoRaf: false` +
`gsap.ticker`). Hero: `split-type` word stagger fires ON MOUNT (not
viewport-gated — screenshot-safe). Section reveals: transform/blur only,
never opacity-to-zero waiting on viewport entry. Every animated element
`prefers-reduced-motion`-gated with a fully-rendered static fallback.
