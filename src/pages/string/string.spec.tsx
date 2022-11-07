import { render, screen, waitFor } from "@testing-library/react"
//import { fireEvent, getByRole, getByText, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"

import { StringComponent } from "./string"


jest.setTimeout(10000)
describe("Unit test page string", () => {

   // it("with an even numbers", async () => {

   //    const string = "Aprell"

   //    const callback = jest.fn()

   //    render(<StringComponent />, { wrapper: BrowserRouter })
   //    fireEvent.change(screen.getByPlaceholderText("Введите текст"), { target: { value: string } })
   //    fireEvent.click(screen.getByText(/Развернуть/i))
   //    await waitFor(
   //       () => {

   //          screen.queryAllByRole('listitem').forEach((e, idx) => {
   //             // expect(e.childNodes[0].childNodes[1].childNodes[0].nodeValue).toContain(string[idx])
   //             console.log(e.childNodes[0].childNodes[1].childNodes[0].textContent)
   //          })
   //       },
   //       { timeout: 50000 }
   //    )
   //    //console.log(screen.getAllByRole("listitem"))

   // })


   it("with an even numbers", async () => {
      render(<StringComponent />, { wrapper: BrowserRouter })
      const input = screen.getByPlaceholderText("Введите текст")
      const button = screen.getByText(/Развернуть/i)
      const string = "Aprell"

      userEvent.type(input, string)
      userEvent.click(button)

      await waitFor(() => {
         screen.queryAllByRole("listitem").map(e =>
            e.childNodes[0].childNodes[1].childNodes[0].textContent
         )
      },
         { timeout: 5000 }
      )
   })


})
// Тестирование алгоритма разворота строки
// Корректно разворачивает строку:
// с чётным количеством символов.
// с нечетным количеством символов.
// с одним символом.
// пустую строку.
