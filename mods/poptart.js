Mods.registerCharacter({
  key: 'pop',
  name: 'Poptart',
  color: '#777777',
  sizeMultiplier: 2,
  jumpMultiplier:1.5,
  attackMultiplier: 100,
  canGlide: true,
  speed: 4,

  keys: {
    left: 'a',
    right: 'd',
    jump: 'w',
    attack: 'f',
    final: 'g',
    special: 's'
  },

  attack(fighter, opponent) {
    if (
      fighter.stocks <= 0 ||
      fighter.attackCooldown > 0 ||
      fighter.stunned > 0
    ) {
      return;
    }

    fighter.attackCooldown = 1;
    fighter.punchFrame = 0;
    fighter.punchAnimating = true;

    addCommentary(fighter.name + ' pops from the toaster!');
    addCommentary(fighter.name + ' pop time!');
  }
});

Mods.registerGameplayMod({
  onFrame({ p1, p2, gameOver }) {
    if (gameOver || !p1 || !p2) return;

   },

  onHit({ attacker, defender, damage, source }) {
    defender.percent += 3;
    addCommentary(attacker.name + ' deals bonus damage!');
  },

  onStockLost({ fighter, stocksRemaining }) {
    addCommentary(fighter.name + ' lost a stock!');
  },

  onGameOver({ winner, loser, text }) {
    console.log(text, winner.name, loser.name);
  }
});



