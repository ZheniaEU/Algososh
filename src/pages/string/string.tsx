import { FC } from "react"
import { Button } from "../../components/ui/button/button"
import { Input } from "../../components/ui/input/input"
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout"

import styles from "./string.module.css"

export const StringComponent: FC = () => {

   return (
      <SolutionLayout title="Строка">
         <form action="" className={styles.form}>
            <div className={styles.wrapper}>
               <Input placeholder="Введите текст" type="text" maxLength={11} isLimitText={true}>
               </Input>
               <Button type="submit" text="Развернуть" />
            </div>

         </form>
      </SolutionLayout>
   )
}

// и нужно размапить круг
// на кнопке есть лоадер
