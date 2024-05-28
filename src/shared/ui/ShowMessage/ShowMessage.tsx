import {
    Alert,
    AlertColor,
    Grow,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC, useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { MessageResponse } from '../../api/types/MessageResponse';

type Props = {
    message?: string;
    severity?: AlertColor;
    error?: FetchBaseQueryError | SerializedError | undefined;
    absolute?: boolean;
};

const ShowMessage: FC<Props> = ({
    message,
    severity,
    error,
    absolute = false,
}) => {
    const theme = useTheme();
    const matchThen600 = useMediaQuery(theme.breakpoints.up('sm'));
    const [alertVisibility, setAlertVisibility] = useState(true);
    const absoluteStyle = absolute
        ? {
              position: 'absolute',
              zIndex: 9999,
              left: matchThen600 ? '50%' : '10%',
          }
        : {};
    if (!alertVisibility) {
        return <></>;
    }
    if (message) {
        return (
            <Grow in={!!message}>
                <Alert
                    severity={severity}
                    sx={absoluteStyle}
                    onClose={() => setAlertVisibility(false)}
                >
                    {message}
                </Alert>
            </Grow>
        );
    }
    if (error) {
        return (
            <Grow in={!!error}>
                <Alert
                    severity={'error'}
                    sx={absoluteStyle}
                    onClose={() => setAlertVisibility(false)}
                >
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
