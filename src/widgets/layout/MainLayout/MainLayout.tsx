import { CssBaseline, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGetAllCompetitionsQuery } from "@/entities/Competition";
import { initTheme } from "@/entities/Theme";
import { useAppDispatch, useAppSelector } from "@/shared/store/config";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = () => {
	const dispatch = useAppDispatch();
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const { value } = useAppSelector((state) => state.competition);
	const { isAuth } = useAppSelector((state) => state.user);
	const { isLoading: isCompetitionsLoading } = useGetAllCompetitionsQuery(
		undefined,
		{ skip: !isAuth },
	);
	useEffect(() => {
		dispatch(initTheme(prefersDarkMode));
	}, [dispatch, prefersDarkMode]);
	useEffect(() => {
		if (!isCompetitionsLoading) {
			document.title = `Toto - ${value}` || "Toto App";
		}
	}, [isCompetitionsLoading, value]);
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
