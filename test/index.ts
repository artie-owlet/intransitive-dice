import { expect } from 'chai';

import { generate } from '../src/index';

describe('generate()', () => {
    it('3d3w5', () => {
        expect(generate(3, 3, 5)).deep.equal([
            [1, 6, 8],
            [2, 4, 9],
            [3, 5, 7],
        ]);
    });

    it('3d5w16', () => {
        expect(generate(3, 5, 16)).equal(null);
    });

    it('4d5w16', () => {
        expect(generate(4, 5, 16)).deep.equal([
            [ 1, 11, 12, 13, 15 ],
            [ 2, 3, 14, 16, 17 ],
            [ 4, 5, 7, 18, 19 ],
            [ 6, 8, 9, 10, 20 ]
        ]);
    });

    it('3d6w19', () => {
        expect(generate(3, 6, 19)).deep.equal([
            [ 1, 2, 11, 13, 14, 16 ],
            [ 4, 6, 7, 8, 15, 17 ],
            [ 3, 5, 9, 10, 12, 18 ],
        ]);
    });

    it('check args', () => {
        expect(generate.bind(null, 2, 3, 5)).throw('diceNum < 3');
        expect(generate.bind(null, 3, 2, 5)).throw('sidesNum < 3');
        expect(generate.bind(null, 3, 3, 4)).throw('win <= (sidesNum^2)/2');
    });
});
