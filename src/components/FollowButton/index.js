import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { Colors } from '../../themes';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import { Text } from '../Text';
import { i18nTranslator } from '../../i18n';
import { addFavoriteTemple, removeFavoriteTemple } from '../../redux/temple/operations';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationUtils } from '../../navigation';

const FollowButton = ({ isFollow, placeId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);

  const onPressFollow = async () => {
    if (userId) {
      if (!isFollow) {
        await dispatch(addFavoriteTemple(placeId));
      } else {
        await dispatch(removeFavoriteTemple(placeId));
      }
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.btnFollow} onPress={onPressFollow}>
      {!isFollow ? (
        <LinearGradient
          colors={['#FF8900', '#EE0042', '#B821CE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.btnFollow}>
          <Text color="white">
            <Icon light name="plus" color={Colors.white} size={12} />
            {'   '}
            {i18nTranslator('BTN_FOLLOW')}
          </Text>
        </LinearGradient>
      ) : (
        <TouchableOpacity style={styles.btnFollowing} onPress={onPressFollow}>
          <Text style={styles.txtFollowing}>{i18nTranslator('BTN_FOLLOWING')}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnFollow: {
    borderRadius: 15,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
  },
  btnFollowing: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#E4E9F0',
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
  },
  txtFollowing: {
    color: '#E4E9F0'
  }
});

export default FollowButton;
