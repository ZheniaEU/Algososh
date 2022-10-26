/* eslint-disable */
import { FC, useEffect, useLayoutEffect, useState } from "react"
import { Button } from "components/ui/button/button"
import { Input } from "components/ui/input/input"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"
import { Circle } from "components/ui/circle/circle"
import { ArrowIcon } from "components/ui/icons/arrow-icon"

import { ElementStates } from "types/element-states"

import styles from "./list.module.css"

type Tuple = [string, string]

type Render = (arr: Array<Tuple>) => void

class ListNode<T> {
   constructor(
      public data: T,
      public next: ListNode<T> | null = null,
      public prev: ListNode<T> | null = null
   ) { }
}

class List<T> {
   constructor(
      public head: ListNode<T> | null = null,
      public tail: ListNode<T> | null = null,
   ) { }

   getArray() {
      let array = []
      if (this.head !== null) {
         let curr = this.head
         while (curr.next !== null) {
            array.push(curr.data)

            curr = curr.next
         }
         array.push(curr.data)
      }

      return array
   }

   insert(item: T, index: number) {
      let i = 0
      let curr = this.head
      while (i < index && curr?.next) {
         if (i + 1 === index) {
            curr.next = new ListNode(item, curr?.next)
         }
         curr = curr.next
         i++
      }
   }

   shift() {
      if (this.head) {
         this.head = this.head.next
         if (this.head)
            this.head.prev = null
      }
      return this
   }

   unshift(data: T) {
      const newNode = new ListNode(data)
      if (this.head) {
         this.head.prev = newNode
         newNode.next = this.head
      } else {
         this.tail = newNode
      }
      this.head = newNode
      return this
   }

   push(data: T) {
      let newNode = new ListNode(data)
      if (this.head && this.tail) {
         this.tail.next = newNode
         newNode.prev = this.tail
      } else {
         this.head = newNode
      }
      this.tail = newNode
      return this
   }

   pop() { // O(1)
      if (this.tail?.prev) {
         this.tail.prev.next = null
         this.tail = this.tail.prev
      } else {
         this.tail = null
         this.head = null
      }
      return this
   }
}

const list = new List()

// @ts-ignore
window.list = list
console.log(list.getArray())

const randomInteger = (min: number, max: number) => {

   const rand = min + Math.random() * (max + 1 - min)
   return Math.floor(rand).toString()
}

export const ListPage: FC = () => {

   const [arr, setArr] = useState<Array<string>>(["0", "34", "8", "1"])
   const [loading, setLoading] = useState<boolean>(false)

   useLayoutEffect(() => {
      let i = 0
      while (i < 7) {
         list.push(randomInteger(0, 100))
         i++
      }
      console.log(list.getArray())
   }, [])

   return (
      <SolutionLayout title="Связный список">
         <div className={styles.box}>
            <div className={styles.div}>
               <Input placeholder="Введите текст" type="text" maxLength={4} isLimitText={true} width="width-short" />
               <Button linkedList="small" text="Добавить в head" />
               <Button linkedList="small" text="Добавить в tail" />
               <Button linkedList="small" text="Удалить из head" />
               <Button linkedList="small" text="Удалить из tail" />
            </div>
            <div className={styles.div}>
               <Input width="width-short" />
               <Button linkedList="big" text="Добавить по индексу" />
               <Button linkedList="big" text="Удалить по индексу" />
            </div>
         </div>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} >
                     <div className={styles.wrapper}>
                        <Circle letter={e} index={i} extraClass={styles.margin} head={i === 0 ? "head" : null} tail={i === arr.length - 1 ? "tail" : null} />
                        {i !== arr.length - 1 &&
                           <ArrowIcon fill={"#0032FF"} />
                        }
                     </div>
                  </li>
               )}
         </ul>
      </SolutionLayout>
   )
}
