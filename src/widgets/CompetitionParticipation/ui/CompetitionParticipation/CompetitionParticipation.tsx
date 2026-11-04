import {
	Card,
	CardContent,
	CardHeader,
	Chip,
	Stack,
	Typography,
} from "@mui/material";
import type { FC } from "react";
import {
	useCompetitionId,
	useGetAllCompetitionsQuery,
	useGetMyParticipationQuery,
} from "@/entities/Competition";
import { useAppSelector } from "@/shared/store/config";

const CompetitionParticipation: FC = () => {
	const { isAuth } = useAppSelector((state) => state.user);
	const competitionId = useCompetitionId();
	const { data: competitions = [], isLoading: isCompetitionsLoading } =
		useGetAllCompetitionsQuery(undefined, {
			skip: !isAuth,
		});
	const {
		data: participation,
		isLoading,
		isError,
	} = useGetMyParticipationQuery(competitionId as number, {
		skip: !isAuth || competitionId === undefined,
	});
	const competition = competitions.find((item) => item.id === competitionId);

	return (
		<Card>
			<CardHeader title="Участие в турнире" />
			<CardContent>
				<Stack spacing={1}>
					<Typography variant="body1" color="text.primary">
						{competition ? competition.value : "Турнир не выбран"}
					</Typography>
					{competitionId === undefined ? (
						<Typography variant="body2" color="text.secondary">
							{isCompetitionsLoading
								? "Загружаем турниры…"
								: competitions.length === 0
									? "Турниры не найдены"
									: "Выберите турнир в шапке"}
						</Typography>
					) : isLoading ? (
						<Typography variant="body2" color="text.secondary">
							Проверяем участие…
						</Typography>
					) : isError ? (
						<Typography variant="body2" color="error">
							Не удалось проверить участие
						</Typography>
					) : (
						<Stack spacing={1} alignItems="flex-start">
							<Chip
								size="small"
								color={participation?.active ? "success" : "default"}
								label={
									participation?.active ? "Вы участвуете" : "Вы не участвуете"
								}
							/>
							{!participation?.active && (
								<Typography variant="body2" color="text.secondary">
									Чтобы делать ставки, попросите администратора добавить вас в
									участники турнира.
								</Typography>
							)}
						</Stack>
					)}
				</Stack>
			</CardContent>
		</Card>
	);
};

export { CompetitionParticipation };
