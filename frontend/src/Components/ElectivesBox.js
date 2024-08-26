import React from "react";
import styles from "../App.module.css";

const ElectivesBox = ({ electives }) => (
  <div className={styles.electivesBox}>
    <h3 className={styles.electivesTitle}>Elective Courses</h3>
    <ul className={styles.list}>
      {electives.map((elective) => (
        <li key={elective.id} className={styles.listItem}>
          {elective.code}: {elective.name}
        </li>
      ))}
    </ul>
  </div>
);

export default ElectivesBox;
