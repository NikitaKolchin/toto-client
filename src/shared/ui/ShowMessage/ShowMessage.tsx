import {
    Alert,
    AlertColor,
    Grow,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC, useEffect, useState } from 'react';
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
    useEffect(() => {
        setAlertVisibility(true);
    }, [message, error]);

    const inlineStyle = {
        width: '100%',
        marginTop: '8px',
        marginBottom: '8px',
        '& .MuiAlert-message': {
            wordBreak: 'break-word',
        },
    };
    if (!alertVisibility) {
        return <></>;
    }
    if (message) {
        return (
            <Grow in={!!message}>
                <Alert
                    severity={severity}
                    sx={absolute ? absoluteStyle : inlineStyle}
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
                    sx={absolute ? absoluteStyle : inlineStyle}
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
