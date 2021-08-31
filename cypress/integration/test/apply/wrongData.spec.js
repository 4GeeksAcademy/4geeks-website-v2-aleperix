context("Test Apply page with wrong data", () => {

  it('Visit the Apply page with path "/us/apply"', () => {
    cy.visit("/us/apply").wait(500);
  });

  it("Call the form and fill with wrong values", () => {
    // It gets data in fixtures folder to fill form
    cy.fixture("/contact/wrong.json").each((wrong) => {
      const { firstName } = wrong;

      cy.get("[data-cy=first_name]")
        .clear()
        .type(firstName)
    });

    cy.fixture("/apply/form_values/wrong.json").each((wrong) => {

      const { email, phone } = wrong;

      cy.get("[data-cy=email]")
      .clear()
      .type(email)
      .should("have.css", "background-color", "rgb(255, 205, 201)"); // reject input color
      cy.get("span").contains("Please specify a valid email");

      cy.get("[data-cy=phone]")
      .clear()
      .type(phone)
      .should("have.css", "background-color", "rgb(255, 205, 201)"); // reject input color
      cy.get("span").contains("Please specify a valid phone number");
    })
    cy.get("[data-cy=dropdown_program_selector]")
      .click().wait(500)
      .get("#react-select-2-option-0").click()

    cy.get("[data-cy=dropdown_academy_selector]")
      .click().wait(2500)
      .get("#react-select-3-option-1").click()
  });

  it("Shouldn't submit the form", () => {
    cy.get('Button[type="submit"]').contains("APPLY").click();
    cy.get("[data-cy=alertText]") // Alert after submit
  });
});
