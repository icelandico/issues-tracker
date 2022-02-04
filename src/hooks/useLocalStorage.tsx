import React, { useState } from 'react';

interface ILocalStorageValues {
    number: number;
    score: number;
}

export const useLocalStorage = (itemNumber: number) => {
    const ISSUES_STORE_KEY = 'issuesScore';
    const defaultIssue = { number: itemNumber, score: 0 };

    const [storedCollection, setStoredCollection] = useState([]);
    const [storedValue, setStoredValue] = useState(() => {
        const item = window.localStorage.getItem(ISSUES_STORE_KEY);
        if (item) {
            const itemsArray = JSON.parse(item);
            setStoredCollection(itemsArray);
            const selectedIssue = itemsArray.find((el: ILocalStorageValues) => el.number === itemNumber);
            return selectedIssue ? {...selectedIssue, number: parseInt(selectedIssue.number) } : defaultIssue;
        }
        return defaultIssue;
    });

    const setValue = (value: number) => {
        const issueToStore = { number: itemNumber, score: value };
        setStoredValue(issueToStore);
        const itemIndex = storedCollection.findIndex((el: ILocalStorageValues) => el.number === itemNumber);

        if (itemIndex !== -1) {
            const collectionCopy: ILocalStorageValues[] = [...storedCollection];
            collectionCopy[itemIndex] = issueToStore;
            window.localStorage.setItem(ISSUES_STORE_KEY, JSON.stringify(collectionCopy));
            return;
        }
        const newCollection = (storedCollection as ILocalStorageValues[]).concat(issueToStore);
        window.localStorage.setItem(ISSUES_STORE_KEY, JSON.stringify(newCollection));
    };

    return [storedValue, setValue];
}