import React from "react";
import styles from "./Button.module.css";
type Props = {
  children: JSX.Element;
};

const Button = ({ children }: Props) => {
  return <div className={styles.btn}>{children}</div>;
};

export default Button;
