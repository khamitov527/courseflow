import React, { useState, useEffect } from 'react';
import { useNodesState, useEdgesState } from 'react-flow-renderer';
import getLayoutedElements from './layout';
import FlowChartComponent from './FlowChartComponent';
import NodeDetailsPanel from './NodeDetailsPanel';
import styles from './FlowChart.module.css';

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [electives, setElectives] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('http://localhost:5001/courses');
      const courses = await response.json();

      const coreCourses = courses.filter(course => !course.isElective);
      const electiveCourses = courses.filter(course => course.isElective);

      setElectives(electiveCourses);

      const loadedNodes = coreCourses.map((course) => ({
        id: `${course.id}`,
        data: { label: `${course.code}: ${course.name}` },
        style: { borderWidth: '2px', borderColor: '#000', fontWeight: 'bold' },
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
              arrowHeadType: 'arrow',
              style: { strokeWidth: 2 },
            });
          });
        }
      });

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        loadedNodes,
        loadedEdges
      );

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
      <div className={styles.flowChartArea}>
        <FlowChartComponent
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={setEdges}
          onNodeClick={handleNodeClick}
        />
      </div>
      <div className={styles.infoArea}>
        <div className={styles.infoBox}>
          {selectedClass && <NodeDetailsPanel selectedClass={selectedClass} />}
        </div>
        <div className={styles.electivesBox}>
          <h3 className={styles.title}>Elective Courses</h3>
          <ul className={styles.list}>
            {electives.map((elective) => (
              <li key={elective.id} className={styles.listItem}>
                {elective.code}: {elective.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlowChart;
