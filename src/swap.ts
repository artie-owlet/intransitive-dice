function findDieSide(permutDice: number[], permutSides: number[], dieId: number, sideId: number): number {
    return permutDice.findIndex((n, id) => n === dieId && permutSides[id] === sideId);
}

export function swap(permutDice: number[], permutSides: number[], dieWins: number[], lDieId: number, gDieId: number
): void {
    dieWins.forEach((w, sideId) => {
        const rmId = findDieSide(permutDice, permutSides, gDieId, sideId);
        const beforeLessId = w < dieWins.length ? findDieSide(permutDice, permutSides, lDieId, w) : permutDice.length;
        const afterLessId = w > 0 ? findDieSide(permutDice, permutSides, lDieId, w - 1) : -1;

        /* istanbul ignore else */
        if (rmId > beforeLessId) {
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
        } else if (rmId < afterLessId) {
            const afterSameId = sideId > 0 ? findDieSide(permutDice, permutSides, gDieId, sideId - 1) : -1;
            const insId = Math.max(afterLessId, afterSameId);

            const tmpDieId = permutDice[rmId];
            const tmpSideId = permutSides[rmId];
            for (let id = rmId; id < insId; ++id) {
                permutDice[id] = permutDice[id + 1];
                permutSides[id] = permutSides[id + 1];
            }
            permutDice[insId] = tmpDieId;
            permutSides[insId] = tmpSideId;
        }
    });
}
