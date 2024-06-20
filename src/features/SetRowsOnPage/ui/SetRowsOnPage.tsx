import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from 'shared/store/config';
import { setRowsOnPage } from 'entities/Theme';
const SetRowsOnPage = () => {
    const theme = useAppSelector((state) => state.theme);

    const dispatch = useAppDispatch();
    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setRowsOnPage(+event.target.value));
    };
    return (
        <FormControl>
            <InputLabel id="simple-select-label">Строк на странице</InputLabel>
            <Select
                size="small"
                sx={{ minWidth: 100 }}
                labelId="simple-select-label"
                value={theme.rowsOnPage.toString()}
                label="Строк на странице"
                onChange={handleChange}
            >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
            </Select>
        </FormControl>
    );
};

export { SetRowsOnPage };
