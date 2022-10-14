import React, { FC } from "react"

import styles from "./input.module.css"

interface InputProps extends React.HTMLProps<HTMLInputElement> {
   placeholder?: string
   extraClass?: string
   isLimitText?: boolean
   width?: "width-long" | "width-short"
}

export const Input: FC<InputProps> = ({ placeholder = "Введите текст", extraClass = "", type = "text", maxLength, max, isLimitText = false, width = "width-long", ...rest }) => {

   const limitText = type === "text" ? `Максимум — ${maxLength} символа` : `Максимальное число — ${max}`

   return (
      <div className={`${styles.content} ${extraClass}`}>
         <input
            className={`${styles.input} ${width} text_type_input text_color_input`}
            placeholder={placeholder}
            type={type}
            maxLength={maxLength}
            max={max}
            {...rest}
         />
         {isLimitText && (
            <span
               className={`text_type_input-lim text_color_input mt-2 ml-8 ${styles.limit}`}
            >
               {limitText}
            </span>
         )}
      </div>
   )
}
