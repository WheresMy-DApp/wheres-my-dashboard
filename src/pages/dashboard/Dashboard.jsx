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
import back from "../../assets/icons/Back.svg";
import next from "../../assets/icons/Next.svg";

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
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(4);
  const [authState, setAuthState] = useState();
  const [allDevices, setAllDevices] = useState([]);

  const [markers, setMarkers] = useState([]);

  async function fetchAllDevices() {
    try {
      let resp = await APINetwork.getAllDevices();
      if (resp) {
        setAllDevices(resp.devices);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const auth = () => {
      try {
        if (localStorage.getItem("token") && localStorage.getItem("user")) {
          setAuthState(true);
        } else {
          setAuthState(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    auth();
  }, []);

  //set state once devices received from api

  useEffect(() => {
    fetchAllDevices();
    console.log("Fetched all devices!");
    console.log(allDevices);
  }, []);

  function handleBack() {
    setMinValue(minValue - 1 <= 0 ? 0 : minValue - 1);
    setMaxValue(maxValue - 1 <= 4 ? 4 : maxValue - 1);
  }

  function handleNext() {
    setMinValue(minValue + 4 === devices.length ? minValue : minValue + 1);
    setMaxValue(maxValue + 1 >= devices.length ? devices.length : maxValue + 1);
  }

  async function handleLogout() {
    let response = await APINetwork.logout();
    return response ? true : false;
  }

  if (!authState || authState === undefined) {
    return null;
  } else {
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
                <a href="/" onClick={handleLogout}>
                  Logout
                </a>
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

          <div className="slider-controls">
            <img src={back} alt="" onClick={handleBack} />
            <img src={next} alt="" onClick={handleNext} />
          </div>

          <div class="card-group">
            {allDevices.length > 0 &&
              allDevices.slice(minValue, maxValue).map((ele, index) => {
                console.log(ele)
                if (
                  ele.deviceType.type === "IOS" ||
                  ele.deviceType.type === "ANDROID"
                ) {
                  return (
                    <CustomCard
                      img={mobile}
                      device={ele.deviceNickname}
                      height="150"
                      alt="mobile img"
                      deviceHash={ele.deviceHash}
                      setMarkers={setMarkers}
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
                      deviceHash={ele.deviceHash}
                      setMarkers={setMarkers}
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
                      deviceHash={ele.deviceHash}
                      setMarkers={setMarkers}
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
                      deviceHash={ele.deviceHash}
                      setMarkers={setMarkers}
                    />
                  );
                }
              })}
          </div>
          <h3>Track Your Devices</h3>
          <Map markers={markers} />
        </div>
      </div>
    );
  }
}
