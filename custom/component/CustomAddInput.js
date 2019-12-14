import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

function CustomAddInput(props) {
  const {placeholder, onPress, children} = props;
  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={{
          flexDirection: 'row',
          padding: responsiveHeight(2),
          borderTopWidth: 1,
          borderTopColor: '#e8e8e8',
          borderBottomWidth: 1,
          borderBottomColor: '#e8e8e8',
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: responsiveFontSize(2),
          }}>
          {placeholder}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Icon
            name="control-point"
            style={{
              fontSize: responsiveFontSize(2),
            }}
          />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}

export default React.memo(CustomAddInput);
