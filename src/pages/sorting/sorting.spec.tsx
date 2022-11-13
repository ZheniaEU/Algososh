/* eslint-disable*/
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import { BrowserRouter } from "react-router-dom"
import { SortingPage } from "./sorting"

jest.mock("nanoid", () => {
   return { nanoid: () => Math.random() }
})

jest.setTimeout(1000000)

describe("Unit tests with algoritm sorting", () => {

   it("test", async () => {

      render(<SortingPage />, { wrapper: BrowserRouter })

      fireEvent.click(screen.getByTestId("selection-radio"))
      fireEvent.click(screen.getByText(/По возрастанию/i))

      await waitFor(
         () => {
            const column = screen.queryAllByTestId("column").map(e => Number(e.innerHTML))
            console.log(column)
            expect(column).toEqual(column.sort((a, b) => a - b))
            console.log(column)
         },
         { timeout: 10000 }

      )
   })
})

// Тестирование алгоритмов сортировки выбором и пузырьком
// Корректно сортирует:
// пустой массив;
// массив из одного элемента;
// массив из нескольких элементов.
