import { FC } from 'react';
import { CardActions, Card, CardContent, CardHeader } from '@mui/material';
import { ConfirmEmail } from 'features/ConfirmEmail';
import { User } from 'entities/User';
import { GoToStakes } from 'features/GoToStakes';

const ConfirmEmailCard: FC<User> = (user) => {
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
