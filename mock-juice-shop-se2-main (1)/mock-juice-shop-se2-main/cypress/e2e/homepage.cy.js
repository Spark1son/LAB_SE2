// Example E2E test for the homepage using Cypress

describe('Homepage', () => {
  it('should load and display the main header', () => {
    cy.visit('http://localhost:3000');
    cy.contains('learn react', { matchCase: false }).should('exist');
  });

  it('should add a product to the cart when clicking Add to Cart', () => {
    cy.visit('http://localhost:3000');
    // Βρίσκει το πρώτο κουμπί Add to Cart και το πατάει
    cy.get('[data-testid^="add-to-cart-"]').first().click();
    // Πατάει το κουμπί Cart στο header
    cy.get('[data-testid="cart-nav"]').click();
    // Ελέγχει ότι υπάρχει τουλάχιστον ένα προϊόν στο καλάθι
    cy.get('.cart-item').should('have.length.at.least', 1);
  });
});
