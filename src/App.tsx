import React from 'react';
import './App.css';
import { Issue } from './components/Issue/Issue';

function App() {
  return (
    <div className="main__container">
        <h1>Repository Issues Tracker</h1>
        <div className="issues__container">
            {
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((issue, idx) => {
                    return <Issue issueNumber={idx} />
                })

            }
        </div>
    </div>
  );
}

export default App;
