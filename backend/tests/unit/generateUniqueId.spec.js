const generateUniqueId = require('../../src/utilities/generateUniqueId');

describe('Generate unique ID', () => {
    it('should generate an unique ID', ()  => {
        const id = generateUniqueId();
        
        //expect(2 + 2).toBe(4);
        expect(id).toHaveLength(8);
    });
})