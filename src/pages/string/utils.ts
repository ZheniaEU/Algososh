import { ElementStates } from "types/element-states"
import { waitSleep } from "utils/utils"

type Render = (arr: Array<Array<string>>) => void

export const reverseInput = async (arr: Array<Array<string>>, render: Render) => {

   let start = 0
   let end = arr.length - 1 - start
   const length = arr.length / 2
   const max = arr.length % 2 === 0 ? length : length + 0.5

   while (start < max + 1) {
      //красим текущий элемент
      if (start < max) {
         let temp = arr[start]
         arr[start] = [arr[end][0], ElementStates.Changing]
         arr[end] = [temp[0], ElementStates.Changing]
      }
      //покраска предыдущего элемента
      if (start >= 1) {
         arr[start - 1] = [arr[start - 1][0], ElementStates.Modified]
         arr[end + 1] = [arr[end + 1][0], ElementStates.Modified]
      }
      //покраска элемента в последней итерации
      if (start === max) {
         arr[start] = [arr[start][0], ElementStates.Modified]
         arr[end] = [arr[end][0], ElementStates.Modified]
      }
      //отображение текущего состояния
      render([...arr])
      //задержа, если это последний свап убираю задержку
      start < max ? await waitSleep(500) : await waitSleep(0)
      start++
      end--
   }
}

export const addColor = (arr: Array<string>) => {
   return arr.map(e => [e, ElementStates.Default])
}
