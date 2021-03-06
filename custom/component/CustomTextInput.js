import React from 'react';
import {TextInput} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

function CustomTextInput(props) {
  return (
    <TextInput
      style={{
        fontSize: responsiveFontSize(2),
        padding: responsiveHeight(2),
        borderTopWidth: 1,
        borderTopColor: '#e8e8e8',
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
      }}
      {...props}
    />
  );
}

export default React.memo(CustomTextInput);
