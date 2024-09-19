describe('Cypress - Test Admin Overview', () => {



    // IF the test doesn't work, go to the login function, delete one of the clicks and run the test again, add de the click back and then the tests should work again
    it('Admin should get the Userprofile and  use pagination and sorting', () => {
        cy.login("admin@example.com", "1234")
        cy.visit("http://localhost:3000/userprofile/all").wait(500)
        // call custom function that checks if it gets the correct amount of UserProfiles
        cy.checkListCount(10)
        // change the sorting type (in the dropdown), wait is necessary because the page needs some time to load
        cy.get('[data-cy="sort-dropdown"]').click()
        cy.contains('Username Z-A').click().wait(500)
        // get all usernames from the list and look if they are sorted decending
        let usernames = [];
        cy.get('[id="username"]').each(elements => {
            usernames.push(elements.val());
        }).then(() => {
            cy.wrap(usernames).should("deep.equal", [...usernames].sort().reverse());
        })
        cy.get('[aria-label="Go to next page"]').click().wait(500)
        cy.checkListCount(1)
    })
})

