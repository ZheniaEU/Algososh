describe("routing SPA pages", () => {

   it("opening reverse string", () => {
      cy.visit("/reverse").get("h3").should("have.text", "Строка")
   })

   it("opening fibonacci", () => {
      cy.visit("/fibonacci").get("h3").should("have.text", "Последовательность Фибоначчи")
   })

   it("opening sorting", () => {
      cy.visit("/sorting").get("h3").should("have.text", "Сортировка массива")
   })

   it("opening stack", () => {
      cy.visit("/stack").get("h3").should("have.text", "Стек")
   })

   it("opening queue", () => {
      cy.visit("/queue").get("h3").should("have.text", "Очередь")
   })

   it("opening list", () => {
      cy.visit("/list").get("h3").should("have.text", "Связный список")
   })
})
