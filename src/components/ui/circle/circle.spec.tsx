import { render } from "@testing-library/react"
import { Circle } from "./circle"

describe("Circle tests", () => {

   it("Circle without letter", () => {
      const { asFragment } = render(<Circle />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("Circle with letter", () => {
      const { asFragment } = render(<Circle letter={5} />)
      expect(asFragment()).toMatchSnapshot()
   })

   
})
