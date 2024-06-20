import { TextField } from '@mui/material';
import { useAppSelector, useAppDispatch } from 'shared/store/config';
import { setRowsOnPage } from 'entities/Theme';
const SetRowsOnPage = () => {
    const theme = useAppSelector((state) => state.theme);

    const dispatch = useAppDispatch();
    const MIN = 5;
    const MAX = 100;
    return (
        <TextField
            sx={{ minWidth: 100 }}
            size="small"
            type="number"
            label="Строк на странице"
            InputProps={{ inputProps: { min: MIN, max: MAX } }}
            value={theme.rowsOnPage}
            onChange={(event) => {
                if (+event.target.value < MIN) {
                    dispatch(setRowsOnPage(MIN));
                } else if (+event.target.value > MAX) {
                    dispatch(setRowsOnPage(MAX));
                } else {
                    dispatch(setRowsOnPage(+event.target.value));
                }
            }}
        />
    );
};

export { SetRowsOnPage };
