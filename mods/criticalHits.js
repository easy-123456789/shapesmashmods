Mods.registerGameplayMod({
  onHit({ attacker, defender, damage, source }) {
    // Make sure char has a topstreak
    if(!attacker.topstreak) attacker.topstreak = 0;
    if(Math.random() <= 0.01){
      defender.percent -= (10 * attacker.attackMultiplier);
      addCommentary(`${attacker.name} Lands a crit!`);
    }
    if(attacker.vy > 0){
      attacker.topstreak += 1;
      defender.percent -= (5 * (attacker.topstreak + 1));
      addCommentary(`${attacker.name} Lands a down crit!`)
      
    }
  }
})
