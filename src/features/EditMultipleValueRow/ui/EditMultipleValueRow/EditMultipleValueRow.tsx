import { useMediaQuery, useTheme } from '@mui/material';
import { MRT_Column, MRT_Row, MRT_RowData } from 'material-react-table';
import { useMemo } from 'react';
import { Loading } from 'shared/ui/Loading';
import { ToggleList } from 'shared/ui/ToggleList';
import { TransferList } from 'shared/ui/TransferList';

type PropTypes<T extends MRT_RowData> = {
    column: MRT_Column<T, unknown>;
    row: MRT_Row<T>;
    data: WithValue[] | undefined;
    isLoading: boolean;
};

type WithValue = {
    value: string;
};

const EditMultipleValueRow = <T extends MRT_RowData>({
    column,
    row,
    data,
    isLoading,
}: PropTypes<T>) => {
    const theme = useTheme();
    const matchThen600 = useMediaQuery(theme.breakpoints.up('sm'));
    const allCompetitionsValues = useMemo(
        () => data?.map((competition) => competition.value) || [],
        [data],
    );
    const assignedCompetitionsValues: string[] = useMemo(
        () =>
            row.original[column.id].map(
                (competition: WithValue) => competition.value,
            ),
        [column.id, row.original],
    );

    const saveCompetitionsToCache = (values: string[]) => {
        const currentCompetitions = values.map(
            (competitionValue) =>
                data?.find((c) => c.value === competitionValue, null),
        );
        row._valuesCache[column.id as T['id']] = currentCompetitions;
    };

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            {matchThen600 ? (
                <TransferList
                    allValues={allCompetitionsValues}
                    assignedValues={assignedCompetitionsValues}
                    callback={saveCompetitionsToCache}
                />
            ) : (
                <ToggleList
                    allValues={allCompetitionsValues}
                    assignedValues={assignedCompetitionsValues}
                    callback={saveCompetitionsToCache}
                />
            )}
        </>
    );
};
export { EditMultipleValueRow };
