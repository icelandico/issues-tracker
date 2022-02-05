import React, { useEffect, useRef, useState } from 'react';
import { issuesRepository } from './repository/issues';
import { IssueDetails } from './components/IssueDetails/IssueDetails';
import { Route } from './components/Route/Route';
import { IssuesList } from './components/IssuesList/IssuesList';
import './App.scss';
import { Loader } from './components/Loader/Loader';

export interface IIssue {
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
        const getSingleIssue = async () => {
            const issuePath = window.location.pathname;
            const matchRgx = issuePath.match(/(?<=issue-)[0-9]+/);
            const issueNumber = matchRgx ? matchRgx[0] : '';
            const issuePayload = await issuesRepository.getIssueByNumber(issueNumber).then(data => data.json());
            setIssueDetails(issuePayload)
            setIsLoading(false)
        }

        isIssuePage() ? getSingleIssue() : getIssues();
    }, []);

    const getIssues = async () => {
        const issuesPayload = await issuesRepository.getInitialIssues().then(data => data.json());
        setIssues(issuesPayload);
        setFilteredIssues(issuesPayload)
    }

    const isIssuePage = () => {
        const currentPathname = window.location.pathname;
        return currentPathname.includes('issue-');
    }

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

    const handleFilteredIssues = () => {
        if (issues.length > 0) {
            setFilteredIssues(issues);
            return;
        }
            setIsLoading(true);
            getIssues();
    }

  return (
      <div className="main__container" ref={mainContainerRef}>
          <h1>Repository Issues Tracker</h1>
          {
              <Route path={window.location.href}>
                  <IssuesList
                      issues={issues}
                      filteredIssues={filteredIssues}
                      page={page}
                      isLoading={isLoading}
                      handleFilter={handleFilter}
                      setIssueDetails={setIssueDetails}
                  />
              </Route>
          }
          {
              issueDetails&&
                  <Route path={`${window.location.href}issue-${issueDetails.number}`}>
                      <>
                          <IssueDetails issueDetails={issueDetails}
                                        showIssueDetails={() => {
                                            setIssueDetails(null);
                                            handleFilteredIssues();
                                        }}
                          />
                      </>
                  </Route>
          }
          {!issueDetails && issues.length === 0 && <Loader />}
      </div>
  );
}

export default App;
