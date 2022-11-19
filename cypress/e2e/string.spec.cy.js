describe("reverse string", () => {

   const defaultColor = ["border-color", "rgb(0, 50, 255)"]
   const changingColor = ["border-color", "rgb(210, 82, 225)"]
   const modifiedColor = ["border-color", "rgb(127, 224, 81)"]

   const input = "input"
   const circle = "[data-testid=\"circle\"]"
   const reverse = "[data-testid=\"reverse\"]"

   before("open page", () => {
      cy.visit("/reverse")
   })

   it("empty input value and disabled button", () => {
      cy.get(input).should("be.empty")
      cy.get(reverse).should("be.disabled")
   })

   it("reverse string", () => {
      cy.get(input).type("Aprel").should("have.value", "Aprel")
      cy.get(reverse).should("be.enabled").click()
      cy.get(circle).should("have.length", 5)
      cy.get(circle).should(($e) => {
         expect($e.eq(0)).contain("l").css(...changingColor)
         expect($e.eq(1)).contain("p").css(...defaultColor)
         expect($e.eq(2)).contain("r").css(...defaultColor)
         expect($e.eq(3)).contain("e").css(...defaultColor)
         expect($e.eq(4)).contain("A").css(...changingColor)
      })
      cy.get(circle).should(($e) => {
         expect($e.eq(0)).contain("l").css(...modifiedColor)
         expect($e.eq(1)).contain("e").css(...changingColor)
         expect($e.eq(2)).contain("r").css(...defaultColor)
         expect($e.eq(3)).contain("p").css(...changingColor)
         expect($e.eq(4)).contain("A").css(...modifiedColor)
      })
      cy.get(circle).should(($e) => {
         expect($e.eq(0)).contain("l").css(...modifiedColor)
         expect($e.eq(1)).contain("e").css(...modifiedColor)
         expect($e.eq(2)).contain("r").css(...changingColor)
         expect($e.eq(3)).contain("p").css(...modifiedColor)
         expect($e.eq(4)).contain("A").css(...modifiedColor)
      })
      cy.get(circle).should(($e) => {
         expect($e.eq(0)).contain("l").css(...modifiedColor)
         expect($e.eq(1)).contain("e").css(...modifiedColor)
         expect($e.eq(2)).contain("r").css(...modifiedColor)
         expect($e.eq(3)).contain("p").css(...modifiedColor)
         expect($e.eq(4)).contain("A").css(...modifiedColor)
      })
      cy.get(input).should("be.empty")
      cy.get(reverse).should("be.disabled")
   })
})
