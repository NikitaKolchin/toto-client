import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
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

type Props = object;

const Main: FC = (props: Props) => {
    const { isLoading, error, isAuth, user } = useAppSelector(
        (state) => state.auth,
    );
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        console.error('случилось страшное: ', error);
    }

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
                    Ты в Тото! &#127881;
                </Typography>
                <Typography variant="h5" color="text.primary" component="p">
                    Ниже отражаются статусы участника Тото!
                </Typography>
                {isAuth && user.isActivated && user.isAllowed && (
                    <Button size="large" onClick={() => navigate('stakes')}>
                        Переходим к ставкам!!!
                    </Button>
                )}
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
                                <Button
                                    size="small"
                                    onClick={(e) => {
                                        window.location.href =
                                            'mailto:kolchin.nv@gmail.com';
                                        e.preventDefault();
                                    }}
                                >
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
