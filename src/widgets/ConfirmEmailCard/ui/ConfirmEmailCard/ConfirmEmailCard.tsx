import { FC } from 'react';
import { CardActions, Card, CardContent, CardHeader } from '@mui/material';
import { ConfirmEmail } from 'features/ConfirmEmail';
import { UserState } from 'entities/User';
import { GoToStakes } from 'features/GoToStakes';

const ConfirmEmailCard: FC<UserState> = (user) => {
    return (
        <Card>
            <CardHeader title="Подтвердить email" />
            <CardContent>
                <ConfirmEmail {...user} />
            </CardContent>
            <CardActions>
                <GoToStakes />
            </CardActions>
        </Card>
    );
};

export { ConfirmEmailCard };
