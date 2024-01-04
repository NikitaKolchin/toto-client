import { useState } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from "@mui/icons-material/AccountCircle"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { logout } from "../../../store/authSlice"
import useMediaQuery from "@mui/material/useMediaQuery"
import Link from '@mui/material/Link';


type TotoMenuItem = {
  name: string
  value: string
}
const menuItems: TotoMenuItem[] = [
  { name: "Главная", value: "/" },
  { name: "Результаты", value: "/results" },
  { name: "Информация", value: "/info" },
]

function Header() {
  const { isAuth } = useAppSelector((state) => state.data)
  const dispatch = useAppDispatch()
  const matchThen600 = useMediaQuery("(min-width:600px)")
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
    null
  )
  const [mainAnchorEl, setMainAnchorEl] = useState<null | HTMLElement>(null)

  const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget)
  }

  const handleMainMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMainAnchorEl(event.currentTarget)
  }

  const handleCloseAccountMenu = () => {
    setAccountAnchorEl(null)
  }

  const handleCloseMainMenu = () => {
    setMainAnchorEl(null)
  }

  const handleLogout = () => {
    setAccountAnchorEl(null)
    dispatch(logout())
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {!matchThen600 && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMainMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={mainAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(mainAnchorEl)}
                onClose={handleCloseMainMenu}
              >
                {menuItems.map((item, index) => (
                  <MenuItem key={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
          <Box  sx={{ flexGrow: 1, display: 'flex', justifyContent:'space-around', alignItems: 'center' }}>

          <Typography variant="h5" component="span">
            Toto Online
          </Typography>
          {matchThen600 &&
            menuItems.map((item) => (
              <Link key={item.value} href={item.value} variant="h6" underline='none' color='white' >
                {item.name}
                
              </Link>
            ))}
          </Box>

          {isAuth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleAccountMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={accountAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(accountAnchorEl)}
                onClose={handleCloseAccountMenu}
              >
                <MenuItem
                  component={Link}
                  href="profile"
                  onClick={handleCloseAccountMenu}
                >
                  Профиль игрока
                </MenuItem>
                <MenuItem onClick={handleLogout}>Выйти </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
