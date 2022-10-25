/* eslint-disable*/
import { FC, useEffect, useState } from "react"
import { Button } from "components/ui/button/button"
import { Input } from "components/ui/input/input"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"
import { Circle } from "components/ui/circle/circle"

import { ElementStates } from "types/element-states"

import styles from "./queue.module.css"

type Tuple = [[string, number], string]

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

   getTail(): T | null {
      return this.container[this.tail - 1]
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
const queue = new Queue<[string, number]>(7)

export const QueuePage: FC = () => {

   const [input, setInput] = useState("")
   const [arr, setArr] = useState<Array<Tuple>>([])
   const [loading, setLoading] = useState<boolean>(false)

   const fake = new Array(7).fill(null)
   const addColor = (arr: Array<[string, number] | null>): Array<Tuple> => {
      return arr.map((e) => ([e ? e : ["", 1], ElementStates.Default]))
   }

   // function swap(arr: Array<Tuple>, el: Tuple) {
   //    for (let i = 0; i < arr.length; ++i)
   //       if (arr[i][0][0] === el[0][0] && arr[i][0][1] === el[0][1] && arr[i][1] === el[1]) arr[i][1] = ElementStates.Changing
   //    return console.log(arr)
   // }

   const getTemporaryElement = async () => {
   }

   const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      queue.enqueue([input, Date.now()])
      setArr(addColor(queue.getArray()))
      await waitSleep(500)
      let tail = [queue.getTail(), ElementStates.Default]
      //   swap(addColor(queue.getArray()), tail as Tuple)

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
                  <li className={styles.li} key={i} ><Circle letter={e[0][0]} head={queue.peak() === e[0] ? "head" : null} tail={queue.getTail() === e[0] ? "tail" : null} state={e[1]} index={i} /></li>
               )}
         </ul>
      </SolutionLayout>
   )
}
