import { Button } from "@mui/material";
import type { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "@/shared/const/routes";
import { useAppSelector } from "@/shared/store/config";

const GoToStakes: FC = () => {
	const { isAuth, isAllowed, isActivated } = useAppSelector(
		(state) => state.user,
	);
	const location = useLocation();
	const navigate = useNavigate();
	const handleGoToStakes = () => {
		const competitionId = new URLSearchParams(location.search).get(
			"competitionId",
		);
		navigate(
			competitionId
				? `${AppRoutes.STAKES}?${new URLSearchParams({
						competitionId,
					}).toString()}`
				: AppRoutes.STAKES,
		);
	};
	return (
		<>
			{" "}
			{isAuth && isActivated && isAllowed && (
				<Button size="large" onClick={handleGoToStakes}>
					Переходим к ставкам!!!
				</Button>
			)}
		</>
	);
};

export { GoToStakes };
