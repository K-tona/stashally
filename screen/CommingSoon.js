import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

function CommingSoon() {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
    },
    SingleTextStyle: {
      fontSize: responsiveFontSize(4),
      textAlign: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.SingleTextStyle}>Comming Soon</Text>
    </View>
  );
}

export default CommingSoon;
