import { FC, useState } from "react"
import { Button } from "../../components/ui/button/button"
import { Circle } from "../../components/ui/circle/circle"
import { Input } from "../../components/ui/input/input"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"

import type { CircleProps } from "../../components/ui/circle/circle"

import styles from "./string.module.css"

// type Arr = {
//    arr: string | number
// }

export const StringComponent: FC = () => {
   /* @ts-ignore */
   let [arr, setArr] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"])
   let  [test, setTest] = useState("")
   //let [arr, setArr] = useState()
   // @ts-ignore
   // setArr = ["1", "2"]

   // const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
   const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

   }

   const setInput =()=>{

   }


   return (
      <SolutionLayout title="Строка">
         <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.input}>

               <Input placeholder="Введите текст" type="text" maxLength={11} isLimitText={true} onSubmit={(e) => setTest(e.currentTarget.value)} />
               <Button type="submit" text="Развернуть" />
            </div>
         </form>

         <ul className={styles.ul}>
            {/* <p>{test}</p> */}
            {arr.map((item, i) =>
               < li className={styles.li}> <Circle letter={item} index={i} key={i} /> </li>
            )}
            {/* <li className={styles.li}> <Circle letter="g" tail={"5"} /></li> */}
            {/* <li className={styles.li}> <Circle letter="3" tailType={"string"} /></li> */}
            {/* <li className={styles.li}> <Circle letter="4" extraClass="element" /></li> */}
            {/* <li className={styles.li}> <Circle letter="5" isSmall={true} /></li> */}
            {/* <li className={styles.li}> <Circle letter="6" /></li> */}
            {/* <li className={styles.li}> <Circle letter="7" /></li> */}
            {/* <li className={styles.li}> <Circle letter="8" /></li> */}
            {/* <li className={styles.li}> <Circle letter="9" /></li> */}
            {/* <li className={styles.li}> <Circle letter="10" /></li> */}
            {/* <li className={styles.li}> <Circle letter="11" /></li> */}
         </ul>
      </SolutionLayout >
   )
}

// на кнопке есть лоадер
