import React, { useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    // Fetch all classes and their details from the backend
    const fetchClasses = async () => {
      const response = await fetch('http://localhost:5001/classes'); // Adjust the port if necessary
      const data = await response.json();

      // Transform the fetched data into nodes and edges for React Flow
      const loadedNodes = data.map((course, index) => ({
        id: `${course.id}`,
        position: { x: index * 200, y: 100 }, // Ensure x and y coordinates are set
        data: { label: `${course.name}: ${course.fullName}` },
        style: { borderWidth: '2px', borderColor: '#000', fontWeight: 'bold' },
      }));

      const loadedEdges = [];
      data.forEach((course) => {
        if (course.Prerequisites) {
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

        if (course.Corequisites) {
          course.Corequisites.forEach((corequisite) => {
            loadedEdges.push({
              id: `c${corequisite.id}-${course.id}`,
              source: `${corequisite.id}`,
              target: `${course.id}`,
              type: 'straight',
              style: { stroke: '#000', strokeDasharray: '5,5', strokeWidth: 2 },
            });
          });
        }
      });

      setNodes(loadedNodes);
      setEdges(loadedEdges);
    };

    fetchClasses();
  }, []);

  const handleToggleMode = () => {
    setIsEditMode((prevMode) => !prevMode);
    setSelectedClass(null); // Clear selection when mode changes
  };

  const handleNodeClick = async (event, node) => {
    if (!isEditMode) {
      const response = await fetch(`http://localhost:5001/classes/${node.id}`);
      const data = await response.json();
      setSelectedClass(data);
    }
  };

  const handleNodesChange = (changes) => {
    setNodes((nds) => 
      nds.map((node) => {
        const change = changes.find((c) => c.id === node.id);
        if (change && change.position) {
          // Update node position if it has changed
          return {
            ...node,
            position: change.position,
          };
        }
        return node;
      })
    );
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
          onNodesChange={isEditMode ? handleNodesChange : undefined}
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
          <h3>{selectedClass.fullName}</h3>
          <p><strong>Description:</strong> {selectedClass.description}</p>
          <p><strong>Credits:</strong> {selectedClass.credits}</p>
          <p><strong>Semester:</strong> {selectedClass.semester} {selectedClass.year}</p>
          <p><strong>Dates:</strong> {new Date(selectedClass.startDate).toLocaleDateString()} - {new Date(selectedClass.endDate).toLocaleDateString()}</p>
          <h4>Sections:</h4>
          {selectedClass.Sections.map((section, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <h5>Section {section.sectionNumber}</h5>
              <p>Professor: {section.professor}</p>
              <p>University: {section.university}</p>
              <p>Location: {section.location}</p>
              <p>Schedule: {section.schedule}</p>
              <p>Seats: {section.seats} / {section.waitlist}</p>
              <p>Instruction Mode: {section.instructionMode}</p>
              <p>Notes: {section.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlowChart;
