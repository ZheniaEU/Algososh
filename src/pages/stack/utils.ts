import { ElementStates } from "types/element-states"

export type Tuple = [number, string]

export class Stack<T> {
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

export const addColor = (arr: Array<number | null>): Array<Tuple> => {
   return arr.filter((e) => e !== null).map((e) => [e, ElementStates.Default]) as Array<Tuple>
}

export const getTemporaryElement = (e: number): Tuple => {
   return [e, ElementStates.Changing]
}
