/* eslint-disable */
import { FC, useEffect, useState } from "react"
import { Button } from "components/ui/button/button"
import { Circle } from "components/ui/circle/circle"
import { Input } from "components/ui/input/input"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"
import { ElementStates } from "types/element-states"

import styles from "./string.module.css"

export const sleepWait = (ms: number = 1300) => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve(null)
      }, ms);
   })
}
export const StringComponent: FC = () => {

   //получаемый импут
   let [input, setInput] = useState<string>("")
   //обрабатываемый массив
   let [arr, setArr] = useState<Array<Array<string>>>([])
   // флаг загрузки
   let [loading, SetLoading] = useState<boolean>(false)

   let [state, setState] = useState<any>()


   //добавил поле цвет
   const addColor = (arr: Array<string>) => {
      return arr.map(e => [e, ElementStates.Default])
   }

   const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // clickHandler()
      SetLoading(true)
      setArr(addColor(input.split("")))

      solution(arr)
   }




   const solution = (arr: any) => {
      console.log("здеся1", arr) // почему у меня массив отстаёт на итерацию?
      let currentIndex = 0
      let max = Math.floor(arr.length / 2)
      while (currentIndex < max) {

         let a = currentIndex
         let b = arr.length - 1 - currentIndex
         let a_next = currentIndex + 1
         console.log(a_next)
         let b_next = arr.length - 1 - currentIndex

         console.log("здеся2")
         let tmp = arr[a]
         arr[a] = [arr[b][0], [ElementStates.Changing]]
         arr[b] = [tmp[0], [ElementStates.Changing]]

         tmp = arr[a_next]
         arr[a_next] = [arr[b_next][0], [ElementStates.Changing]]
         arr[b_next] = [tmp[0], [ElementStates.Changing]]
         setArr(arr)
         sleepWait(1300)
         currentIndex += 1
      }

      setTimeout(() => {

         SetLoading(false)

         setInput("")
      }, 2500)

   }


   const clickHandler = () => {

      SetLoading(true)
      setArr(addColor(input.split("")))

      solution(arr)
   }

   return (
      <SolutionLayout title="Строка">
         <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите текст" type="text" maxLength={11} isLimitText={true} onChange={e => setInput(e.currentTarget.value)} value={input} />
               <Button type="submit" text="Развернуть" onClick={clickHandler} disabled={!input} isLoader={loading} />
            </div>
         </form>
         <p>{input}</p>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) => {
                  return <li className={styles.li} key={i} > <Circle letter={e[0]} state={e[1]} /> </li>
               })}
         </ul>
      </SolutionLayout >
   )
}
