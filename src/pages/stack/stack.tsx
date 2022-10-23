/* eslint-disable */
import { Button } from "components/ui/button/button"
import { Circle } from "components/ui/circle/circle"
import { Input } from "components/ui/input/input"
import { FC, useState } from "react"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"

import styles from "./stack.module.css"

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
      if (this.isEmpty()) {
         return null
      } else {
         const res = this.container[this.curr - 1]
         this.container[this.curr--] = null
         return res
      }
   }

   peak(): T | null {
      return this.container[this.curr - 1] ?? null
   }

   isEmpty(): boolean {
      return this.curr === 0
   }
}

export const StackPage: FC = () => {
   const [input, setInput] = useState("")
   const [arr, setArr] = useState<Array<string>>(["23", "55", "fdsf", "ae"])

   const addElement = () => {

   }

   const deleteElement = () => {

   }

   const clear = () => {

   }

   return (
      <SolutionLayout title="Стек">
         <div className={styles.form} >
            <div className={styles.input}>
               <Input placeholder="Введите текст" type="text" maxLength={4} isLimitText={true} onChange={e => setInput(e.currentTarget.value)} value={input} />
               <Button type="submit" text="Добавить" onClick={addElement} />
               <Button type="submit" text="Удалить" onClick={deleteElement} />
               <Button type="submit" text="Очистить" extraClass={styles.button_delete} onClick={clear} />
            </div>
         </div>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Circle letter={e} head={"top"} index={i} /></li>
               )}
         </ul>
      </SolutionLayout>
   )
}

//<li className={styles.li} key={i} ><Circle letter={e[0]} state={e[1]} /></li>
