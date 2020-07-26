import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import config from '../api/config';

const imageUpload = async data => {
  try {
    console.log(`${config.API_URL}/upload/avatar`);
    const upload = await fetch(`${config.API_URL}/upload/avatar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: data.type,
        name: data.fileName,
      }),
    });
    const uploadData = await upload.json();
    let source;
    if (Platform.OS === 'ios') {
      source = data.uri.replace('file://', '');
    } else {
      source = data.uri;
    }
    console.log(uploadData);
    const result = await RNFetchBlob.fetch(
      'PUT',
      uploadData.uploadUrl,
      {
        'Content-Type': data.type,
      },
      RNFetchBlob.wrap(source),
    );
    return { url: uploadData.url, uri: data.uri };
  } catch (err) {
    console.log(err);
  }
};

export default imageUpload;
