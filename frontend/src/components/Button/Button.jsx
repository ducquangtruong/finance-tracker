import React from "react";
import styles from "./button.module.css";
import { getClasses } from "../../utils/getClasses";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

const buttonSizes = {
  small: "small"
};

function Button({ children, type, variant, size, ...rest }) {
  return (
    <button
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
        styles[`button--${buttonSizes[size]}`],
      ])}
      type={type === "submit" ? "submit" : "button"}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
