import { CssBaseline, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
	useCompetitionId,
	useGetAllCompetitionsQuery,
} from "@/entities/Competition";
import { initTheme } from "@/entities/Theme";
import { useAppDispatch, useAppSelector } from "@/shared/store/config";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = () => {
	const dispatch = useAppDispatch();
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const competitionId = useCompetitionId();
	const { isAuth } = useAppSelector((state) => state.user);
	const { data: competitions = [], isLoading: isCompetitionsLoading } =
		useGetAllCompetitionsQuery(undefined, {
			skip: !isAuth,
		});
	const competitionValue = competitions.find(
		(competition) => competition.id === competitionId,
	)?.value;

	useEffect(() => {
		dispatch(initTheme(prefersDarkMode));
	}, [dispatch, prefersDarkMode]);

	useEffect(() => {
		if (!isCompetitionsLoading) {
			document.title = competitionValue
				? `Toto - ${competitionValue}`
				: "Toto App";
		}
	}, [competitionValue, isCompetitionsLoading]);

	return (
		<>
			<CssBaseline />
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export { Layout };
