import "../../styles/dashboard.css";
import { useState, useEffect } from "react";

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
// import headphones from "../../assets/images/headphones.png";
import laptop from "../../assets/icons/Laptop.svg";

import CustomCard from "../../components/cards/Card";
import Map from "../../components/maps/Map.jsx";

import * as APINetwork from "../../utils/network";

import devices from "../../contexts/devices.json";

export default function Dashboard() {

   //set state once devices received from api

  const [allDevices, setAllDevices] = useState([]);

  async function fetchAllDevices () {
    try {
      let devices = await APINetwork.getAllDevices();
      if(devices ) {
        setAllDevices(devices);
      }
    }
    catch(err) {
      console.error(err);
    }
  }

  useEffect(() =>{
    fetchAllDevices();
    console.log("Fetched all devices!");
    console.log(allDevices);
  }, [allDevices])
 

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
              <a href="/logout">Logout</a>
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
          {devices.map((ele, index) => {
            if (
              ele.deviceType.type === "IOS" ||
              ele.deviceType.type === "ANDRIOD"
            ) {
              return (
                <CustomCard
                  img={mobile}
                  device={ele.deviceNickname}
                  height="150"
                  alt="mobile img"
                />
              );
            }

            if (ele.deviceType.type === "WEARABLE") {
              return (
                <CustomCard
                  img={watch}
                  device={ele.deviceNickname}
                  height="150"
                  alt="mobile img"
                />
              );
            }
            if (ele.deviceType.type === "AUDIO") {
              return (
                <CustomCard
                  img={speaker}
                  device={ele.deviceNickname}
                  height="150"
                  alt="mobile img"
                />
              );
            }

            if (ele.deviceType.type === "MAC") {
              return (
                <CustomCard
                  img={laptop}
                  device={ele.deviceNickname}
                  height="150"
                  alt="mobile img"
                />
              );
            }
          })}
        </div>

        <h3>Track Your Devices</h3>
        <Map />
      </div>
    </div>
  );
}
