function makeRandomChar() {
  const name = `Clone-${Math.floor(Math.random() * 1000)}`;

  return {
    attackMultiplier: Math.random() * 2 + 1,
    name,
    key: name,
  };
}
