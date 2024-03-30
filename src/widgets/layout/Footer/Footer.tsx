import { Paper, Typography, useTheme } from '@mui/material';

type Props = object;

const Footer = (props: Props) => {
    const theme = useTheme();
    return (
        <Paper
            sx={{
                marginTop: 'calc(10% + 60px)',
                width: '100%',
                position: 'fixed',
                zIndex: 2,
                bottom: 0,
            }}
            component="footer"
            square
            variant="outlined"
        >
            <Typography
                variant="body2"
                color={theme.palette.text.primary}
                align="center"
                {...props}
            >
                {'Copyright © НК '}

                {new Date().getFullYear()}
            </Typography>
        </Paper>
    );
};

export default Footer;
