import { useEffect, useState } from 'react';
import {
    Button,
    Checkbox,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
} from '@mui/material';
import { User, useGetAllRolesQuery } from 'entities/User';
import { MRT_Column, MRT_Row } from 'material-react-table';
import { FC, useMemo } from 'react';
import { Loading } from 'shared/ui/Loading';

type PropTypes = {
    column: MRT_Column<User, unknown>;
    row: MRT_Row<User>;
};

function not(a: readonly string[], b: readonly string[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly string[], b: readonly string[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

const EditUserRoles: FC<PropTypes> = ({ column, row }) => {
    const { data: respondedRoles, isLoading } = useGetAllRolesQuery();

    const allRolesValues = useMemo(
        () => respondedRoles?.map((role) => role.value) || [],
        [respondedRoles],
    );
    const assignedRolesValues: string[] = useMemo(
        () => row.original.roles.map((role) => role.value),
        [row.original.roles],
    );

    const saveRolesToCache = (roleValues: string[]) => {
        const currentRoles = roleValues.map(
            (roleValue) =>
                respondedRoles?.find((r) => r.value === roleValue) || null,
        );
        row._valuesCache[column.id] = currentRoles;
    };

    const [checked, setChecked] = useState<readonly string[]>([]);
    const [left, setLeft] = useState<readonly string[]>([]);
    const [right, setRight] = useState<readonly string[]>([]);
    useEffect(() => {
        setLeft(not(allRolesValues, assignedRolesValues));
        setRight(intersection(assignedRolesValues, allRolesValues));
    }, [allRolesValues, assignedRolesValues]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        const rightValues = right.concat(left);
        setRight(rightValues);
        setLeft([]);
        saveRolesToCache(rightValues);
    };

    const handleCheckedRight = () => {
        const rightValues = right.concat(leftChecked);
        setRight(rightValues);
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
        saveRolesToCache(rightValues);
    };

    const handleCheckedLeft = () => {
        const rightValues = not(right, rightChecked);
        setLeft(left.concat(rightChecked));
        setRight(rightValues);
        setChecked(not(checked, rightChecked));
        saveRolesToCache(rightValues);
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
        saveRolesToCache([]);
    };

    const customList = (items: readonly string[]) => (
        <Paper sx={{ width: 140, height: 180, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value: string) => {
                    return (
                        <ListItemButton
                            key={value}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': value,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={value} primary={value} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Paper>
    );

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item>{customList(left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
        </Grid>
    );

    //     const { data: respondedRoles } = useGetAllRolesQuery();

    //     const allRoles: Role[] = useMemo(
    //         () => respondedRoles || [],
    //         [respondedRoles],
    //     );
    //     return (
    //         <select
    //             onChange={(event) => {
    //                 const { value: roleValue } = event.currentTarget;
    //                 const role = allRoles.find((role) => role.value === roleValue);
    //                 row._valuesCache[column.id] = [role];
    //                 // console.log('row._valuesCache.roles', row._valuesCache.roles);
    //             }}
    //         >
    //             {allRoles
    //                 .filter(
    //                     (existingRole) =>
    //                         !row.original.roles.some(
    //                             (assignedRole) =>
    //                                 assignedRole.value === existingRole.value,
    //                         ),
    //                 )
    //                 .map((role) => (
    //                     <option key={role.value}>{role.value}</option>
    //                 ))}
    //         </select>
    //     );
    // };
};
export { EditUserRoles };
