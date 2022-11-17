describe("fibonacci algorithm", () => {

   it("empty input value and disable button", () => {
      cy.visit("/fibonacci")
      cy.get("input").should("be.empty")
      cy.get("button").should("be.disabled")
   })

   it("number check", async () => {
      cy.get("input").type(10)
      cy.get("button").should("be.enabled").contains("Рассчитать").click()
      cy.get("button").should("be.disabled")
      cy.get("[data-testid=\"circle\"]").should("have.length", 10).as("circle")
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).to.have.text("0")
         expect($e.eq(1)).to.have.text("1")
         expect($e.eq(2)).to.have.text("1")
         expect($e.eq(3)).to.have.text("2")
         expect($e.eq(4)).to.have.text("3")
         expect($e.eq(5)).to.have.text("5")
         expect($e.eq(6)).to.have.text("8")
         expect($e.eq(7)).to.have.text("13")
         expect($e.eq(8)).to.have.text("21")
         expect($e.eq(9)).to.have.text("34")
      })
      cy.get("input").should("be.empty")
      cy.get("button").should("be.disabled")
   })
})
