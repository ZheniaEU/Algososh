describe("stack", () => {

   it("empty input value and disabled buttons", () => {
      cy.visit("/stack")
      cy.get("input").should("be.empty")
      cy.get("[data-testid=\"stack-add\"]").as("add").should("be.enabled")
      cy.get("[data-testid=\"stack-delete\"]").as("delete").should("be.disabled")
      cy.get("[data-testid=\"stack-clear\"]").as("clear").should("be.disabled")
   })

   it("add", () => {

   })
   it("delete", () => {

   })
   it("clear", () => {

   })
})






// Стек

// Проверьте правильность добавления элемента в стек. Важно убедиться, что цвета элементов меняются и каждый шаг анимации отрабатывает корректно.
// Проверить правильность удаления элемента из стека.
// Проверьте поведение кнопки «Очистить». Добавьте в стек несколько элементов, по нажатию на кнопку «Очистить» длина стека должна быть равна 0.
