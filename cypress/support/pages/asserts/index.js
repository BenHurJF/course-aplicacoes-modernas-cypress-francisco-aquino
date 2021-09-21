// ações da página

// requerir os elementos para page ATUAL->

class Assert {

    fazerAssert() {
        const a = 1;
        expect(a).equal(1);
        expect(a, 'Deveria ser 1').equal(1);
        expect(a).to.be.equal(1);
        expect('a').not.to.be.equal('b');
     }

    outroAssert() {
        const obj = { 
            a : 1, 
            b : 2,
            c : 'Ben-Hur QA Automation'
        }
        expect(obj).equal(obj);
        expect(obj).equals(obj);
        expect(obj).to.be.equal(obj);
        expect(obj).to.be.deep.equal({a: 1, b: 2, c: 'Ben-Hur QA Automation'});
        // Assert para Igualar Exatamente
        expect(obj).eql({a: 1, b: 2, c: 'Ben-Hur QA Automation'});
        // Assert verificar que inclui dentro de OBJ
        expect(obj).include( {a: 1} );
        // Assert se dentro de (OBJ) possui a propriedade 'b' ->
        expect(obj).to.have.property('b');
        // Assert verificando que não é vazio ->
        expect(obj).to.not.be.empty;
        // Quando acessar esse cara, tem que estar vazio ->
        expect({}).to.be.empty;
     }

     assertComArray() {
         const array = [1, 2, 3, 4, 5];
         // Espera ter os membros descritos em colchetes no ARRAY
         expect(array).to.have.members([1, 2, 3, 4, 5]);
         // Espera que alguns desses membros esteja incluído no ARRAY
         expect(array).to.include.members([1, 2, 3]);
         // Verificar se o ARRAY está VAZIO ou não...
         expect(array).to.not.be.empty;
         // Espera que esse ARRAY citado (VAZIO) esteja VAZIO -> 
         expect([]).to.be.empty;
     }

     assertNivelDeTipos() {
         const num = 1;
         const str = 'String';
         // Verificar se é do tipo número
         expect(num).to.be.a('number');
         // Verificar se é do tipo String
         expect(str).to.be.a('string');
         ////////////////////////////////

         const str1 = 'BenHurJF' + 2;
         // Comparar STRINGS
         expect(str1).to.be.equal('BenHurJF2');
         // Verificar se o tamanho dessa String  seja de 15 Caracteres (OU OQUE DESEJAR) ->
         expect(str1).to.have.length(9);
         // Verificar so um TRECHO da STRING -> STR1
         expect(str1).to.contains('Hur');
         // Verificar que existe apenas LETRAS
         expect(str1).to.match(/\w+/);
         // Verificar que não contém números
         expect(str1).to.match(/\D+/);
     }

     numeros() {
         const n1 = 4;
         const floatn1 = 4.321;
         // verificar se o numero seja igual a 4
         expect(n1).to.be.equal(4);
         // verificar se e acima de 3
         expect(n1).to.be.above(3);
         // se está abaixo de 5
         expect(n1).to.be.below(5);
         /// Float
         expect(floatn1).to.be.equal(4.321);
         // verificar se o float e proximo de... com uma precisao de 0.1
         expect(floatn1).to.be.closeTo(4.3, 0.1);
        }
        
}


// exportar nossa classe para ser usada (Construtor)
export default new Assert;