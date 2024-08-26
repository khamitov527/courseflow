import React from 'react';
import FlowChart from './Components/FlowChart';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <h1>Class Flowchart for Major</h1>
      <FlowChart />
    </div>
  );
}

export default App;

