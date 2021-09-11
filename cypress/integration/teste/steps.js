// Aqui deve importar o construtor da Classe da PageObjects para Utilizar as Funções/Métodos da classe...
import asserts from '../../support/pages/asserts';


Then(/^Asserções esperadas com Expect$/, () => {
	asserts.fazerAssert();
	asserts.outroAssert();
});

Then(/^Asserção com array ->$/, () => {
	asserts.assertComArray();
});

When(/^Asserções de tipos$/, () => {
	asserts.assertNivelDeTipos();
});

