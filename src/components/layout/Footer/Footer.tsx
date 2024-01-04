import { Paper, Typography } from "@mui/material"

type Props = {}

const Footer = (props: Props) => {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © НК "}

        {new Date().getFullYear()}
      </Typography>
    </Paper>
  )
}

export default Footer
