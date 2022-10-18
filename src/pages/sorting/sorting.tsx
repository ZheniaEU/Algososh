/* eslint-disable */
import { FC, useState } from "react"
import { Button } from "components/ui/button/button"
import { Column } from "components/ui/column/column"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"

import styles from "./sorting.module.css"

export const SortingPage: FC = () => {

   let [arr, setArr] = useState<Array<number>>([1, 1, 2, 3])

   return (
      <SolutionLayout title="Сортировка массива">
         <div>
            {"тут какие то радиобатоны"}
            <Button />
            <Button />
            <Button />
         </div>
         <ul>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Column index={i} /></li>
               )}
         </ul>

      </SolutionLayout>
   )
}
