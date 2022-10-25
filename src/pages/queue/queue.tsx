/* eslint-disable*/
import { FC, useEffect, useState } from "react"
import { Button } from "components/ui/button/button"
import { Input } from "components/ui/input/input"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"
import { Circle } from "components/ui/circle/circle"

import { ElementStates } from "types/element-states"

import styles from "./queue.module.css"

type Tuple = [string, string]

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
      return this.container[this.head]
   }

   getHead(): number {
      return this.head
   }

   getTail(): number {
      return this.tail
   }

   clear(): void {
      this.head = 0
      this.tail = 0
      this.curr = 0
      this.container = Array(this.size < 0 ? 0 : this.size)
   }

   getArray(): Array<T | null> {
      return this.container
   }

   isEmpty(): boolean {
      return this.size === 0
   }
}

const queue = new Queue<string>(7)

export const QueuePage: FC = () => {

   const [input, setInput] = useState("")
   const [arr, setArr] = useState<Array<Tuple>>([])
   const [loading, setLoading] = useState<boolean>(false)

   const fake = new Array(7).fill(null)

   const addColor = (arr: Array<string | null>): Array<Tuple> => {
      return arr.map((e) => (e  ? [e, ElementStates.Default] : ["", ElementStates.Default]))
   }

   const getTemporaryElement = async () => {
   }

   function swap() {

      let arr = addColor(queue.getArray())

      let el = [queue.peak(), ElementStates.Default]



      for (let i = 0; i < arr.length; ++i)
   //   console.log(arr, el)
         // @ts-ignore
         console.log(arr[i][1], el[1])
      // @ts-ignore
      if (arr[i][0] === el[0] && arr[i][1] === el[1]) arr[i][1] = "jopa"
      return arr
   }

   const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      queue.enqueue(input)
      setArr(addColor(queue.getArray()))
      await waitSleep(500)

      swap()

      //  getTemporaryElement()

      setInput("")
      setLoading(false)
   }

   const deleteElement = async () => {
      queue.dequeue()
      setArr(addColor(queue.getArray()))
   }

   const clear = () => {
      queue.clear()
      setArr(addColor(queue.getArray()))
   }

   return (
      <SolutionLayout title="Очередь">
         <form className={styles.form} onSubmit={clickHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите текст" type="text" maxLength={4} isLimitText={true} onChange={e => setInput(e.currentTarget.value)} value={input} />
               <Button type="submit" text="Добавить" disabled={!input} isLoader={loading} />
               <Button type="button" text="Удалить" onClick={deleteElement} disabled={!arr.length} isLoader={loading} />
               <Button type="reset" text="Очистить" extraClass={styles.button_delete} disabled={!arr.length} onClick={clear} isLoader={loading} />
            </div>
         </form>
         <ul className={styles.ul}>
            {fake.map((e, i) =>
               <li className={styles.fake} key={i}>  <Circle letter={e} index={i} /> </li>
            )}
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Circle letter={e[0]} state={e[1]} tail={i === queue.getTail() - 1 ? "хвост" : null} head={i === queue.getHead() ? "барабан" : null} index={i} /></li>
               )}
         </ul>
      </SolutionLayout>
   )
}
