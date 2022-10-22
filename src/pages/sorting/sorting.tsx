/* eslint-disable */
import { FC, useEffect, useState } from "react"
import { Button } from "components/ui/button/button"
import { Column } from "components/ui/column/column"
import { RadioInput } from "components/ui/radio-input/radio-input"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"

import { Direction } from "types/direction"
import { ElementStates } from "types/element-states"

import styles from "./sorting.module.css"

type Tuple = [number, string]

type Render = (arr: Array<Tuple>) => void

export const SortingPage: FC = () => {

   const [arr, setArr] = useState<Array<Tuple>>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [sort, setSort] = useState<"selection" | "bubble">("selection")

   const getArray = (min: number = 0, max: number = 100, length: number, i: number = 0, arr: Array<Tuple> = []) => {

      while (i < length) {
         arr.push([randomInteger(min, max), ElementStates.Default])
         i++
      }
      return arr
   }

   const randomInteger = (min: number, max: number) => {

      const rand = min + Math.random() * (max + 1 - min)
      return Math.floor(rand)
   }

   const createArrayWithButton = () => {
      setArr(getArray(0, 100, randomInteger(3, 17)))
   }

   useEffect(() => {
      setArr((getArray(0, 100, randomInteger(3, 17))))
   }, [])

   const waitSleep = (ms: number) => {
      return new Promise((resolve) => {
         setTimeout(() => {
            resolve(null)
         }, ms)
      })
   }

   const swap = (arr: Array<Tuple>, i: number, z: number) => {
      if (arr[i][0] === arr[z][0]) return
      arr[i][0] ^= arr[z][0]
      arr[z][0] ^= arr[i][0]
      arr[i][0] ^= arr[z][0]
   }

   const selectedSort = async (arr: Array<Tuple>, rule: string, render: Render) => {

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
            await waitSleep(500)
            if (arr.indexOf(arr[j]) === arr.length - 1) arr[j][1] = ElementStates.Default

            if (isAsc && arr[j][0] < arr[min][0] || !isAsc && arr[j][0] > arr[min][0]) min = j

            if (isAsc && arr[i][0] > arr[min][0] || !isAsc && arr[i][0] < arr[min][0])
               swap(arr, i, min)
         }
         //покраска пройденного элемента
         arr[i][1] = ElementStates.Modified
         render([...arr])
      }
      return arr
   }

   const bubbleSort = async (arr: Array<Tuple>, rule: string, render: Render) => {

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
            await waitSleep(500)

            if (isAsc && arr[j][0] > arr[j + 1][0] || !isAsc && arr[j][0] < arr[j + 1][0])
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

   const sortingArray = async (sort: "selection" | "bubble", rule: string) => {

      setLoading(true)
      sort === "selection" ? setArr(await selectedSort(arr, rule, setArr)) : setArr(await bubbleSort(arr, rule, setArr))
      setLoading(false)
   }

   return (
      <SolutionLayout title="Сортировка массива">
         <div className={styles.container} >
            <div className={styles.radio}>
               <RadioInput label="Выбор" name="sort" disabled={loading} onChange={() => setSort("selection")} checked={sort === "selection"} />
               <RadioInput label="Пузырёк" name="sort" disabled={loading} onChange={() => setSort("bubble")} checked={sort === "bubble"} />
            </div>
            <Button text="По возрастанию" sorting={Direction.Ascending} extraClass={styles.button_sort} disabled={loading} onClick={() => sortingArray(sort, "ascending")} />
            <Button text="По убыванию" sorting={Direction.Descending} extraClass={styles.button_sort} disabled={loading} onClick={() => sortingArray(sort, "descending")} />
            <Button text="Новый массив" extraClass={styles.button_create} disabled={loading} onClick={createArrayWithButton} />
         </div>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Column index={e[0]} state={e[1]} /></li>
               )}
         </ul>

      </SolutionLayout>
   )
}
