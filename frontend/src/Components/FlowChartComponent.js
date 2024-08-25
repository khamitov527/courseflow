import React from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, Background } from 'react-flow-renderer';

const FlowChartComponent = ({
  nodes, 
  edges, 
  isEditMode, 
  onNodesChange, 
  onEdgesChange, 
  onConnect, 
  onNodeClick 
}) => (
  <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={isEditMode ? onNodesChange : undefined}
    onEdgesChange={isEditMode ? onEdgesChange : undefined}
    onConnect={isEditMode ? (params) => onConnect(params) : undefined}
    fitView
    nodesDraggable={isEditMode}
    elementsSelectable={isEditMode}
    onNodeClick={onNodeClick}
  >
    <MiniMap />
    <Controls />
    <Background />
  </ReactFlow>
);

export default FlowChartComponent;
