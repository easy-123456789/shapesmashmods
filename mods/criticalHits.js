
Mods.registerGameplayMod({
  onHit({ attacker, defender, source }) {
    if (!attacker || !defender) return;
    if (source !== 'attack') return;

    const multiplier = attacker.attackMultiplier || 1;

    // Initialize Poptart's streak values.
    attacker.topstreak = attacker.topstreak || 0;
    attacker.downCritUsed = attacker.downCritUsed || false;

    // 1% chance of a regular critical hit.
    if (Math.random() <= 0.01) {
      const critDamage = 10 * multiplier;
      defender.percent += critDamage;

      addCommentary(
        `${attacker.name} lands a CRIT! +${critDamage}%`
      );
    }

    // Falling attacks trigger one down crit per airborne sequence.
    if (attacker.vy > 0 && !attacker.downCritUsed) {
      attacker.downCritUsed = true;
      attacker.topstreak++;

      const downCritDamage =
        1 * (attacker.topstreak + 1) * multiplier;

      defender.percent += downCritDamage;

      addCommentary(
        `${attacker.name} lands a down crit! +${downCritDamage}%`
      );
    }

    // Reset the streak after the attacker stops falling.
    if (attacker.vy <= 0) {
      attacker.downCritUsed = false;
      attacker.topstreak = 0;
    }
  },

  onStockLost({ fighter }) {
    if (!fighter) return;

    fighter.topstreak = 0;
    fighter.downCritUsed = false;
  },

  onGameOver({ winner, loser, text }) {
    console.log(
      `${text} Winner: ${winner?.name}, Loser: ${loser?.name}`
    );
  }
});
