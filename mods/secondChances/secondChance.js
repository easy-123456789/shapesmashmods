Mods.registerGameplayMod({
  onHit({attacker, defender, source}){
    if(defender.percent >= (attacker.percent * 3)){
      setTimeout(() => {defender.vy = 0}, Math.random() * 1000)
    }
  }
})
