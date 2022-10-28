import { FC, FormEvent, useState } from "react"

import { Button } from "components/ui/button/button"
import { Circle } from "components/ui/circle/circle"
import { Input } from "components/ui/input/input"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"

import { addColor, getTemporaryElement, Stack } from "./utils"

import { waitSleep } from "utils/utils"

import { ElementStates } from "types/element-states"

import type { Tuple } from "./utils"

import styles from "./stack.module.css"

//я ограничил стек 19 элементами
const stack = new Stack<number>(19)

export const StackPage: FC = () => {
   const [input, setInput] = useState("")
   const [arr, setArr] = useState<Array<Tuple>>([])
   const [loading, setLoading] = useState<boolean>(false)

   const clickHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      stack.push(parseInt(input))
      setArr([...arr, getTemporaryElement(parseInt(input))])
      await waitSleep(500)
      setArr(addColor(stack.getArray()))
      setInput("")
      setLoading(false)
   }

   const deleteElement = async () => {
      setLoading(true)
      const copyArr = [...arr]
      copyArr[copyArr.length - 1][1] = ElementStates.Changing
      setArr(copyArr)
      await waitSleep(500)
      stack.pop()
      setArr(addColor(stack.getArray()))
      setLoading(false)
   }

   const clear = () => {
      stack.clear()
      setArr([])
   }

   return (
      <SolutionLayout title="Стек">
         <form className={styles.form} onSubmit={clickHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите число" type="text" maxLength={4} isLimitText={true} onChange={e => setInput(e.currentTarget.value.replace(/[^\d]/g, ""))} value={input} />
               <Button type="submit" text="Добавить" disabled={!input} isLoader={loading} />
               <Button type="button" text="Удалить" onClick={deleteElement} disabled={!arr.length} isLoader={loading} />
               <Button type="reset" text="Очистить" extraClass={styles.button_delete} disabled={!arr.length} onClick={clear} isLoader={loading} />
            </div>
         </form>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Circle letter={e[0]} state={e[1]} head={arr.at(-1) === e ? "top" : null} index={i} /></li>
               )}
         </ul>
      </SolutionLayout>
   )
}
