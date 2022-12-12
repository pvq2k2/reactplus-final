import React from "react";
import styles from "./Button.module.css";
type Props = {
  children: JSX.Element;
};

const Button = ({ children }: Props) => {
  return <button className={styles.btn}>{children}</button>;
};

export default Button;
