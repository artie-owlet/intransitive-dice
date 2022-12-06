import { isITD } from './is-itd';
import { permutToITD } from './permut-to-itd';
import { swap } from './swap';

export function generate(diceNum: number, sidesNum: number, win: number): number[][] | null {
    if (diceNum < 3) {
        throw new Error('diceNum < 3');
    }
    if (sidesNum < 3) {
        throw new Error('sidesNum < 3');
    }
    if (win <= Math.floor(sidesNum * sidesNum / 2)) {
        throw new Error('win <= (sidesNum^2)/2');
    }

    const loss = sidesNum * sidesNum - win;
    if (loss < (Math.floor(sidesNum / 2) + 1) * Math.ceil(sidesNum / 2)) {
        return null;
    }

    const ftWidth = Math.floor(loss / sidesNum);
    const ftTail = loss % sidesNum;
    let n = 0;
    if (ftWidth + ftTail >= sidesNum) {
        n = 1;
    }

    const tables: number[][] = [];
    for (;; ++n) {
        tables.length = 0;

        let width = Math.floor((loss - n * sidesNum) / (sidesNum - n));
        if (width < n) {
            break;
        }
        let height = sidesNum - width;

        tables.push(new Array<number>(width).fill(0)
            .concat([sidesNum - ((loss - n * sidesNum) % (sidesNum - n)) - n])
            .concat(new Array<number>(sidesNum - width - 1).fill(sidesNum - n)));
        while (tables.length < diceNum) {
            width = Math.floor(loss / height);
            if (width < sidesNum - n) {
                const tail = loss % height;
                tables.push(new Array<number>(width).fill(sidesNum - height)
                    .concat([sidesNum - tail])
                    .concat(new Array<number>(sidesNum - width - 1).fill(sidesNum)));
                height = sidesNum - width;
            } else {
                width = sidesNum - n;
                const tail = loss - width * height;
                const tailWidth = Math.floor(tail / (sidesNum - height));
                const subtail = tail % (sidesNum - height);
                const lastTable = new Array<number>(tailWidth).fill(0)
                    .concat([sidesNum - height - subtail])
                    .concat(new Array<number>(width - tailWidth - 1).fill(sidesNum - height))
                    .concat(new Array<number>(n).fill(sidesNum));
                while (tables.length < diceNum) {
                    tables.push(lastTable);
                }
            }
        }

        if (width === sidesNum - n) {
            break;
        }
    }

    if (tables.length === 0) {
        return null;
    }

    const permutDice = new Array(diceNum).fill(0)
        .map((_, id) => new Array<number>(sidesNum).fill(id))
        .reduce((a, d) => {
            a.push(...d);
            return a;
        }, []);
    const permutSides = new Array(diceNum).fill(0)
        .map((_) => {
            return new Array(sidesNum).fill(0)
                .map((_, id) => id);
        })
        .reduce((a, s) => {
            a.push(...s);
            return a;
        }, []);

    tables.forEach((dieWins, dieId) => swap(permutDice, permutSides, dieWins, dieId, (dieId + 1) % diceNum));
    const itd = permutToITD(permutDice);
    if (!isITD(itd)) {
        swap(permutDice, permutSides, tables[0], 0, 1);
        return permutToITD(permutDice);
    }
    return itd;
}
