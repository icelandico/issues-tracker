import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Issue } from './components/Issue/Issue';
import { issuesRepository } from './repository/issues';
import { Loader } from './components/Loader/Loader';
import { IssueDetails } from './components/IssueDetails/IssueDetails';
import { Finder } from './components/Finder/Finder';
import { NoResultsWidget } from './components/NoResultsWidget/NoResultsWidget';
import { Route } from './components/Route/Route';
import Link from './components/Link/Link';

interface IIssue {
    title: string;
    number: number;
    created_at: string;
    state: string;
    body: string;
}

function App() {
    const [issues, setIssues] = useState<IIssue[]>([]);
    const [filteredIssues, setFilteredIssues] = useState<IIssue[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [issueDetails, setIssueDetails] = useState<IIssue | null>(null);
    const mainContainerRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        const getIssues = async () => {
            const issuesPayload = await issuesRepository.getInitialIssues().then(data => data.json());
            setIssues(issuesPayload);
            setFilteredIssues(issuesPayload);
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
            setFilteredIssues(newIssues);
            setIsLoading(false)
        }
        page > 1 && getNewIssues();
    }, [page])

    const handleFilter = (phrase: string) => {
        const collectionCopy = [...issues];
        const matchByNumber = collectionCopy.filter(issue => issue.number.toString().includes(phrase));
        const matchByPhrase = collectionCopy.filter(issue => issue.title.toLowerCase().includes(phrase.toLowerCase()));
        const filteredIssues = matchByNumber.concat(matchByPhrase);
        setFilteredIssues(filteredIssues);
    }

  return (
      <div className="main__container" ref={mainContainerRef}>
          <h1>Repository Issues Tracker</h1>
          {
              !issueDetails && (
                  <div className="issues__container">
                      { issues.length > 0 && <Finder handleFilter={handleFilter}/> }
                      {
                          issues.length > 0
                              ?
                              filteredIssues.map((issue) => {
                                  return (
                                      <Link href={`/issue-${issue.number}`}>
                                          <Issue issueNumber={issue.number}
                                                 issueDate={issue.created_at}
                                                 issueTitle={issue.title}
                                                 showIssueDetails={() => setIssueDetails(issue)}
                                          />
                                      </Link>
                                  )
                              })
                              : <Loader />
                      }
                      {isLoading && page > 1 && <Loader />}
                      {!isLoading && filteredIssues.length === 0 && <NoResultsWidget />}
                  </div>
              )
          }
          {
              issueDetails &&
              <>
                  <Route path={`/issue-${issueDetails.number}`}>
                      <IssueDetails issueTitle={issueDetails.title}
                                    issueBody={issueDetails.body}
                                    issueState={issueDetails.state}
                                    issueNumber={issueDetails.number}
                                    showIssueDetails={() => setIssueDetails(null)}
                      />
                  </Route>
              </>
          }

</div>
  );
}

export default App;
