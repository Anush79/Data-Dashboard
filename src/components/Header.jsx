import { Button } from "@mui/material"
import { useUser } from "../context/UserContext"


export default function Header() {
const {user ,logout}= useUser()

  return <header>
    <span className="logo">DataViz</span>

    <div className="user">
      {user.email}
    </div>
    <Button onClick={logout} >Log out</Button>

  </header>
}