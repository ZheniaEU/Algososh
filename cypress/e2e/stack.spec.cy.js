describe("stack", () => {

   const defaultColor = ["border-color", "rgb(0, 50, 255)"]
   const changingColor = ["border-color", "rgb(210, 82, 225)"]
   const input = "input"
   const circle = "[data-testid=\"circle\"]"
   const add = "[data-testid=\"stack-add\"]"
   const del = "[data-testid=\"stack-delete\"]"
   const clear = "[data-testid=\"stack-clear\"]"

   before("open page", () => {
      cy.visit("/stack")
   })

   it("empty input value and disabled buttons", () => {
      cy.get(input).should("be.empty")
      cy.get(add).should("be.disabled")
      cy.get(del).should("be.disabled")
      cy.get(clear).should("be.disabled")
   })

   it("add", () => {
      cy.get(input).type("5").should("have.value", "5")
      cy.get(add).should("be.enabled").click()
      cy.get(input).should("be.empty")
      cy.get(circle).should("have.length", 1)
      cy.get(circle).should(($e) => {
         expect($e.eq(0)).contain("5").css(...changingColor)
      })
      cy.get(circle).should(($e) => {
         expect($e.eq(0)).contain("5").css(...defaultColor)
      })
      cy.get(add).should("be.disabled")
      cy.get(del).should("be.enabled")
      cy.get(clear).should("be.enabled")

      cy.get(input).type("99").should("have.value", "99")
      cy.get(add).should("be.enabled").click()

      cy.get(circle).should("have.length", 2)
      cy.get(circle).should(($e) => {
         expect($e.eq(0)).contain("5").css(...defaultColor)
         expect($e.eq(1)).contain("99").css(...changingColor)
      })
      cy.get(circle).should(($e) => {
         expect($e.eq(0)).contain("5").css(...defaultColor)
         expect($e.eq(1)).contain("99").css(...defaultColor)
      })

      cy.get(input).type("77").should("have.value", "77")
      cy.get(add).should("be.enabled").click()

      cy.get(circle).should("have.length", 3)
      cy.get(circle).should(($e) => {
         expect($e.eq(0)).contain("5").css(...defaultColor)
         expect($e.eq(1)).contain("99").css(...defaultColor)
         expect($e.eq(2)).contain("77").css(...changingColor)
      })
      cy.get(circle).should(($e) => {
         expect($e.eq(0)).contain("5").css(...defaultColor)
         expect($e.eq(1)).contain("99").css(...defaultColor)
         expect($e.eq(2)).contain("77").css(...defaultColor)
      })
   })

      it("delete", () => {
         cy.get(circle).should("have.length", 3)
         cy.get(del).click()
         cy.get(circle).should(($e) => {
            expect($e.eq(0)).contain("5").css(...defaultColor)
            expect($e.eq(1)).contain("99").css(...defaultColor)
            expect($e.eq(2)).contain("77").css(...changingColor)
         })
         cy.get(circle).should("have.length", 2)
         cy.get(circle).should(($e) => {
            expect($e.eq(0)).contain("5").css(...defaultColor)
            expect($e.eq(1)).contain("99").css(...defaultColor)
         })
      })

   it("clear", () => {
      cy.get(circle).should("have.length", 2)
      cy.get(add).should("be.disabled")
      cy.get(del).should("be.enabled")
      cy.get(clear).should("be.enabled")

      cy.get(clear).click()
      cy.get(circle).should("have.length", 0)
      cy.get(add).should("be.disabled")
      cy.get(del).should("be.disabled")
      cy.get(clear).should("be.disabled")
   })
})
