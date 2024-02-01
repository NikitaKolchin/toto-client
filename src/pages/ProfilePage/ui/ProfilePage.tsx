import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'shared/store/config';
import { Container, Box, Typography, Grid } from '@mui/material';
import { UserDataCard } from 'widgets/UserDataCard';
import { ConfirmEmailCard } from 'widgets/ConfirmEmailCard';

const ProfileScreen: FC = () => {
    const { user, activationCompleted } = useAppSelector((state) => state.user);

    return (
        <Container>
            <Box
                sx={{
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
            >
                <Typography
                    mt={6}
                    component="h2"
                    variant="h3"
                    color="text.primary"
                    gutterBottom
                >
                    профиль пользователя
                </Typography>
            </Box>
            <Grid container spacing={5} alignItems="flex-end" mt={2}>
                <Grid item xs={12} sm={6} md={6}>
                    <UserDataCard {...user} />
                </Grid>
                {(activationCompleted || !user.isActivated) && (
                    <Grid item xs={12} sm={6} md={6}>
                        <ConfirmEmailCard {...user} />
                    </Grid>
                )}
            </Grid>
            <Link to={'../admin'}>TEST admin</Link>
        </Container>
    );
};

export default ProfileScreen;
