/* eslint-disable */
import { FC, useState } from "react"
import { Button } from "components/ui/button/button"
import { Column } from "components/ui/column/column"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"

import styles from "./sorting.module.css"
import { RadioInput } from "components/ui/radio-input/radio-input"

export const SortingPage: FC = () => {

   let [arr, setArr] = useState<Array<number>>([1, 1, 2, 3])

   return (
      <SolutionLayout title="Сортировка массива">
         <form className={styles.form}>
            <div className={styles.radio}>
               <RadioInput label="Выбор" name="sort" />
               <RadioInput label="Пузырёк" name="sort"/>
            </div>
            <Button text="По возрастанию" />
            <Button text="По убыванию" />
            <Button text="Новый массив" />
         </form>
         <ul>
            {/* {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Column index={i} /></li>
               )} */}
         </ul>

      </SolutionLayout>
   )
}
