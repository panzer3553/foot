import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import { Colors, Images } from '../themes';
// import { avatarPickerOptions } from '../config/MediaPickerOptions';
import uploadImage from '../utils/upload';
import { avatarPickerOption } from '../utils/uploadOptions';

class Avatar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bodyUpload: null,
      isUpload: false,
    };
    this.selectAvatar = this.selectAvatar.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
  }

  async uploadAvatar(body) {
    this.setState({ isUpload: true, bodyUpload: body });
    try {
      const uploadResponse = await uploadImage(body);
      console.log(uploadResponse);
      if (this.props.onValueChange) {
        this.setState({ isUpload: false });
        this.props.onValueChange(uploadResponse.url);
      }
    } catch (err) {
      this.setState({ isUpload: false });
    }
  }

  selectAvatar() {
    if (this.props.canUpload) {
      return;
    }
    ImagePicker.showImagePicker(avatarPickerOption, response => {
      console.log(response);
      if (response.didCancel || response.error || response.customButton) {
        return;
      }
      this.uploadAvatar(response);
    });
  }

  renderAvatar = () => {
    const { source } = this.props;
    const { bodyUpload, isUpload } = this.state;
    if (isUpload && bodyUpload) {
      console.log(bodyUpload.uri);
      return (
        <View style={styles.imageBorderStyle}>
          <Image source={{uri: bodyUpload.uri}} style={styles.imageStyle} />
          {isUpload && (
            <ActivityIndicator style={[styles.imageStyle, styles.uploading]} />
          )}
      </View>
      );
    }
    if (source) {
      return (
        <View style={styles.imageBorderStyle}>
          <Image source={{uri: source}} style={styles.imageStyle} />
        </View>
      );
    }
    return <Image source={Images.defaultAvatar} style={styles.imageStyle} />;
  };

  render() {
    return (
      <View style={{ flex: 0 }}>
        <TouchableWithoutFeedback onPress={this.selectAvatar}>
          {this.renderAvatar()}
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

Avatar.propTypes = {
  onValueChange: PropTypes.func,
  canUpload: PropTypes.func,
  source: PropTypes.string,
};

const IMAGE_SIZE = 85;

const styles = StyleSheet.create({
  imageStyle: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBorderStyle: {
    width: IMAGE_SIZE + 4,
    height: IMAGE_SIZE + 4,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Avatar;
