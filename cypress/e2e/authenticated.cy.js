import { faker } from '@faker-js/faker/locale/en'

describe('CRUD', () => {
  it('CRUDs a note', () => {
    const noteDescription = faker.lorem.words(4)

    cy.intercept('GET', '**/notes').as('getNotes')
    cy.sessionLogin()

    cy.createNote(noteDescription)
    cy.wait('@getNotes')
    
    const updatedNoteDescription = faker.lorem.words(4)
    const attachFile = true

    cy.editNote(noteDescription, updatedNoteDescription, attachFile)
    cy.wait('@getNotes')
    
    cy.deleteNote(updatedNoteDescription)
    cy.wait('@getNotes', { timeout: 20000 })
  })

  it('successfully submits the settings form', () => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.intercept('POST', '**/prod/billing').as('paymentRequest')
    cy.sessionLogin()

    cy.fillSettingsFormAndSubmit()

    cy.wait('@getNotes', { timeout: 20000 })
    cy.wait('@paymentRequest')
      .its('state')
      .should('be.equal', 'Complete')
  })

  it('logs out', () => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.sessionLogin()
    cy.visit('/')
    cy.wait('@getNotes')

    if (Cypress.config('viewportWidth') < Cypress.env('viewportWidthBreakpoint')) {
      cy.get('.navbar-toggle.collapsed')
        .should('be.visible')
        .click()
    }
    
    cy.contains('.nav > :nth-child(2) > a', 'Logout').click()
  

    cy.get('#email').should('be.visible')
  })
})