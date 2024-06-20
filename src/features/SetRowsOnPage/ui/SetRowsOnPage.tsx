import { TextField } from '@mui/material';
import { useAppSelector, useAppDispatch } from 'shared/store/config';
import { setRowsOnPage } from 'entities/Theme';
const SetRowsOnPage = () => {
    const theme = useAppSelector((state) => state.theme);

    const dispatch = useAppDispatch();
    return (
        <TextField
            type="number"
            label="Controlled"
            value={theme.rowsOnPage}
            onChange={(event) => dispatch(setRowsOnPage(+event.target.value))}
        />
    );
};

export { SetRowsOnPage };
