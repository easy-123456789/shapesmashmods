Mods.registerGameplayMod({
  onFrame({ p1, p2, gameOver }) {
    if (gameOver || !p1 || !p2) return;
    grav = Math.random() + 1;
    // Random-gravity effect.
    p1.vy = Math.random() * 20 - 10;
    p2.vy = Math.random() * 20 - 10;
  }
})
