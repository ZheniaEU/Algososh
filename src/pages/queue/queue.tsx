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

const queue = new Queue<Tuple>(7)

export const QueuePage: FC = () => {

   const [input, setInput] = useState("")
   const [arr, setArr] = useState<Array<Tuple>>([])
   const [loading, setLoading] = useState<boolean>(false)

   const fake = new Array(7).fill(null)

   const addColor = (arr: Array<Tuple | null>): Array<Tuple> => {
      return arr.map((e) => ([e ? e : ["", 1], ElementStates.Default])) as Array<Tuple>
   }


   // useEffect(() => {
   //    setArr(addColor(queue.getArray()))
   // }, [])

   const getTemporaryElement = async () => {
      //  const copyArr = [...addColor(queue.getArray())]
      //  copyArr[copyArr.length - 1][1] = ElementStates.Changing

      let tail = queue.getTail()
      tail?.map(e => [e, ElementStates.Changing])

  //    console.log(tail)

      //      let array = addColor(queue.getArray())


      let head = queue.peak()
      // console.log(array.map((e: any) => {
      //    if (e === tail) {
      //       return [[e[0][0], e[0][1]], e[1] = ElementStates.Changing]
      //    } else {
      //       return e
      //    }
      // }))

      // console.log(head)
    //  console.log(tail)
      // console.log(array)
      // return console.log(array.map((e: any) => {
      //    if (e === tail) {
      //       return "ебобо"
      //    } else {
      //       return e
      //    }
      // }))
      // setArr([...copyArr])
      // copyArr[copyArr.length - 1][1] = ElementStates.Changing
   }

   const clickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      queue.enqueue([[input, Date.now()], ElementStates.Changing])

      setArr(addColor(queue.getArray()))
      await waitSleep(500)
      //    console.log([...arr])
      let tail = queue.getTail()

      //    let array = addColor(queue.getArray())


      let head = queue.peak()
      getTemporaryElement()

      setInput("")
      setLoading(false)
   }

   const deleteElement = async () => {
     console.log(queue.getArray())
      queue.dequeue()

      console.log(queue.getArray())

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
               arr.map((e, i) => {
                  if (e) console.log(arr)
                  if (e)
                     return <li className={styles.li} key={i} > <Circle letter={e[0][0]} state={e[1]} index={i} /></li>
               })}
         </ul>
      </SolutionLayout >
   )
}
