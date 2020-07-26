import React from 'react';
import Config from 'react-native-config';

import GooglePlacesAutocomplete from './GoogleAutoComplete';

function MapInput(props) {
  return (
    <GooglePlacesAutocomplete
      placeholder={props.placeHolder}
      text={props.text || ''}
      textInputProps={props.textInputProps}
      textInputMode={props.textInputMode}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true}
      renderDescription={(row) => row.description} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        const {
          geometry: { location },
          formatted_address,
        } = details;
        props.onSelectAddress({ location, formatted_address });
      }}
      getDefaultValue={props.defaultValue}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: Config.GOOGLE_MAPS_API_KEY_JS,
        type: 'address',
      }}
      styles={props.styles}
      currentLocationLabel="Current location"
      enablePoweredByContainer={false}
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cities',
      }}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: ['formatted_address', 'Location', 'name'],
      }}
      filterReverseGeocodingByTypes={['locality', 'administrative_area3']}
      // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      debounce={250} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      renderRightButton={props.renderRightButton}
      renderLeftButton={props.renderLeftButton}
      searchIconVisible={props.searchIconVisible}
    />
  );
}

export default MapInput;

MapInput.defaultProps = {
  styles: {},
  defaultValue: () => '',
  textInputProps: {},
};
