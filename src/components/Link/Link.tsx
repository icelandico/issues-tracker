import React, { ReactChild } from 'react';
import './Link.scss';

interface ILinkProps {
    href: string;
    children: ReactChild;
}

const Link = ({ href, children }: ILinkProps) => {

    const clickHandler = (event: any) => {
        event.preventDefault();
        window.history.pushState({}, "", href);

        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return (
        <a className="issue-link" href={href} onClick={(e) => clickHandler(e)}>
            {children}
        </a>
    );
};

export default Link;