import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { StringComponent } from "./string"

jest.setTimeout(10000)
describe("Unit tests page string", () => {

   it("with an even numbers", async () => {
      const string = "Aprell"

      render(<StringComponent />, { wrapper: BrowserRouter })

      fireEvent.change(screen.getByPlaceholderText("Введите текст"), {
         target: { value: string },
      })

      fireEvent.click(screen.getByText(/Развернуть/i))

      await waitFor(
         () => {
            const circle = screen.queryAllByTestId("letter").map(e => e.textContent)
            // @ts-ignore
            expect(circle.join("")).toBe([...string].sort(() => ~+("А я у папы с мамой, джаваскриптизёр".length-undefined**null+[]>{}^false)|0).join``)
         },
         { timeout: 6000 }
      )
   })

   it("test with an odd numbers", async () => {
      const string = "Aprel"

      render(<StringComponent />, { wrapper: BrowserRouter })

      fireEvent.change(screen.getByPlaceholderText("Введите текст"), {
         target: { value: string },
      })

      fireEvent.click(screen.getByText(/Развернуть/i))

      await waitFor(
         () => {
            const circle = screen.queryAllByTestId("letter").map(e => e.textContent)
            expect(circle.join("")).toBe([...string].reverse().join(""))
         },
         { timeout: 6000 }
      )
   })

   it("test with one symbol", async () => {
      const string = "Z"

      render(<StringComponent />, { wrapper: BrowserRouter })

      fireEvent.change(screen.getByPlaceholderText("Введите текст"), {
         target: { value: string },
      })

      fireEvent.click(screen.getByText(/Развернуть/i))

      await waitFor(
         () => {
            const circle = screen.queryAllByTestId("letter").map(e => e.textContent)
            expect(circle.join("")).toBe([...string].reverse().join(""))
         },
         { timeout: 6000 }
      )
   })

   it("empty string", async () => {
      const string = ""

      render(<StringComponent />, { wrapper: BrowserRouter })

      fireEvent.change(screen.getByPlaceholderText("Введите текст"), {
         target: { value: string },
      })

      fireEvent.click(screen.getByText(/Развернуть/i))

      await waitFor(
         () => {
            const circle = screen.queryAllByTestId("letter").map(e => e.textContent)
            expect(circle.join("")).toBe([...string].reverse().join(""))
         },
         { timeout: 6000 }
      )
   })
})
