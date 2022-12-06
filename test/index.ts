import { expect } from 'chai';

import { generate } from '../src/index';
import { isITD } from '../src/is-itd';

describe('generate()', () => {
    it('3d3w5', () => {
        expect(generate(3, 3, 5)).deep.equal([
            [3, 5, 7],
            [1, 6, 8],
            [2, 4, 9],
        ]);
    });

    it('3d5w16', () => {
        expect(generate(3, 5, 16)).equal(null);
    });

    it('4d5w16', () => {
        const itd = generate(4, 5, 16);
        if (!itd) {
            expect.fail();
        }
        expect(isITD(itd)).eq(true);
    });

    it('5d5w17', () => {
        expect(generate(5, 5, 17)).equal(null);
    });

    it('3d6w19', () => {
        const itd = generate(3, 6, 19);
        if (!itd) {
            expect.fail();
        }
        expect(isITD(itd)).eq(true);
    });

    it('check args', () => {
        expect(generate.bind(null, 2, 3, 5)).throw('diceNum < 3');
        expect(generate.bind(null, 3, 2, 5)).throw('sidesNum < 3');
        expect(generate.bind(null, 3, 3, 4)).throw('win <= (sidesNum^2)/2');
    });
});
