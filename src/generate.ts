import { isITD } from './is-itd';
import { permutToITD } from './permut-to-itd';
import { winsToPermut } from './wins-to-permut';

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
    const maxWidthAB = Math.floor(loss / sidesNum);
    for (let n = 0; n <= Math.floor(maxWidthAB / 2); ++n) {
        const tables: number[][] = [];
        let width = Math.floor((loss - n * sidesNum) / (sidesNum - n));
        let height = sidesNum - width;
        const lastTable = new Array<number>(width).fill(0)
            .concat([sidesNum - ((loss - n * sidesNum) % (sidesNum - n)) - n])
            .concat(new Array<number>(sidesNum - width - 1).fill(sidesNum - n));
        while (tables.length < diceNum - 1) {
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
                while (tables.length < diceNum - 1) {
                    tables.push(new Array<number>(tailWidth).fill(0)
                        .concat([sidesNum - height - subtail])
                        .concat(new Array<number>(width - tailWidth - 1).fill(sidesNum - height))
                        .concat(new Array<number>(n).fill(sidesNum)));
                }
            }
        }
        if (width === sidesNum - n && tables.length === diceNum - 1) {
            tables.push(lastTable);
            const itd = permutToITD(winsToPermut(tables));
            if (isITD(itd)) {
                return itd;
            }
        }
    }
    return null;
}
