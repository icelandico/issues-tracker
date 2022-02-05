import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Link from './../Link/Link';
import { IIssue } from '../../App';
import './IssueDetails.scss';

interface IIssueDetailsProps {
    issueDetails: IIssue;
    showIssueDetails: () => void;
}

export const IssueDetails = ({ issueDetails, showIssueDetails }: IIssueDetailsProps) => {
    const [issue, setIssueScore] = useLocalStorage(issueDetails.number);

    const parseIssueScore = (score: number) => {
        if (score > 99 || score < -99) {
            return '99!!'
        }
        return score;
    }

    return (
        <div className="issue-details-page__container">
            <div className="issue-details__box">
                <h1>{issueDetails.title}</h1>
                <div className="issue-details__box-main">
                    <div className="issue-details__box-content">
                        <h2>Issue status: {issueDetails.state}</h2>
                        <div className="issue-details__body" >{issueDetails.body}</div>
                    </div>
                    <div className="issue-details__voting">
                        <div className="issue-details__voting-arrow issue-details__voting-up" onClick={() => setIssueScore(issue.score + 1)}></div>
                        <div className="issue-details__voting-score">{parseIssueScore(issue.score)}</div>
                        <div className="issue-details__voting-arrow issue-details__voting-down" onClick={() => setIssueScore(issue.score - 1)}></div>
                    </div>
                </div>
            </div>

            <Link href="/">
                <div className="issue-details__back-button" onClick={showIssueDetails}>Back to List</div>
            </Link>
        </div>
    )
}