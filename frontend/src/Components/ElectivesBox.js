import React from "react";
import styles from "../App.module.css";

const ElectivesBox = ({ electives }) => {

  const onDragStart = (event, elective) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(elective));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={styles.electivesBox}>
      <h3 className={styles.electivesTitle}>Elective Courses</h3>
      <ul className={styles.list}>
        {electives.map((elective) => (
          <li
            key={elective.id}
            className={styles.listItem}
            draggable
            onDragStart={(event) => onDragStart(event, elective)}
          >
            {elective.code}: {elective.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ElectivesBox;
