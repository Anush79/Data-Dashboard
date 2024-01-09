import { GitHub } from "@mui/icons-material";
import { Link } from "react-router-dom";
import StorageIcon from '@mui/icons-material/Storage';

export default function Footer(){
  return <>
  <footer >
    <Link title="Github" target="_blank" to={"https://github.com/Anush79/Data-Dashboard"}>
    <GitHub/>

    </Link>
    <Link title="Linkedin" target="_blank" to={"https://www.linkedin.com/in/anushka-jaiswal-46258918a/"}>

    Made by Anushka
    </Link>
    <Link title="Backend" target="_blank" to={"https://replit.com/@AnushkaJaiswal7/UserManagementDataViz"}>

    <StorageIcon/>
  </Link>
  </footer>
  </>
}