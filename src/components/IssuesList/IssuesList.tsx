import React from 'react';
import { Finder } from '../Finder/Finder';
import Link from '../Link/Link';
import { Issue } from '../Issue/Issue';
import { Loader } from '../Loader/Loader';
import { NoResultsWidget } from '../NoResultsWidget/NoResultsWidget';
import { IIssue } from '../../App';

interface IIssuesListProps {
    issues: IIssue[];
    filteredIssues: IIssue[];
    isLoading: boolean;
    page: number;
    handleFilter: (phrase: string) => void;
    setIssueDetails: (issue: IIssue) => void;
}

export const IssuesList = ({ issues, filteredIssues, isLoading, page, handleFilter, setIssueDetails }: IIssuesListProps) => {
    return (
        <div className="issues__container">
            { issues.length > 0 && <Finder handleFilter={handleFilter} /> }
            {
                issues.length > 0
                    &&
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
            }
            {isLoading && page > 1 && <Loader />}
            {!isLoading && filteredIssues.length === 0 && <NoResultsWidget />}
        </div>
    )
}