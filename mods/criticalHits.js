Mods.registerGameplayMod({
  onHit({ attacker, defender, damage, source }) {
    if(Math.random() <= 0.01){
      defender.percent -= (10 * attacker.attackMultiplier);
      addCommentary(`${attacker.name} Lands a crit!`);
    }
  }
})
