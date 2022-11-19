describe("fibonacci algorithm", () => {

   const input = "input"
   const circle = "[data-testid=\"circle\"]"
   const calculate = "[data-testid=\"fibonacci-solution\"]"

   before("open page", () => {
      cy.visit("/fibonacci")
   })

   it("empty input value and disabled button", () => {
      cy.get(input).should("be.empty")
      cy.get(calculate).should("be.disabled")
   })

   it("number check", () => {
      cy.get(input).type(10).should("have.value", "10")
      cy.get(calculate).should("be.enabled").click().should("be.disabled")
      cy.get(circle).should("have.length", 10)
      cy.get(circle).should(($e) => {
         expect($e.eq(0)).contain("0")
         expect($e.eq(1)).contain("1")
         expect($e.eq(2)).contain("1")
         expect($e.eq(3)).contain("2")
         expect($e.eq(4)).contain("3")
         expect($e.eq(5)).contain("5")
         expect($e.eq(6)).contain("8")
         expect($e.eq(7)).contain("13")
         expect($e.eq(8)).contain("21")
         expect($e.eq(9)).contain("34")
      })
      cy.get(input).should("be.empty")
      cy.get(calculate).should("be.disabled")
   })
})
