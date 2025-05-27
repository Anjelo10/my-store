import { title } from "process";
import styles from "./Toaster.module.scss";
import { useEffect, useRef, useState } from "react";

type Propstype = {
  variant?: string;
  message?: string;
};

const toasterVariant: any = {
  success: {
    title: "Success",
    icon: "bx-check-circle",
    color: "#a3d9a5",
    barColor: "#3f9242",
  },
  danger: {
    title: "Error",
    icon: "bx-check-circle",
    color: "#f39b9a",
    barColor: "#bb2525",
  },
  warning: {
    title: "Warning",
    icon: "bx-check-circle",
    color: "#f8e3a2",
    barColor: "#e9b949",
  },
};

const Toaster = (props: Propstype) => {
  const { variant = "warning", message } = props;
  const [lengthBar, setLengthBar] = useState(100);
  const timerRef = useRef<any>(null);
  const timerStart = () => {
    timerRef.current = setInterval(() => {
      setLengthBar((prev) => prev - 0.14);
    });
  };

  useEffect(() => {
    timerStart();
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className={`${styles.toaster} ${styles[`toaster--${variant}`]} `}>
      <div className={styles.toaster__main}>
        <div className={styles.toaster__main__icon}>
          <i
            className={`bx ${toasterVariant[variant].icon} `}
            style={{ color: toasterVariant[variant].barColor }}
          />
        </div>
        <div className={styles.toaster__main__text}>
          <p className={styles.toaster__main__text__title}>
            {toasterVariant[variant].title}
          </p>
          <p className={styles.toaster__main__text__description}>{message}</p>
        </div>
      </div>
      <div
        className={`${styles.toaster__timer}`}
        style={{
          backgroundColor: toasterVariant[variant].color,
        }}
      >
        <div
          style={{
            width: `${lengthBar}%`,
            height: "100%",
            backgroundColor: toasterVariant[variant].barColor,
          }}
        />
      </div>
    </div>
  );
};

export default Toaster;
