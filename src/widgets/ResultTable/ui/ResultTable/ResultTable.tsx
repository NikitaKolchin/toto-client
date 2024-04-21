import { FC } from 'react';
import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';

import { useGetAllMatchesQuery } from 'entities/Match';
import { useGetResultQuery } from 'entities/User';

import { getDefaultMRTOptions } from 'shared/DefaultTable';
import { Result } from 'shared/api';

const ResultTable: FC = () => {
    const { data: respondedMatches, isLoading } = useGetAllMatchesQuery();
    const { data: result } = useGetResultQuery();

    const headers: MRT_ColumnDef<Result>[] = useMemo(
        () =>
            (respondedMatches || [])
                .map((match) => ({
                    accessorKey: match.matchNo.toString(),
                    header: match.home.value + '-' + match.away.value,
                }))
                .concat({
                    accessorKey: 'alias',
                    header: 'Alias',
                }),
        [respondedMatches],
    );
    const userResults = result || [];
    const columns = useMemo<MRT_ColumnDef<Result>[]>(() => headers, [headers]);
    const defaultMRTOptions = getDefaultMRTOptions<Result>();
    const table = useMaterialReactTable({
        ...defaultMRTOptions,
        enableEditing: false,
        columns,
        data: userResults,
        state: {
            isLoading,
        },
        autoResetPageIndex: false,
        getRowId: (row) => row.alias,
        initialState: {
            columnVisibility: {
                id: false,
                price: false,
                jackpot: false,
            },
        },
        displayColumnDefOptions: {
            'mrt-row-actions': {
                header: '',
            },
        },
    });
    return <MaterialReactTable table={table} />;
};

export { ResultTable };
