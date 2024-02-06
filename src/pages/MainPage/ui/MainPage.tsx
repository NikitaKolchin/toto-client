import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import { useAppSelector } from 'shared/store/config';
import { GoToStakes } from 'features/GoToStakes';

const Main: FC = () => {
    const { isAuth, ...user } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const handleAllowQuery = (e: React.MouseEvent<HTMLElement>) => {
        window.location.href = 'mailto:kolchin.nv@gmail.com';
        e.preventDefault();
    };
    return (
        <Container>
            <Box
                sx={{
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
            >
                <Typography
                    mt={5}
                    component="h2"
                    variant="h3"
                    color="text.primary"
                    gutterBottom
                >
                    Ты в Тото! &#127881;
                </Typography>
                <Typography variant="h5" color="text.primary" component="p">
                    Ниже отражаются статусы участника Тото!
                </Typography>
                <GoToStakes />
            </Box>

            <Grid container spacing={5} alignItems="flex-end" mt={2}>
                <Grid item xs={12} sm={4} md={4}>
                    <Card>
                        <CardHeader title="Авторизация" />
                        <CardContent>
                            {' '}
                            {isAuth
                                ? `Привет, ${user.alias}`
                                : 'Необходимо авторизоваться'}
                        </CardContent>
                        <CardActions>
                            {isAuth ? (
                                ''
                            ) : (
                                <Button
                                    size="small"
                                    onClick={() => navigate('login')}
                                >
                                    Войти
                                </Button>
                            )}
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Card>
                        <CardHeader title="Активация" />
                        <CardContent>
                            {' '}
                            {user.isActivated
                                ? `Аккаунт подтвержден по почте ${user.email}`
                                : 'Необходимо подтвердить почту'}
                        </CardContent>
                        <CardActions>
                            {user.isActivated ? (
                                ''
                            ) : (
                                <Button
                                    size="small"
                                    onClick={() => navigate('profile')}
                                >
                                    Активировать
                                </Button>
                            )}
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Card>
                        <CardHeader title="Допуск" />
                        <CardContent>
                            {user.isAllowed
                                ? `Допуск получен, ${user.firstName}`
                                : 'Необходимо получить допуск'}
                        </CardContent>
                        <CardActions>
                            {user.isAllowed ? (
                                ''
                            ) : (
                                <Button size="small" onClick={handleAllowQuery}>
                                    Обратиться за допуском
                                </Button>
                            )}
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Main;
