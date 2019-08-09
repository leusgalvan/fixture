describe('Login Tests', () => {
    it('Check title', () => {
        cy.visit('http://localhost:3000/');
        cy.xpath('//*[@id="root"]/div/div/h5').should('contain', 'Welcome');
    })
});