import { Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Badge from '@mui/material/Badge';

export default function CustomCard(props) {
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
            <Typography alignLeft variant="subtitle2" component="p" sx={{ color: "#FFFFFF", fontFamily: "Avenir Light"} }>
                Chikmagalur, KA 
                <Badge badgeContent=" " variant="dot" color="secondary" sx={{marginLeft: "10px", marginTop: "10px", marginRight: "10px", verticalAlign: "top"}} />
                0.2 Kms
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
