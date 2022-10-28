/* eslint-disable */
import { FC, FormEvent, useLayoutEffect, useState } from "react"

import { Button } from "components/ui/button/button"
import { Input } from "components/ui/input/input"
import { Circle } from "components/ui/circle/circle"
import { ArrowIcon } from "components/ui/icons/arrow-icon"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"

import { MyList, randomInteger, waitSleep } from "./utils"

import { ElementStates } from "types/element-states"

import styles from "./list.module.css"

type Render = (n: number) => void

const list = new MyList<string>()

async function increment(n: number, render: Render) {
   render(n++)
   await waitSleep(500)
}

export const ListPage: FC = () => {

   const [input, setInput] = useState("")
   const [arr, setArr] = useState<Array<string>>([])
   const [loading, setLoading] = useState(false)
   const [inputIndex, setInputIndex] = useState("")
   const [count, setCount] = useState(-1)
   const [green, setGreen] = useState(false)
   const [a, setA] = useState<"top" | "hidden" | "bottom">("hidden")

   useLayoutEffect(() => {
      for (let i = 0; i < 7; i++)
         list.push(randomInteger(0, 100))
      setArr(list.getArray())

   }, [])

   const clickHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      setCount(0)
      setA("top")
      list.unshift(input)
      await waitSleep(2000)
      setGreen(true)
      setArr(list.getArray())
      setInput("")
      setA("hidden")
      await waitSleep(1000)
      setGreen(false)
      setArr(list.getArray())
      setCount(-1)
      setLoading(false)
   }

   const addToTail = async () => {
      setLoading(true)
      setCount(list.size - 1)
      setA("top")
      await waitSleep(2000)
      list.push(input)
      setCount(list.size - 1)
      setGreen(true)
      setArr(list.getArray())
      setInput("")
      setA("hidden")
      await waitSleep(1000)
      setArr(list.getArray())
      setGreen(false)
      setCount(-1)
      setLoading(false)
   }

   const deleteHead = () => {
      setArr(list.shift().getArray())
   }

   const deleteTail = () => {
      setLoading(true)
      list.pop()
      setArr(list.getArray())
      setLoading(false)
   }


   const deleteIndex = () => {
      setArr(list.remove(parseInt(inputIndex)).getArray())
   }

   const addElement = () => {
      setArr(list.insert(input, parseInt(inputIndex)).getArray())
   }

   return (
      <SolutionLayout title="Связный список">
         <div className={styles.box}>
            <form className={styles.div} onSubmit={clickHandler}>
               <Input placeholder="Введите значение" type="text" maxLength={4} isLimitText={true} width="width-short" value={input} onChange={e => setInput(e.currentTarget.value.replace(/[^\d]/g, ""))} />
               <Button type="submit" linkedList="small" text="Добавить в head" disabled={!input} isLoader={loading} />
               <Button linkedList="small" text="Добавить в tail" disabled={!input} onClick={addToTail} isLoader={loading} />
               <Button linkedList="small" text="Удалить из head" disabled={list.size === 0} onClick={deleteHead} isLoader={loading} />
               <Button linkedList="small" text="Удалить из tail" disabled={list.size === 0} onClick={deleteTail} isLoader={loading} />
            </form>
            <div className={styles.div}>
               <Input width="width-short" placeholder="Введите индекс" type="text" value={inputIndex} onChange={e => setInputIndex(e.currentTarget.value.replace(/[^\d]/g, ""))} />
               <Button linkedList="big" text="Добавить по индексу" disabled={(!inputIndex || !input) || parseInt(inputIndex) > list.size} onClick={addElement} isLoader={loading} />
               <Button linkedList="big" text="Удалить по индексу" disabled={!inputIndex || parseInt(inputIndex) > list.size - 1} onClick={deleteIndex} isLoader={loading} />
            </div>
         </div>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i}>
                     <div className={styles.wrapper}>
                        <div className={styles.circle_box}>
                           <Circle isSmall={true} letter={input} extraClass={i === count && a === "top" ? styles.top : i === count && a === "bottom" ? styles.bottom : styles.hidden} state={ElementStates.Changing} />
                           <Circle letter={e} index={i} extraClass={styles.margin} head={i === 0 && a !== "top" ? "head" : null} tail={i === arr.length - 1 && a !== "bottom" ? "tail" : null} state={i === count && green ? ElementStates.Modified : i < count && count !== list.size - 1 ? ElementStates.Changing : ElementStates.Default} />
                        </div>
                        {i !== arr.length - 1 &&
                           <ArrowIcon fill={i < count && count !== list.size - 1 ? "#d252e1" : "#0032FF"} />
                        }
                     </div>
                  </li>
               )}
         </ul>
      </SolutionLayout>
   )
}
