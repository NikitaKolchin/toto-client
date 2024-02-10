import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'shared/store/config';
import { Container, Box, Grid } from '@mui/material';
import { UserDataCard } from 'widgets/UserDataCard';
import { ConfirmEmailCard } from 'widgets/ConfirmEmailCard';
import { Title } from 'entities/Title';

const ProfileScreen: FC = () => {
    const { ...user } = useAppSelector((state) => state.user);
    const confirmEmailNotDisplayed =
        user.activationCompleted || !user.isActivated;
    return (
        <Container>
            <Box
                sx={{
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
            >
                <Title>профиль пользователя</Title>
            </Box>
            <Grid container spacing={5} alignItems="flex-end" mt={2}>
                <Grid
                    item
                    xs={12}
                    sm={confirmEmailNotDisplayed ? 6 : 12}
                    md={confirmEmailNotDisplayed ? 6 : 12}
                >
                    <UserDataCard {...user} />
                </Grid>
                {confirmEmailNotDisplayed && (
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
