import { format, sub } from "date-fns"

describe("Repository", () => {
  const date = format(
    sub(new Date(), {
      days: 7,
    }),
    "yyyy-MM-dd"
  )

  beforeEach(() => {
    cy.fixture("all-repositories").then((json) => {
      cy.intercept(
        "GET",
        `https://api.github.com/search/repositories?q=created:%3E${date}+language:all*`,
        json
      ).as("getRepos")
    })

    cy.fixture("ts-repositories").then((json) => {
      cy.intercept(
        "GET",
        `https://api.github.com/search/repositories?q=created:%3E${date}+language:TypeScript*`,
        json
      ).as("getFilteredRepos")
    })
  })

  describe("Read and Interact with Repositories", () => {
    it("should include repositories created in the last 7 days", () => {
      // Visit the home page
      cy.visit("/")

      // Wait for the intercepted request and verify the URL
      cy.wait("@getRepos").then((interception) => {
        expect(interception.request.url.includes(`q=created:%3E${date}`)).to.eq(
          true
        )
      })
    })

    it("should see a list of repositories ordered by stars desc", () => {
      // Visit the home page
      cy.visit("/")

      // Wait for the intercepted request and verify the URL
      cy.wait("@getRepos").then((interception) => {
        expect(
          interception.request.url.includes("&sort=stars&order=desc")
        ).to.eq(true)
      })
    })

    it("should be able to favorite repositories and save them to local storage", () => {
      // Visit the home page
      cy.visit("/")

      // Wait for the loader to disappear
      cy.get('div[data-testid="loader"]').should("not.exist")

      // Click the first repository card favorite button
      cy.get("ul li")
        .first()
        .within(() => {
          cy.get("button").contains("Favorite").click()
        })

      // Verify that the favorite button is now active
      cy.get("ul li")
        .first()
        .within(() => {
          cy.get("button").find("svg").should("have.class", "fill-black")
        })

      // Verify that the favorite repository is now in local storage
      cy.fixture("all-repositories").then((json) => {
        expect(localStorage.getItem("favorites")).to.equal(
          JSON.stringify([json.items[0]])
        )
      })
    })

    it("should be able to see favorite repositories on a separate tab", () => {
      // Visit the home page
      cy.visit("/")

      // Wait for the loader to disappear
      cy.get('div[data-testid="loader"]').should("not.exist")

      // Click the first repository card favorite button
      cy.get("ul li")
        .first()
        .within(() => {
          cy.get("button").contains("Favorite").click()
        })

      // Open the favorites tab and verify that the favorite repository is there
      cy.get("button").contains("Favorites").click()
      cy.get("ul li")
        .should("have.length", 1)
        .within(() => {
          cy.get("h3").should("contain", "BasedHardware/OpenGlass")
        })
    })

    it("should be able to see repo name, link to GitHub, number of stars, and description", () => {
      // Visit the home page
      cy.visit("/")

      // Wait for the loader to disappear
      cy.get('div[data-testid="loader"]').should("not.exist")

      // Verify the content of the first repository card
      cy.get("ul li")
        .first()
        .within(() => {
          cy.get("a").should(
            "have.attr",
            "href",
            "https://github.com/BasedHardware/OpenGlass"
          )
        })
      cy.get("ul li").first().contains("BasedHardware/OpenGlass")
      cy.get("ul li")
        .first()
        .contains("Turn any glasses into AI-powered smart glasses")
      cy.get("ul li").first().contains("TypeScript")
      cy.get("ul li").first().contains("1591")
    })
  })

  describe("Filter Repositories By language", () => {
    it("should be able to filter all repositories by language", () => {
      // Visit the home page
      cy.visit("/")

      // Wait for the loader to disappear
      cy.get('div[data-testid="loader"]').should("not.exist")

      // Select the TypeScript language filter
      cy.get("button").contains("All").click()
      cy.get("[data-testid='language-select-content']")
        .contains("TypeScript")
        .click()

      // Verify that the TypeScript language filter is now active in the URL
      cy.url().should("include", "?language=TypeScript")

      // Wait for the intercepted request and verify the URL
      cy.wait("@getFilteredRepos").then((interception) => {
        expect(interception.request.url.includes("language:TypeScript")).to.eq(
          true
        )
      })

      // Verify that the correct number of repositories are displayed
      cy.get("ul li").should("have.length", 2)
    })

    it("should be able to filter favorite repositories by language", () => {
      // Visit the home page
      cy.visit("/")

      // Click the first and last repository card favorite button
      cy.get("ul li")
        .first()
        .within(() => {
          cy.get("button").contains("Favorite").click()
        })
      cy.get("ul li")
        .last()
        .within(() => {
          cy.get("button").contains("Favorite").click()
        })

      // Select the TypeScript language filter
      cy.get("button").contains("All").click()
      cy.get("[data-testid='language-select-content']")
        .contains("TypeScript")
        .click()

      // Visit the Favorites tab
      cy.get("button").contains("Favorites").click()

      // Verify that the TypeScript language filter is now active in the URL
      cy.url().should("include", "?language=TypeScript")

      // Verify that the correct number of repositories are displayed
      cy.get("ul li").should("have.length", 1)
    })
  })

  describe("Repositories Query Failed", () => {
    beforeEach(() => {
      cy.intercept(
        "GET",
        `https://api.github.com/search/repositories?q=created:%3E${date}+language:all*`,
        {
          statusCode: 403,
          body: {
            message: "API rate limit exceeded",
          },
        }
      ).as("getRepos")
    })

    it("should display a message if repositories query fails", () => {
      // Visit the home page
      cy.visit("/")

      // Wait for the loader to disappear
      cy.get('div[data-testid="loader"]').should("not.exist")

      // Verify that the message is displayed
      cy.get("p")
        .contains("API rate limit exceeded")
        .should("have.class", "text-red-600")
    })
  })
})
