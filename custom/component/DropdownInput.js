import React from 'react';
import {View, StyleSheet} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import PickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 10,
    width: responsiveWidth(25),
  },
});

function DropdownInput(props) {
  return (
    <View style={styles.container}>
      <PickerSelect {...props} />
    </View>
  );
}

export default React.memo(DropdownInput);
