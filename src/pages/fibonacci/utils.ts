type Render = (arr: Array<number>) => void

export const calculationFibonacci = (n: string, render: Render) => {
   const number = parseInt(n)
   if (number === 1) {
      render([0])
   }
   if (number === 2) {
      render([0, 1])
   }

   const arr = [0, 1]
   let i = 2
   while (i < number) {
      let element = arr[i - 2] + arr[i - 1]
      arr.push(element)
      i++
      render([...arr])
   }
}
