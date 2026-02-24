/// <reference types="cypress" />

context('First scenario', () => {
    beforeEach(() => {
        cy.visit('../../src/caesar/index.html')
    })

    it('has a number input for cypher key', () => {
        cy.get('#cypher-key').should('have.attr', 'type', 'number')
    })

    it('display utf-8 for Test', () => {
        cy.dataCy('cypher-key').type('1')
        cy.dataCy('text-to-cypher').type('test')
        cy.dataCy('cypher-button').click()

        cy.dataCy('cypher-result').should('have.text', 'uftu')
    })


})