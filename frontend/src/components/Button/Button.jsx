import React from "react";
import styles from "./button.module.css";
import { getClasses } from "../../utils/getClasses";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

function Button({ children, type, variant, ...rest }) {
  return (
    <button
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
      ])}
      type={type === "submit" ? "submit" : "button"}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
