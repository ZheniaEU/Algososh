import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import { BrowserRouter } from "react-router-dom"
import { ElementStates } from "types/element-states"

import { SortingPage } from "./sorting"

jest.mock("nanoid", () => {
   return { nanoid: () => Math.random() }
})

jest.setTimeout(1000000)
//текущие тесты могут идти долго, 4 долгих теста в которых сортируются до 17 элементов,
// я ускорил анимацию до 100мс, но эти 4 теста могут при максимальных значениях занять целую минуту
describe("Unit tests with algoritms sorting", () => {

   it("selected ascending", async () => {

      render(<SortingPage />, { wrapper: BrowserRouter })

      fireEvent.click(screen.getByTestId("selection-radio"))
      fireEvent.click(screen.getByText(/По возрастанию/i))

      await waitFor(
         () => {
            const column = screen.queryAllByTestId("column").map(e => Number(e.innerHTML))
            expect([...column]).toEqual(column.sort((a, b) => a - b))
         },
         { timeout: 20000 }

      )
   })

   it("selected descending", async () => {

      render(<SortingPage />, { wrapper: BrowserRouter })

      fireEvent.click(screen.getByTestId("selection-radio"))
      fireEvent.click(screen.getByText(/По убыванию/i))

      await waitFor(
         () => {
            const column = screen.queryAllByTestId("column").map(e => Number(e.innerHTML))
            expect([...column]).toEqual(column.sort((a, b) => b - a))
         },
         { timeout: 20000 }

      )
   })

   it("bubble ascending", async () => {

      render(<SortingPage />, { wrapper: BrowserRouter })

      fireEvent.click(screen.getByTestId("bubble-radio"))
      fireEvent.click(screen.getByText(/По возрастанию/i))

      await waitFor(
         () => {
            const column = screen.queryAllByTestId("column").map(e => Number(e.innerHTML))
            expect([...column]).toEqual(column.sort((a, b) => a - b))
         },
         { timeout: 20000 }

      )
   })

   it("bubble descending", async () => {

      render(<SortingPage />, { wrapper: BrowserRouter })

      fireEvent.click(screen.getByTestId("bubble-radio"))
      fireEvent.click(screen.getByText(/По убыванию/i))

      await waitFor(
         () => {
            const column = screen.queryAllByTestId("column").map(e => Number(e.innerHTML))
            expect([...column]).toEqual(column.sort((a, b) => b - a))
         },
         { timeout: 20000 }

      )
   })

   it("empty array", async () => {

      render(<SortingPage test={[]} />, { wrapper: BrowserRouter })

      fireEvent.click(screen.getByTestId("bubble-radio"))
      fireEvent.click(screen.getByText(/По убыванию/i))

      await waitFor(
         () => {
            const column = screen.queryAllByTestId("column").map(e => Number(e.innerHTML))
            expect([...column]).toEqual(column.sort((a, b) => b - a))
         },
         { timeout: 10000 }

      )
   })

   it("with one element", async () => {

      render(<SortingPage test={[[2, ElementStates.Default]]} />, { wrapper: BrowserRouter })

      fireEvent.click(screen.getByTestId("bubble-radio"))
      fireEvent.click(screen.getByText(/По убыванию/i))

      await waitFor(
         () => {
            const column = screen.queryAllByTestId("column").map(e => Number(e.innerHTML))
            expect([...column]).toEqual(column.sort((a, b) => b - a))
         },
         { timeout: 10000 }

      )
   })

})
