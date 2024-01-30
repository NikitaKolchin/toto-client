import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppSelector } from 'shared/store/config';

const GoToStakes: FC = () => {
    const { isAuth, user } = useAppSelector((state) => state.user);

    const navigate = useNavigate();
    return (
        <>
            {' '}
            {isAuth && user.isActivated && user.isAllowed && (
                <Button size="large" onClick={() => navigate('/stakes')}>
                    Переходим к ставкам!!!
                </Button>
            )}
        </>
    );
};

export { GoToStakes };
