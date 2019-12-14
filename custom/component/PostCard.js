import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Image from 'react-native-scalable-image';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
// import AutoHeightImage from 'react-native-auto-height-image';
// import {Icon} from 'react-native-elements';
import CustomIcon from './CustomIcon';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    width: responsiveWidth(50),
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  overview: {
    flexDirection: 'row',
    flex: 1,
  },
  overviewItem: {
    flexDirection: 'row',
    paddingLeft: responsiveWidth(2),
    paddingRight: responsiveWidth(2),
    alignItems: 'center',
  },
  overviewFont: {
    fontSize: responsiveFontSize(2),
  },
  titleFont: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveWidth(2),
  },
  userContainer: {
    flexDirection: 'row',
    padding: responsiveWidth(2),
    alignItems: 'center',
  },
  userInfo: {
    paddingLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(2),
  },
  userInfoDivider: {
    backgroundColor: 'gray',
    borderRadius: 50,
    width: responsiveWidth(1),
    height: responsiveWidth(1),
    marginLeft: responsiveWidth(1),
  },
  avatar: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    borderRadius: 25,
    overflow: 'hidden',
  },
});

function PostCard(props) {
  const {post} = props;
  return (
    <View style={styles.container}>
      <Image
        source={{uri: post.images[0]}}
        style={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
        width={responsiveWidth(50)}
        resizeMode="contain"
      />
      <View style={styles.overview}>
        <View style={styles.overviewItem}>
          <TouchableOpacity
            onPress={() => {
              post.dispatch({type: 'LIKE_POST', payload: post});
              post.dispatch({type: 'UPDATE_USER_LIKE_STATUS', input: post});
            }}>
            <CustomIcon
              name={
                post.isLike == 1 ? 'custom-love-fill' : 'custom-love-stroke'
              }
              size={responsiveFontSize(2)}
              color="#f85151"
            />
          </TouchableOpacity>
          <Text style={styles.overviewFont}>{post.likeCounter}</Text>
        </View>
        <View style={styles.overviewItem}>
          <CustomIcon
            name={false ? 'custom-stash-fill' : 'custom-stash-stroke'}
            size={responsiveFontSize(2)}
            color="green"
          />
          <Text style={styles.overviewFont}>{post.stashes.length}</Text>
        </View>
      </View>
      <Text style={styles.titleFont}>{post.title}</Text>
      <View style={styles.userContainer}>
        <View style={styles.avatar}>
          <Image source={{uri: post.user_pp}} style={styles.avatar} />
        </View>
        <Text style={styles.userInfo}>{post.user_id}</Text>
        <View style={styles.userInfoDivider} />
        <Text style={styles.userInfo}>{post.user_name}</Text>
      </View>
    </View>
  );
}

export default React.memo(PostCard);
