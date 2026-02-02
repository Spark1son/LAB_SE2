describe('Site is up', () => {
    beforeEach(() =>{ // prin apo kathe test na episkeptesai to http...
        cy.visit('http://localhost:3000') // MONO se ayto to SCOPE exei isxy, OXI se allh describe
    });

    it('Should load homepage', () =>{ // me IT ftiaxnoume tests
        cy.contains('Juice Shop') // koitaei olh th selida gia to an yparxei kp mesa ayto to keimeno
    });    

    // thelw na elegksw an ta elements yparxoun sto browser mou
    //SCOPE HEAD
    it('Header should have: a) container with a title and two buttons (Products, Cart)', () =>{
        // twra tha periorisoyme to scope gia na doyme an yparxei mesa sto Header
        // Me #header (uparxei ston browser) pairnw to object me xrhsh ID
        // Me .container psaxnei ana KLASH
        cy.get('#header').within(() => {
            cy.get('.container').within(() => {
                cy.get('h1.logo').should('be.visible').and('contains.text', 'Juice Shop'); //h1. giati tha mporouse na yparxei kai h2

                cy.get('nav').should('exist');

                cy.get('#view-products').should('exist'); // bazw id gt an ebaza klash den tha hksere pou na elegksei

                cy.get('nav').within(() => {
                    cy.get('button.nav-button').should('have.length', 2);
                });
                //cy.get('nav button.nav-button').should('have.length', 2); // equivalent to the above

                // ME XRHSH TWN data-testid
                // cy.get('[data-testid="products-nav"').should('be.visible');
                // cy.get('[data-testid="cart-nav"').should('be.visible');

                cy.get('#cart-count').should('exist').invoke('text').then(Number).should('be.gte', 0);
            })
            //should('be visible'), should('exist'), should('have.length', n), should('contains.text', 'some text')
            // Chai BOD

        }) // etsi mpainw oso thelw mesa se ena scope
    })

    //SCOPE BODY
    //oi entoles trexoun seiriaka edw
    it('Should filter products by search', () => {
        cy.get('#search-input').type('orange'); // me thn type mporw na grapsw

        cy.get('.product-card').should('have.length', 1); // thelw h lista mou na exei mhkos 1
    });

}); // desmeumenh leksi ths cypress pou mas epitrepei na grafoume groups apo testakia