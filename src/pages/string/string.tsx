import { FC, useState } from "react"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"
import { Button } from "components/ui/button/button"
import { Circle } from "components/ui/circle/circle"
import { Input } from "components/ui/input/input"
import { SHORT_DELAY_IN_MS } from "constants/delays"

import { ElementStates } from "types/element-states"

import styles from "./string.module.css"

export const StringComponent: FC = () => {

   //получаемый импут
   const [input, setInput] = useState<string>("")
   //обрабатываемый массив
   const [arr, setArr] = useState<Array<Array<string>>>([])
   // флаг загрузки
   const [loading, setLoading] = useState<boolean>(false)

   const addColor = (arr: Array<string>) => {
      return arr.map(e => [e, ElementStates.Default])
   }

   const reverseInput = async (arr: Array<Array<string>>) => {

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
         setArr([...arr])
         //задержа, если это последний свап убераю задержку
         start < max ? await waitSleep(SHORT_DELAY_IN_MS) : await waitSleep(0)
         start++
         end--
      }
   }

   const waitSleep = (ms: number) => {
      return new Promise((resolve) => {
         setTimeout(() => {
            resolve(null)
         }, ms)
      })
   }

   const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      setArr(addColor(input.split("")))
      await reverseInput(addColor(input.split("")))
      setLoading(false)
      setInput("")
   }

   return (
      <SolutionLayout title="Строка">
         <form className={styles.form} onSubmit={clickHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите текст" type="text" maxLength={11} isLimitText={true} onChange={e => setInput(e.currentTarget.value)} value={input} />
               <Button type="submit" text="Развернуть" disabled={!input} isLoader={loading} />
            </div>
         </form>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Circle letter={e[0]} state={e[1]} /></li>
               )}
         </ul>
      </SolutionLayout >
   )
}
