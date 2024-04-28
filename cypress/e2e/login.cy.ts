/**
 * - Login spec
 *   - should display login page correctly
 *   - should display error message when email is empty
 *   - should display default error message from browser when email is invalid
 *   - should display error message when password is empty
 *   - should display toast error message when email and password are wrong
 *   - should display homepage when email and password are correct
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="email"]').should('be.visible');
    cy.get('input[placeholder="password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display error message when email is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('p')
      .contains(/^You must enter an email address.$/)
      .should('be.visible');
  });

  it('should display default error message from browser when email is invalid', () => {
    cy.get('input[placeholder="email"]').type('invalid-email');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('input:invalid').should('have.length', 1);
  });

  it('should display error message when password is empty', () => {
    cy.get('input[placeholder="email"]').type('testinguser@example.com');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('p')
      .contains(/^You must enter a password.$/)
      .should('be.visible');
  });

  it('should display toast error message when email and password are wrong', () => {
    cy.get('input[placeholder="email"]').type('testinguser@example.com');
    cy.get('input[placeholder="password"]').type('wrong-password');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('div[role="status"]')
      .contains(/^Login failed: email or password is wrong$/)
      .should('be.visible');
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="email"]').type('testinguser@example.com');
    cy.get('input[placeholder="password"]').type('password123');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('h1').contains(/^Home$/);
    // navbar contains avatar image
    // cy.get('nav').find('img').should('be.visible');
    cy.get('nav').find('span[data-testid="avatar"]').should('be.visible');
    // check button class name
    cy.get('nav')
      .find('button[data-testid="leaderboard-score"]')
      .find('svg')
      .should('have.class', 'lucide-zap');
  });
});
