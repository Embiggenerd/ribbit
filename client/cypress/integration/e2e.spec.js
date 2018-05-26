describe("first e2e", () => {
  beforeEach(() => {
    cy.server()
    cy.route("GET", "/api/current_user").as("authorize")
    cy.route("/api/own/timeline").as("getTimeline")
    cy.route("/api/blogs").as("getBlogs")
    cy.visit("/")

    cy.wait("@authorize")
    cy.wait("@getTimeline")
  })

  it("successfully loads", () => {
    // Make sure nav bar has all the right elements
    cy.get("div.nav-wrapper").then($nav => {
      cy
        .wrap($nav)
        .children()
        .should($childs => {
          expect($childs).to.have.length(2)
          expect($childs.eq(0)).to.contain("Ribbit")
        })
    })
    cy
      .get("ul#headerUl")
      .children()
      .should($childs => {
        expect($childs).to.be.visible
        expect($childs).to.have.length(5)
        expect($childs.eq(0)).to.contain("Embiggen Thyself")
        expect($childs.eq(1)).to.contain("Add Credits")
        expect($childs.eq(2)).to.contain("Credits")
        expect($childs.eq(3)).to.contain("Logout")
        expect($childs.eq(4)).to.contain("Dashboard")
      })
    cy.log("test display buttons")
    // check display options
    cy
      .get("#display-options")
      .children()
      .should($childs => {
        expect($childs).to.have.length(4)
        expect($childs.eq(0)).to.contain("Timeline")
        expect($childs.eq(1)).to.contain("Blogs")
        expect($childs.eq(2)).to.contain("Trending")
      })
    cy.log("test default timeline display")
    cy
      .get("#blog-list")
      .children()
      .should($childs => {
        expect($childs).to.contain("RIBBIT")
        expect($childs).to.not.contain("Delete")
      })

    // Add blog button exists
    cy.get(".fixed-action-btn > a").should("contain", "add")
  })

  it("Test blogs, trending display options", () => {
    cy.server()
    cy.route("/api/blogs").as("getBlogs")

    cy.route("/api/own/trending").as("getTrending")

    // test default blog list
    cy.get("#blog-list").should($blog => {
      expect($blog).to.not.contain("Delete")
    })

    // test default blog list changed after clicking blogs button
    cy.get("#display-options").should($displayDiv => {
      const $btns = $displayDiv.find("button")
      expect($btns.eq(1)).to.contain("Blogs")
      $btns.eq(1).click()
    })
    cy.wait("@getBlogs")
    cy.get("#blog-list").should($blog => {
      expect($blog).to.contain("Delete")
    })

    // click trending, test blog list
    cy.get("#display-options ").should($displayDiv => {
      const $btns = $displayDiv.find("button")
      $btns.eq(2).click()
    })
    cy.wait("@getTrending")
    cy.get("#blog-list").should($blogs => {
      expect($blogs)
        .to.contain("Delete")
        .and.to.contain("RIBBIT")
    })
  })

  describe("dashboard smoke test", () => {
    beforeEach(() => {
      cy.server()
      cy.route("/api/blogs").as("getBlogs")
      cy.route("/api/own/follow").as("getFollow")
    })

    it("Dashboard test", () => {
      cy.log("Go to dashboard")
      cy.get("#headerUl > li:nth-child(5)> a").click()
      cy.url().should("contain", "/dashboard")
      cy.wait("@getBlogs")
      cy.get("#blog-list").should($blogs => {
        expect($blogs)
          .to.contain("Delete")
          .and.to.not.contain("RIBBIT")
      })
      cy.wait("@getFollow")
      cy.get("#user-following-list").should($list => {
        expect($list).to.contain("Igor Atakhanov")
      })
      cy.get("#user-followers-list").should($list => {
        expect($list).to.contain("Igor Atakhanov")
      })
      cy.get("#user-following-list > li:nth-child(2) > a").should($link => {
        expect($link).to.have.attr("href", "/users/5ade809d0d6b780e29eddca4")
      })
      cy.get("#user-followers-list > li:nth-child(2) > a").should($link => {
        expect($link).to.have.attr("href", "/users/5ade809d0d6b780e29eddca4")
      })
    })
  })

  describe("add blog, add comments, delete comments, delete blog", () => {
    const blog = {
      author: "Embiggen Thyself",
      countBefore: 0,
      title: "smoke title 1",
      body: "smoke body 1",
      countAfter: 0
    }
    const comment = {
      countBefore: 0,
      countAfter: 0,
      body: "smoke comment 1",
      author: "Embiggen Thyself"
    }
    it("test adding blog", () => {
      cy.visit("/")
      cy.get("#display-options > :nth-child(2)").click()
      // Count how many blogs before adding
      cy
        .get("#blog-list")
        .children()
        .its("length")
        .then($length => {
          blog.countBefore = $length
        })
      // click add blog button
      cy.get(".fixed-action-btn > a").click()
      cy.url().should("contain", "/blogs/new")
      // fill out form, submit
      cy.get("input[name=title]").type(blog.title)
      cy.get("textarea[name=body]").type(blog.body)
      cy.get("button[type=submit]").click()
      // blog review prior to submit
      cy.get("div#confirm-div").should($div => {
        expect($div)
          .to.contain(blog.title)
          .and.to.contain(blog.body)
          .and.to.contain("Confirm")
      })
      // submit
      cy.get("button.right").click()

      cy.url().should("contain", "/dashboard")

      cy.wait(1000)
      // get blog count after submition, make sure it's greater by 1
      cy
        .get("#blog-list")
        .children()
        .its("length")
        .then($length => {
          blog.countAfter = $length
          expect(blog.countAfter).to.eql(blog.countBefore + 1)
        })
      // confirm new blog data, click to see detail, confirm detailed view's data
      cy.get("div#blog-list > div:nth-child(1)").should($blog => {
        expect($blog)
          .to.contain(blog.title)
          .and.to.contain(blog.body)
        $blog.find("span.card-title").click()
      })

      cy.url().should("contain", "/blogs/")
      cy.get("div.card-content").should($blog => {
        expect($blog)
          .to.contain(blog.title)
          .and.to.contain(blog.body)
          .and.to.contain(blog.author)
      })
      // submit comment to new blog
      cy.get("textarea[name=text]").type(comment.body)
      cy.get("button[type=submit]").click()
      // record comment countBefore
      cy
        .get("div#comment-list")
        .children()
        .its("length")
        .then($length => {
          comment.countBefore = $length
        })
      // add another comment
      cy.get("textarea[name=text]").type(comment.body)
      cy.server()
      cy.route("POST", "/api/comments/submit").as("submitComment")
      cy.get("button[type=submit]").click()

      cy.wait("@submitComment")
      cy.wait(1000)
      // record comment countAfter, compare counts
      cy
        .get("div#comment-list")
        .children()
        .its("length")
        .then($length => {
          comment.countAfter = $length
          expect(comment.countAfter).to.eql(comment.countBefore + 1)
        })

      cy.server()
      cy.route("POST", "/api/comments/*/delete").as("deleteComment")
      // check for comment data in comments list
      cy.get("div#comment-data").should("contain", comment.body)
      // delete comment, record new comment countAfter, compare to before
      cy
        .get("button#delete-comment")
        .eq(1)
        .click()

      cy.wait("@deleteComment")

      cy
        .get("div#comment-list")
        .children()
        .its("length")
        .then($length => {
          comment.countAfter = $length
          expect(comment.countAfter).to.eql(comment.countBefore)
        })

      cy.server()
      cy.route("/api/blogs").as("getBlogs")
      // delete blog we just added
      cy.get("button#delete-blog").click()
      // check redircted url
      cy.url().should("contain", "/dashboard")
      cy.wait("@getBlogs")
      cy.wait(1000)
      // record new blog countAfter, compare to countBefore
      cy
        .get("div#blog-list")
        .children()
        .its("length")
        .then($length => {
          blog.countAfter = $length
          expect(blog.countAfter).to.eql(blog.countBefore)
        })
    })
  })
  describe("test ribbit", () => {
    const ribs = {
      ribsBefore: 0,
      ribsAfter: 0
    }
    it("test ribbit funcitonality", () => {
      // record ribsBefore, click rib button, compare rib values
      cy.get("a#ribs-display").eq(0).invoke('text').then($a => {
        ribs.ribsBefore = parseInt($a.match(/\d+/g)[0])
      })
      cy.server()
      cy.route("POST", "/api/blogs/*/rib").as("forRib")
      cy.get("button#rib-button").eq(0).click()
      cy.wait("@forRib")
      cy.get("a#ribs-display").eq(0).invoke('text').then($a => {
        ribs.ribsAfter = parseInt($a.match(/\d+/g)[0])
        expect(ribs.ribsAfter).to.eql(ribs.ribsBefore + 1)
      })

    })
  })
})
