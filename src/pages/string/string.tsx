import { FC, FormEvent, useState } from "react"

import { Input } from "components/ui/input/input"
import { Circle } from "components/ui/circle/circle"
import { Button } from "components/ui/button/button"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"

import { addColor, reverseInput } from "./utils"

import styles from "./string.module.css"

export const StringComponent: FC = () => {

   const [input, setInput] = useState("")
   const [arr, setArr] = useState<Array<Array<string>>>([])
   const [loading, setLoading] = useState<boolean>(false)

   const clickHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      setArr(addColor(input.split("")))
      await reverseInput(addColor(input.split("")), setArr)
      setLoading(false)
      setInput("")
   }

   return (
      <SolutionLayout title="Строка">
         <form className={styles.form} onSubmit={clickHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите текст" type="text" maxLength={11} isLimitText={true} onChange={e => setInput(e.currentTarget.value)} value={input} />
               <Button data-testid="reverse" type="submit" text="Развернуть" disabled={!input} isLoader={loading} />
            </div>
         </form>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) =>
                  <li className={styles.li} key={i} ><Circle letter={e[0]} state={e[1]} /></li>
               )}
         </ul>
      </SolutionLayout >
   )
}
