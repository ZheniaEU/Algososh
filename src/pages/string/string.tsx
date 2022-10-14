import { FC } from "react"
import { Button } from "../../components/ui/button/button"
import { Input } from "../../components/ui/input/input"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"

import styles from "./string.module.css"

export const StringComponent: FC = () => {

   return (
      <SolutionLayout title="Строка">
         <form action="" className={styles.a}>
            <Input placeholder="Введите текст" type="text" maxLength={11}>
            </Input>
            <Button type="submit" text="Развернуть" />
         </form>
      </SolutionLayout>
   )
}

//в ui есть кнопки
// круги
// какие то колонки
//инпуты
//радиобатоны
//свапать элементы строки методом 2х указателей?
