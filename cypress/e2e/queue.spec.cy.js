describe("queue", () => {

   it("empty input value and disabled button", () => {
      cy.visit("/queue")
      cy.get("input").should("be.empty")
      cy.get("button").should("be.disabled")
   })

   it("number check", () => {

   })
   it("number check", () => {

   })
   it("number check", () => {

   })
})














// Очередь
// Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.
// Проверьте, правильность добавления элемента в очередь. Необходимо убедиться,
//  что цвета элементов меняются и каждый шаг анимации отрабатывает корректно. Не забудьте проверить, что курсоры head и tail отрисовываются корректно.
// Проверить правильность удаления элемента из очереди.
// Проверьте поведение кнопки «Очистить». Добавьте в очередь несколько элементов,
//  по нажатию на кнопку «Очистить» длина очереди должна быть равна 0.