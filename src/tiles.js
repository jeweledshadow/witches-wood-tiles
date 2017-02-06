// <br> for line break
// <i class="em em-musical_note"></i>

const regularTiles = [
{ amount: 3, name: `Black Cat`, subtext: `To leave follow your least likely curiosity.`},
{ amount: 1, name: `Briar Thorns`, subtext: `1 Damage, -1 Steps`},
{ amount: 1, name: `Burnt Wood`, subtext: `+1 Damage, Cannot be swapped (can be rotated.)`},
{ amount: 2, name: `Dragon DEN`, subtext: `For Villagers and Bounty Hunters: Flee! (+1 Steps) For Heroes: Fight! (+2 damage, -1 Steps)`},
{ amount: 1, name: `Fairie WELL`, subtext: `The first time an adventurer enters (per round): +1 Spell Card to each Witch.`},
{ amount: 3, name: `Graveyard`, subtext: `When placed, put 1 grave on tile.`},
{ amount: 3, name: `Haunted Tree`, subtext: `+1 Damage, +1 Steps`},
{ amount: 2, name: `Healing Spring`, subtext: `Remove all damage tokens from an entering adventurer. The next to enter takes them all.`},
{ amount: 2, name: `Local Curiosity`, subtext: `+1 Damage, -1 Step for Villagers only.`},
{ amount: 4, name: `Spider Web`, subtext: `+1 Damage, -1 Step for every adjacent Spider Web`},
{ amount: 2, name: `Will o' Wisp`, subtext: `For adventurer&rsquo;s remaining Steps: Curiosities are reversed.`},
{ amount: 3, name: `Dangling Vines`, subtext: `+1 Damage`},
{ amount: 2, name: `Unicorn Oasis`, subtext: `+1 HP`},
{ amount: 2, name: `Quicksand`, subtext: `Steps end here, unless another adventurer is stuck in quicksand. If so, you rescue them, and they travel with you for the rest of the turn.`},
{ amount: 1, name: `Berry Patch`, subtext: `If food is in top 3 curiosities, +1 HP and -1 Step`},
{ amount: 1, name: `Mushroom Patch`, subtext: `If food is in final 3 curiosities, +1 Damage and -1 Step.`},
{ amount: 1, name: `Watering Hole`, subtext: `If <i class="swatch swatch-p em em-paw_prints"></i> is in top 3 curiosities, it is the path chosen.`},
{ amount: 1, name: `Wolf Den`, subtext: `If <i class="swatch swatch-p em em-paw_prints"></i> is in the final 3 curiosities, +2 Damage`},
{ amount: 1, name: `Training Ground`, subtext: `If <i class="swatch swatch-s em em-hocho"></i> is in top 3 curiosities, +1 HP and -1 Step`},
{ amount: 1, name: `Bandit Camp`, subtext: `If <i class="swatch swatch-s em em-hocho"></i> is in final 3 curiosities, +2 Damage`},
{ amount: 1, name: `Vanishing Bridge`, subtext: `If <i class="swatch swatch-w em em-star"></i> is in top 3 curiosities, +1 Step.`},
{ amount: 1, name: `Sprites`, subtext: `If <i class="swatch swatch-w em em-star"></i> is in final 3 curiosities, +2 Damage.`},
{ amount: 1, name: `Magic Tower`, subtext: `If <i class="swatch swatch-g em em-moneybag"></i> is in top 3, -1 step and +1 Spell Card for each witch.`},
{ amount: 1, name: `Toll Bridge`, subtext: `If <i class="swatch swatch-g em em-moneybag"></i> is in final 3 curiosities, the adventurer exits in the direction they entered.`},
{ amount: 1, name: `Siren`, subtext: `If <i class="swatch swatch-m em em-musical_note"></i> is in the last 3 curiosities, take 2 free steps towards Music.`},
{ amount: 1, name: `Enchanting Lullaby`, subtext: `If <i class="swatch swatch-m em em-musical_note"></i> is in top 3 curiosities, +1 Step. Otherwise, +1 Damage.`}
];

const blankTiles = [
  { amount: 2, name: `Phase`, subtext: `Skip this tile completely. The adventurer exits directly across from where they entered. This counts as 1 step.`}
];

const numberedTiles = [
  { amount: 2, name: `Crossroads`, subtext: `Roll a die: That&rsquo;s your new path`}
]

function flattenTiles(tiles) {
  return tiles.map(tile => {
    var totalTiles = [];
    for (var i = 0; i < tile.amount; i++) {
      totalTiles.push({
        name: tile.name,
        subtext: tile.subtext
      })
    }

    return totalTiles;
  })
  .reduce((acc, tiles) => {
    return acc.concat(tiles);
  }, []);
}

module.exports = {
  regularTiles: flattenTiles(regularTiles),
  blankTiles: flattenTiles(blankTiles),
  numberedTiles: flattenTiles(numberedTiles)
};
