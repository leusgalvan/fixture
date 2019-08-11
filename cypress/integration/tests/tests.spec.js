const componentsLoginPage = {
    logInButton : '//*[@id="root"]/div/div/button/span[1]',
    title: '//*[@id="root"]/div/div/h5'
};

describe('Login Tests', () => {

    it('Check title', () => {
        cy.visit('http://localhost:3000/');
        cy.xpath(componentsLoginPage.title).should('contain', 'Welcome');
    });

    it('Check button classs', () => {
        cy.xpath(componentsLoginPage.logInButton).should('have.class', 'MuiButton-label');
    });
});