import { Alert, AlertColor, Grow } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { MessageResponse } from '../../types/MessageResponse';

type Props = {
    message?: string;
    severity?: AlertColor;
    error: FetchBaseQueryError | SerializedError | undefined;
};

const ShowMessage: FC<Props> = ({ message, severity, error }) => {
    if (message) {
        return (
            <Grow in={!!message}>
                <Alert severity={severity}>{message}</Alert>
            </Grow>
        );
    }
    if (error) {
        return (
            <Grow in={!!error}>
                <Alert severity={'error'}>
                    {'data' in error
                        ? (error.data as MessageResponse).message
                        : ''}
                </Alert>
            </Grow>
        );
    }
    return <></>;
};

export { ShowMessage };
