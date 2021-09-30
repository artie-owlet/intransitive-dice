function findDieSide(permutDice: number[], permutSides: number[], dieId: number, sideId: number): number {
    return permutDice.findIndex((n, id) => n === dieId && permutSides[id] === sideId);
}

function swap(permutDice: number[], permutSides: number[], dieWins: number[], lDieId: number, gDieId: number): void {
    dieWins.forEach((w, sideId) => {
        const rmId = findDieSide(permutDice, permutSides, gDieId, sideId);
        const beforeLessId = dieWins[sideId] < dieWins.length ?
            findDieSide(permutDice, permutSides, lDieId, w) : permutDice.length;

        if (rmId > beforeLessId) {
            const afterLessId = dieWins[sideId] > 0 ? findDieSide(permutDice, permutSides, lDieId, w - 1) : -1;
            const afterSameId = sideId > 0 ? findDieSide(permutDice, permutSides, gDieId, sideId - 1) : -1;
            const insId = Math.max(afterLessId, afterSameId) + 1;

            const tmpDieId = permutDice[rmId];
            const tmpSideId = permutSides[rmId];
            for (let id = rmId; id > insId; --id) {
                permutDice[id] = permutDice[id - 1];
                permutSides[id] = permutSides[id - 1];
            }
            permutDice[insId] = tmpDieId;
            permutSides[insId] = tmpSideId;
        }
    });
}

export function winsToPermut(wins: number[][]): number[] {
    wins = [...wins];
    const permutDice = new Array(wins.length).fill(0)
        .map((_, id) => new Array<number>(wins[0].length).fill(id))
        .reduce((a, d) => a.concat(d), []);
    const permutSides = new Array(wins.length).fill(0)
        .map((_) => {
            return new Array(wins[0].length).fill(0)
                .map((_, id) => id);
        })
        .reduce((a, p) => a.concat(p), []);

    let prevPermutDice: number[];
    do {
        prevPermutDice = [...permutDice];
        wins.forEach((dieWins, dieId) => swap(permutDice, permutSides, dieWins, dieId, (dieId + 1) % wins.length));
    } while (permutDice.findIndex((n, id) => prevPermutDice[id] !== n) >= 0);

    return permutDice;
}
