import { FC, useEffect, useState } from "react"

import { Button } from "components/ui/button/button"
import { Column } from "components/ui/column/column"
import { RadioInput } from "components/ui/radio-input/radio-input"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"

import { Direction } from "types/direction"

import { bubbleSort, getArray, randomInteger, selectedSort } from "./utils"

import type { Tuple } from "./utils"

import styles from "./sorting.module.css"

export const SortingPage: FC<{ test?: Array<Tuple> }> = ({ test }) => {

   const [arr, setArr] = useState<Array<Tuple>>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [sort, setSort] = useState<"selection" | "bubble">("selection")

   const createArrayWithButton = () => {
      setArr(getArray(0, 100, randomInteger(3, 17)))
   }

   useEffect(() => {
      if (!test)
         setArr(getArray(0, 100, randomInteger(3, 17)))
   }, [test])

   const sortingArray = async (sort: "selection" | "bubble", rule: string) => {
      setLoading(true)
      sort === "selection" ? setArr(await selectedSort(arr, rule, setArr)) : setArr(await bubbleSort(arr, rule, setArr))
      setLoading(false)
   }

   return (
      <SolutionLayout title="Сортировка массива">
         <div className={styles.container} >
            <div className={styles.radio}>
               <RadioInput data-testid="selection-radio" label="Выбор" name="sort" disabled={loading} onChange={() => setSort("selection")} checked={sort === "selection"} />
               <RadioInput data-testid="bubble-radio" label="Пузырёк" name="sort" disabled={loading} onChange={() => setSort("bubble")} checked={sort === "bubble"} />
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
