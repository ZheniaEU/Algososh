import { render } from "@testing-library/react"
import { Circle } from "./circle"

describe("Circle tests", () => {

   describe("Circle snapshot", () => {

      it("Circle without letter", () => {
         const { asFragment } = render(<Circle />)
         expect(asFragment()).toMatchSnapshot()
      })

      it("Circle with letter as number", () => {

         const number = 5

         const { asFragment } = render(<Circle letter={number} />)
         expect(asFragment()).toMatchSnapshot()
      })

      it("Circle with letter as string", () => {

         const string = "5"

         const { asFragment } = render(<Circle letter={string} />)
         expect(asFragment()).toMatchSnapshot()
      })

      it("Circle with tail", () => {

         const tail = "tail"

         const { asFragment } = render(<Circle letter={tail} />)
         expect(asFragment()).toMatchSnapshot()
      })
   })


   // без буквы;

   // с react-элементом в head;
   // с tail;
   // с react-элементом в tail;
   // с index;
   // с пропом isSmall === true;
   // в состоянии default;
   // в состоянии changing;
   // в состоянии modified.


})
// expect(someArray.length).toBe(3)
// expect(someArray).toHaveLength(3)

//
