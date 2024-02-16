import {
    Paper,
    List,
    ListItemButton,
    ListItemIcon,
    Checkbox,
    ListItemText,
    Grid,
    Button,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { intersection, not } from '../../lib/helpers';

type PropsTypes = {
    allValues: string[];
    assignedValues: string[];
    callback: (values: string[]) => void;
};

const TransferList: FC<PropsTypes> = ({
    allValues,
    assignedValues,
    callback,
}) => {
    const [checked, setChecked] = useState<readonly string[]>([]);
    const [left, setLeft] = useState<readonly string[]>([]);
    const [right, setRight] = useState<readonly string[]>([]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    useEffect(() => {
        setLeft(not(allValues, assignedValues));
        setRight(intersection(assignedValues, allValues));
    }, [allValues, assignedValues]);

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
        callback(rightValues);
    };

    const handleCheckedRight = () => {
        const rightValues = right.concat(leftChecked);
        setRight(rightValues);
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
        callback(rightValues);
    };

    const handleCheckedLeft = () => {
        const rightValues = not(right, rightChecked);
        setLeft(left.concat(rightChecked));
        setRight(rightValues);
        setChecked(not(checked, rightChecked));
        callback(rightValues);
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
        callback([]);
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
};

export { TransferList };
