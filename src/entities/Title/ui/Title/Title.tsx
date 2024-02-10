import { Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

const Title: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Typography
            mt={5}
            component="h1"
            variant="h3"
            color="text.primary"
            gutterBottom
        >
            {children}
        </Typography>
    );
};

export { Title };
