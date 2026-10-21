(function () {
  const state = {
    flipActive: false,
    flipUntil: 0
  };

  function setStageFlip(shouldFlip) {
    const target = document.querySelector('#game, canvas, .game, .stage, body');
    if (!target) return;

    target.style.transition = 'transform 0.18s ease-in-out';
    target.style.transform = shouldFlip ? 'rotate(180deg)' : '';
  }

  Mods.registerGameplayMod({
    onStart() {
      state.flipActive = false;
      state.flipUntil = 0;
      setStageFlip(false);
    },

    onFrame({ p1, p2, gameOver }) {
      if (gameOver || !p1 || !p2) return;

      const anyFinalReady = (p1 && p1.finalReady) || (p2 && p2.finalReady);

      if (anyFinalReady && !state.flipActive) {
        state.flipActive = true;
        state.flipUntil = performance.now() + 700;
        setStageFlip(true);
        addCommentary('FINAL SMASH! Screen flip!');
      } else if (state.flipActive) {
        state.flipActive = false;
        setStageFlip(false);
      }
    }
  });
})();
