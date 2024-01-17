import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../store';
import { toggleTheme } from '../../../store/config/themeSlice';
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

export default ToggleTheme;
