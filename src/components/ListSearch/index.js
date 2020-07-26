import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Searchbar, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import debounce from 'lodash.debounce';
import { Colors, Layouts } from '../../themes';
import { View, StyleSheet } from 'react-native';
import Fuse from 'fuse.js';

const ListSearch = (props) => {
  const textInputRef = useRef();
  const [text, setText] = useState('');

  const makeRequest = debounce((textQuery) => filterList(textQuery), 300);

  const filterList = (_text) => {
    if (_text.length >= props.minLength) {
      const onChangeText = props && props.textInputProps && props.textInputProps.onChangeText;

      if (onChangeText) {
        // const result = props.data.filter(item => item.name.includes(_text));
        // Using Fuse
        const options = {
          includeScore: true,
          // Search in `author` and in `tags` array
          keys: ['name'],
        };
        const fuse = new Fuse(props.data, options);
        const result = fuse.search(_text).map((_fuse) => _fuse.item);

        onChangeText(result);
      }
    }

    if (_text.length === 0) {
      const onChangeText = props && props.textInputProps && props.textInputProps.onChangeText;

      if (onChangeText) {
        onChangeText(props.data);
      }
    }
  };

  const _onChangeText = (_text) => {
    makeRequest(_text);
    setText(_text);
  };

  const handleOnChangeText = (_text) => {
    _onChangeText(_text);
  };

  let { onFocus, clearButtonMode, theme, ...userProps } = props.textInputProps;

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
          {/* {renderLeft({ renderLeftButton: props.renderLeftButton })} */}
          <Searchbar
            icon={(props) => <Icon {...props} name="search" size={16} light />}
            theme={theme}
            // onBlur={onBlur}
            placeholder={props.placeholder}
            placeholderTextColor={Layouts.textInputPlaceHolderColor}
            onChangeText={handleOnChangeText}
            value={text}
            ref={textInputRef}
            inputStyle={[props.styles.textInput]}
            style={[props.suppressDefaultStyles ? {} : defaultStyles.textInput]}
            clearIcon={() => (
              <IconButton
                icon="times"
                color={Layouts.textInputIconColor}
                size={20}
                onPress={() => {
                  _onChangeText('');
                  // setListViewDisplay(false);
                }}
              />
            )}
          />
          {/* {renderRight({ renderRightButton: props.renderRightButton })} */}
        </View>
      )}

      {/* {renderSearchResults()} */}
      {props.children}
    </View>
  );
};

export default ListSearch;

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
