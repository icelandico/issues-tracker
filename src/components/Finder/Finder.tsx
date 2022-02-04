import React from 'react';
import './Finder.scss';

interface IFinderProps {
    handleFilter: (phrase: string) => void;
}

export const Finder = ({ handleFilter }: IFinderProps) => {
    return (
        <div className="issues-finder__container">
            <input type="text"
                   className="issues-finder__input"
                   onChange={(e) => handleFilter(e.target.value)}
                   placeholder="Search by issue number or title"
            />
        </div>
    )
}