import React, { Component, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Qs from 'qs';
import debounce from 'lodash.debounce';
import Geolocation from '@react-native-community/geolocation';
import { Searchbar, IconButton, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import { Colors } from '../../themes';
import { useKeyboard } from '@react-native-community/hooks';
import Config from 'react-native-config';

const WINDOW = Dimensions.get('window');

const CitySearch = (props) => {
  const textInputRef = useRef();
  const [listViewDisplayed, setListViewDisplay] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [text, setText] = useState('');
  const [_requests, setRequests] = useState([]);
  const [_results, setResults] = useState([]);

  const triggerBlur = () => {
    if (textInputRef && typeof textInputRef.blur === 'function') {
      textInputRef.blur();
    }
  };

  const keyboard = useKeyboard();

  const onBlur = () => {;
    triggerBlur();

    setListViewDisplay(false);
  };

  const abortRequests = () => {
    _requests.map((i) => i.abort());
    setRequests([]);
  };

  const buildRowsFromResults = (results) => {
    let res = [];

    if (results.length === 0 || props.predefinedPlacesAlwaysVisible === true) {
      res = [...props.predefinedPlaces];

      if (props.currentLocation === true) {
        res.unshift({
          description: props.currentLocationLabel,
          isCurrentLocation: true,
        });
      }
    }

    res = res.map((place) => ({
      ...place,
      isPredefinedPlace: true,
    }));

    return [...res, ...results];
  };

  const requestQuery = (_text) => {
    abortRequests();
    if (_text.length >= props.minLength) {
      let request = new XMLHttpRequest();
      setRequests([..._requests, request]);
      request.timeout = props.timeout;
      request.ontimeout = props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);
          const results = responseJSON?.data?.list || [];
          setResults(results);
          setListViewDisplay(true);
          setDataSource(buildRowsFromResults(results));
        } else {
         //
        }
      };

      const url = Config.SERVER_BASE_URL + '/api/v1/cities?q=' + encodeURIComponent(_text);
      console.log('Query_url:', url);

      request.open('GET', url);
      request.send();
    } else {
      setResults([]);
      setDataSource(buildRowsFromResults([]));
    }
  };

  const makeRequest = debounce((textQuery) => requestQuery(textQuery), 300);

  const _onChangeText = (text) => {
    makeRequest(text);
    setText(text);
    setListViewDisplay(props.autoFocus);
  };

  const handleOnChangeText = (text) => {
    _onChangeText(text);

    const onChangeText = props && props.textInputProps && props.textInputProps.onChangeText;

    if (onChangeText) {
      onChangeText(text);
    }
  };

  const enableRowLoader = (rowData) => {
    let rows = buildRowsFromResults(_results);
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i].place_id === rowData.place_id ||
        (rows[i].isCurrentLocation === true && rowData.isCurrentLocation === true)
      ) {
        rows[i].isLoading = true;
        setDataSource(rows);
        break;
      }
    }
  };

  const disableRowLoader = () => {
    if (keyboard.keyboardShown) {
      let results = _results;
      for (let i = 0; i < results.length; i++) {
        if (results[i].isLoading === true) {
          results[i].isLoading = false;
        }
      }
      setResults(results);
      setDataSource(buildRowsFromResults(results));
    }
  };

  const _onPress = (rowData) => {
    if (keyboard.keyboardShown) {
      disableRowLoader();
      onBlur();

      setText(rowData?.name);

      delete rowData.isLoading;
      Keyboard.dismiss();
    }
    props.onPress(rowData);
  };

  const _renderSeparator = (sectionID, rowID) => {
    if (rowID == dataSource.length - 1) {
      return null;
    }

    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={[props.suppressDefaultStyles ? {} : defaultStyles.separator, props.styles.separator]}
      />
    );
  };

  const renderRowDescription = (rowData) => {
    if (props.renderDescription) {
      return props.renderDescription(rowData);
    }

    return rowData.description || rowData.name;
  };

  const renderLoader = () => {
    return <ActivityIndicator animating={true} size="small" />;
  };

  const renderRowLoader = (rowData) => {
    if (rowData.isLoading === true) {
      return (
        <View
          style={[props.suppressDefaultStyles ? {} : defaultStyles.loader, props.styles.loader]}>
          {renderLoader()}
        </View>
      );
    }

    return null;
  };

  const renderRowData = (rowData) => {
    if (props.renderRow) {
      return props.renderRow(rowData);
    }

    return (
      <Text
        style={[
          props.suppressDefaultStyles ? {} : defaultStyles.description,
          props.styles.description,
          rowData.isPredefinedPlace ? props.styles.predefinedPlacesDescription : {},
        ]}
        numberOfLines={props.numberOfLines}>
        {renderRowDescription(rowData)}
      </Text>
    );
  };

  const renderLeft = ({ renderLeftButton }) => {
    if (renderLeftButton) {
      return renderLeftButton();
    }
    return null;
  };

  const renderRight = ({ renderRightButton }) => {
    if (renderRightButton) {
      return renderRightButton();
    }
    return null;
  };

  const _renderRow = (rowData = {}, sectionID, rowID) => {
    return (
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={props.isRowScrollable}
        keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <TouchableHighlight
          style={{ width: WINDOW.width }}
          onPress={() => _onPress(rowData)}
          underlayColor={props.listUnderlayColor || '#c8c7cc'}>
          <View
            style={[
              props.suppressDefaultStyles ? {} : defaultStyles.row,
              props.styles.row,
              rowData.isPredefinedPlace ? props.styles.specialItemRow : {},
            ]}>
            {renderRowLoader(rowData)}
            {renderRowData(rowData)}
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  };

  const renderSearchResults = () => {
    const keyGenerator = () => Math.random().toString(36).substr(2, 10);
    if (listViewDisplayed) {
      return (
        <FlatList
          scrollEnabled={!props.disableScroll}
          style={[props.suppressDefaultStyles ? {} : defaultStyles.listView, props.styles.listView]}
          data={dataSource}
          keyExtractor={keyGenerator}
          extraData={[dataSource || text]}
          ItemSeparatorComponent={_renderSeparator}
          renderItem={({ item }) => _renderRow(item)}
          ListHeaderComponent={props.renderHeaderComponent && props.renderHeaderComponent(text)}
          {...props}
        />
      );
    }
    return null;
  };

  let { onFocus, clearButtonMode, theme, ...userProps } = props.textInputProps;

  const renderSearchBar = () => (
    <Searchbar
      icon={(props) => <Icon {...props} name="search" size={16} light />}
      theme={theme}
      onBlur={onBlur}
      placeholder={props.placeholder}
      onChangeText={handleOnChangeText}
      value={text}
      ref={textInputRef}
      inputStyle={[props.styles.textInput]}
      style={[props.suppressDefaultStyles ? {} : defaultStyles.textInput]}
      clearIcon={() => (
        <IconButton
          icon="times"
          size={20}
          onPress={() => {
            setText(null);
            setListViewDisplay(false);
          }}
        />
      )}
    />
  );

  const renderTextInput = () => (
    <TextInput
      ref={textInputRef}
      mode={props.textInputMode}
      editable={props.editable}
      returnKeyType={props.returnKeyType}
      keyboardAppearance={props.keyboardAppearance}
      autoFocus={props.autoFocus}
      style={[props.suppressDefaultStyles ? {} : defaultStyles.textInput, props.styles.textInput]}
      value={text}
      placeholder={props.placeholder}
      onSubmitEditing={props.onSubmitEditing}
      placeholderTextColor={props.placeholderTextColor}
      underlineColorAndroid={props.underlineColorAndroid}
      clearButtonMode={clearButtonMode ? clearButtonMode : 'while-editing'}
      onChangeText={handleOnChangeText}
      {...userProps}
    />
  );

  return (
    <View
      style={[props.suppressDefaultStyles ? {} : defaultStyles.container, props.styles.container]}
      pointerEvents="box-none">
      {!props.textInputHide && (
        <View
          style={[
            props.suppressDefaultStyles ? {} : defaultStyles.textInputContainer,
            props.styles.textInputContainer,
          ]}>
          {renderLeft({ renderLeftButton: props.renderLeftButton })}
          {props.searchIconVisible ? renderSearchBar() : renderTextInput()}
          {renderRight({ renderRightButton: props.renderRightButton })}
        </View>
      )}

      {renderSearchResults()}
      {props.children}
    </View>
  );
};

export default CitySearch;

CitySearch.propTypes = {
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  underlineColorAndroid: PropTypes.string,
  returnKeyType: PropTypes.string,
  keyboardAppearance: PropTypes.oneOf(['default', 'light', 'dark']),
  onPress: PropTypes.func,
  onNotFound: PropTypes.func,
  onFail: PropTypes.func,
  minLength: PropTypes.number,
  fetchDetails: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoFillOnNotFound: PropTypes.bool,
  getDefaultValue: PropTypes.func,
  timeout: PropTypes.number,
  onTimeout: PropTypes.func,
  query: PropTypes.object,
  styles: PropTypes.object,
  textInputProps: PropTypes.object,
  enablePoweredByContainer: PropTypes.bool,
  predefinedPlaces: PropTypes.array,
  currentLocation: PropTypes.bool,
  currentLocationLabel: PropTypes.string,
  enableHighAccuracyLocation: PropTypes.bool,
  filterReverseGeocodingByTypes: PropTypes.array,
  predefinedPlacesAlwaysVisible: PropTypes.bool,
  enableEmptySections: PropTypes.bool,
  renderDescription: PropTypes.func,
  renderRow: PropTypes.func,
  renderLeftButton: PropTypes.func,
  renderRightButton: PropTypes.func,
  listUnderlayColor: PropTypes.string,
  debounce: PropTypes.number,
  isRowScrollable: PropTypes.bool,
  text: PropTypes.string,
  textInputHide: PropTypes.bool,
  suppressDefaultStyles: PropTypes.bool,
  numberOfLines: PropTypes.number,
  onSubmitEditing: PropTypes.func,
  editable: PropTypes.bool,
  searchIconVisible: PropTypes.bool,
};

CitySearch.defaultProps = {
  placeholder: 'Address',
  isRowScrollable: true,
  underlineColorAndroid: 'transparent',
  returnKeyType: 'default',
  keyboardAppearance: 'default',
  onPress: () => {},
  onNotFound: () => {},
  onFail: () => {},
  minLength: 0,
  fetchDetails: false,
  autoFocus: false,
  autoFillOnNotFound: false,
  keyboardShouldPersistTaps: 'always',
  getDefaultValue: () => '',
  timeout: 20000,
  onTimeout: () => console.warn('request timeout'),
  styles: {},
  textInputProps: {},
  enablePoweredByContainer: true,
  predefinedPlaces: [],
  currentLocation: false,
  currentLocationLabel: 'Current location',
  enableHighAccuracyLocation: true,
  filterReverseGeocodingByTypes: [],
  predefinedPlacesAlwaysVisible: false,
  enableEmptySections: true,
  listViewDisplayed: 'auto',
  debounce: 0,
  textInputHide: false,
  suppressDefaultStyles: false,
  numberOfLines: 1,
  onSubmitEditing: () => {},
  editable: true,
  textInputMode: 'outlined',
  searchIconVisible: true,
};

const defaultStyles = {
  container: {
    flex: 0,
    zIndex: 999,
    borderColor: 'black',
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    width: '100%',
  },
  listView: {
    position: 'absolute',
    top: 64,
    // minHeight: 100,
    backgroundColor: '#FFF',
  },
  row: {
    padding: 12,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.purple200,
  },
  description: {
    fontWeight: 'bold',
    color: Colors.deepPurple900,
    marginRight: 12,
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  androidLoader: {
    marginRight: -15,
  },
};
