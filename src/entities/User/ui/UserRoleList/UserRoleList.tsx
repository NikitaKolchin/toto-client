import { Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { Role } from '../../../../shared/api/models/Role';

type Props = {
    roles: Role[];
};

const UserRoleList: FC<Props> = ({ roles }) => {
    console.log(roles);
    return (
        <Paper>
            назначенные роли:{' '}
            {roles?.map((role) => (
                <Typography key={role.id} component="span">
                    {role.value}
                </Typography>
            ))}
        </Paper>
    );
};
export { UserRoleList };
