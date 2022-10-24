import { FC, useState } from "react"
import { Button } from "components/ui/button/button"
import { Circle } from "components/ui/circle/circle"
import { Input } from "components/ui/input/input"
import { ElementStates } from "types/element-states"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"

import styles from "./stack.module.css"

type Tuple = [number, string]

const waitSleep = (ms: number) => {
   return new Promise((resolve) => {
      setTimeout(resolve, ms)
   })
}

const getTemporaryElement = (e: number): Tuple => {
   return [e, ElementStates.Changing]
}

const addColor = (arr: Array<number | null>): Array<Tuple> => {
   // const Array: Array<Tuple> = []
   // arr.forEach(e => {
   //    if (e !== null) Array.push([e, ElementStates.Default])
   // })
   //тайп скрипт пощады! пожожда как ты можешь не понимать что там нет null?
   return arr.filter((e) => e !== null).map((e) => [e, ElementStates.Default]) as Array<Tuple>
}

class Stack<T> {
   private container: Array<T | null>
   private curr: number = 0

   constructor(private readonly size: number) {
      this.container = Array(size < 0 ? 0 : size)
   }

   push(data: T): Stack<T> {
      if (this.curr < this.size)
         this.container[this.curr++] = data
      return this
   }

   pop(): T | null {
      if (this.isEmpty())
         return null
      else {
         const res = this.container[this.curr - 1]
         this.container[--this.curr] = null
         return res
      }
   }

   peak(): T | null {
      return this.container[this.curr - 1] ?? null
   }

   clear(): void {
      this.container.length = 0
   }

   getArray(): Array<T | null> {
      return this.container
   }

   isEmpty(): boolean {
      return this.curr === 0
   }
}

//я ограничил стек 19 элементами
const stack = new Stack<number>(19)

export const StackPage: FC = () => {
   const [input, setInput] = useState("")
   const [arr, setArr] = useState<Array<Tuple>>([])
   const [loading, setLoading] = useState<boolean>(false)

   const deleteElement = async () => {
      const copyArr = [...arr]
      copyArr[copyArr.length - 1][1] = ElementStates.Changing
      setArr(copyArr)
      await waitSleep(500)
      stack.pop()
      setArr(addColor(stack.getArray()))
   }

   const clear = () => {
      stack.clear()
      setArr([])
   }

   const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      stack.push(parseInt(input))
      setArr([...arr, getTemporaryElement(parseInt(input))])
      await waitSleep(500)
      setArr(addColor(stack.getArray()))
      setInput("")
      setLoading(false)
   }

   return (
      <SolutionLayout title="Стек">
         <form className={styles.form} onSubmit={clickHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите число" type="text" maxLength={4} isLimitText={true} onChange={e => setInput(e.currentTarget.value.replace(/[^\d]/g, ""))} value={input} />
               <Button type="submit" text="Добавить" disabled={!input} isLoader={loading} />
               <Button type="button" text="Удалить" onClick={deleteElement} disabled={!arr.length} isLoader={loading} />
               <Button type="reset" text="Очистить" extraClass={styles.button_delete} disabled={!arr.length} onClick={clear} isLoader={loading} />
            </div>
         </form>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Circle letter={e[0]} state={e[1]} head={arr.at(-1) === e ? "top" : null} index={i} /></li>
               )}
         </ul>
      </SolutionLayout>
   )
}
