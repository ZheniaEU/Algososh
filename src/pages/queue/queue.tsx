import { FC, FormEvent, useEffect, useState } from "react"

import { Input } from "components/ui/input/input"
import { Circle } from "components/ui/circle/circle"
import { Button } from "components/ui/button/button"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"

import { addColor, getTemporaryHead, getTemporaryTail, queue } from "./utils"

import type { Tuple } from "./utils"

import styles from "./queue.module.css"

export const QueuePage: FC = () => {

   const [input, setInput] = useState("")
   const [arr, setArr] = useState<Array<Tuple>>([])
   const [loading, setLoading] = useState<boolean>(false)
   const disableButton = addColor(queue.getArray()).filter(e => e[0] !== "").length

   useEffect(() => {
      setArr(addColor(queue.getArray()))
   }, [])

   const clickHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      queue.enqueue(input)
      await getTemporaryTail(setArr)
      setInput("")
      setLoading(false)
   }

   const deleteElement = async () => {
      setLoading(true)
      await getTemporaryHead(setArr)
      setLoading(false)
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
               <Button data-testid="queue-add" type="submit" text="Добавить" disabled={!input || disableButton === 7} isLoader={loading} />
               <Button data-testid="queue-delete" type="button" text="Удалить" onClick={deleteElement} disabled={queue.getHead() === null} isLoader={loading} />
               <Button data-testid="queue-clear" type="reset" text="Очистить" extraClass={styles.button_delete} disabled={queue.getHead() === null} onClick={clear} isLoader={loading} />
            </div>
         </form>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Circle letter={e[0]} state={e[1]} tail={i === queue.getTail() ? "tail" : null} head={i === queue.getHead() ? "head" : null} index={i} /></li>
               )}
         </ul>
      </SolutionLayout>
   )
}
