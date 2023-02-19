import { Box } from '@mui/material';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map({ markers }) {
  const plotMarker = (marker) => {
    return <Marker latitude={marker.latitude} longitude={marker.longitude} anchor="bottom" />;
  };

  return (
    <Box
      sx={{
        height: 450,
        marginRight: "30px",
        position: "relative",
      }}
    >
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 8,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        ref={(e) => { window.locateMap = e }}
      >
        {markers.map((marker) => plotMarker(marker))}
      </ReactMapGL>
    </Box>
  );
}