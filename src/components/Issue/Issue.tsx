import React from 'react';
import './Issue.scss';
import { formatDate } from '../../utils/formatDate';

interface IIssueProps {
    issueNumber: number;
    issueDate: string;
    issueTitle: string;
}

export const Issue = ({ issueNumber, issueDate, issueTitle }: IIssueProps) => {

    return (
        <div className="issue-item__container">
            <p>Issue Number: #{ issueNumber }</p>
            <p>{issueTitle}</p>
            <p>{formatDate(issueDate)}</p>
        </div>
    )
}