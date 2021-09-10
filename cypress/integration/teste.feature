#language: pt

Feature: Login site CWI

    Scenario: Visualizar opção de recuperar senha esquecida
        Given acesso o site CWI
        When acesso a pagina de login
        Then devo visualizar botao de recuperar senha esquecida