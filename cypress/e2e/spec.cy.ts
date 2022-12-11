describe("My Demo Test Suite for Nutrien", () => {
  it("should render a landing screen", () => {
    cy.visit("/");
    cy.contains("Unsplash API").should("be.visible");
  });

  it("should render 10 photos on page load", () => {
    cy.visit("/");
    cy.get("[data-testid=displayed-image-button]").should("have.length", 10);
  });

  it("should update pagination label on page change", () => {
    cy.visit("/");

    cy.get("[data-testid=pagination-label]").contains("Page 1"); // default page index on load.
    cy.get("[data-testid=next-btn]").click();
    cy.get("[data-testid=pagination-label]").contains("Page 2");
    cy.get("[data-testid=prev-btn]").click();
    cy.get("[data-testid=pagination-label]").contains("Page 1"); // return back to default page.
  });

  it("should search for photos of 'pizza'", () => {
    cy.visit("/");

    const searchInput = cy.get("[data-testid=unsplash-search]");
    searchInput.should(
      "have.attr",
      "placeholder",
      "Search free high-res photos"
    );
    searchInput.type("pizza{enter}");
    cy.get("[data-testid=grid-title]").contains('Showing photos for "pizza"');
  });
});
