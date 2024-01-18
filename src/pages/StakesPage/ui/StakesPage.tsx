import { useGetCompetitionByIdQuery } from '../../../shared/lib/rtkApi/rtk';

const StakesPage = () => {
    const { data } = useGetCompetitionByIdQuery(1);
    return <div>{data?.value}</div>;
};

export default StakesPage;
