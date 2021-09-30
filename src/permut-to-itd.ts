export function permutToITD(permut: number[]): number[][] {
    const sidesNum = permut.reduce((n, diceId) => {
        return n + Number(diceId === 0);
    }, 0);
    const itd = new Array<number[]>(permut.length / sidesNum);
    new Array(permut.length / sidesNum).fill(0)
        .forEach((_, id) => itd[id] = []);
    permut.forEach((diceId, id) => {
        itd[diceId].push(id + 1);
    });
    return itd;
}
