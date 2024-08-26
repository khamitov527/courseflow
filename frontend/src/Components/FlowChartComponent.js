import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';

const FlowChartComponent = ({
  nodes, 
  edges, 
  onNodesChange, 
  onEdgesChange, 
  onConnect, 
  onNodeClick 
}) => (
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
);

export default FlowChartComponent;
