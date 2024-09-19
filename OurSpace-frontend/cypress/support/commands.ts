/// <reference types="cypress" />
///<reference path="../../node_modules/cypress/types/cypress.d.ts"/>
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.addAll({
    login: (email, password) => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-cy="email"]').click().type(email);
        cy.get('[data-cy="password"]').click().type(password);
        cy.get('[data-cy="submit-login"]').click().click();
    },
    checkListCount: (expectedCount) => {
        cy.get('[data-cy="people-list-item"]').children().should('have.length', expectedCount);
    }
    })

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password?: string): Chainable;
            checkListCount(expectedCount: number): Chainable;
        }
    }
}

export {};