import { Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { Container, CssBaseline } from "@mui/material"

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Header />

      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default Layout
