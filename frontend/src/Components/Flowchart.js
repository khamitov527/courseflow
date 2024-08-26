import React, { useState } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "react-flow-renderer";
import styles from "../App.module.css";

const FlowChart = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  setNodes,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState("");
  const [newCourseName, setNewCourseName] = useState("");

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = event.target.getBoundingClientRect();
    const data = JSON.parse(event.dataTransfer.getData("application/reactflow"));

    if (!data) return;

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: `${data.id}-${new Date().getTime()}`,
      position,
      data: { label: `${data.code}: ${data.name}` },
      style: { borderWidth: "2px", borderColor: "#000", fontWeight: "bold" },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleAddCourse = () => {
    const newNode = {
      id: `${new Date().getTime()}`,
      position: { x: 250, y: 150 }, // Default position, adjust as needed
      data: { label: `${newCourseCode}: ${newCourseName}` },
      style: { borderWidth: "2px", borderColor: "#000", fontWeight: "bold" },
    };

    setNodes((nds) => nds.concat(newNode));
    setShowModal(false);
    setNewCourseCode("");
    setNewCourseName("");
  };

  return (
    <div style={{ width: "100%", height: "100%" }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      <button className={styles.addButton} onClick={() => setShowModal(true)}>+</button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Add a New Course</h3>
            <input
              type="text"
              placeholder="Course Code"
              value={newCourseCode}
              onChange={(e) => setNewCourseCode(e.target.value)}
              className={styles.inputField}
            />
            <input
              type="text"
              placeholder="Course Name"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              className={styles.inputField}
            />
            <button onClick={handleAddCourse} className={styles.addCourseButton}>
              Add Course
            </button>
            <button onClick={() => setShowModal(false)} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowChart;
