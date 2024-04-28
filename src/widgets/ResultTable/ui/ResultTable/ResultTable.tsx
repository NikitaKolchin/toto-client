import { FC } from 'react';
import { useMemo } from 'react';
import {
    MRT_Cell,
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';

import { useGetAllMatchesQuery } from 'entities/Match';
import { useGetResultQuery } from 'entities/User';
import dayjs from 'dayjs';
import { getDefaultMRTOptions } from 'shared/DefaultTable';
import { Match, Result } from 'shared/api';

const formatDate = (date: string) => {
    return dayjs(date).format('DD.MM.YYYY HH:mm');
};

const ResultTable: FC = () => {
    const { data: respondedMatches, isLoading } = useGetAllMatchesQuery();
    const { data: result } = useGetResultQuery();
    const additionalHeaders: MRT_ColumnDef<Result>[] = useMemo(
        () => [
            {
                accessorKey: 'alias',
                header: 'Alias',
            },
        ],
        [],
    );
    const headers: MRT_ColumnDef<Result>[] = useMemo(
        () => [
            ...(respondedMatches || ([] as Match[])).map((match) => ({
                accessorKey: `${match.matchNo.toString()}`,
                header: `${match.home?.value} - ${match.away?.value}
                    ${match.homeScore} - ${match.awayScore} (${
                        match.jackpot
                    }) (${match.prize}) (${formatDate(match.date)})`,
                Cell: ({ cell }: { cell: MRT_Cell<Result, unknown> }) => (
                    <>
                        {cell.getValue<Result[number]>()?.stake}{' '}
                        {cell.getValue<Result[number]>()?.money}{' '}
                        {cell.getValue<Result[number]>()?.points}
                    </>
                ),
            })),
            ...additionalHeaders,
        ],
        [additionalHeaders, respondedMatches],
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
                prize: false,
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
