import { FC, useEffect, useState } from "react"
import { Button } from "components/ui/button/button"
import { Input } from "components/ui/input/input"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"
import { Circle } from "components/ui/circle/circle"

import { ElementStates } from "types/element-states"

import styles from "./queue.module.css"

type Tuple = [string, string]

type Render = (arr: Array<Tuple>) => void

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
      this.container = Array(size < 0 ? 0 : size).fill(null)
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

   getHead(): number | null {
      return this.container[this.head] === null ? null : this.head
   }

   getTail(): number {
      return this.tail - 1
   }

   clear(): void {
      this.head = 0
      this.tail = 0
      this.curr = 0
      this.container = Array(this.size < 0 ? 0 : this.size).fill(null)
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

   const addColor = (arr: Array<string | null>): Array<Tuple> => {
      const result = Array(arr.length)
      for (let i = 0; i < arr.length; i++) {
         result[i] = [arr[i] ? arr[i] : "", ElementStates.Default]
      }
      return result
   }

   useEffect(() => {
      setArr(addColor(queue.getArray()))
   }, [])

   const getTemporaryTail = async (render: Render): Promise<void> => {
      const arr = addColor(queue.getArray())
      const tail = queue.getTail()
      arr[tail][1] = ElementStates.Changing
      render(arr)
      await waitSleep(500)
      arr[tail][1] = ElementStates.Default
      render(arr)
   }
   const getTemporaryHead = async (render: Render): Promise<void> => {
      const arr = addColor(queue.getArray())
      const head = queue.getHead()!
      arr[head][1] = ElementStates.Changing
      render(arr)
      await waitSleep(500)
      queue.dequeue()
      render(addColor(queue.getArray()))
   }

   const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      queue.enqueue(input)
      await getTemporaryTail(setArr)
      setInput("")
      setLoading(false)
   }

   const deleteElement = async () => {
      setLoading(true)
      await getTemporaryHead(setArr)
      setLoading(false)
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
               <Button type="button" text="Удалить" onClick={deleteElement} disabled={queue.getHead() === null} isLoader={loading} />
               <Button type="reset" text="Очистить" extraClass={styles.button_delete} disabled={queue.getHead() === null} onClick={clear} isLoader={loading} />
            </div>
         </form>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Circle letter={e[0]} state={e[1]} tail={i === queue.getTail() ? "tail" : null} head={i === queue.getHead() ? "head" : null} index={i} /></li>
               )}
         </ul>
      </SolutionLayout>
   )
}
