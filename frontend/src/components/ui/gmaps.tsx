import { MultiGMapProps, SingleGMapProps } from '@/types/gmaps.type';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '100%',
  width: '100%'
};
type Library =
  | 'core'
  | 'maps'
  | 'places'
  | 'geocoding'
  | 'routes'
  | 'marker'
  | 'geometry'
  | 'elevation'
  | 'streetView'
  | 'journeySharing'
  | 'drawing'
  | 'visualization';
const libraries: Library[] = ['places'];

/**
 * Renders a single Google Map with a marker.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.center - The center of the map.
 * @param {boolean} props.disableDefaultUI - Whether to disable default UI.
 * @param {string} props.mapId - The ID of the map.
 * @param {number} props.zoom - The zoom level of the map.
 * @param {Object} props.marker - The marker object.
 * @param {Function} props.handleChange - The function to handle change.
 * @param {string} props.key - The key for the component.
 * @returns {JSX.Element} The rendered component.
 */
function SingleGMap(props: SingleGMapProps): JSX.Element {
  // map config
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GMAPS_API_KEY as string,
    libraries
  });
  const optionsMap = {
    center: props.center,
    disableDefaultUI: props.disableDefaultUI,
    mapId: props.mapId,
    zoom: props.zoom
  };

  return (
    <div className="flex size-full items-center justify-center">
      {loadError ? (
        <span>Error loading maps</span>
      ) : !isLoaded ? (
        <span>Loading Maps</span>
      ) : (
        <GoogleMap
          key={props.key}
          mapContainerStyle={mapContainerStyle}
          options={optionsMap}
          onClick={(event) => {
            if (props.handleChange) {
              props.handleChange({
                lat: event.latLng?.lat(),
                lng: event.latLng?.lng()
              });
            }
          }}
        >
          {props.marker && (
            <Marker
              key={props.key}
              position={{
                lat: props.marker.lat,
                lng: props.marker.lng
              }}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
}
function MultiGMap(props: MultiGMapProps): JSX.Element {
  // map config
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GMAPS_API_KEY as string,
    libraries
  });
  const optionsMap = {
    center: props.center,
    disableDefaultUI: props.disableDefaultUI,
    mapId: props.mapId,
    zoom: props.zoom
  };

  return (
    <div className="flex size-full items-center justify-center">
      {loadError ? (
        <span>Error loading maps</span>
      ) : !isLoaded ? (
        <span>Loading Maps</span>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          options={optionsMap}
          onClick={(event: any) => {
            props.handleChange({
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            });
          }}
        >
          {props.markers &&
            props.markers.map((m: any, idx: any) => (
              <Marker
                key={idx}
                position={{
                  lat: m?.lat,
                  lng: m?.lng
                }}
                // icon={{
                //   url: '/images/car.webp',
                //   scaledSize: new window.google.maps.Size(30, 30),
                //   origin: new window.google.maps.Point(0, 0),
                //   anchor: new window.google.maps.Point(15, 15),
                // }}
              />
            ))}
        </GoogleMap>
      )}
    </div>
  );
}
export { MultiGMap };
export default SingleGMap;
