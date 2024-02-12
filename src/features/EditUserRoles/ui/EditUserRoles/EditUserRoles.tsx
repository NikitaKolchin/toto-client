import { Role, User, useGetAllRolesQuery } from 'entities/User';
import { MRT_Column, MRT_Row } from 'material-react-table';
import { FC, useMemo } from 'react';

type PropTypes = {
    column: MRT_Column<User, unknown>;
    row: MRT_Row<User>;
};

const EditUserRoles: FC<PropTypes> = ({ column, row }) => {
    const { data: respondedRoles } = useGetAllRolesQuery();

    const allRoles: Role[] = useMemo(
        () => respondedRoles || [],
        [respondedRoles],
    );
    return (
        <select
            onChange={(event) => {
                const { value: roleValue } = event.currentTarget;
                const role = allRoles.find((role) => role.value === roleValue);
                row._valuesCache[column.id] = [role];
                // console.log('row._valuesCache.roles', row._valuesCache.roles);
            }}
        >
            {allRoles
                .filter(
                    (existingRole) =>
                        !row.original.roles.some(
                            (assignedRole) =>
                                assignedRole.value === existingRole.value,
                        ),
                )
                .map((role) => (
                    <option key={role.value}>{role.value}</option>
                ))}
        </select>
    );
};

export { EditUserRoles };
