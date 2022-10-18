/* eslint-disable */
import { FC, useState } from "react"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"
import { Button } from "components/ui/button/button"
import { Circle } from "components/ui/circle/circle"
import { Input } from "components/ui/input/input"
import { SHORT_DELAY_IN_MS } from "constants/delays"

import { ElementStates } from "types/element-states"

import styles from "./string.module.css"

//как навесить регулярку на кнопку чтоб дисеблить её?
export const validButton = new RegExp(/^(([1-9])|(1\d))$/)

export const FibonacciPage: FC = () => {

   //получаемый импут
   let [input, setInput] = useState<string>("")
   //обрабатываемый массив
   let [arr, setArr] = useState<Array<string>>([])
   // флаг загрузки
   let [loading, SetLoading] = useState<boolean>(false)


   const solution = () => {

   }

   const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      SetLoading(true)
      setArr(input.split(""))
      await solution()
      SetLoading(false)
      setInput("")
   }

   return (
      <SolutionLayout title="Последовательность Фибоначчи">
         <form className={styles.form} onSubmit={clickHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите число" type="number" isLimitText={true} max={19} onChange={e => setInput(e.currentTarget.value)} value={input} />
               <Button type="submit" text="Развернуть" disabled={!input || parseInt(input) > 19 || parseInt(input) < 1} isLoader={loading} />
            </div>
         </form>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) => {
                  return <li className={styles.li} key={i} > <Circle letter={e} /></li>
               })}
         </ul>
      </SolutionLayout>
   )
}
