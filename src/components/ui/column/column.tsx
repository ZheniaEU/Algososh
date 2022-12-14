import { FC } from "react"
import { ElementStates } from "../../../types/element-states"

import styles from "./column.module.css"

interface ColumnProps {
   index: number
   state?: string
   extraClass?: string
}

export const Column: FC<ColumnProps> = ({ index, state = ElementStates.Default, extraClass = "" }) => (

   <div className={`${styles.content} ${extraClass}`}>
      <div
         className={`${styles.column} ${styles[state]}`}
         style={{ height: (320 * index) / 100 || 1 }}
      />
      <p data-testid="column"
      className={`text_type_column text_color_input mt-3`}>{index}</p>
   </div>
)
