import * as React from 'react';
import HomeTabView from './view';
import {APODRes} from '../../utils/DTO';

export default () => {
    const [apod, setApod] = React.useState<APODRes | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=7M2rC2BAr9oZguJacm8013LjBNOACrLCk6a7J39G');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data: APODRes = await response.json();
                setApod(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return <HomeTabView data={apod} />;
};
