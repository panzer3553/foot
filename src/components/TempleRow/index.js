import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { Images, Colors } from '../../themes';
import LinearGradient from 'react-native-linear-gradient';
import { Title, Text } from '../Text';
import { i18nTranslator } from '../../i18n';
import {
  addFavoriteTemple,
  removeFavoriteTemple,
} from '../../redux/temple/operations';
import { useDispatch, useSelector } from 'react-redux';

const TempleRow = ({onPress, item}) => {
  const dispatch = useDispatch();
  const onPressRow = () => onPress(item);
  const userId = useSelector(state => state.auth)?.user?._id;

  const isOnline = item.streams && item.streams.length > 0;
  const onPressFollow = async () => {
    if (!item.isFavorite) {
      await dispatch(addFavoriteTemple(item._id));
    } else {
      await dispatch(removeFavoriteTemple(item._id));
    }
  };
  const isAdmin = userId && userId === item.owner;
  return (
  <React.Fragment>
    <TouchableOpacity
      style={styles.rowContainer}
      onPress={onPressRow}>
        <Image
          defaultSource={Images.DEFAULT_CAROUSEL}
          style={styles.avatar}
          source={{ uri: item.thumbnail }}
        />
        <View style={styles.middle}>
        <View style={styles.rowFirst}>
          <Title numberOfLines={1} style={{flex: 1}}>
            {`${item.name} ${isAdmin ? '(admin)' : ''}`}
          </Title>
          <View style={styles.rowCenter}>
            <View style={[styles.iconActive, { backgroundColor: isOnline ? Colors.live : '#8F9BB3' }]} />
            <Text style={[styles.txtActive, { color: isOnline ? Colors.live : '#8F9BB3' }]}>
              {isOnline ? i18nTranslator('LABEL_LIVE') : i18nTranslator('LABEL_OFFLINE')}
            </Text>
          </View>
          </View>
          <Text numberOfLines={1}>
            {item.address}
          </Text>
        <View style={styles.lastRow}>
          {item.isFavorite ? (
            <TouchableOpacity style={styles.btnFollow} onPress={() => onPressFollow(item)}>
              <Text>{i18nTranslator('BTN_FOLLOWING')}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onPressFollow(item)}>
              <LinearGradient
                colors={['#FF8900', '#EE0042', '#B821CE']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btnUnfollow}>
                <Text color="white">{i18nTranslator('BTN_FOLLOW')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          <View style={styles.divideLine} />
          <View style={[styles.rowCenter, {marginRight: 5}]}>
            <Image source={Images.VIEW} />
            <Text style={{marginHorizontal: 7}}>{item?.viewCount || 0}</Text>
          </View>
          <View style={styles.rowCenter}>
            <Image source={Images.LIVE} />
            <Text style={{marginHorizontal: 7}}>{item?.numOfFav || 0}</Text>
          </View>
        </View>
        </View>
    </TouchableOpacity>
  </React.Fragment>
  );
};


const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  middle: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  rowFirst: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5,
  },
  iconActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  lastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  btnFollow: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#E4E9F0',
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  btnUnfollow: {
    borderRadius: 15,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  rowCenter: {
    alignItems: 'center', flexDirection: 'row',
  },
  divideLine: {
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    height: 20,
    marginHorizontal: 15,
    opacity: 0.1,
  },
});

export default TempleRow;
