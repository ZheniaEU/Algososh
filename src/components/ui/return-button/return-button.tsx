import React, { FC } from "react"
import { ReturnIcon } from "../icons/return-icon"

import styles from "./return-button.module.css"

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
   type?: "button" | "submit" | "reset"
   extraClass?: string
}

export const ReturnButton: FC<ButtonProps> = ({ extraClass = "", ...rest }) => {

   return (
      <button
         className={`${styles.button} ${extraClass}`}
         type="button"
         {...rest}
      >
         <ReturnIcon />
         <p className="text_type_button text_color_link ml-4 m-0">К оглавлению</p>
      </button>
   )
}
