import React, { useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import getLayoutedElements from './layout'; 

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    // Fetch all courses and their details from the backend
    const fetchCourses = async () => {
      const response = await fetch('http://localhost:5001/courses');
      const courses = await response.json();

      // Transform the fetched data into nodes and edges for React Flow
      const loadedNodes = courses.map((course) => ({
        id: `${course.id}`,
        data: { label: `${course.code}: ${course.name}` },
        style: { borderWidth: '2px', borderColor: '#000', fontWeight: 'bold' },
      }));

      const loadedEdges = [];
      courses.forEach((course) => {
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
    setSelectedClass(null); // Clear selection when mode changes
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
          <button onClick={handleToggleMode}>
            Switch to {isEditMode ? 'View' : 'Edit'} Mode
          </button>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={isEditMode ? onNodesChange : undefined}
          onEdgesChange={isEditMode ? onEdgesChange : undefined}
          onConnect={isEditMode ? (params) => setEdges((eds) => addEdge(params, eds)) : undefined}
          fitView
          nodesDraggable={isEditMode}
          elementsSelectable={isEditMode}
          onNodeClick={handleNodeClick}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      {selectedClass && (
        <div style={{ width: '300px', padding: '10px', backgroundColor: '#f4f4f4', borderLeft: '1px solid #ddd' }}>
          <h3>{selectedClass.code}: {selectedClass.name}</h3>
          <p><strong>Description:</strong> {selectedClass.description || "N/A"}</p>
          <h4>Prerequisites:</h4>
          {selectedClass.Prerequisites && selectedClass.Prerequisites.length > 0 ? (
            <ul>
              {selectedClass.Prerequisites.map((prerequisite) => (
                <li key={prerequisite.id}>{prerequisite.code}: {prerequisite.name}</li>
              ))}
            </ul>
          ) : (
            <p>None</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FlowChart;
