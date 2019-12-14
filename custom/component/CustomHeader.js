import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

function CustomHeader(props) {
  const {children} = props;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      height: responsiveHeight(18),
      padding: 0,
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/header.png')}
        style={{
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          width: responsiveWidth(100),
          height: responsiveHeight(18),
          padding: responsiveHeight(1),
        }}>
        {children}
      </ImageBackground>
    </View>
  );
}
export default React.memo(CustomHeader);
