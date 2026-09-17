Mods.registerGameplayMod({
  onFrame({ p1, p2, gameOver }) {
    if (gameOver || !p1 || !p2) return;

    // Low-gravity effect.
    p1.vy *= Math.random();
    p2.vy *= Math.random();
  }
})
