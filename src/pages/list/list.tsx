/* eslint-disable */
import { FC, FormEvent, useLayoutEffect, useState } from "react"
import { Button } from "components/ui/button/button"
import { Input } from "components/ui/input/input"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"
import { Circle } from "components/ui/circle/circle"
import { ArrowIcon } from "components/ui/icons/arrow-icon"
import { MyList } from "./utils"

import { ElementStates } from "types/element-states"

import styles from "./list.module.css"

type Tuple = [string, string]

type Render = (arr: Array<Tuple>) => void

const list = new MyList<string>()

// расширение контекста
// Apostolico-Giancarlo algorithm

// @ts-ignore
window.list = list

const randomInteger = (min: number, max: number) => {

   const rand = min + Math.random() * (max + 1 - min)
   return Math.floor(rand).toString()
}

export const ListPage: FC = () => {

   const [input, setInput] = useState("")
   const [arr, setArr] = useState<Array<string>>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [inputIndex, setInputIndex] = useState<string>("")

   useLayoutEffect(() => {
      for (let i = 0; i < 7; i++)
         list.push(randomInteger(0, 100))

      console.log(list.getArray())
      setArr(list.getArray())

   }, [])

   const clickHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      list.unshift(input)
      setArr(list.getArray())
   }

   const addtoTail = () => {
      list.push(input)
      setArr(list.getArray())
   }

   const deleteTail = () => {
      setLoading(true)
      list.pop()
      setArr(list.getArray())
      setLoading(false)
   }

   const deleteHead = () => {
      setArr(list.shift().getArray())
   }

   const deleteIndex = () => {
   // list.remove(inputIndex)
   }
   const clickIndex = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    //  list.remove(inputIndex)
    //  setArr(list.getArray())
   }

   return (
      <SolutionLayout title="Связный список">
         <div className={styles.box}>
            <form className={styles.div} onSubmit={clickHandler}>
               <Input placeholder="Введите текст" type="text" maxLength={4} isLimitText={true} width="width-short" onChange={e => setInput(e.currentTarget.value.replace(/[^\d]/g, ""))} value={input} />
               <Button type="submit" linkedList="small" text="Добавить в head" disabled={!input} />
               <Button linkedList="small" text="Добавить в tail" disabled={!input} onClick={addtoTail} />
               <Button linkedList="small" text="Удалить из head" disabled={list.getSize() === 0} onClick={deleteHead} />
               <Button linkedList="small" text="Удалить из tail" disabled={list.getSize() === 0} onClick={deleteTail} />
            </form>
            <div className={styles.div} >
               <Input width="width-short" placeholder="Введите индекс" type="text" max={4} value={inputIndex} onChange={e => setInputIndex(e.currentTarget.value.replace(/[^\d]/g, ""))}  />
               <Button type="submit" linkedList="big" text="Добавить по индексу" disabled={!inputIndex} />
               <Button linkedList="big" text="Удалить по индексу" disabled={!inputIndex} onClick={deleteIndex} />
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


// f=(before, after)=> (fn)=>(...args) => after(fn(...before(...args)))

// f1=(...args)=> (console.log("i'm before"), args)
// f2=(...args)=> (console.log("шото делаю"), args)
// f3=(...args)=> console.log("i'm after")

// let wrapped = f(f1,f3)

// wrapped(f2)()

// //wrapped(()=> setArr(list.shift().getArray()))

// //onClick={wrapped(()=> setArr(list.shift().getArray())) }
