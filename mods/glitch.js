function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
Mods.registerCharacter({
  key: 'glitch',
  name: 'Glitch H@cker',
  color: '#22dd99',
  upSpecial(fighter, opponent){
    if(Math.random() < 0.5){
      for(let i = 0; i < getRandomIntInclusive(1,10); i++){
        fighter.specialCooldown = 0;
        fighter.special(opponent);
      }
    } else {
      opponent.percent += 20;
    }
  },
  downSpecial(fighter, opponent){
    const args = [fighter, opponent];
    let r = getRandomIntInclusive(0, 3);
    if (r === 3) {
      args.splice(1, 0, fighter.facing
    }
    opponent.specials[r](...args);
  }
})
