import { ElementStates } from "types/element-states"
import { waitSleep } from "utils/utils"

export type Tuple = [number, string]

type Render = (arr: Array<Tuple>) => void

export const selectedSort = async (arr: Array<Tuple>, rule: string, render: Render) => {

   const isAsc = rule === "ascending"

   for (let i = 0; i < arr.length; i++) {
      let min = i
      if (arr[i]) arr[i][1] = ElementStates.Changing

      for (let j = i + 1; j < arr.length; j++) {
         //алгоритм покраски второго элемента
         if (arr[j]) arr[j][1] = ElementStates.Changing
         if (arr[j] !== arr[i] && arr[j - 1] !== arr[i]) arr[j - 1][1] = ElementStates.Default
         render([...arr])

         //покраска последнего элемента
         if (arr.indexOf(arr[j]) === arr.length - 1) arr[j][1] = ElementStates.Changing
         await waitSleep(300)
         if (arr.indexOf(arr[j]) === arr.length - 1) arr[j][1] = ElementStates.Default

         if ((isAsc && arr[j][0] < arr[min][0]) || (!isAsc && arr[j][0] > arr[min][0])) min = j

         if ((isAsc && arr[i][0] > arr[min][0]) || (!isAsc && arr[i][0] < arr[min][0]))
            swap(arr, i, min)
      }
      //покраска пройденного элемента
      arr[i][1] = ElementStates.Modified
      render([...arr])
   }
   return arr
}

export const bubbleSort = async (arr: Array<Tuple>, rule: string, render: Render) => {

   const isAsc = rule === "ascending"

   for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
         // алгоритм покраски текущих элементов
         if (arr[j]) {
            arr[j][1] = ElementStates.Changing
            arr[j + 1][1] = ElementStates.Changing
         }
         //перекраска предыдущего
         if (arr[j - 1]) {
            arr[j - 1][1] = ElementStates.Default
         }

         render([...arr])
         await waitSleep(300)

         if ((isAsc && arr[j][0] > arr[j + 1][0]) || (!isAsc && arr[j][0] < arr[j + 1][0]))
            swap(arr, j, j + 1)

      }
      //покраска конечного элемента и предпоследнего когда последний окрашен
      arr[arr.length - i - 1][1] = ElementStates.Modified
      if (arr[arr.length - i - 2]) {
         arr[arr.length - i - 2][1] = ElementStates.Default
      }
      render([...arr])
   }
   return arr
}

const swap = (arr: Array<Tuple>, i: number, z: number) => {
   if (arr[i][0] === arr[z][0]) return
   arr[i][0] ^= arr[z][0]
   arr[z][0] ^= arr[i][0]
   arr[i][0] ^= arr[z][0]
}

export const randomInteger = (min: number, max: number) => {

   const rand = min + Math.random() * (max + 1 - min)
   return Math.floor(rand)
}

export const getArray = (min: number = 0, max: number = 100, length: number, i: number = 0, arr: Array<Tuple> = []) => {

   while (i < length) {
      arr.push([randomInteger(min, max), ElementStates.Default])
      i++
   }
   return arr
}
