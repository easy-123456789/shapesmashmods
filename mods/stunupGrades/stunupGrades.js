Mods.registerGamplayMod({
  onHit(attacker, defender, source){
    if(!source === 'projectile') return;
    defender.stunned = 20;
  }
})
