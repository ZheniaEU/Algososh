import { FC, FormEvent, useEffect, useState } from "react"

import { Input } from "components/ui/input/input"
import { Button } from "components/ui/button/button"
import { Circle } from "components/ui/circle/circle"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"

import { calculationFibonacci } from "./utils"

import { waitSleep } from "utils/utils"

import styles from "./string.module.css"

export const FibonacciPage: FC = () => {

   const [input, setInput] = useState("")
   const [inputArray, setInputArray] = useState<Array<number>>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [arr, setArr] = useState<Array<number>>([])

   useEffect(() => {
      if (arr.length !== inputArray.length) {
         waitSleep(500).then(() => {
            setArr([...arr, inputArray[arr.length]])
         })
      } else {
         setLoading(false)
         setInput("")
      }
   }, [arr, inputArray])

   const clickHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      if (input) calculationFibonacci(input, setInputArray)
      setArr([])
   }

   return (
      <SolutionLayout title="Последовательность Фибоначчи">
         <form className={styles.form} onSubmit={clickHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите число" type="number" isLimitText={true} max={19} value={input} onChange={e => setInput(e.currentTarget.value.replace(/[^\d]/g, ""))} />
               <Button type="submit" text="Рассчитать" disabled={input === "" || parseInt(input) > 19 || parseInt(input) < 1} isLoader={loading} />
            </div>
         </form>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Circle letter={e} index={i + 1} /></li>
               )}
         </ul>
      </SolutionLayout>
   )
}
