import React, { useState } from 'react';
import './IssueDetails.scss';

interface IIssueDetailsProps {
    issueTitle: string;
    issueBody: string;
    issueState: string;
    showIssueDetails: () => void;
}

export const IssueDetails = ({ issueTitle, issueBody, issueState, showIssueDetails }: IIssueDetailsProps) => {
    const [issueScore, setIssueScore] = useState(0);

    return (
        <div className="issue-details-page__container">
            <div className="issue-details__box">
                <h1>{issueTitle}</h1>
                <div className="issue-details__box-main">
                    <div className="issue-details__box-content">
                        <h2>Issue status: {issueState}</h2>
                        <div className="issue-details__body" >{issueBody}</div>
                        {/*<p className="issue-details__body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque autem commodi corporis ex harum, inventore iusto molestias obcaecati porro soluta tempora ut! Amet assumenda, autem consequatur debitis ea eius explicabo hic in inventore labore magnam maxime, molestiae nostrum nulla placeat recusandae repellat, suscipit veritatis vitae voluptatem. Aperiam architecto, assumenda atque autem commodi consequuntur cum ex expedita fugit magnam molestiae nemo possimus quae quas quasi quidem quisquam quos rem repudiandae sed totam velit veniam vero vitae voluptatum? Ad animi architecto aspernatur atque consectetur consequuntur corporis debitis deleniti dolor, dolore dolorem doloribus eligendi et expedita fugit laudantium magnam necessitatibus perspiciatis, placeat possimus quas quisquam quos rem sapiente similique sunt vel, veniam. Assumenda commodi delectus, distinctio fuga itaque iusto officia officiis pariatur quae vel. Autem beatae deserunt, enim error fugiat iste iure iusto laboriosam libero magni odit officia perferendis quia quibusdam quos repellendus rerum sed veritatis. Accusamus aliquam eaque eligendi facere illum odit.</p>*/}
                    </div>
                    <div className="issue-details__voting">
                        <div className="issue-details__voting-arrow issue-details__voting-up"></div>
                        <div className="issue-details__voting-score">{issueScore}</div>
                        <div className="issue-details__voting-arrow issue-details__voting-down"></div>
                    </div>
                </div>
            </div>

            <div className="issue-details__back-button" onClick={showIssueDetails}>Go Back To Issues List</div>
        </div>
    )
}