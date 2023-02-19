import { Card, Chip } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Badge from '@mui/material/Badge';
import Web3 from 'web3';

import getABI from "../../abis/WheresMyNFT";

const { OpenLocationCode } = require('open-location-code');

var openLocationCode = new OpenLocationCode();

export default function CustomCard(props) {

  const onLocate = async (deviceHash) => {
    console.log("Locate");
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_WEB3_PROVIDER));
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(getABI());
    let contract = new web3.eth.Contract(getABI().abi, process.env.REACT_APP_CONTRACT_ADDRESS, {
      from: accounts[0],
    });

    contract.methods.getLatestDeviceLocation(deviceHash).call({
      from: accounts[0]
    }).then((data) => {
      if (data[1]) {
        let code = openLocationCode.decode(data["1"]);
        props.setMarkers([{
          latitude: code.latitudeCenter,
          longitude: code.longitudeCenter
        }]);
        const end = {
          center: [code.longitudeCenter, code.latitudeCenter],
          zoom: 9,
          bearing: 130,
          pitch: 75,
          duration: 3000
        };
        window.locateMap.getMap().flyTo(end);
        console.log(code)
      } else {
        console.log("No location found!")
      }
    });
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, backgroundColor: "#191919" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height={props.height}
            image={props.img}
            alt={props.alt}
          />
          <CardContent>
            <Typography
              alignLeft
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: "#FFFFFF", fontFamily: "Avenir Black" }}
            >
              {props.device}
            </Typography>
            <Typography alignLeft variant="subtitle2" component="p" sx={{ color: "#FFFFFF", fontFamily: "Avenir Light" }}>
              <Chip label="Locate" variant="outlined" sx={{ color: "#FFFFFF", borderColor: "#FFFFFF", fontFamily: "Avenir Light" }} onClick={() => onLocate(props.deviceHash)} />
              Chikmagalur, KA
              <Badge badgeContent=" " variant="dot" color="secondary" sx={{ marginLeft: "10px", marginTop: "10px", marginRight: "10px", verticalAlign: "top" }} />
              0.2 Kms
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
