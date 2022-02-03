import React from 'react';
import './Issue.scss';
import { formatDate } from '../../utils/formatDate';

interface IIssueProps {
    issueNumber: number;
    issueDate: string;
    issueTitle: string;
    showIssueDetails: () => void;
}

export const Issue = ({ issueNumber, issueDate, issueTitle, showIssueDetails }: IIssueProps) => {

    return (
        <div className="issue-item__container" onClick={showIssueDetails}>
            <p>Issue Number: #{ issueNumber }</p>
            <p>{issueTitle}</p>
            <p>{formatDate(issueDate)}</p>
        </div>
    )
}