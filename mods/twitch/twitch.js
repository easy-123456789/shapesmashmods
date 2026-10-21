Mods.registerGameplayMod({
  onFrame({p1, p2, gameOver, timeScale}){
    for(let fighter of [p1, p2]){
      const chance = fighter.percent/999/60;
      if(Math.random() < chance){
        fighter.jump();
      }
    }
  }
})
