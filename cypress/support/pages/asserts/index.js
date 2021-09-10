// ações da página

// requerir os elementos para page ATUAL->
const elements = require('./elements').ELEMENTS;

class asserts {
    fazerAssert() {
        const a = 1;

        expect(a).equal(1);
        expect(a, 'Deveria ser 1').equal(1);
        expect(a).to.be.equal(1);
        expect('a').not.to.be.equal('b');
    }
}


// exportar nossa classe para ser usada (Construtor)
export default new asserts;