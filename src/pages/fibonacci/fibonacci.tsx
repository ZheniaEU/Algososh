import { FC, useState } from "react"
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

   //получаемый импут
   let [input, setInput] = useState<string>()
   //обрабатываемый массив
   let [arr, setArr] = useState<Array<number>>([])
   // флаг загрузки
   let [loading, SetLoading] = useState<boolean>(false)


   const solution = async (n: string) => {

      let number = parseInt(n)
      if (number === 1) {
         setArr([0])
      }
      if (number === 2) {
         setArr([0, 1])
      }

      let arr = [0, 1]
      let i = 2
      while (i < number) {
         await waitSleep(SHORT_DELAY_IN_MS)
         let element = arr[i - 2] + arr[i - 1]
         arr.push(element)
         i++;
         setArr([...arr])
      }
   }

   const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      SetLoading(true)
      await solution(input ?? "можно было через if, но я не хочу, ts не понимает что здесь всегда что то есть")
      SetLoading(false)
      setInput("")
   }

   return (
      <SolutionLayout title="Последовательность Фибоначчи">
         <form className={styles.form} onSubmit={clickHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите число" type="number" isLimitText={true} max={19} onChange={e => setInput(e.currentTarget.value)} />
               <Button type="submit" text="Рассчитать" disabled={!input || parseInt(input) > 19 || parseInt(input) < 1} isLoader={loading} />
            </div>
         </form>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) => {
                  return <li className={styles.li} key={i} > <Circle letter={e} index={i + 1} /></li>
               })}
         </ul>
      </SolutionLayout>
   )
}
