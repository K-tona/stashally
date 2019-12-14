import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';

function CustomShowImage(props) {
  const {source} = props;
  const styles = StyleSheet.create({
    container: {
      padding: responsiveHeight(3),
      paddingRight: responsiveHeight(1),
    },
    ImageButton: {
      padding: responsiveHeight(3),
      width: responsiveHeight(10),
      height: responsiveHeight(10),
      borderRadius: 10,
    },
  });
  return (
    <View style={styles.container}>
      <Image
        source={{uri: source}}
        width={responsiveHeight(10)}
        height={responsiveHeight(10)}
        style={styles.ImageButton}
      />
    </View>
  );
}

export default React.memo(CustomShowImage);
