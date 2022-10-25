/* eslint-disable */
import { FC, useEffect, useState } from "react"
import { Button } from "components/ui/button/button"
import { Input } from "components/ui/input/input"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"
import { Circle } from "components/ui/circle/circle"
import { ArrowIcon } from "components/ui/icons/arrow-icon"

import { ElementStates } from "types/element-states"

import styles from "./list.module.css"

type Tuple = [string, string]

type Render = (arr: Array<Tuple>) => void

export const ListPage: FC = () => {

   const [arr, setArr] = useState<Array<string>>(["0", "34", "8", "1"])
   const [loading, setLoading] = useState<boolean>(false)

   return (
      <SolutionLayout title="Связный список">
         <div className={styles.box}>
            <div className={styles.div}>
               <Input placeholder="Введите текст" type="text" maxLength={4} isLimitText={true} width="width-short" />
               <Button linkedList="small" text="Добавить в head" />
               <Button linkedList="small" text="Добавить в tail" />
               <Button linkedList="small" text="Удалить из head" />
               <Button linkedList="small" text="Удалить из tail" />
            </div>
            <div className={styles.div}>
               <Input width="width-short" />
               <Button linkedList="big" text="Добавить по индексу" />
               <Button linkedList="big" text="Удалить по индексу" />
            </div>
         </div>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} >
                     <div className={styles.wrapper}>
                        <Circle letter={e} index={i} extraClass={styles.margin} head={i === 0 ? "head" : null} tail={i === arr.length - 1 ? "tail" : null} />
                        {i !== arr.length - 1 &&
                           <ArrowIcon fill={"#0032FF"} />
                        }
                     </div>
                  </li>
               )}
         </ul>
      </SolutionLayout>
   )
}
