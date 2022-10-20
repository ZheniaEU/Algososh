import { FC, useEffect, useState } from "react"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"
import { Button } from "components/ui/button/button"
import { Circle } from "components/ui/circle/circle"
import { Input } from "components/ui/input/input"
import { SHORT_DELAY_IN_MS } from "constants/delays"

import styles from "./string.module.css"

const waitSleep = (ms: number) => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve(null)
      }, ms)
   })
}

export const FibonacciPage: FC = () => {

   const [input, setInput] = useState<string>("")
   //обрабатываемый массив
   const [arr, setArr] = useState<Array<number>>([])
   // флаг загрузки
   const [loading, setLoading] = useState<boolean>(false)

   const [test, setTest] = useState<Array<number>>([])

   useEffect(() => {
      if (test.length !== arr.length) {
         // setTimeout(() => {
         //   setTest([...test, arr[test.length]])
         // },  SHORT_DELAY_IN_MS)
         waitSleep(SHORT_DELAY_IN_MS).then(() => {
            setTest([...test, arr[test.length]])
         })
      } else {
         setLoading(false)
         setInput("")
      }
   }, [test, arr])

   const solution = (n: string) => {
      const number = parseInt(n)
      if (number === 1) {
         setArr([0])
      }
      if (number === 2) {
         setArr([0, 1])
      }

      const arr = [0, 1]
      let i = 2
      while (i < number) {
         // await waitSleep(SHORT_DELAY_IN_MS)
         let element = arr[i - 2] + arr[i - 1]
         arr.push(element)
         i++
         setArr([...arr])
      }
   }

   const clickHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      solution(input ?? "можно было через if, но я не хочу, ts не понимает что здесь всегда что то есть")
      setTest([])
   }

   return (
      <SolutionLayout title="Последовательность Фибоначчи">
         <form className={styles.form} onSubmit={clickHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите число" type="number" isLimitText={true} max={19} value={input} onChange={(e) => setInput(e.currentTarget.value)} />
               <Button type="submit" text="Рассчитать" disabled={input === "" || parseInt(input) > 19 || parseInt(input) < 1} isLoader={loading} />
            </div>
         </form>
         <ul className={styles.ul}>
            {test &&
               test.map((e, i) =>
                  <li className={styles.li} key={i} ><Circle letter={e} index={i + 1} /></li>
               )}
         </ul>
      </SolutionLayout>
   )
}
