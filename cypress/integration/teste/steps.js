// Aqui deve importar o construtor da Classe da PageObjects para Utilizar as Funções/Métodos da classe...
import asserts from '../../support/pages/asserts';


Then(/^faço uma assertiva$/, () => {
	asserts.fazerAssert();
});

