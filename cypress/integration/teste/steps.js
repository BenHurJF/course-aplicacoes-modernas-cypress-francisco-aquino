// Aqui deve importar o construtor da Classe da PageObjects para Utilizar as Funções/Métodos da classe...
import asserts from '../../support/pages/asserts';

Given(/^acesso o site CWI$/, () => {
	 asserts.fazerAssert();
});

When(/^acesso a pagina de login$/, () => {
	return true;
});

Then(/^devo visualizar botao de recuperar senha esquecida$/, () => {
	return true;
});
