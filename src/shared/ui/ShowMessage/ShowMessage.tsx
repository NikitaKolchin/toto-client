import {
	Alert,
	type AlertColor,
	Grow,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type FC, useEffect, useState } from "react";
import type { MessageResponse } from "../../api/types/MessageResponse";

type Props = {
	message?: string;
	severity?: AlertColor;
	error?: FetchBaseQueryError | SerializedError | undefined;
	absolute?: boolean;
};

const DEFAULT_ERROR_MESSAGE = "Что-то пошло не так, попробуйте позже";

// У ответа может не быть тела (например, 502 от прокси, когда бэкенд недоступен),
// поэтому до .message добираемся аккуратно и всегда что-то показываем.
const getErrorMessage = (
	error: FetchBaseQueryError | SerializedError,
): string => {
	if ("data" in error && error.data) {
		const { message } = error.data as Partial<MessageResponse>;
		if (message) {
			return message;
		}
	}
	if ("error" in error && error.error) {
		return error.error;
	}
	if ("message" in error && error.message) {
		return error.message;
	}
	return DEFAULT_ERROR_MESSAGE;
};

const ShowMessage: FC<Props> = ({
	message,
	severity,
	error,
	absolute = false,
}) => {
	const theme = useTheme();
	const matchThen600 = useMediaQuery(theme.breakpoints.up("sm"));
	const [alertVisibility, setAlertVisibility] = useState(true);
	const absoluteStyle = absolute
		? {
				position: "absolute",
				zIndex: 9999,
				left: matchThen600 ? "50%" : "10%",
			}
		: {};
	useEffect(() => {
		setAlertVisibility(true);
	}, []);

	const inlineStyle = {
		width: "100%",
		marginTop: "8px",
		marginBottom: "8px",
		"& .MuiAlert-message": {
			wordBreak: "break-word",
		},
	};
	if (!alertVisibility) {
		return <></>;
	}
	if (message) {
		return (
			<Grow in={!!message}>
				<Alert
					severity={severity}
					sx={absolute ? absoluteStyle : inlineStyle}
					onClose={() => setAlertVisibility(false)}
				>
					{message}
				</Alert>
			</Grow>
		);
	}
	if (error) {
		return (
			<Grow in={!!error}>
				<Alert
					severity={"error"}
					sx={absolute ? absoluteStyle : inlineStyle}
					onClose={() => setAlertVisibility(false)}
				>
					{getErrorMessage(error)}
				</Alert>
			</Grow>
		);
	}
	return <></>;
};

export { ShowMessage };
