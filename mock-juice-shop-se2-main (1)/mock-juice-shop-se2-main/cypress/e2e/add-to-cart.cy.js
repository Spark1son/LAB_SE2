// Προσθήκη προϊόντος στο καλάθι

describe('Add to Cart', () => {
  it('adds a product to the cart', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid^="add-to-cart-"]').first().click();
    cy.get('[data-testid="cart-nav"]').click();
    cy.get('.cart-item').should('have.length.at.least', 1);
  });
});
