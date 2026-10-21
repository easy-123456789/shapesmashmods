Mods.registerGameplayMod({
  onFrame({ p1, p2, gameOver, timeScale }) {
    if (gameOver) return;

    for (let fighter of [p1, p2]) {
      if (!fighter || typeof fighter.percent !== "number") continue;

      const chance = Math.min(1, Math.max(0, fighter.percent / 999 / 60));
      if (Math.random() < chance) {
        fighter.jump();
      }
    }
  }
});
