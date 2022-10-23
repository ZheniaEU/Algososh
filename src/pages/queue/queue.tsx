/* eslint-disable*/
import { FC, useEffect, useState } from "react"
import { Button } from "components/ui/button/button"
import { Input } from "components/ui/input/input"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"
import { Circle } from "components/ui/circle/circle"

import { ElementStates } from "types/element-states"

import styles from "./queue.module.css"

type Tuple = [number, string]

const waitSleep = (ms: number) => {
   return new Promise((resolve) => {
      setTimeout(resolve, ms)
   })
}

class Queue<T> {
   private container: Array<T | null>
   private head: number = 0
   private tail: number = 0
   private curr: number = 0

   constructor(private readonly size: number) {
      this.container = Array(size < 0 ? 0 : size)
   }

   dequeue(): T | null {
      if (!this.isEmpty()) {
         --this.curr
         this.head = this.head % this.size
         const res = this.container[this.head]
         this.container[this.head++] = null
         return res
      } else {
         return null
      }
   }

   enqueue(data: T): Queue<T> {
      if (this.curr < this.size) {
         ++this.curr
         this.tail = this.tail % this.size
         this.container[this.tail++] = data
      }
      return this
   }

   peak(): T | null {
      return this.container[this.head] ?? null
   }

   getArray = (): Array<T | null> => this.container

   isEmpty(): boolean {
      return this.size === 0
   }
}

const queue = new Queue<number>(6)

export const QueuePage: FC = () => {

   const [input, setInput] = useState("")
   const [arr, setArr] = useState<Array<Tuple>>([[1, ElementStates.Default], [2, ElementStates.Default], [3, ElementStates.Default],
   [4, ElementStates.Default], [5, ElementStates.Default], [6, ElementStates.Default]])
   const [loading, setLoading] = useState<boolean>(false)


   const addColor = (arr: Array<number | null>): Array<Tuple> => {
      // const Array: Array<Tuple> = []
      // arr.forEach(e => {
      //    if (e !== null) Array.push([e, ElementStates.Default])
      return arr.filter((e) => e !== null).map((e) => [e, ElementStates.Default]) as Array<Tuple>
   }

   // useEffect(() => {
   //    setArr(addColor(stack.getArray()))
   // }, [])

   const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

   }



   const deleteElement = async () => {

   }

   const clear = () => {

      setArr([])
   }

   return (
      <SolutionLayout title="Очередь">
         <form className={styles.form} onSubmit={clickHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите текст" type="text" maxLength={4} isLimitText={true} onChange={e => setInput(e.currentTarget.value.replace(/[^\d]/g, ""))} value={input} />
               <Button type="submit" text="Добавить" disabled={!input} isLoader={loading} />
               <Button type="button" text="Удалить" onClick={deleteElement} disabled={!arr.length} isLoader={loading} />
               <Button type="reset" text="Очистить" extraClass={styles.button_delete} disabled={!arr.length} onClick={clear} isLoader={loading} />
            </div>
         </form>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Circle letter={e[0]} state={e[1]} tail={arr.at(-1) === e ? "top" : null} head={arr.at(0)===e? "heat" : null} index={i} /></li>
               )}
         </ul>
      </SolutionLayout>
   )
}
