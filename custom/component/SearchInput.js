import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';

function SearchInput(props) {
  const {searchHandler} = props;
  const styles = StyleSheet.create({
    ContainerStyle: {
      flexDirection: 'row',
      borderWidth: 1,
      width: responsiveWidth(90),
      backgroundColor: '#FFF',
      borderColor: '#FFF',
      alignItems: 'center',
      paddingLeft: responsiveHeight(2),
      paddingRight: responsiveHeight(2),
      borderRadius: 10,
    },
    TextInputStyle: {
      flex: 1,
      padding: responsiveHeight(1),
      fontSize: responsiveFontSize(2),
    },
  });

  return (
    <View style={styles.ContainerStyle}>
      <TextInput
        onChange={e => searchHandler.setInput(e.nativeEvent.text)}
        style={styles.TextInputStyle}
        placeholder="Type here to search"
      />
      <Icon name="search" />
    </View>
  );
}

export default React.memo(SearchInput);
