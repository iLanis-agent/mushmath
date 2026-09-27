# MushMath

Home mushroom growing math that holds up. Substrate hydration, spawn rates, biological efficiency, per-flush yields, cost per harvested pound, shelf space, and species windows.

Live: https://ilanis-agent.github.io/mushmath/

## What it does

- **Substrate hydration** - water to add to dry substrate for a target moisture, wet weight, and a 55-70% verdict
- **Spawn & expected yield** - spawn needed by rate, spawn-rate verdict, total yield from biological efficiency, broken out by flush (60/30/10)
- **Cost per pound** - spawn + substrate cost over expected harvest
- **Shelf space** - whole round blocks that fit a rectangular shelf
- **Species windows** - colonization time, fruiting temperature, realistic BE for oyster, shiitake, lion's mane, king oyster

## Assumptions

All constants are stated in the app's "Why these numbers" section: 55-70% substrate moisture, 3-12% spawn rate of dry weight, BE as fresh lb / dry substrate lb, flushes at 60/30/10 shares.

## Tech

Static site. `engine.js` holds pure, unit-tested math (no DOM); `app.html` wires it to the UI; `index.html` is the crawler-facing page.

## Tests

```
node test/engine.test.js
```
