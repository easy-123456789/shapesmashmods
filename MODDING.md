# ShapeSmash Modding Guide

This guide explains how to create character mods and gameplay mods for ShapeSmash using **JSON** or **JavaScript**.

## Loading a mod

Open the **🧩 Mods** menu and either:

- Choose a `.json` or `.js` file and click **Load File**.
- Paste a URL to a raw `.json` or `.js` file and click **Load Link**.

URL-loaded mods must be hosted with CORS enabled so the browser can fetch them.

JavaScript mods create their character cards from JavaScript. You do **not** need to add cards to `index.html`.

---

## JSON character mods

JSON mods are best for simple characters that use the game's default attack and projectile special.

### Example

```json
{
  "key": "green",
  "name": "Green Fighter",
  "color": "#22cc66",
  "attackMultiplier": 1.2,
  "speed": 1.25,
  "sizeMultiplier": 1,
  "passiveFallDamage": false,
  "fallDamageMultiplier": 1,
  "mySrc": "https://example.com/green-fighter.png",
  "keys": {
    "left": "a",
    "right": "d",
    "jump": "w",
    "attack": "f",
    "final": "g",
    "special": "s"
  }
}
```

### Important JSON properties

| Property | Description |
|---|---|
| `key` | Unique internal ID. Use lowercase letters, numbers, `_`, or `-`. |
| `name` | Name shown on the character card and in the game. |
| `color` | Fallback color when no image is available. |
| `mySrc` | Optional character image URL. |
| `spriteKey` | Optional built-in sprite key, such as `p1Img` or `p2Img`. |
| `speed` | Movement speed multiplier. `1` is normal. |
| `attackMultiplier` | Multiplies damage dealt by the character. |
| `sizeMultiplier` | Multiplies the character's width and height. |
| `passiveFallDamage` | Enables the character's passive fall-damage behavior. |
| `fallDamageMultiplier` | Multiplies fall damage. |
| `keys` | Keyboard mapping for movement and actions. |

A JSON file may also contain an array of characters:

```json
[
  {
    "key": "green",
    "name": "Green Fighter",
    "color": "#22cc66"
  },
  {
    "key": "orange",
    "name": "Orange Fighter",
    "color": "#ff8800",
    "speed": 1.4
  }
]
```

JSON characters use the game's default attack and special behavior unless the game provides a matching custom behavior for them.

---

## JavaScript character mods

JavaScript mods can define characters with custom attacks and special moves. Register each character with `Mods.registerCharacter()`.

### Basic JavaScript character

```javascript
Mods.registerCharacter({
  key: 'green',
  name: 'Green Fighter',
  color: '#22cc66',
  mySrc: 'https://example.com/green-fighter.png',

  keys: {
    left: 'a',
    right: 'd',
    jump: 'w',
    attack: 'f',
    final: 'g',
    special: 's'
  },

  speed: 1.25,
  attackMultiplier: 1.2,
  passiveFallDamage: false,
  fallDamageMultiplier: 1
});
```

The character card is generated automatically when the mod loads.

### Custom attack

```javascript
Mods.registerCharacter({
  key: 'heavy',
  name: 'Heavy Fighter',
  color: '#777777',
  sizeMultiplier: 1.4,
  attackMultiplier: 1.8,
  keys: {
    left: 'a',
    right: 'd',
    jump: 'w',
    attack: 'f',
    final: 'g',
    special: 's'
  },

  attack(fighter, opponent) {
    if (fighter.stocks <= 0 || fighter.attackCooldown > 0 || fighter.stunned > 0) return;

    fighter.attackCooldown = 38;
    fighter.punchFrame = 0;
    fighter.punchAnimating = true;
    addCommentary(fighter.name + ' swings a heavy punch!');
  }
});
```

### Custom special moves

A character can define directional specials:

- `special(fighter, opponent)` — neutral special
- `upSpecial(fighter, opponent)` — up special
- `downSpecial(fighter, opponent)` — down special
- `leftSpecial(fighter, opponent)` — left special
- `rightSpecial(fighter, opponent)` — right special

```javascript
Mods.registerCharacter({
  key: 'dash',
  name: 'Dash Fighter',
  color: '#44aaff',
  speed: 1.5,
  keys: {
    left: 'a',
    right: 'd',
    jump: 'w',
    attack: 'f',
    final: 'g',
    special: 's'
  },

  special(fighter, opponent) {
    if (fighter.specialCooldown > 0 || fighter.stunned > 0) return;

    fighter.vx += fighter.facing * 24;
    fighter.dashSpecialFrames = 16;
    fighter.specialCooldown = 55;
    addCommentary(fighter.name + ' uses DASH BURST!');
  },

  upSpecial(fighter) {
    if (fighter.specialCooldown > 0 || fighter.stunned > 0) return;

    fighter.vy = -20;
    fighter.onGround = false;
    fighter.specialCooldown = 70;
  }
});
```

The `fighter` object includes useful values such as:

```javascript
fighter.x
fighter.y
fighter.vx
fighter.vy
fighter.w
fighter.h
fighter.facing
fighter.percent
fighter.stocks
fighter.finalMeter
fighter.finalReady
fighter.specialCooldown
```

The opponent can be found with:

```javascript
const opponent = fighter.getOpponent();
```

---

## JavaScript gameplay mods

Gameplay mods use hooks to change battles without creating a character. Register them with `Mods.registerGameplayMod()`.

Available hooks:

| Hook | Runs when |
|---|---|
| `onStart` | A match starts |
| `onFrame` | Every game frame |
| `onHit` | A normal attack connects |
| `onStockLost` | A fighter loses a stock |
| `onGameOver` | The match ends |

### Example gameplay mod

```javascript
Mods.registerGameplayMod({
  onStart({ p1, p2 }) {
    p1.percent = 25;
    p2.percent = 25;
    addCommentary('⚡ Both fighters start damaged!');
  },

  onFrame({ p1, p2, gameOver }) {
    if (gameOver || !p1 || !p2) return;

    // Low-gravity effect.
    p1.vy *= 0.98;
    p2.vy *= 0.98;
  },

  onHit({ attacker, defender, damage, source }) {
    defender.percent += 3;
    addCommentary(attacker.name + ' deals bonus damage!');
  },

  onStockLost({ fighter, stocksRemaining }) {
    addCommentary(fighter.name + ' lost a stock!');
  },

  onGameOver({ winner, loser, text }) {
    console.log(text, winner.name, loser.name);
  }
});
```

### Hook data

`onStart` and `onFrame` receive commonly useful values:

```javascript
{ p1, p2, gameOver, timeScale }
```

`onHit` receives:

```javascript
{ attacker, defender, damage, source }
```

`onStockLost` receives:

```javascript
{ fighter, stocksRemaining }
```

`onGameOver` receives:

```javascript
{ text, winner, loser, p1, p2, gameOver, timeScale }
```

Gameplay hooks should be kept lightweight. Code in `onFrame` runs many times per second.

---

## Combining a character and gameplay mod

A single JavaScript file can register both:

```javascript
Mods.registerCharacter({
  key: 'vampire',
  name: 'Vampire',
  color: '#aa2255',
  attackMultiplier: 1.1,
  keys: {
    left: 'a', right: 'd', jump: 'w',
    attack: 'f', final: 'g', special: 's'
  }
});

Mods.registerGameplayMod({
  onHit({ attacker, defender, damage }) {
    if (attacker.charKey === 'vampire') {
      attacker.percent = Math.max(0, attacker.percent - 2);
      addCommentary('Vampire drains life!');
    }
  }
});
```

---

## Safety and troubleshooting

- Only load JavaScript mods you trust. JavaScript mods can execute code in the game page.
- Character keys must be unique. Reusing a key replaces the existing character data.
- Every character needs at least `key` and `name`.
- If an image does not load, the character's `color` is used as a fallback.
- URL mods must be direct raw-file links, not normal repository webpage links.
- If a URL fails, the host may be blocking browser requests with CORS.
- Gameplay errors are caught and reported in the browser console so one hook should not stop the other hooks.
