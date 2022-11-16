describe("reverse string", () => {

   it("empty input value and disable button", () => {
      cy.visit("/reverse")
      cy.get("input").should("have.value", "")
      cy.get("button").should("be.disabled")
   })

   it("reverse string", async () => {
      cy.get("input").type("Aprel")
      cy.get("input").should("have.value", "Aprel")
      cy.get("button").should("be.enabled")
      cy.get("button").eq(1).click()
      cy.get("[data-testid=\"circle\"]").should("have.length", 5)
      cy.wait(1000)
      cy.get("[data-testid=\"circle\"]").should(($e) => {
         expect($e.eq(0)).to.have.text("l").and.css("border-color", "rgb(210, 82, 225)")
         expect($e.eq(1)).to.have.text("p").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(2)).to.have.text("r").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(3)).to.have.text("e").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(4)).to.have.text("A").and.css("border-color", "rgb(210, 82, 225)")
      })

   })
})

// "rgb(210, 82, 225)"
// "rgb(0, 50, 255)"
// "rgb(127, 224, 81)"
