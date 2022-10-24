import { FC, useEffect, useState } from "react"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"
import { Button } from "components/ui/button/button"
import { Circle } from "components/ui/circle/circle"
import { Input } from "components/ui/input/input"
import { SHORT_DELAY_IN_MS } from "constants/delays"

import styles from "./string.module.css"

type Render = (arr: Array<number>) => void

const waitSleep = (ms: number) => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve(null)
      }, ms)
   })
}

export const FibonacciPage: FC = () => {

   const [input, setInput] = useState("")
   const [inputArray, setInputArray] = useState<Array<number>>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [arr, setArr] = useState<Array<number>>([])

   useEffect(() => {
      if (arr.length !== inputArray.length) {
         // setTimeout(() => {
         //   setArr([...arr, inputArray[arr.length]])
         // },  SHORT_DELAY_IN_MS)
         waitSleep(SHORT_DELAY_IN_MS).then(() => {
            setArr([...arr, inputArray[arr.length]])
         })
      } else {
         setLoading(false)
         setInput("")
      }
   }, [arr, inputArray])

   const calculationFibonacci = (n: string, render: Render) => {
      const number = parseInt(n)
      if (number === 1) {
         render([0])
      }
      if (number === 2) {
         render([0, 1])
      }

      const arr = [0, 1]
      let i = 2
      while (i < number) {
         let element = arr[i - 2] + arr[i - 1]
         arr.push(element)
         i++
         render([...arr])
      }
   }

   const clickHandler = (e: React.FormEvent<HTMLFormElement>) => {
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
