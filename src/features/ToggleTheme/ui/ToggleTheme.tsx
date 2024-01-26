import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useAppSelector, useAppDispatch } from 'shared/store/config';
import { toggleTheme } from 'entities/Theme';
const ToggleTheme = () => {
    const theme = useAppSelector((state) => state.theme);

    const dispatch = useAppDispatch();
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Switch
                        checked={theme.darkTheme}
                        onChange={() => dispatch(toggleTheme())}
                    />
                }
                label="переключить тему"
            />
        </FormGroup>
    );
};

export { ToggleTheme };
