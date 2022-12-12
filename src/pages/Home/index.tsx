import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import image from "../../assets/img/Done.png";
import arrow from "../../assets/img/Vector.png";
import Button from "../../components/Common/Button";
type Props = {};

const Home = (props: Props) => {
  return (
    <div className={styles.container}>
      <img src={image} alt="banner" className={styles.banner} />
      <div className={styles.content}>
        <div className={styles.title}>
          <span>Welcome to</span>
          <h1>OUR REMINDER</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum
            dictum tempus, interdum at dignissim metus. Ultricies sed nunc.
          </p>
        </div>
      </div>
      <Button>
        <Link to="/register" className={styles.link}>
          Get Start
          <img src={arrow} alt="arrow" className={styles.arrow} />
        </Link>
      </Button>
    </div>
  );
};

export default Home;
