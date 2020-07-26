import React from 'react';
import Config from 'react-native-config';

import CityAutoComplete from './CityAutoComplete';

function CitySearch(props) {
  return (
    <CityAutoComplete
      placeholder={props.placeHolder}
      text={props.text || ''}
      textInputProps={props.textInputProps}
      textInputMode={props.textInputMode}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'}
      keyboardAppearance={'light'}
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true}
      renderDescription={(row) => `${row?.name}, ${row?.country}`} // custom description render
      onPress={(item) => {
        console.log('here');
        const { name, country } = item;
        const { coordinates } = item?.location;
        const location = {
          latitude: coordinates[1],
          longitude: coordinates[0],
        };
        props.onSelectAddress({
          selectedLocation: location,
          selectedAddress: `${name}, ${country}`,
          city: name,
        });
      }}
      getDefaultValue={props.defaultValue}
      styles={props.styles}
      currentLocationLabel="Current location"
      debounce={250}
      renderRightButton={props.renderRightButton}
      renderLeftButton={props.renderLeftButton}
      searchIconVisible={props.searchIconVisible}
    />
  );
}

export default CitySearch;

CitySearch.defaultProps = {
  styles: {},
  defaultValue: () => '',
  textInputProps: {},
};
