import { useMediaQuery, useTheme } from '@mui/material';
import { useGetAllRolesQuery } from 'entities/User';
import { MRT_Column, MRT_Row } from 'material-react-table';
import { FC, useMemo } from 'react';
import { User } from 'shared/api';
import { Loading } from 'shared/ui/Loading';
import { ToggleList } from 'shared/ui/ToggleList';
import { TransferList } from 'shared/ui/TransferList';

type PropTypes = {
    column: MRT_Column<User, unknown>;
    row: MRT_Row<User>;
};

const EditUserRoles: FC<PropTypes> = ({ column, row }) => {
    const { data: respondedRoles, isLoading } = useGetAllRolesQuery();
    const theme = useTheme();
    const matchThen600 = useMediaQuery(theme.breakpoints.up('sm'));
    const allRolesValues = useMemo(
        () => respondedRoles?.map((role) => role.value) || [],
        [respondedRoles],
    );
    const assignedRolesValues: string[] = useMemo(
        () => row.original.roles.map((role) => role.value),
        [row.original.roles],
    );

    const saveRolesToCache = (values: string[]) => {
        const currentRoles = values.map(
            (roleValue) =>
                respondedRoles?.find((r) => r.value === roleValue) || null,
        );
        row._valuesCache[column.id] = currentRoles;
    };

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            {matchThen600 ? (
                <TransferList
                    allValues={allRolesValues}
                    assignedValues={assignedRolesValues}
                    callback={saveRolesToCache}
                />
            ) : (
                <ToggleList
                    allValues={allRolesValues}
                    assignedValues={assignedRolesValues}
                    callback={saveRolesToCache}
                />
            )}
        </>
    );
};
export { EditUserRoles };
