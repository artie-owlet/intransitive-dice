import { expect } from 'chai';

import { isITD } from '../src/is-itd';

describe("isITD()", () => {
    it('4d6', () => {
        expect(isITD([
            [1, 2, 16, 17, 18, 19],
            [3, 4, 5, 20, 21, 22],
            [6, 7, 8, 9, 23, 24],
            [10, 11, 12, 13, 14, 15],
        ])).equal(true);
    });

    it('4d6 wrong', () => {
        expect(isITD([
            [1, 3, 16, 17, 18, 19],
            [2, 4, 5, 20, 21, 22],
            [6, 7, 8, 9, 23, 24],
            [10, 11, 12, 13, 14, 15],
        ])).equal(false);
    });
});
