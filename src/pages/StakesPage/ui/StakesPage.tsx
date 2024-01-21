import { ChangeEvent, useState } from 'react';
import {
    useGetAllCompetitionsQuery,
    useGetCompetitionByIdQuery,
    useUpdateCompetitionByIdMutation,
    useAddCompetitionMutation,
} from '../../../entities/Competition';

const StakesPage = () => {
    const [competitionId, setCompetitionId] = useState('1');
    const [newCompetition, setNewCompetition] = useState('');

    const { data: competitionById } = useGetCompetitionByIdQuery(competitionId);
    const { data: competitionsList } = useGetAllCompetitionsQuery();
    const [updateCompetitionById, result] = useUpdateCompetitionByIdMutation();
    const [addCompetition] = useAddCompetitionMutation();

    async function handleChange(
        event: ChangeEvent<HTMLInputElement>,
    ): Promise<void> {
        const competition = competitionsList?.find(
            (competition) => competition.id == event.target.value,
        );
        const id = competition!.id;
        const res = await updateCompetitionById({
            id,
            isCurrent: !competition?.isCurrent,
        });
        console.log(res);
    }

    async function handleAdd(): Promise<void> {
        addCompetition({
            value: newCompetition,
            description: '',
            isCurrent: false,
        });
    }
    console.log(competitionsList, result);

    return (
        <>
            {competitionsList?.map((competition) => (
                <div key={competition.id}>
                    <label>
                        {competition.value}
                        <input
                            type="checkbox"
                            name="allow"
                            checked={competition.isCurrent}
                            value={competition.id}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            ))}
            <div>
                <input
                    type="text"
                    value={competitionId}
                    onChange={(event) => setCompetitionId(event.target.value)}
                />
                {competitionById?.value}
            </div>
            <div>
                <input
                    type="text"
                    value={newCompetition}
                    onChange={(event) => setNewCompetition(event.target.value)}
                />
                <button onClick={handleAdd}>add Comp</button>
            </div>
        </>
    );
};

export default StakesPage;
