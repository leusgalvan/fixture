const componentsLoginPage = {
  logInButton: '//*[@id="root"]/div/div/button/span[1]',
  title: '//*[@id="root"]/div/div/h5',
};

describe("Login Tests", () => {
  const port = process.env.PORT || "5000";
  const url = `http://localhost:${port}/`;

  it("Check title", () => {
    cy.visit(url);
    cy.xpath(componentsLoginPage.title).should("contain", "Welcome");
  });

  it("Check button classs", () => {
    cy.xpath(componentsLoginPage.logInButton).should(
      "have.class",
      "MuiButton-label"
    );
  });

  it("Login", () => {
    cy.xpath(componentsLoginPage.logInButton).click();
  });
});
