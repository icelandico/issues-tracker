import React, { useEffect, useState } from 'react';
import './App.css';
import { Issue } from './components/Issue/Issue';
import { issuesRepository } from './repository/issues';

interface IIssue {
    title: string;
    number: number;
}

function App() {
    const [issues, setIssues] = useState<IIssue[]>([]);

    useEffect(() => {
        const getIssues = async () => {
            const issuesPayload = await issuesRepository.getInitialIssues().then(data => data.json());
            console.log('issues', issuesPayload)
            setIssues(issuesPayload)
        }

        getIssues();
    }, [])

  return (
      <div className="main__container">
          <h1>Repository Issues Tracker</h1>
      <div className="issues__container">
          {
              issues.map((issue) => {
                  return <Issue issueNumber={issue.number} />
              })

          }
      </div>
</div>
  );
}

export default App;
