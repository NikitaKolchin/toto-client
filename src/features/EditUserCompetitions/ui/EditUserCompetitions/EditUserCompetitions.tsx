import { useMediaQuery, useTheme } from '@mui/material';
import { useGetAllCompetitionsQuery } from 'entities/Competition';
import { MRT_Column, MRT_Row } from 'material-react-table';
import { FC, useMemo } from 'react';
import { User } from 'shared/api';
import { Loading } from 'shared/ui/Loading';
import { ToggleList } from 'shared/ui/ToggleList';
import { TransferList } from 'shared/ui/TransferList';

type PropTypes = {
    column: MRT_Column<User, unknown>;
    row: MRT_Row<User>;
};

const EditUserCompetitions: FC<PropTypes> = ({ column, row }) => {
    const { data: respondedCompetitions, isLoading } =
        useGetAllCompetitionsQuery();
    const theme = useTheme();
    const matchThen600 = useMediaQuery(theme.breakpoints.up('sm'));
    const allCompetitionsValues = useMemo(
        () =>
            respondedCompetitions?.map((competition) => competition.value) ||
            [],
        [respondedCompetitions],
    );
    const assignedCompetitionsValues: string[] = useMemo(
        () => row.original.competitions.map((role) => role.value),
        [row.original.competitions],
    );

    const saveCompetitionsToCache = (values: string[]) => {
        const currentCompetitions = values.map(
            (competitionValue) =>
                respondedCompetitions?.find(
                    (c) => c.value === competitionValue,
                    null,
                ),
        );
        row._valuesCache[column.id] = currentCompetitions;
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
export { EditUserCompetitions };
