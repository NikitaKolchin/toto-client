import { FC } from 'react';
import { useMemo } from 'react';
import {
    MRT_Cell,
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';

import { useGetAllMatchesForResultQuery } from 'entities/Match';
import { useGetResultQuery } from 'entities/User';
import { getDefaultMRTOptions } from 'shared/DefaultTable';
import { Result } from 'shared/api';
import dayjs from 'dayjs';
import { Box, Typography } from '@mui/material';

const formatDate = (date: string) => {
    return dayjs(date).format('DD.MM.YYYY HH:mm');
};

const ResultTable: FC = () => {
    const { data: respondedMatches, isLoading } =
        useGetAllMatchesForResultQuery();
    const { data: result } = useGetResultQuery();
    const additionalHeaders: MRT_ColumnDef<Result>[] = useMemo(
        () => [
            {
                accessorKey: 'alias',
                header: 'имя',
                muiTableBodyCellProps: {
                    sx: {
                        textAlign: 'left',
                        fontWeight: 700,
                    },
                },
            },
            {
                accessorKey: 'userPrize',
                header: 'выиграно, ₽',
            },
            {
                accessorKey: 'pointsSum',
                header: 'очки',
            },
        ],
        [],
    );
    const headers: MRT_ColumnDef<Result>[] = useMemo(
        () => [
            ...additionalHeaders,
            ...(respondedMatches || []).map((match) => ({
                accessorKey: `${match.matchNo.toString()}`,
                header: '',
                Header: () => (
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                    >
                        <Typography fontWeight={700}>
                            {match.home?.value && match.away?.value && (
                                <>{`${match.home?.value} - ${match.away?.value}`}</>
                            )}
                        </Typography>
                        {match.stat?.homeStakes !== undefined ? (
                            <>
                                {' '}
                                <Typography>
                                    {match.homeScore !== null &&
                                        match.awayScore !== null && (
                                            <b>{` ${match.homeScore} - ${match.awayScore} `}</b>
                                        )}
                                    {` (🏆 ${match.prize} ₽)`}
                                </Typography>
                                <Typography>
                                    {match.stat?.homeStakes !== undefined &&
                                        match.stat?.drawStakes !== undefined &&
                                        match.stat?.awayStakes !==
                                            undefined && (
                                            <>
                                                {' '}
                                                {`📈${match.stat?.homeStakes} - ${match.stat?.drawStakes} - ${match.stat?.awayStakes}`}
                                            </>
                                        )}
                                    {` (🎰 ${match.jackpot} ₽)`}
                                </Typography>
                            </>
                        ) : match.prize !== null && match.jackpot !== null ? (
                            <Typography>{` (🏆 ${match.prize} ₽ ;🎰 ${match.jackpot} ₽ )`}</Typography>
                        ) : (
                            <></>
                        )}
                        <Typography>📅{formatDate(match.date)}</Typography>
                    </Box>
                ),
                Cell: ({ cell }: { cell: MRT_Cell<Result, unknown> }) =>
                    cell.getValue<Result[number]>()?.stake && (
                        <>
                            {cell.getValue<Result[number]>()?.stake}{' '}
                            {cell.getValue<Result[number]>()?.points ? (
                                <>
                                    {' '}
                                    {`(${cell.getValue<Result[number]>()
                                        ?.points}`}
                                    {cell.getValue<Result[number]>()?.money ? (
                                        <>{`; ${cell.getValue<Result[number]>()
                                            ?.money}₽)`}</>
                                    ) : (
                                        <>{')'}</>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    ),
            })),
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
            },
        },
        muiTableBodyCellProps: ({ cell }) => ({
            sx: {
                textAlign: 'center',
                backgroundColor:
                    cell.getValue<Result[number]>()?.color ?? 'transparent',
            },
        }),
        displayColumnDefOptions: {
            'mrt-row-actions': {
                header: '',
            },
        },
    });
    return <MaterialReactTable table={table} />;
};

export { ResultTable };
