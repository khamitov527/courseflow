import React, { useState, useEffect } from "react";
import { useNodesState, useEdgesState } from "react-flow-renderer";
import getLayoutedElements from "./Components/layout";
import FlowChart from "./Components/FlowChart";
import InfoBox from "./Components/InfoBox";
import styles from "./App.module.css";
import ElectivesBox from "./Components/ElectivesBox";

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [electives, setElectives] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://localhost:5001/courses");
      const courses = await response.json();

      const coreCourses = courses.filter((course) => !course.isElective);
      const electiveCourses = courses.filter((course) => course.isElective);

      setElectives(electiveCourses);

      const loadedNodes = coreCourses.map((course) => ({
        id: `${course.id}`,
        data: { label: `${course.code}: ${course.name}` },
        style: { borderWidth: "2px", borderColor: "#000", fontWeight: "bold" },
      }));

      const loadedEdges = [];
      coreCourses.forEach((course) => {
        if (course.Prerequisites && course.Prerequisites.length > 0) {
          course.Prerequisites.forEach((prerequisite) => {
            loadedEdges.push({
              id: `e${prerequisite.id}-${course.id}`,
              source: `${prerequisite.id}`,
              target: `${course.id}`,
              animated: true,
              arrowHeadType: "arrow",
              style: { strokeWidth: 2 },
            });
          });
        }
      });

      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(loadedNodes, loadedEdges);

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    };

    fetchCourses();
  }, []);

  const handleNodeClick = async (event, node) => {
    const response = await fetch(`http://localhost:5001/courses/${node.id}`);
    const course = await response.json();
    setSelectedClass(course);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hunter CS Flowchart</h1>
      <FlowChart
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={setEdges}
        onNodeClick={handleNodeClick}
      />
      <InfoBox selectedClass={selectedClass} />
      <ElectivesBox electives={electives}/>
    </div>
  );
};

export default App;