/// <reference types="cypress" />

context('Lightbox', () => {
    beforeEach(() => {
        cy.visit('../../src/lightbox.html')
    })

    it('1. Tester l’ouverture de la lightbox au clique sur l’image', () => {
        cy.dataCy('lightbox-button').click()
        cy.dataCy('lightbox-outside').should('be.visible')
    })

    it('2. Tester la fermeture de la lightbox au clique en dehors de la lightbox', () => {
        cy.dataCy('lightbox-button').click()
        cy.get('body').click(0,0);
        cy.dataCy('lightbox-outside').should('not.be.visible')
    })

    it('3. Tester l’ajout de la mention “j’aime” et la mise à jour des compteurs sur l’overlay et la lightbox', () => {
        cy.dataCy('lightbox-button').click()
        cy.dataCy('like-button').click()
        cy.dataCy('likes-count-lightbox').should('have.text', '1')
    })
    
    it('4. Tester la supression de la mention “jaime” et la mise à jour des compteurs sur l’overlay et la lightbox', () => {
        cy.dataCy('lightbox-button').click()
        cy.dataCy('like-button').click()
        cy.dataCy('likes-count-lightbox').should('have.text', '1')
        cy.dataCy('dislike-button').click()
        cy.dataCy('likes-count-lightbox').should('have.text', '0')
    })

    it('5. Tester l’ajout d’un commentaire - Exemple de commentaire : “Cypress is awesome!”', () => {
        cy.dataCy('lightbox-button').click()
        cy.dataCy('comment-input').type('Cypress is awesome!')
        cy.dataCy('add-comment-form').submit()
        cy.dataCy('comment-body').should('have.text', 'Cypress is awesome!')
        cy.dataCy('comment-author').should('have.text', 'johndoe')
    })

    it('6. Tester que l’ajout d’un commentaire vide soit impossible car le bouton “Publish” reste désactivé ' , () => {
        cy.dataCy('lightbox-button').click()
        cy.dataCy('comment-input').should('have.value', '')
        cy.dataCy('publish-comment-button').should('be.disabled')
    })

    it('7. Tester l’option qui cache les commentaires', () => {
        cy.dataCy('lightbox-button').click()
        cy.dataCy('comment-input').type('Cypress is awesome!')
        cy.dataCy('add-comment-form').submit()
        cy.dataCy('show-hide-comments-link').should('have.text', 'Hide 1 comment')
        cy.dataCy('show-hide-comments-link').click()
        cy.dataCy('show-hide-comments-link').should('have.text', 'Show 1 comment')
    })

    it('8. Tester les différents compteurs de commentaires sur l’overlay et la lightbox', () => {
        cy.dataCy('lightbox-button').click()
        cy.dataCy('comment-input').type('Cypress is awesome!')
        cy.dataCy('add-comment-form').submit()
        cy.dataCy('show-hide-comments-link').should('have.text', 'Hide 1 comment')
        cy.get('body').click(0,0);
        cy.dataCy('lightbox-button').click({ force: true })
        cy.dataCy('comments-count-overlay').should('have.text', '1')
    })

    it('9. Tester le singulier/pluriel en fonction du nombre de commentaire.s', () => {
        cy.dataCy('lightbox-button').click()
        cy.dataCy('comment-input').type('Cypress is awesome!')
        cy.dataCy('add-comment-form').submit()
        cy.dataCy('show-hide-comments-link').should('include.text', 'comment')
        cy.dataCy('comment-input').type('Cypress is awesomex2!')
        cy.dataCy('add-comment-form').submit()
        cy.dataCy('show-hide-comments-link').should('include.text', 'comments')
    })

    it('10. Écrire trois commentaires et tester la supression du second commentaire au clique sur la bonne croix', () => {
        cy.dataCy('lightbox-button').click()
        cy.dataCy('comment-input').type('Cypress is awesome!')
        cy.dataCy('add-comment-form').submit()
        cy.dataCy('comment-input').type('Cypress is awesomex2!')
        cy.dataCy('add-comment-form').submit()
        cy.dataCy('comment-input').type('Cypress is awesomex3!')
        cy.dataCy('add-comment-form').submit()
        cy.dataCy('comments-container').contains('Cypress is awesomex2!').should('exist')
        cy.dataCy('delete-comment-button').eq(1).click()
        cy.dataCy('comments-container').('not.contain', 'Cypress is awesomex2!')
    });
});