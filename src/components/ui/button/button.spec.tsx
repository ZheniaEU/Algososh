import { render } from "@testing-library/react"
import { Button } from "./button"

describe("button tests", () => {

   it("button with text", () => {
      const text = "Кнопка с текстом"
      const { asFragment } = render(<Button text={text} />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("button without text", () => {
      const { asFragment } = render(<Button />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("button disabled", () => {
      const { asFragment } = render(<Button disabled={true} />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("button with loading", () => {
      const { asFragment } = render(<Button isLoader={true} />)
      expect(asFragment()).toMatchSnapshot()
   })

})
