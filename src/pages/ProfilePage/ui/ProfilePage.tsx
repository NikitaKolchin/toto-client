import { FC } from 'react';
import { useAppSelector } from 'shared/store/config';
import { Container, Box, Grid } from '@mui/material';
import { UserDataCard } from 'widgets/UserDataCard';
import { ConfirmEmailCard } from 'widgets/ConfirmEmailCard';
import { Title } from 'entities/Title';
import { Roles } from 'shared/api';
import { AdminCard } from 'widgets/AdminCard';

const ProfileScreen: FC = () => {
    const { ...user } = useAppSelector((state) => state.user);
    const isAdmin = user.roles.some((role) => role.value === Roles.ADMIN);
    const confirmEmailNotDisplayed =
        user.activationCompleted || !user.isActivated;
    return (
        <Container sx={{ mb: 5 }}>
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
                    sm={confirmEmailNotDisplayed || isAdmin ? 6 : 12}
                    md={confirmEmailNotDisplayed || isAdmin ? 6 : 12}
                >
                    <UserDataCard {...user} />
                </Grid>
                {confirmEmailNotDisplayed && (
                    <Grid item xs={12} sm={6} md={6}>
                        <ConfirmEmailCard {...user} />
                    </Grid>
                )}
                {isAdmin && (
                    <Grid item xs={12} sm={6} md={6}>
                        <AdminCard />
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default ProfileScreen;
