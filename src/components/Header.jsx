import { Button } from "@mui/material"
import { useUser } from "../context/UserContext"


export default function Header() {
const {logout,user}= useUser()

  return <header>
    <span className="logo">DataViz</span>

    <div className="user">
      { user?.user?.username? "@"+user?.user?.username : ""}
   
    {user.token && <Button variant="outlined" className="logout"onClick={logout} >Log out</Button>}
 </div>
  </header>
}