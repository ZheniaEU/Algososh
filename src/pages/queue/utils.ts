import { ElementStates } from "types/element-states"
import { waitSleep } from "utils/utils"

export type Tuple = [string, string]

export type Render = (arr: Array<Tuple>) => void

export class Queue<T> {
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

export const queue = new Queue<string>(7)

export const addColor = (arr: Array<string | null>): Array<Tuple> => {
   const result = Array(arr.length)
   for (let i = 0; i < arr.length; i++) {
      result[i] = [arr[i] ? arr[i] : "", ElementStates.Default]
   }
   return result
}

export const getTemporaryTail = async (render: Render): Promise<void> => {
   const arr = addColor(queue.getArray())
   const tail = queue.getTail()
   arr[tail][1] = ElementStates.Changing
   render(arr)
   await waitSleep(500)
   arr[tail][1] = ElementStates.Default
   render(arr)
}

export const getTemporaryHead = async (render: Render): Promise<void> => {
   const arr = addColor(queue.getArray())
   const head = queue.getHead()!
   arr[head][1] = ElementStates.Changing
   render(arr)
   await waitSleep(500)
   queue.dequeue()
   render(addColor(queue.getArray()))
}
