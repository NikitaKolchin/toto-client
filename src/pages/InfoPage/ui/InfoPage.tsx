import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

type Props = object;

const InfoPage = (props: Props) => {
    const [error, setError] = useState(false);

    const onThrow = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return <Button onClick={onThrow}>{'throw error'}</Button>;
};

export default InfoPage;
