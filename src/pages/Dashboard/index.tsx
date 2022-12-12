import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import avatar from "../../assets/img/Ellipse 2.png";
import clock from "../../assets/img/Group 7.png";
import plus from "../../assets/img/plus-circle.png";
import { getTodo } from "../../services/todo";
import { toast } from "react-toastify";

type Props = {};

const DashBoard = (props: Props) => {
  const [tasksList, setTasksList] = useState([]);
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
  };

  console.log(tasksList);

  useEffect(() => {
    const fetchListTodo = async () => {
      try {
        const dataListTodo = await getTodo();
        setTasksList(dataListTodo);
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
    fetchListTodo();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.dashboardTop}>
        <img src={avatar} alt="avatar" />
        <span className={styles.name}>Monica Gamage</span>
        <span className={styles.tag}>@monicagamage</span>
        <button onClick={() => handleLogOut()}>Log Out</button>
      </div>
      <div className={styles.clock}>
        <img src={clock} alt="clock" />
        <h3>Good Afternoon</h3>
      </div>
      <div className={styles.todoList}>
        <h2>Tasks List</h2>
        <div className={styles.boxTodolist}>
          <div className={styles.headerTodo}>
            <h3>Tasks List</h3>
            <img src={plus} alt="plus" />
          </div>

          <ul className={styles.list}>
            {tasksList?.map((todo: any) => (
              <li key={todo.id}>
                <input type="checkbox" defaultChecked={todo.completed} />{" "}
                {todo.name}
              </li>
            ))}

            {/* <li>
              <input type="checkbox" /> Cook Rice and Chicken at 10 am
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
