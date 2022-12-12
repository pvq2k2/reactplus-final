/* eslint-disable no-useless-escape */
import React from "react";
import Button from "../../components/Common/Button";
import styles from "./Register.module.css";
import image from "../../assets/img/Done.png";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signup } from "../../services/auth";

type Props = {};

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schemaUser = yup
  .object({
    name: yup.string().required(),
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
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .min(8, "Password length should be at least 8 characters")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required();

const Register = (props: Props) => {
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
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      await signup(data);

      toast.success("Register Successfully !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      reset();
      navigate("/signin");
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
          <h1>Get’s things done with TODO</h1>
          <p>Let’s help you meet up your tasks</p>
        </div>
      </div>
      <form className={styles.formRegister} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <input
            type="text"
            className={`${styles.inputGroup} ${
              errors.name ? styles.error : ""
            }`}
            placeholder="Enter your full name"
            {...register("name")}
          />
          <span className={styles.textError}>{errors.name?.message}</span>
        </div>

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

        <div className={styles.formGroup}>
          <input
            type="password"
            className={`${styles.inputGroup} ${
              errors.confirmPassword ? styles.error : ""
            }`}
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          <span className={styles.textError}>
            {errors.confirmPassword?.message}
          </span>
        </div>
        <Button>
          <span>Register</span>
        </Button>
      </form>

      <span className={styles.ask}>
        Already have an account ?{" "}
        <Link to="/login" className={styles.link}>
          Sign In
        </Link>
      </span>
    </div>
  );
};

export default Register;
