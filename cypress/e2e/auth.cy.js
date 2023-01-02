describe('Visit Homepage', () => {
    it('Visit Homepage Rakamin FE Test', () => {
        cy.visit('http://localhost:3000/v1')
    })
})

describe('Visit Login Page', () => {
    it('Visit Login Page Rakamin FE Test', () => {
        cy.visit('http://localhost:3000/v1/login')
    })
})

describe('Visit Register Page', () => {
    it('Visit Register Page Rakamin FE Test', () => {
        cy.visit('http://localhost:3000/v1/register')
    })
})

describe('Go To Login Page from Homepage', () => {
    it('Visit Login Page Rakamin FE Test', () => {
        cy.visit('http://localhost:3000/v1')
        cy.get('a').click()
    })
})

describe('Valid Login', () => {
    it('Login with valid credentials', () => {
        cy.visit('http://localhost:3000/v1/login')
        cy.get('input').first().type('tony@stark.com')
        cy.get('input[type=password]').type('password')
        cy.get('button').click()
        cy.url().should('include', '/v1')
        expect(localStorage.getItem('auth_token'))
    })
})

describe('Register', () => {
    it('Register new user', () => {
        cy.visit('http://localhost:3000/v1/register')
        cy.get('[id=name]').first().type('dummy')
        cy.get('[id=email_address]').type('dummy@stark.com')
        cy.get('[id=password]').type('12345')
        cy.get('[id=confirm_password]').type('12345')
        cy.get('button').click()
        cy.url().should('include', '/v1')
        expect(localStorage.getItem('auth_token'))
    })
})
