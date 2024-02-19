import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppSelector } from 'shared/store/config';
import { AppRoutes } from 'shared/const/routes';

const GoToStakes: FC = () => {
    const { isAuth, isAllowed, isActivated } = useAppSelector(
        (state) => state.user,
    );

    const navigate = useNavigate();
    return (
        <>
            {' '}
            {isAuth && isActivated && isAllowed && (
                <Button size="large" onClick={() => navigate(AppRoutes.STAKES)}>
                    Переходим к ставкам!!!
                </Button>
            )}
        </>
    );
};

export { GoToStakes };
