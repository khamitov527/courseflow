import React from "react";
import styles from "../App.module.css";

const InfoBox = ({ selectedClass }) => (
  <div className={styles.infoBox}>
    {selectedClass && (
      <div
        style={{
          width: "300px",
          padding: "10px",
          backgroundColor: "#f4f4f4",
          borderLeft: "1px solid #ddd",
        }}
      >
        <h3>
          {selectedClass.code}: {selectedClass.name}
        </h3>
        <p>
          <strong>Description:</strong> {selectedClass.description || "N/A"}
        </p>
        <h4>Prerequisites:</h4>
        {selectedClass.Prerequisites &&
        selectedClass.Prerequisites.length > 0 ? (
          <ul>
            {selectedClass.Prerequisites.map((prerequisite) => (
              <li key={prerequisite.id}>
                {prerequisite.code}: {prerequisite.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>None</p>
        )}
      </div>
    )}
  </div>
);

export default InfoBox;
