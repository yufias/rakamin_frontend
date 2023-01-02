Cypress.Commands.add('login', () => { 
    cy.request({
        method: 'POST',
        url: 'https://todo-api-18-140-52-65.rakamin.com/auth/login',
        body: {
            "email": "admin@mail.com",
            "password": "12345"
        }
    })
    .then(res => {
        cy.log(res.body)
        window.localStorage.setItem('auth_token', res.body.auth_token)
    })
  
})

beforeEach(() => {
    cy.login()
})
  

describe('Logged in user open page', () => {
    it('Visit Homepage Rakamin FE Test', () => {
        cy.visit('http://localhost:3000/v1')
        cy.get('button').should('be.visible')
    })
})

describe('Click Create new group', () => {
    it('Open create new group modal', () => {
        cy.visit('http://localhost:3000/v1')
        cy.get('button').click()
        cy.get('.ant-modal').should('be.visible')
    })
})

describe('Create new group', () => {
    it('Submit create new group', () => {
        cy.visit('http://localhost:3000/v1')
        cy.get('button').click()
        cy.get('.ant-modal').should('be.visible')
        cy.get('input').first().type('Cypress Group Task')
        cy.get('input').last().type('June - August')
        cy.get('button').contains('Save Group').click()
        cy.get('.ant-modal').should('not.exist')
    })
})

describe('Click Create new task', () => {
    it('Open create new task modal', () => {
        cy.visit('http://localhost:3000/v1')
        cy.get('[id=add_new_task]').first().click()
        cy.get('.ant-modal').should('be.visible')
    })
})

describe('Create new task', () => {
    it('Submit create new task', () => {
        cy.visit('http://localhost:3000/v1')
        cy.get('[id=add_new_task]').first().click()
        cy.get('.ant-modal').should('be.visible')
        cy.get('input').first().type('Cypress Sub Task')
        cy.get('input').last().type('87')
        cy.get('button').contains('Save Task').click()
        cy.get('.ant-modal').should('not.exist')
    })
})