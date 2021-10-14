import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const StyledMapDiv = styled.div`
  width: 300px;
  height: 250px;
  z-index: -10000;
`;

const Map = (props) => {
  const mapRef = useRef();
  const popupRef = useRef();
  const closerRef = useRef();

  const { center, zoom } = props;
  useEffect(() => {
    const map = new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.long, center.lat]),
        zoom: zoom,
      }),
    });
    let layer = new window.ol.layer.Vector({
      source: new window.ol.source.Vector({
        features: [
          new window.ol.Feature({
            geometry: new window.ol.geom.Point(
              window.ol.proj.fromLonLat([center.long, center.lat])
            ),
          }),
        ],
      }),
    });

    map.addLayer(layer);
  }, [center, zoom]);

  return (
    <>
      <StyledMapDiv
        ref={mapRef}
        className={`map ${props.className}`}
        style={props.style}
        id="map"
      ></StyledMapDiv>
    </>
  );
};

export default Map;
