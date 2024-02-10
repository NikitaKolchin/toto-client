import { type MRT_RowData, type MRT_TableOptions } from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

export const getDefaultMRTOptions = <TData extends MRT_RowData>(): Partial<
    MRT_TableOptions<TData>
> => ({
    muiTableHeadCellProps: {
        sx: { fontSize: '1.1rem' },
    },
    paginationDisplayMode: 'pages',
    localization: MRT_Localization_RU,
    editDisplayMode: 'modal',
    enableEditing: true,
});
