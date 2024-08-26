import React, { useState, useEffect } from 'react';
import { useNodesState, useEdgesState } from 'react-flow-renderer';
import getLayoutedElements from './layout'; 
import FlowChartComponent from './FlowChartComponent';
import ModeToggleButton from './ModeToggleButton';
import NodeDetailsPanel from './NodeDetailsPanel';

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('http://localhost:5001/courses');
      const courses = await response.json();

      // Filter out elective courses
      const coreCourses = courses.filter(course => !course.isElective);

      // Transform the filtered data into nodes and edges for React Flow
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

  const handleToggleMode = () => {
    setIsEditMode((prevMode) => !prevMode);
    setSelectedClass(null);
  };

  const handleNodeClick = async (event, node) => {
    if (!isEditMode) {
      const response = await fetch(`http://localhost:5001/courses/${node.id}`);
      const course = await response.json();
      setSelectedClass(course);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '10px' }}>
          <ModeToggleButton isEditMode={isEditMode} onToggle={handleToggleMode} />
        </div>
        <FlowChartComponent 
          nodes={nodes} 
          edges={edges} 
          isEditMode={isEditMode} 
          onNodesChange={onNodesChange} 
          onEdgesChange={onEdgesChange} 
          onConnect={setEdges} 
          onNodeClick={handleNodeClick} 
        />
      </div>
      {selectedClass && <NodeDetailsPanel selectedClass={selectedClass} />}
    </div>
  );
};

export default FlowChart;
