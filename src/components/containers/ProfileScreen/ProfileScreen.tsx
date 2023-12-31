import { FC, useState } from "react"
import { useAppSelector } from "../../../store/hooks"
import { IUser } from "../../../models/IUser"
import UserService from "../../../services/UserService"

type Props = {}

const ProfileScreen: FC = (props: Props) => {
  const [users, setUsers] = useState<IUser[]>([])

  const { user } = useAppSelector((state) => state.data)

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div>ProfileScreen {user.email}</div>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
        {users.map((user) => (
          <div key={user.email}>{user.email}</div>
        ))}
      </div>
    </>
  )
}

export default ProfileScreen
