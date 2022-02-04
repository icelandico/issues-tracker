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
            <p className="issue-item__title">{issueTitle}</p>
            <p className="issue-item__date">{formatDate(issueDate)}</p>
        </div>
    )
}