// Αλλαγή ποσότητας προϊόντος στο καλάθι

describe('Change Quantity', () => {
  it('increases and decreases product quantity', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid^="add-to-cart-"]').first().click();
    cy.get('[data-testid="cart-nav"]').click();
    cy.get('[data-testid^="increase-"]').first().click();
    cy.get('[data-testid^="quantity-"]').first().should('have.text', '2');
    cy.get('[data-testid^="decrease-"]').first().click();
    cy.get('[data-testid^="quantity-"]').first().should('have.text', '1');
  });
});
