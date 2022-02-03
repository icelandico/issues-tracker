import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Issue } from './components/Issue/Issue';
import { issuesRepository } from './repository/issues';
import { Loader } from './components/Loader/Loader';
import { IssueDetails } from './components/IssueDetails/IssueDetails';

interface IIssue {
    title: string;
    number: number;
    created_at: string;
    state: string;
    body: string;
}

function App() {
    const [issues, setIssues] = useState<IIssue[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [issueDetails, setIssueDetails] = useState<IIssue | null>(null);
    const mainContainerRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        const getIssues = async () => {
            const issuesPayload = await issuesRepository.getInitialIssues().then(data => data.json());
            setIssues(issuesPayload)
            setIsLoading(false);
        }
        getIssues();
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 30;
            if (bottom) {
                const newPage = page === 1 ? page + 2 : page + 1;
                setPage(newPage);
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    });

    useEffect(() => {
        setIsLoading(true);
        const getNewIssues = async () => {
            const newIssuesPayload = await issuesRepository.getNextIssues(page).then(data => data.json());
            const newIssues = issues.concat(newIssuesPayload);
            setIssues(newIssues);
            setIsLoading(false)
        }
        page > 1 && getNewIssues();
    }, [page])

  return (
      <div className="main__container" ref={mainContainerRef}>
          <h1>Repository Issues Tracker</h1>
          {
              !issueDetails && (
                  <div className="issues__container">
                      {
                          issues.length > 0
                              ?
                              issues.map((issue) => {
                                  return (
                                      <Issue issueNumber={issue.number}
                                             issueDate={issue.created_at}
                                             issueTitle={issue.title}
                                             showIssueDetails={() => setIssueDetails(issue)}
                                      />
                                  )
                              })
                              : <Loader />
                      }
                      {isLoading && page > 1 && <Loader />}
                  </div>
              )
          }
          {
              issueDetails &&
              <IssueDetails issueTitle={issueDetails.title}
                            issueBody={issueDetails.body}
                            issueState={issueDetails.state}
                            showIssueDetails={() => setIssueDetails(null)}
              />
          }

</div>
  );
}

export default App;
