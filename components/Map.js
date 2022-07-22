import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import { LocationMarkerIcon } from "@heroicons/react/solid";

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({});

    // Transform search result onbjects into the {latitude: 246, longitude: 54} object
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    // center point for coordinates
    const center = getCenter(coordinates);
    console.log(center);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL
            mapStyle={process.env.mapbox_style_url}
            mapboxApiAccessToken={process.env.mapbox_access_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetTop={-10}
                    >
                        <p
                            onClick={() => setSelectedLocation(result)}
                            className="cursor-pointer text-2xl animate-bounce"
                            aria-label="push-pin"
                            role="img"
                        >
                            <LocationMarkerIcon className="h-6 text-red-500" />
                        </p>
                    </Marker>
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                            className="z-50"
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        <div></div>
                    )}
                </div>
            ))}
        </ReactMapGL>
    );
}

export default Map;
