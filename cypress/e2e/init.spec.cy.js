describe("init SPA", () => {

   it("open SPA",() => {
      cy.visit("/").get("h1").should("have.text", "МБОУ АЛГОСОШ")
   })
})
