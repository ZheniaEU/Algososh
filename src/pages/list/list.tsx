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

abstract class DoubleLinkedListNode<T> {
   abstract data: T
   abstract next: MyNode<T> | null
   abstract prev: MyNode<T> | null
}

abstract class DoubleLinkedList<T> {
   abstract head: MyNode<T> | null
   abstract tail: MyNode<T> | null
   abstract size: number
   abstract getArray(): Array<T>
   abstract insert(dara: T, index: number): this
   abstract remove(index: number): this
   abstract shift(): this
   abstract unshift(data: T): this
   abstract push(data: T): this
   abstract pop(): this
}

class MyNode<T> extends DoubleLinkedListNode<T> {
   constructor(
      public data: T,
      public next: MyNode<T> | null = null,
      public prev: MyNode<T> | null = null
   ) { super() }
}

class MyList<T> extends DoubleLinkedList<T> {
   constructor(
      public head: MyNode<T> | null = null,
      public tail: MyNode<T> | null = null,
      public size: number = 0
   ) { super() }

   getArray() {
      let array = []
      if (this.head) {
         let curr = this.head
         while (curr.next) {
            array.push(curr.data)
            curr = curr.next
         }
         array.push(curr.data)
      }
      return array
   }

   insert(data: T, index: number) {
      let curr = this.head

      if (index < 0 || index > this.size)
         return this
      else if (index === this.size)
         return this.push(data)
      else if (index === 0)
         return this.unshift(data)


      for (let i = 0; i <= this.size && curr; ++i) {
         if (i + 1 === index) {
            let newNode = new MyNode(data, curr.next, curr)
            curr.next = newNode
            if (curr.next.next)
               curr.next.next.prev = newNode
            break;
         } else {
            curr = curr.next
         }
      }

      --this.size
      return this
   }

   remove(index: number) {
      let curr = this.head

      if (index < -1 || index > this.size - 1)
         return this
      else if (this.size - 1 === index || index === -1)
         return this.pop()
      else if (index === 0)
         return this.shift()


      for (let i = 0; i < this.size && curr; ++i) {
         if (i + 1 === index) {
            curr.next = curr.next?.next || null
            if (curr.next)
               curr.next.prev = curr.next.prev?.prev || null
            break
         } else {
            curr = curr.next
         }
      }

      --this.size
      return this
   }

   shift() {
      if (this.head) {
         this.head = this.head.next
         if (this.head)
            this.head.prev = null
      }
      --this.size
      return this
   }

   unshift(data: T) {
      const newNode = new MyNode(data)
      if (this.head) {
         this.head.prev = newNode
         newNode.next = this.head
      } else {
         this.tail = newNode
      }
      this.head = newNode
      ++this.size
      return this
   }

   push(data: T) {
      let newNode = new MyNode(data)
      if (this.head && this.tail) {
         this.tail.next = newNode
         newNode.prev = this.tail
      } else {
         this.head = newNode
      }
      this.tail = newNode
      ++this.size
      return this
   }

   pop() {
      if (this.tail?.prev) {
         this.tail.prev.next = null
         this.tail = this.tail.prev
      } else {
         this.tail = null
         this.head = null
      }
      --this.size
      return this
   }

}

const list = new MyList()

// расширение контекста

// @ts-ignore
window.list = list
console.log(list.getArray())

const randomInteger = (min: number, max: number) => {

   const rand = min + Math.random() * (max + 1 - min)
   return Math.floor(rand).toString()
}

export const ListPage: FC = () => {

   const [arr, setArr] = useState<Array<string>>([])
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
