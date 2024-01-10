import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Grid,
    Paper,
} from '@mui/material';

type Props = object;

const Main: FC = (props: Props) => {
    const { isLoading, error, isAuth, user } = useAppSelector(
        (state) => state.auth,
    );

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        console.error('случилось страшное: ', error);
    }

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                    <Card>
                        <CardHeader title="Авторизация" />
                        <CardContent>
                            {' '}
                            {isAuth
                                ? `Пользователь авторизован ${user.email}`
                                : 'АВТОРИЗУЙТЕСЬ'}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Paper>
                        {user.isActivated
                            ? 'Аккаунт подтвержден по почте'
                            : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Paper>
                        {user.isAllowed
                            ? 'Участие подтверждено'
                            : 'Необходимо подтверждение участия'}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Main;
