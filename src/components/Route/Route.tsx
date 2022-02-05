import React, { ReactElement, useEffect, useState } from 'react';

interface  IRouteProps {
    path: string;
    children: ReactElement;
}

export const Route = ({ path, children }: IRouteProps) => {
    const [currentPath, setCurrentPath] = useState(window.location.href);

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        }

        window.addEventListener('popstate', onLocationChange);
        return () => {
            window.removeEventListener('popstate', onLocationChange)
        };
    }, [])

    return currentPath === path ? children : null
}
