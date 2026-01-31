// Ολοκλήρωση παραγγελίας (Checkout)

describe('Checkout', () => {
  it('completes an order', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid^="add-to-cart-"]').first().click();
    cy.get('[data-testid="cart-nav"]').click();
    cy.get('[data-testid="checkout-button"]').click();
    cy.get('#name-error').should('contain', 'Name is required');
    cy.get('#customer-name').type('Test User');
    cy.get('#customer-email').type('test@example.com');
    cy.get('#customer-address').type('Test Address');
    cy.get('[data-testid="checkout-button"]').click();
    cy.contains('Order Placed Successfully!').should('exist');
  });
});
