function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Mods.registerCharacter({
  key: 'glitch',
  name: 'Glitch H@cker',
  color: '#22dd99',

  upSpecial(fighter, opponent) {
    if (Math.random() < 0.5) {
      const repeats = getRandomIntInclusive(1, 10);

      for (let i = 0; i < repeats; i++) {
        fighter.specialCooldown = 0;
        fighter.special(opponent);
      }
    } else {
      opponent.percent += 20;
    }
  },

  downSpecial(fighter, opponent) {
    const r = getRandomIntInclusive(0, 3);
    const args = [opponent, fighter];

    // Directional specials use (fighter, direction, opponent).
    if (r === 3) {
      args.splice(1, 0, opponent.facing > 0 ? 'right' : 'left');
    }

    opponent.specials[r](...args);
  }
});
