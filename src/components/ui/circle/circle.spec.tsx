import { render } from "@testing-library/react"
import { ElementStates } from "types/element-states"
import { Button } from "../button/button"
import { Circle } from "./circle"

describe("Circle snapshot tests", () => {

   it("Circle without props", () => {
      const { asFragment } = render(<Circle />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("Circle with letter as number", () => {
      const { asFragment } = render(<Circle letter={5} />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("Circle with letter as string", () => {
      const { asFragment } = render(<Circle letter={"5"} />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("Circle with tail", () => {
      const { asFragment } = render(<Circle letter={"tail"} />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("Circle with head", () => {
      const { asFragment } = render(<Circle head={"head"} />)
      expect(asFragment()).toMatchSnapshot()
   })

   //но зачем? этого нет в проектной, это бессмысленно и не содержит функционала
   it("Circle with head react-element", () => {
      const { asFragment } = render(<Circle head={<Button />} />)
      expect(asFragment()).toMatchSnapshot()
   })

   //но зачем? этого нет в проектной, это бессмысленно и не содержит функционала
   it("Circle with tail react-element", () => {
      const { asFragment } = render(<Circle tail={<Button />} />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("Circle with index", () => {
      const { asFragment } = render(<Circle index={5} />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("Circle with isSmall === true", () => {
      const { asFragment } = render(<Circle isSmall={true} />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("Circle with state default", () => {
      const { asFragment } = render(<Circle state={ElementStates.Default} />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("Circle with state changing", () => {
      const { asFragment } = render(<Circle state={ElementStates.Changing} />)
      expect(asFragment()).toMatchSnapshot()
   })

   it("Circle with state modified", () => {
      const { asFragment } = render(<Circle state={ElementStates.Modified} />)
      expect(asFragment()).toMatchSnapshot()
   })

})
