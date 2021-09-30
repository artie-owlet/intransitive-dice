function cmpDice(die1: number[], die2: number[]): number {
    let diff = 0;
    for (let i = 0; i < die1.length; ++i) {
        for (let j = 0; j < die2.length; ++j) {
            diff += die1[i] < die2[j] ? -1 : 1;
        }
    }
    return diff;
}

export function isITD(dice: number[][]): boolean {
    const diff = cmpDice(dice[dice.length - 1], dice[0]);
    for (let i = 0; i < dice.length - 1; ++i) {
        if (cmpDice(dice[i], dice[i + 1]) !== diff) {
            return false;
        }
    }
    return true;
}
