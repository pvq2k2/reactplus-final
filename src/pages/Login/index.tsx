/* eslint-disable no-useless-escape */
import React from "react";
import Button from "../../components/Common/Button";
import styles from "./Login.module.css";
import image from "../../assets/img/Done.png";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

type Props = {};

type Inputs = {
  email: string;
  password: string;
};

const schemaUser = yup
  .object({
    email: yup
      .string()
      .email()
      .required()
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter the correct format email"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password length should be at least 8 characters"),
  })
  .required();

const Login = (props: Props) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schemaUser),
  });

  const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
    try {
      toast.success("Login Successfully !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      reset();
      navigate("/dashboard");
    } catch (error: any) {
      const message = error?.response.data.message;
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className={styles.container}>
      <img src={image} alt="banner" className={styles.banner} />
      <div className={styles.content}>
        <div className={styles.title}>
          <span>
            Welcome back
            <br />
            to
            <br />
          </span>
          <h1>OUR REMINDER</h1>
        </div>
      </div>
      <form className={styles.formRegister} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <input
            type="text"
            className={`${styles.inputGroup} ${
              errors.email ? styles.error : ""
            }`}
            placeholder="Enter your email"
            {...register("email")}
          />
          <span className={styles.textError}>{errors.email?.message}</span>
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            className={`${styles.inputGroup} ${
              errors.password ? styles.error : ""
            }`}
            placeholder="Enter password"
            {...register("password")}
          />
          <span className={styles.textError}>{errors.password?.message}</span>
        </div>

        <Button>
          <span>Sign in</span>
        </Button>
      </form>

      <span className={styles.ask}>
        Don’t have an account ?{" "}
        <Link to="/register" className={styles.link}>
          Sign Up
        </Link>
      </span>
    </div>
  );
};

export default Login;
