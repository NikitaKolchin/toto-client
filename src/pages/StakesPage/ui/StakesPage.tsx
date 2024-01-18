import { useGetCompetitionByIdQuery } from '../../../shared/api/rtkApi/rtk';

const StakesPage = () => {
    const { data } = useGetCompetitionByIdQuery(1);
    return <div>{data?.value}</div>;
};

export default StakesPage;
