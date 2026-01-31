// Αφαίρεση προϊόντος από το καλάθι

describe('Remove from Cart', () => {
  it('removes a product from the cart', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid^="add-to-cart-"]').first().click();
    cy.get('[data-testid="cart-nav"]').click();
    cy.get('.cart-item').should('have.length.at.least', 1);
    cy.get('[data-testid^="remove-"]').first().click();
    cy.contains('Your cart is empty').should('exist');
  });
});
