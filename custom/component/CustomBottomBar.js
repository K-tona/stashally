import React, {useContext} from 'react';
import {navContext} from '../../navigator/AppNavigator';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import CustomIcon from './CustomIcon';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
});

function CustomBottomBar(props) {
  const {onTabPress} = props;
  const {navState, navHandler} = useContext(navContext);
  const {availableRoutes: routes} = navState;

  return (
    <View style={styles.container}>
      {routes.map((route, idx) => {
        const isActive = idx === navState.activeIndex;
        const width = responsiveWidth(100) / routes.length;
        isActive ? onTabPress(idx * width) : null;
        return (
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              width: width,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navHandler.navigate(route.value)}>
            <CustomIcon
              {...route.iconProps}
              color={isActive ? navState.activeColor : navState.inActiveColor}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default React.memo(CustomBottomBar);
