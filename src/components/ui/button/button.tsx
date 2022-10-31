import React, { FC } from "react"
import loaderIcon from "../../../images/icons/loader.svg"
import { AscendingIcon } from "../icons/ascending-icon"
import { DescendingIcon } from "../icons/descending-icon"
import { Direction } from "../../../types/direction"

import styles from "./button.module.css"

type ButtonProps = {
   text?: string
   type?: "button" | "submit" | "reset"
   sorting?: Direction
   linkedList?: "small" | "big"
   isLoader?: boolean
   extraClass?: string
} & React.HTMLProps<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({ text, extraClass = "", type = "button", isLoader = false, sorting, linkedList, disabled, ...rest }) => {

   const currentIcon = sorting === Direction.Ascending ? <AscendingIcon /> : <DescendingIcon />
   const className = `text_type_button text_color_primary ${styles.button
      } ${linkedList && styles[linkedList]} ${isLoader && styles.loader
      } ${extraClass}`

   return (
      <button
         className={className}
         disabled={isLoader || disabled}
         {...rest}
         type={type}
      >
         {isLoader ? (
            <img className={styles.loader_icon} src={loaderIcon} alt="Загрузка." />
         ) : (
            <>
               {sorting && currentIcon}
               <p className={`text ${sorting && "ml-5"}`}>{text}</p>
            </>
         )}
      </button>
   )
}
