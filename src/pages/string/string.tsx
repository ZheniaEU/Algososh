import { FC, useState } from "react"
import { Button } from "components/ui/button/button"
import { Circle } from "components/ui/circle/circle"
import { Input } from "components/ui/input/input"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"

import styles from "./string.module.css"

export const StringComponent: FC = () => {

   let [arr, setArr] = useState<Array<string>>([])
   let [test, setTest] = useState<string>("")

   const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setTest("")
   }

   const bimbim = () => {
      setArr(test.split("").reverse())
      //собственно бабам осталась только логика написания реверса
   }

   return (
      <SolutionLayout title="Строка">
         <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите текст" type="text" maxLength={11} isLimitText={true} onChange={e => setTest(e.currentTarget.value)} value={test} />
               <Button type="submit" text="Развернуть" onClick={bimbim} disabled={!test} />
            </div>
         </form>
         <p>{test}</p>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) => (
                  <li className={styles.li} key={i}> <Circle letter={e} /> </li>
               ))}
         </ul>
      </SolutionLayout >
   )
}

// на кнопке есть лоадер
