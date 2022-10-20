/* eslint-disable */
import { FC, useEffect, useState } from "react"
import { Button } from "components/ui/button/button"
import { Column } from "components/ui/column/column"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"
import { RadioInput } from "components/ui/radio-input/radio-input"

import { Direction } from "types/direction"
import { ElementStates } from "types/element-states"

import styles from "./sorting.module.css"


export const SortingPage: FC = () => {
   //! чё с значением по умолчанию? какой то баг, чтобы первый раз выбрать другой радиобаттон нужно сделать жмяу 2 раза
   let [arr, setArr] = useState<Array<Array<number | any>>>([])
   //флаги загрузки
   let [loading, SetLoading] = useState<boolean>(false)

   const getArray = (min: number = 0, max: number = 100, length: number) => {

      let i = 0
      let arr = []

      while (i < length) {
         arr.push([randomInteger(min, max), ElementStates.Default])
         i++
      }
      return arr
   }
   const randomInteger = (min: number, max: number) => {

      let rand = min + Math.random() * (max + 1 - min)
      return Math.floor(rand)
   }
   const clickHandler = () => {

   }

   const createArray = () => {
      const length = randomInteger(3, 17)
      setArr(getArray(0, 100, length))
   }

   useEffect(() => {
      setArr((getArray(0, 100, randomInteger(3, 17))))
   }, [])

   console.log(arr)

   return (
      <SolutionLayout title="Сортировка массива">
         <form className={styles.form} onSubmit={clickHandler} >
            <div className={styles.radio}>
               <RadioInput label="Выбор" name="sort" disabled={loading} />
               <RadioInput label="Пузырёк" name="sort" disabled={loading} />
            </div>
            <Button text="По возрастанию" sorting={Direction.Ascending} extraClass={styles.button_sort} disabled={loading} />
            <Button text="По убыванию" sorting={Direction.Descending} extraClass={styles.button_sort} disabled={loading} />
            <Button text="Новый массив" extraClass={styles.button_create} disabled={loading} onClick={createArray} />
         </form>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Column index={e[0]} /></li>
               )}
         </ul>

      </SolutionLayout>
   )
}
