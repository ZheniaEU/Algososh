describe("stack", () => {

   before("open page", () => {
      cy.visit("/stack")
   })

   beforeEach("variables", () => {
      cy.get("input").as("input")
      cy.get("[data-testid=\"stack-add\"]").as("add")
      cy.get("[data-testid=\"stack-delete\"]").as("delete")
      cy.get("[data-testid=\"stack-clear\"]").as("clear")
   })

   it("empty input value and disabled buttons", () => {
      cy.get("@input").should("be.empty")
      cy.get("@add").should("be.disabled")
      cy.get("@delete").should("be.disabled")
      cy.get("@clear").should("be.disabled")
   })

   it("add", () => {
      cy.get("@input").type("5").should("have.value", "5")
      cy.get("@add").should("be.enabled").click()
      cy.get("@input").should("be.empty")
      cy.get("[data-testid=\"circle\"]").as("circle").should("have.length", 1)
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).contain("5").and.css("border-color", "rgb(210, 82, 225)")
      })
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).contain("5").and.css("border-color", "rgb(0, 50, 255)")
      })
      cy.get("@add").should("be.disabled")
      cy.get("@delete").should("be.enabled")
      cy.get("@clear").should("be.enabled")

      cy.get("@input").type("99").should("have.value", "99")
      cy.get("@add").should("be.enabled").click()

      //почему если я не инициализирую переменную андефайнед второй элемент?
      cy.get("[data-testid=\"circle\"]").as("circle").should("have.length", 2)
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).contain("5").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(1)).contain("99").and.css("border-color", "rgb(210, 82, 225)")
      })
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).contain("5").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(1)).contain("99").and.css("border-color", "rgb(0, 50, 255)")
      })

      cy.get("@input").type("77").should("have.value", "77")
      cy.get("@add").should("be.enabled").click()

      cy.get("[data-testid=\"circle\"]").as("circle").should("have.length", 3)
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).contain("5").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(1)).contain("99").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(2)).contain("77").and.css("border-color", "rgb(210, 82, 225)")
      })
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).contain("5").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(1)).contain("99").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(2)).contain("77").and.css("border-color", "rgb(0, 50, 255)")
      })
   })

   it("delete", () => {
      cy.get("[data-testid=\"circle\"]").as("circle").should("have.length", 3)
      cy.get("@delete").click()
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).contain("5").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(1)).contain("99").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(2)).contain("77").and.css("border-color", "rgb(210, 82, 225)")
      })
      cy.get("@circle").should("have.length", 2)
      cy.get("@circle").should(($e) => {
         expect($e.eq(0)).contain("5").and.css("border-color", "rgb(0, 50, 255)")
         expect($e.eq(1)).contain("99").and.css("border-color", "rgb(0, 50, 255)")
      })
   })

   it("clear", () => {
      cy.get("[data-testid=\"circle\"]").as("circle").should("have.length", 2)
      cy.get("@add").should("be.disabled")
      cy.get("@delete").should("be.enabled")
      cy.get("@clear").should("be.enabled")

      cy.get("@clear").click()
      cy.get("@circle").should("have.length", 0)
      cy.get("@add").should("be.disabled")
      cy.get("@delete").should("be.disabled")
      cy.get("@clear").should("be.disabled")
   })
})


// "rgb(0, 50, 255)" // синий дефолт
// "rgb(210, 82, 225)" // розовый ченжед
// "rgb(127, 224, 81)" // зелёный модифаер

