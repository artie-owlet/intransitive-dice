# intransitive-dice
![CI](https://github.com/artie-owlet/intransitive-dice/actions/workflows/ci.yaml/badge.svg)
![Coverage](https://github.com/artie-owlet/intransitive-dice/actions/workflows/coverage.yaml/badge.svg)
![Lint](https://github.com/artie-owlet/intransitive-dice/actions/workflows/lint.yaml/badge.svg)

Tool for generating [intransitive dice](https://en.wikipedia.org/wiki/Intransitive_dice).

---

## Install

```bash
npm install @artie-owlet/intransitive-dice
```

## Usage

```ts
import { generate } from '@artie-owlet/intransitive-dice';

const itd = generate(4, 6, 24);
console.log(itd);
/* will output:
[
  [ 10, 11, 12, 13, 14, 15 ],
  [ 1, 2, 16, 17, 18, 19 ],
  [ 3, 4, 5, 20, 21, 22 ],
  [ 6, 7, 8, 9, 23, 24 ]
]
*/
```

## API

### generate(diceNum: number, sidesNum: number, win: number): number[][]

* `diceNum` - number of dice;
* `sidesNum` - number of faces of each die;
* `win` - sets the probability of winning by the formula `p = win / (sidesNum ^ 2)`.
