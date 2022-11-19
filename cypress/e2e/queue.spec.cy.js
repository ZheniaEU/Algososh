describe("queue", () => {

   const defaultColor = ["border-color", "rgb(0, 50, 255)"]
   const changingColor = ["border-color", "rgb(210, 82, 225)"]

   const input = "input"
   const circle = "[data-testid=\"circle\"]"
   const head = "[data-testid=\"head\"]"
   const tail = "[data-testid=\"tail\"]"
   const add = "[data-testid=\"queue-add\"]"
   const del = "[data-testid=\"queue-delete\"]"
   const clear = "[data-testid=\"queue-clear\"]"

   before("open page", () => {
      cy.visit("/queue")
   })

   it("empty input value and disabled buttons", () => {
      cy.get(circle).should("have.length", "7")
      cy.get(input).should("be.empty")
      cy.get(add).should("be.disabled")
      cy.get(del).should("be.disabled")
      cy.get(clear).should("be.disabled")
   })

   it("add element and check head and tail", () => {
      cy.clock()
      cy.get(input).type("9").should("have.value", "9")
      cy.get(add).click()
      cy.get(circle).should(e => {
         expect(e.eq(0)).contain("9", tail).css(...changingColor)
      })
      cy.get(head).should(e => {
         expect(e.eq(0)).contain("head")
      })
      cy.get(tail).should(e => {
         expect(e.eq(0)).contain("tail")
      })
      cy.tick(500)
      cy.get(input).type("8").should("have.value", "8")
      cy.get(add).click()
      cy.get(circle).should(e => {
         expect(e.eq(0)).contain("9").css(...defaultColor)
         expect(e.eq(1)).contain("8").css(...changingColor)
      })
      cy.get(head).should(e => {
         expect(e.eq(0)).contain("head")
         expect(e.eq(1)).contain("")
      })
      cy.get(tail).should(e => {
         expect(e.eq(0)).contain("")
         expect(e.eq(1)).contain("tail")
      })
      cy.tick(500)
      cy.get(input).type("7").should("have.value", "7")
      cy.get(add).click()
      cy.get(circle).should(e => {
         expect(e.eq(0)).contain("9").css(...defaultColor)
         expect(e.eq(1)).contain("8").css(...defaultColor)
         expect(e.eq(2)).contain("7").css(...changingColor)
      })
      cy.tick(500)
      cy.get(input).type("6").should("have.value", "6")
      cy.get(add).click()
      cy.get(circle).should(e => {
         expect(e.eq(0)).contain("9").css(...defaultColor)
         expect(e.eq(1)).contain("8").css(...defaultColor)
         expect(e.eq(2)).contain("7").css(...defaultColor)
         expect(e.eq(3)).contain("6").css(...changingColor)
      })
      cy.tick(500)
      cy.get(input).type("5").should("have.value", "5")
      cy.get(add).click()
      cy.get(circle).should(e => {
         expect(e.eq(0)).contain("9").css(...defaultColor)
         expect(e.eq(1)).contain("8").css(...defaultColor)
         expect(e.eq(2)).contain("7").css(...defaultColor)
         expect(e.eq(3)).contain("6").css(...defaultColor)
         expect(e.eq(4)).contain("5").css(...changingColor)
      })
      cy.tick(500)
      cy.get(input).type("4").should("have.value", "4")
      cy.get(add).click()
      cy.get(circle).should(e => {
         expect(e.eq(0)).contain("9").css(...defaultColor)
         expect(e.eq(1)).contain("8").css(...defaultColor)
         expect(e.eq(2)).contain("7").css(...defaultColor)
         expect(e.eq(3)).contain("6").css(...defaultColor)
         expect(e.eq(4)).contain("5").css(...defaultColor)
         expect(e.eq(5)).contain("4").css(...changingColor)
      })
      cy.get(head).should(e => {
         expect(e.eq(0)).contain("head")
         expect(e.eq(1)).contain("")
         expect(e.eq(2)).contain("")
         expect(e.eq(3)).contain("")
         expect(e.eq(4)).contain("")
         expect(e.eq(5)).contain("")
      })
      cy.get(tail).should(e => {
         expect(e.eq(0)).contain("")
         expect(e.eq(1)).contain("")
         expect(e.eq(2)).contain("")
         expect(e.eq(3)).contain("")
         expect(e.eq(4)).contain("")
         expect(e.eq(5)).contain("tail")
      })
      cy.tick(500)
      cy.get(add).should("be.disabled")
      cy.get(del).should("be.enabled")
      cy.get(clear).should("be.enabled")
   })

   it("delete", () => {
      cy.clock()
      cy.get(del).click()
      cy.get(circle).should(e => {
         expect(e.eq(0)).contain("9").css(...changingColor)
         expect(e.eq(1)).contain("8").css(...defaultColor)
         expect(e.eq(2)).contain("7").css(...defaultColor)
         expect(e.eq(3)).contain("6").css(...defaultColor)
         expect(e.eq(4)).contain("5").css(...defaultColor)
         expect(e.eq(5)).contain("4").css(...defaultColor)
      })
      cy.tick(500)
      cy.get(circle).should(e => {
         expect(e.eq(0)).contain("").css(...defaultColor)
         expect(e.eq(1)).contain("8").css(...defaultColor)
         expect(e.eq(2)).contain("7").css(...defaultColor)
         expect(e.eq(3)).contain("6").css(...defaultColor)
         expect(e.eq(4)).contain("5").css(...defaultColor)
         expect(e.eq(5)).contain("4").css(...defaultColor)
      })
      cy.get(head).should(e => {
         expect(e.eq(0)).contain("")
         expect(e.eq(1)).contain("head")
         expect(e.eq(2)).contain("")
         expect(e.eq(3)).contain("")
         expect(e.eq(4)).contain("")
         expect(e.eq(5)).contain("")
      })
      cy.get(tail).should(e => {
         expect(e.eq(0)).contain("")
         expect(e.eq(1)).contain("")
         expect(e.eq(2)).contain("")
         expect(e.eq(3)).contain("")
         expect(e.eq(4)).contain("")
         expect(e.eq(5)).contain("tail")
      })
      cy.get(del).click()
      cy.get(circle).should(e => {
         expect(e.eq(0)).contain("").css(...defaultColor)
         expect(e.eq(1)).contain("8").css(...changingColor)
         expect(e.eq(2)).contain("7").css(...defaultColor)
         expect(e.eq(3)).contain("6").css(...defaultColor)
         expect(e.eq(4)).contain("5").css(...defaultColor)
         expect(e.eq(5)).contain("4").css(...defaultColor)
      })
      cy.tick(500)
      cy.get(circle).should(e => {
         expect(e.eq(0)).contain("").css(...defaultColor)
         expect(e.eq(1)).contain("").css(...defaultColor)
         expect(e.eq(2)).contain("7").css(...defaultColor)
         expect(e.eq(3)).contain("6").css(...defaultColor)
         expect(e.eq(4)).contain("5").css(...defaultColor)
         expect(e.eq(5)).contain("4").css(...defaultColor)
      })
      cy.get(head).should(e => {
         expect(e.eq(0)).contain("")
         expect(e.eq(1)).contain("")
         expect(e.eq(2)).contain("head")
         expect(e.eq(3)).contain("")
         expect(e.eq(4)).contain("")
         expect(e.eq(5)).contain("")
      })
      cy.get(tail).should(e => {
         expect(e.eq(0)).contain("")
         expect(e.eq(1)).contain("")
         expect(e.eq(2)).contain("")
         expect(e.eq(3)).contain("")
         expect(e.eq(4)).contain("")
         expect(e.eq(5)).contain("tail")
      })
   })

   it("clear", () => {
      cy.get(clear).click()
      cy.get(circle).should(e => {
         expect(e.eq(0)).contain("").css(...defaultColor)
         expect(e.eq(1)).contain("").css(...defaultColor)
         expect(e.eq(2)).contain("").css(...defaultColor)
         expect(e.eq(3)).contain("").css(...defaultColor)
         expect(e.eq(4)).contain("").css(...defaultColor)
         expect(e.eq(5)).contain("").css(...defaultColor)
         expect(e.eq(6)).contain("").css(...defaultColor)
      })
      cy.get(head).should(e => {
         expect(e.eq(0)).contain("")
         expect(e.eq(1)).contain("")
         expect(e.eq(2)).contain("")
         expect(e.eq(3)).contain("")
         expect(e.eq(4)).contain("")
         expect(e.eq(5)).contain("")
         expect(e.eq(6)).contain("")

      })
      cy.get(tail).should(e => {
         expect(e.eq(0)).contain("")
         expect(e.eq(1)).contain("")
         expect(e.eq(2)).contain("")
         expect(e.eq(3)).contain("")
         expect(e.eq(4)).contain("")
         expect(e.eq(5)).contain("")
         expect(e.eq(6)).contain("")
      })
   })
})
