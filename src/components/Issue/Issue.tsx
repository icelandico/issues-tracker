import React from 'react';
import './Issue.scss';

interface IIssueProps {
    issueNumber: number;
}

export const Issue = ({ issueNumber }: IIssueProps) => {
    return (
        <div>
            <p>Issue Number: { issueNumber }</p>
            <p>Issue title</p>
            <p>Issue Date</p>
        </div>
    )
}