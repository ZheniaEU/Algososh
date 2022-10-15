import { FC, useState } from "react"
import { Button } from "components/ui/button/button"
import { Circle } from "components/ui/circle/circle"
import { Input } from "components/ui/input/input"
import { SolutionLayout } from "components/ui/solution-layout/solution-layout"

import styles from "./string.module.css"
import { ElementStates } from "types/element-states"

export const DELAY_IN_MS = 1000
export const SHORT_DELAY_IN_MS = 500

// свап на ксоре
export const swap = (arr: Array<number>, i: number, z: number): void => {
   if (z === i)
      return
   arr[i] ^= arr[z]
   arr[z] ^= arr[i]
   arr[i] ^= arr[z]
}

export const StringComponent: FC = () => {

   //получаемый импут
   let [input, setInput] = useState<string>("")
   //обрабатываемый массив
   let [arr, setArr] = useState<Array<string>>([])
   // флаг загрузки
   let [loading, SetLoading] = useState<boolean>(false)
   // я думаю тут нужно хранить состояние цвета или из массива сделать объект и присвоить ключ с цветом?

   const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setInput("")
   }

   let [color, setColor] = useState(ElementStates.Default)
//   let a = ElementStates.Default
   //  ElementStates.Changing

   const bimbim = () => {

      SetLoading(true)
      setArr(input.split(""))

      setColor(ElementStates.Modified)
//      console.log(a)
      setTimeout(() => {
         setArr(input.split("").reverse())
         SetLoading(false)
         setColor(ElementStates.Changing)
      }, 3000)


      /* логика

      делаем жмяу на кнопку
      запускается лоадер на кнопке, заблокировать кнопку
      получаем массив из строки и записываем в состояние
      отоброжаю массив на экране и покрасить все элементы в один цвет
      на сколько я понимаю дальше через цикл я должен менять первый и последний элемент местами двигаесь к середине
      меняемые в текущей момент я должен выделить отдельным цветом и те которые поменял тоже отдельным
      после завершения очестить инпут и разблокировать кнопку и убрать лоадер


      импортировать делей
      */
   }



   return (
      <SolutionLayout title="Строка">
         <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.input}>
               <Input placeholder="Введите текст" type="text" maxLength={11} isLimitText={true} onChange={e => setInput(e.currentTarget.value)} value={input} />
               <Button type="submit" text="Развернуть" onClick={bimbim} disabled={!input} isLoader={loading} />
            </div>
         </form>
         <p>{input}</p>
         <ul className={styles.ul}>
            {arr &&
               arr.map((e, i) => {
                       console.log(e)
                  return <li className={styles.li} key={i} > <Circle letter={e} state={color} /> </li>
               })}
         </ul>
      </SolutionLayout >
   )
}

// на кнопке есть лоадер
