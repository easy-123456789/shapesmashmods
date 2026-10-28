function makeRandomChar(){
  return({
    attackMultiplier: Math.random()*2+1,
    name: `Clone-${Math.floor(Math.random*1000)}`
    key: this.name
  })
}
