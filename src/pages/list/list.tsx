/* eslint-disable */
import { FC, FormEvent, useEffect, useLayoutEffect, useState } from "react"

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

export const ListPage: FC = () => {

   const [input, setInput] = useState("")
   const [arr, setArr] = useState<Array<string>>([])
   const [loading, setLoading] = useState(false)
   const [inputIndex, setInputIndex] = useState("")
   const [count, setCount] = useState(-1)
   const [green, setGreen] = useState(false)
   const [circle, setCircle] = useState<"top" | "hidden" | "bottom">("hidden")
   const [temporary, setTemporary] = useState("")

   useEffect(() => {
      for (let i = 0; i < 7; i++)
         list.push(randomInteger(0, 100))
      setArr(list.getArray())
   }, [])

   const clickHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      setCount(0)
      setCircle("top")
      list.unshift(input)
      await waitSleep(2000)
      setGreen(true)
      setArr(list.getArray())
      setInput("")
      setCircle("hidden")
      await waitSleep(1000)
      setGreen(false)
      setArr(list.getArray())
      setCount(-1)
      setLoading(false)
   }

   const addToTail = async () => {
      setLoading(true)
      setCount(list.size - 1)
      setCircle("top")
      await waitSleep(2000)
      list.push(input)
      setCount(list.size - 1)
      setGreen(true)
      setArr(list.getArray())
      setInput("")
      setCircle("hidden")
      await waitSleep(1000)
      setArr(list.getArray())
      setGreen(false)
      setCount(-1)
      setLoading(false)
   }

   const deleteHead = async () => {
      setLoading(true)
      setCount(0)
      setCircle("bottom")
      setTemporary(arr[0])
      list.shift().unshift("")
      setArr(list.getArray())
      await waitSleep(2000)
      setCircle("hidden")
      setTemporary("")
      setArr(list.shift().getArray())
      setCount(-1)
      setLoading(false)
   }

   const deleteTail = async () => {
      setLoading(true)
      setCircle("bottom")
      setCount(list.size - 1)
      setTemporary(arr[list.size - 1])
      list.pop().push("")
      setArr(list.getArray())
      await waitSleep(2000)
      setTemporary("")
      setArr(list.pop().getArray())
      setCircle("hidden")
      setCount(-1)
      setLoading(false)
   }

   async function increment(render: Render, n: number,) {
      while (n <=  parseInt(inputIndex)) {
         render(n++)
         setArr(list.getArray())
         await waitSleep(500)
      }
   }

   const addElement = async () => {
      setLoading(true)
      setCircle("top")
      setTemporary(input)
      await increment(setCount, count)
      setArr(list.insert(input, parseInt(inputIndex)).getArray())
      setCircle("hidden")
      setGreen(true)
      await waitSleep(1000)
      setGreen(false)
      setCount(-1)
      setLoading(false)
   }

   const deleteIndex = () => {
      setLoading(true)
      setArr(list.remove(parseInt(inputIndex)).getArray())
      setLoading(false)
   }

   console.log(list.head)

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
                           <Circle isSmall={true} letter={circle === "top" ? input : temporary} extraClass={i === count && circle === "top" ? styles.top : i === count && circle === "bottom" ? styles.bottom : styles.hidden} state={ElementStates.Changing} />
                           <Circle letter={e} index={i} extraClass={styles.margin} head={i === 0 && count !== i ? "head" : null} tail={i === arr.length - 1 && count !== i ? "tail" : null} state={i === count && green ? ElementStates.Modified : i < count && count !== list.size - 1 ? ElementStates.Changing : ElementStates.Default} />
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
