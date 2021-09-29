context("Test Contact page with correct data", () => {

  it('Visit the Contact page with path "/us/contact"', () => {
    cy.visit("/us/contact").wait(500);
  });

  it("Call the form and fill with right values", () => {

    cy.log('**_____ Filling form data _____**')
    cy.fixture("/contact/right.json").then((right) => {
      const { firstName, lastName, email, comment } = right;

      cy.log('**_____ Intercepting... _____**')
      cy.intercept('POST', '**/marketing/lead', (req) => {
        console.log("REQUIRE:::::", req)
        req.body.first_name = firstName
        req.body.last_name = lastName
        req.body.email = email
        req.body.comment = comment
      }).as('postContact')

      cy.get("[data-cy=first_name]")
        .clear()
        .type(firstName)
        .should("have.css", "border-color", "rgb(0, 0, 0)"); // focus the form

      cy.get("[data-cy=last_name]")
        .clear()
        .type(lastName)
        .should("have.css", "border-color", "rgb(0, 0, 0)");

      cy.get("[data-cy=email]")
        .clear()
        .type(email)
        .should("have.css", "border-color", "rgb(0, 0, 0)");

      cy.get("[data-cy=comment]")
        .clear()
        .type(comment)
        .should("have.css", "border-color", "rgb(0, 0, 0)");
    });

    cy.log("**_____ Submit Form _____**")
    cy.get('Button[type="submit"]').contains("Send").click().wait(2500);

    cy.log("**_____ Verifying Interception API _____**")
    cy.wait('@postContact');
    cy.get('@postContact').then(({ request, response }) => {
      console.log("Response Intercepted:::", xhr)
      // expect(xhr.response.statusCode).to.equal(201)
      cy.wrap(request.body).its('first_name').should('eq', response.body.first_name)
      cy.wrap(request.body).its('last_name').should('eq', response.body.last_name)
      cy.wrap(request.body).its('email').should('eq', response.body.email)
      cy.wrap(request.body).its('client_comments').should('eq', response.body.client_comments)
    })

  });
});
