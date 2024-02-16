import { Switch, FormControlLabel, FormGroup } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { intersection } from '../../lib/helpers';

type PropsTypes = {
    allValues: string[];
    assignedValues: string[];
    callback: (values: string[]) => void;
};

const ToggleList: FC<PropsTypes> = ({
    allValues,
    assignedValues,
    callback,
}) => {
    const [checked, setChecked] = useState<readonly string[]>([]);

    useEffect(() => {
        setChecked(intersection(assignedValues, allValues));
    }, [allValues, assignedValues]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        callback(newChecked);
    };

    return (
        <FormGroup>
            {allValues.map((value) => (
                <FormControlLabel
                    key={value}
                    control={
                        <Switch
                            defaultChecked={
                                intersection(assignedValues, [value]).length > 0
                            }
                            value={value}
                            onChange={handleChange}
                        />
                    }
                    label={value}
                />
            ))}
        </FormGroup>
    );
};

export { ToggleList };
