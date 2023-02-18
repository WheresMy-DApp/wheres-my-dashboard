import "../../styles/dashboard.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

import logo from "../../assets/images/login_logo.svg";
import iconAll from "../../assets/icons/All.svg";
import iconPc from "../../assets/icons/PCs.svg";
import iconMobile from "../../assets/icons/Mobile.svg";
import iconWatches from "../../assets/icons/Watches-1.svg";
import iconMouse from "../../assets/icons/Mouse.svg";

import mobile from "../../assets/images/mobiles.png";
import speaker from "../../assets/images/speaker.png";
import watch from "../../assets/images/watch.png";
import headphones from "../../assets/images/headphones.png";

import CustomCard from "../../components/cards/Card";
import Map from "../../components/maps/Map.jsx";


export default function Dashboard(props) {

  console.log(props);
  
  return (
    <div className="dashboard">
      <div class="side-menu">
        <center>
          <img src={logo} alt="Logo" />
        </center>

        <nav>
          <ul>
            <li className="dashboard">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li className="logout">
              <a href="/">Logout</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="main">
        <h1>Dashboard</h1>

        <div>
          <Stack direction="row" spacing={3}>
            <Chip
              avatar={<Avatar alt="all devices" src={iconAll} />}
              label="All Devices"
              variant="outlined"
              component="a"
              href="#all"
              clickable
              sx={{
                "& .MuiChip-label": {
                  color: "#FFFFFF",
                },
              }}
            />
            <Chip
              avatar={<Avatar alt="mobile" src={iconMobile} />}
              label="Mobile"
              variant="outlined"
              component="a"
              href="#mobile"
              clickable
              sx={{
                "& .MuiChip-label": {
                  color: "#FFFFFF",
                },
              }}
            />
            <Chip
              avatar={<Avatar alt="pcs" src={iconPc} />}
              label="PCs"
              variant="outlined"
              component="a"
              href="#pc"
              clickable
              sx={{
                "& .MuiChip-label": {
                  color: "#FFFFFF",
                },
              }}
            />
            <Chip
              avatar={<Avatar alt="watches" src={iconWatches} />}
              label="Watches"
              variant="outlined"
              component="a"
              href="#watch"
              clickable
              sx={{
                "& .MuiChip-label": {
                  color: "#FFFFFF",
                },
              }}
            />
            <Chip
              avatar={<Avatar alt="mouse" src={iconMouse} />}
              label="Mouse"
              sx={{
                "& .MuiChip-label": {
                  color: "#FFFFFF",
                },
              }}
              variant="outlined"
              component="a"
              href="#mouse"
              clickable
            />
          </Stack>
        </div>

        <div class="card-group">
          <CustomCard
            img={mobile}
            device="Nikitha's Mobile"
            height="150"
            alt="mobile img"
          />
          <CustomCard
            img={speaker}
            device="My Speaker"
            height="150"
            alt="mobile img"
          />
          <CustomCard
            img={watch}
            device="My watch"
            height="150"
            alt="mobile img"
          />
          <CustomCard
            img={headphones}
            device="Ved's headphones"
            height="150"
            alt="mobile img"
          />
        </div>

        <h3>Track Your Devices</h3>
        <Map />
        
      </div>
    </div>
  );
}
