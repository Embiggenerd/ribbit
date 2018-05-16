const _   = Cypress._

// require node's url module
const url = require('url')

describe('Logging In - Single Sign on', function(){
  // Create custom post request to login server, which avoids the UI
  // and therefore google's anti-bot software 
  Cypress.Commands.add('loginBySingleSignOn', (overrides = {}) => {

    Cypress.log({
      name: 'loginBySingleSignOn'
    })

    const options = {
      method: 'POST',
      url: 'http://auth.corp.com:7075/login',
      qs: {
        // use qs to set query string to the url that creates
        // http://auth.corp.com:8080?redirectTo=http://localhost:7074/set_token
        redirectTo: 'http://localhost:7074/set_token'
      },
      form: true, // we are submitting a regular form body
      body: {
        username: 'jane.lane',
        password: 'password123',
      }
    }

    // allow us to override defaults with passed in overrides
    _.extend(options, overrides)

    cy.request(options)
  })

  context('Use redirectTo and a session cookie to login', function(){
    // This first example assumes we have an app server that
    // is capable of handling the redirect and set a session cookie

    // The flow will be:
    // 1. sign into auth.corp.com
    // 2. redirect back to our app server
    // 3. have our app server set an HttpOnly session cookie
    // 4. check that we are now properly logged in

    it('is 403 unauthorized without a session cookie', function(){
      // smoke test just to show that without logging in we cannot
      // visit the dashboard
      cy.visit('/dashboard')
      cy.get('h3').should('contain', 'You are not logged in and cannot access this page')
      cy.url().should('include', 'unauthorized')
    })

    it('can authenticate with cy.request', function(){
      // this automatically gets + sets cookies on the browser
      // and follows all of the redirects that ultimately get
      // us to /dashboard.html
      cy.loginBySingleSignOn()
        .then((resp) => {
          // yup this should all be good
          expect(resp.status).to.eq(200)

          // we're at http://localhost:7074/dashboard contents
          expect(resp.body).to.include('<h1>Welcome to the Dashboard!</h1>')
        })

      // you don't need to do this next part but
      // just to prove we can also visit the page in our app
      cy.visit('/dashboard')

      cy.get('h1').should('contain', 'Welcome to the Dashboard')

      // and our cookie should be set to 'cypress-session-cookie'
      cy.getCookie('cypress-session-cookie').should('exist')
    })
  })

  context('Manually parse id_token and set on local storage to login', function(){
    // This second example assumes we are building a SPA
    // without a server to handle setting the session cookie.

    // The flow will be:
    // 1. Disable following automatic redirects
    // 1. Sign into auth.corp.com
    // 2. Parse out the id_token manually
    // 3. Visit our application
    // 4. Before it loads, set token on local storage
    // 5. Make sure the XHR goes out and the response
    //    is correct + #main has the correct response text

    it('knows when there is no session token', function(){
      // by default our SPA app checks for id_token set in local storage
      // and will display a message if its not set
      //
      // else it will make an XHR request to the backend and display the results
      cy.visit('/')
      cy.get('#main')
        .should('contain', 'No session token set!')
    })

    it('can parse out id_token and set on local storage', function(){
      // dont follow redirects so we can manually parse out
      // the id_token
      cy.loginBySingleSignOn({followRedirect: false})
        .then((resp) => {
          // we can use the redirectedToUrl property that Cypress adds
          // whenever we turn off following redirects
          //
          // and use node's url.parse module (and parse the query params)
          const uri = url.parse(resp.redirectedToUrl, true)

          // we now have query params as an object and can return
          // the id_token
          return uri.query.id_token
        })
        .then((id_token) => {
          cy.server()
          cy.route('/config').as('getConfig')

          // now go visit our app
          cy.visit('/', {
              onBeforeLoad: function(win){
                // and before the page finishes loading
                // set the id_token in local storage
                win.localStorage.setItem('id_token', id_token)
              }
            })

          // wait for the /config XHR
          cy.wait('@getConfig')
            .its('response.body')
            .should('deep.eq', {
              foo: 'bar',
              some: 'config',
              loggedIn: true
            })

          // and now our #main should be filled
          // with the response body
          cy.get('#main')
            .invoke('text')
            .should((text) => {
              // parse the text into JSON
              const json = JSON.parse(text)

              expect(json).to.deep.eq({
                foo: 'bar',
                some: 'config',
                loggedIn: true
              })
            })
        })
    })
})
})
