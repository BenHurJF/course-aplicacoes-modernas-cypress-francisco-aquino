/* global Given, Then, When */

import teste from '../PAGEOBJECTS';


Given(/^acesso o site CWI$/, () => {
	return 0;
});

When(/^acesso a pagina de login$/, () => {
	return true;
});

Then(/^devo visualizar botao de recuperar senha esquecida$/, () => {
	return true;
});
