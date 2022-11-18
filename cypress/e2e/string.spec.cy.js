describe("reverse string", () => {

   it("empty input value and disabled button", () => {
      cy.visit("/reverse")
      cy.get("input").should("be.empty")
      cy.get("button").should("be.disabled")
   })

   it("reverse string", () => {
      cy.get("input").type("Aprel").should("have.value", "Aprel")
      cy.get("[data-testid=\"reverse\"]").as("reverse").should("be.enabled").click()
      cy.get("[data-testid=\"circle\"]").as("circle").should("have.length", 5)
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).contain("l").and.css("border-color", "rgb(210, 82, 225)")
         expect($e.eq(1)).contain("p").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(2)).contain("r").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(3)).contain("e").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(4)).contain("A").and.css("border-color", "rgb(210, 82, 225)")
      })
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).contain("l").and.css("border-color", "rgb(127, 224, 81)")
         expect($e.eq(1)).contain("e").and.css("border-color", "rgb(210, 82, 225)")
         expect($e.eq(2)).contain("r").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(3)).contain("p").and.css("border-color", "rgb(210, 82, 225)")
         expect($e.eq(4)).contain("A").and.css("border-color", "rgb(127, 224, 81)")
      })
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).contain("l").and.css("border-color", "rgb(127, 224, 81)")
         expect($e.eq(1)).contain("e").and.css("border-color", "rgb(127, 224, 81)")
         expect($e.eq(2)).contain("r").and.css("border-color", "rgb(210, 82, 225)")
         expect($e.eq(3)).contain("p").and.css("border-color", "rgb(127, 224, 81)")
         expect($e.eq(4)).contain("A").and.css("border-color", "rgb(127, 224, 81)")
      })
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).contain("l").and.css("border-color", "rgb(127, 224, 81)")
         expect($e.eq(1)).contain("e").and.css("border-color", "rgb(127, 224, 81)")
         expect($e.eq(2)).contain("r").and.css("border-color", "rgb(127, 224, 81)")
         expect($e.eq(3)).contain("p").and.css("border-color", "rgb(127, 224, 81)")
         expect($e.eq(4)).contain("A").and.css("border-color", "rgb(127, 224, 81)")
      })
      cy.get("input").should("be.empty")
      cy.get("@reverse").should("be.disabled")
   })
})
// "rgb(0, 50, 255)" // синий дефолт
// "rgb(210, 82, 225)" // розовый ченжед
// "rgb(127, 224, 81)" // зелёный модифаер
