/* MushMath engine - honest home mushroom-growing math. Pure functions, no DOM. */
var MushEngine = (function () {
  function r2(x) { return Math.round(x * 100) / 100; }
  function r1(x) { return Math.round(x * 10) / 10; }

  /* substrate hydration: water to add to bone-dry substrate to hit a target
     moisture percentage. 65% moisture means water is 65% of total wet weight,
     so water = dry * 65/35. */
  function waterForHydration(dryLb, targetPct) {
    return r2(dryLb * targetPct / (100 - targetPct));
  }
  function wetWeightLb(dryLb, targetPct) {
    return r2(dryLb + dryLb * targetPct / (100 - targetPct));
  }
  function hydrationVerdict(pct) {
    if (pct < 55) return 'too dry - under 55% moisture, mycelium stalls and pins abort';
    if (pct <= 70) return 'in range - 55-70% is where mushroom substrate wants to be';
    return 'too wet - over 70% squeezes out the air pockets and invites bacteria';
  }

  /* spawn: how much spawn to mix into a given dry substrate weight */
  function spawnNeeded(dryLb, ratePct) { return r2(dryLb * ratePct / 100); }
  function spawnVerdict(ratePct) {
    if (ratePct < 3) return 'risky - under 3% spawn rate colonizes slowly, and slow is when contamination wins';
    if (ratePct <= 12) return 'good rate - 3-12% is the working range for most home grows';
    return 'premium - over 12% colonizes fast and clean, but you are paying for speed';
  }

  /* yield: biological efficiency = fresh mushroom weight / dry substrate weight */
  function expectedYieldLb(dryLb, bePct) { return r2(dryLb * bePct / 100); }
  function beVerdict(bePct) {
    if (bePct < 25) return 'low - under 25% BE means something went wrong: strain, spawn rate, or conditions';
    if (bePct <= 100) return 'solid - 25-100% is a fair working range for a home grow';
    return 'excellent - over 100% BE is top-tier, oysters on a good day';
  }
  /* flushes: first flush carries most of the harvest */
  var FLUSH_SHARE = { 1: 0.6, 2: 0.3, 3: 0.1 };
  function flushYieldLb(dryLb, bePct, flush) {
    var share = FLUSH_SHARE[flush] || 0;
    return r2(dryLb * bePct / 100 * share);
  }

  /* cost per harvested pound */
  function costPerLbHarvest(spawnLb, spawnPricePerLb, subLb, subPricePerLb, yieldLb) {
    var cost = spawnLb * spawnPricePerLb + subLb * subPricePerLb;
    if (yieldLb <= 0) return null;
    return r2(cost / yieldLb);
  }

  /* grow space: round blocks on a rectangular shelf */
  function blocksPerShelf(shelfWIn, shelfDIn, blockDiaIn) {
    return Math.floor(shelfWIn / blockDiaIn) * Math.floor(shelfDIn / blockDiaIn);
  }

  /* rough colonization and fruiting windows by species (70F unless noted) */
  var SPECIES = {
    oyster:      { colonize: '10-14 days', fruitF: '55-65F', be: '75-150%', note: 'The forgiving starter species. Fast, hungry, hard to discourage.' },
    shiitake:    { colonize: '60-90 days', fruitF: '55-70F', be: '50-100%', note: 'Slow to colonize, but the blocks produce for months. Patience pays.' },
    lionsmane:   { colonize: '14-21 days', fruitF: '60-70F', be: '50-75%', note: 'Wants humidity and fresh air together - the tricky balance.' },
    kingoyster:  { colonize: '21-28 days', fruitF: '50-60F', be: '50-75%', note: 'Needs a cold snap to pin. Worth it for the stems.' }
  };
  function speciesInfo(key) { return SPECIES[key] || null; }

  return {
    waterForHydration: waterForHydration, wetWeightLb: wetWeightLb, hydrationVerdict: hydrationVerdict,
    spawnNeeded: spawnNeeded, spawnVerdict: spawnVerdict,
    expectedYieldLb: expectedYieldLb, beVerdict: beVerdict, flushYieldLb: flushYieldLb,
    costPerLbHarvest: costPerLbHarvest, blocksPerShelf: blocksPerShelf, speciesInfo: speciesInfo
  };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = MushEngine;
