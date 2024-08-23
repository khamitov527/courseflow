// src/FlowChart.js
import React, { useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Introduction to Programming' }, style: { borderWidth: '2px', borderColor: '#000', fontWeight: 'bold' } },
  { id: '2', position: { x: 200, y: 0 }, data: { label: 'Data Structures' }, style: { borderWidth: '2px', borderColor: '#000', fontWeight: 'bold' } },
  { id: '3', position: { x: 400, y: 0 }, data: { label: 'Algorithms' }, style: { borderWidth: '2px', borderColor: '#000', fontWeight: 'bold' } },
  { id: '4', position: { x: 200, y: 100 }, data: { label: 'Database Systems' }, style: { borderWidth: '2px', borderColor: '#000', fontWeight: 'bold' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, arrowHeadType: 'arrow', style: { strokeWidth: 2 } }, // Prerequisite with arrow
  { id: 'e2-3', source: '2', target: '3', animated: true, arrowHeadType: 'arrow', style: { strokeWidth: 2 } }, // Prerequisite with arrow
  { id: 'e2-4', source: '2', target: '4', animated: true, arrowHeadType: 'arrow', style: { strokeWidth: 2 } }, // Prerequisite with arrow
  { id: 'e3-4', source: '3', target: '4', type: 'straight', style: { stroke: '#000', strokeDasharray: '5,5', strokeWidth: 2 } }, // Co-requisite with dashed line
];

const classDetails = {
  '1': {
    sections: [
      { section: 'A', seatsAvailable: 10, totalSeats: 30, professor: 'Prof. Smith', schedule: 'MWF 9-10 AM' },
      { section: 'B', seatsAvailable: 5, totalSeats: 30, professor: 'Prof. Johnson', schedule: 'TTh 1-2:30 PM' },
    ],
  },
  '2': {
    sections: [
      { section: 'A', seatsAvailable: 8, totalSeats: 25, professor: 'Prof. Brown', schedule: 'MWF 11-12 PM' },
      { section: 'B', seatsAvailable: 12, totalSeats: 25, professor: 'Prof. Davis', schedule: 'TTh 3-4:30 PM' },
    ],
  },
  '3': {
    sections: [
      { section: 'A', seatsAvailable: 2, totalSeats: 20, professor: 'Prof. Wilson', schedule: 'MWF 10-11 AM' },
    ],
  },
  '4': {
    sections: [
      { section: 'A', seatsAvailable: 15, totalSeats: 30, professor: 'Prof. Lee', schedule: 'TTh 9-10:30 AM' },
    ],
  },
};

function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const onConnect = (params) => {
    if (isEditMode) {
      setEdges((eds) => addEdge(params, eds));
    }
  };

  const handleToggleMode = () => {
    setIsEditMode((prevMode) => !prevMode);
    setSelectedClass(null); // Clear selection when mode changes
  };

  const handleNodeClick = (event, node) => {
    if (!isEditMode) {
      setSelectedClass(classDetails[node.id]);
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
          onConnect={onConnect}
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
          <h3>Class Details</h3>
          <div>
            {selectedClass.sections.map((section, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <h4>Section {section.section}</h4>
                <p>Professor: {section.professor}</p>
                <p>Schedule: {section.schedule}</p>
                <p>
                  Seats: {section.seatsAvailable} / {section.totalSeats}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FlowChart;
