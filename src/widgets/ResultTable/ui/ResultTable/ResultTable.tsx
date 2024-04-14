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
import { Match } from 'shared/api';

const ResultTable: FC = () => {
    const { data: respondedMatches, isLoading } = useGetAllMatchesQuery();
    const { data: result } = useGetResultQuery();

    const matches: Match[] = useMemo(
        () => respondedMatches || [],
        [respondedMatches],
    );
    const userResults: Match[] = result || [];
    const columns = useMemo<MRT_ColumnDef<Match>[]>(
        () =>
            matches.map((match) => ({
                accessorKey: match.matchNo.toString(),
                header: match.home.value + '-' + match.away.value,
            })),
        [matches],
    );
    const defaultMRTOptions = getDefaultMRTOptions<Match>();
    const table = useMaterialReactTable({
        ...defaultMRTOptions,
        enableEditing: false,
        columns,
        data: userResults,
        state: {
            isLoading,
        },
        autoResetPageIndex: false,
        getRowId: (row) => row.id?.toString(),
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
