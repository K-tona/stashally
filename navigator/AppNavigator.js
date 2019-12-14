import React, {useEffect, createContext, useState} from 'react';
import {View, StyleSheet, Text, Animated, ScrollView} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '../custom/hooks';
import {CustomBottomBar} from '../custom/component';
import CommingSoon from '../screen/CommingSoon';
import Home from '../screen/Home';
import Posting from '../screen/Posting';

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  navigationBar: {
    flexDirection: 'column',
    width: responsiveWidth(100),
  },
});

function ViewPage(props) {
  const {navState, value, children} = props;
  const {availableRoutes, activeIndex} = navState;

  return (
    <View
      style={{
        display:
          availableRoutes.length > 0 &&
          availableRoutes[activeIndex].value === value
            ? 'flex'
            : 'none',
      }}>
      {children}
    </View>
  );
}

export const navContext = createContext();
const translateX = new Animated.Value(0);
const NAVBAR_EXPANDED_HEIGHT = responsiveHeight(10);
const HEADER_EXPANDED_HEIGHT = responsiveHeight(18);
const COLLAPSED_HEIGHT = responsiveHeight(0);
const scrollY = new Animated.Value(0);

function AppNavigator(props) {
  const {state: navState, handler: navHandler} = useNavigation();
  const {availableRoutes, activeIndex} = navState;
  const navigationStyle = StyleSheet.create({
    pointer: {
      height: responsiveHeight(1),
      width:
        navState.availableRoutes.length > 0
          ? responsiveWidth(100) / navState.availableRoutes.length
          : navState.availableRoutes.length,
      backgroundColor: 'lightblue',
    },
  });

  const handle = {
    slide: type =>
      Animated.spring(translateX, {toValue: type, duration: 50}).start(),
  };

  useEffect(() => {
    navHandler.setRoutes([
      {
        label: 'Home',
        value: 'home',
        iconProps: {
          name: 'custom-home',
          size: responsiveFontSize(5),
          color: 'black',
        },
      },
      {
        label: 'Shopping',
        value: 'shopping',
        iconProps: {
          name: 'custom-cart',
          size: responsiveFontSize(5),
          color: 'black',
        },
      },
      {
        label: 'Posting',
        value: 'posting',
        iconProps: {
          name: 'custom-posting',
          size: responsiveFontSize(5),
          color: 'black',
        },
      },
      {
        label: 'Notification',
        value: 'notification',
        iconProps: {
          name: 'custom-notification',
          size: responsiveFontSize(5),
          color: 'black',
        },
      },
      {
        label: 'Profile',
        value: 'profile',
        iconProps: {
          name: 'custom-account',
          size: responsiveFontSize(5),
          color: 'black',
        },
      },
    ]);
  }, []);

  return (
    <navContext.Provider
      value={{
        navState,
        navHandler,
        headerAnimation: {scrollY, HEADER_EXPANDED_HEIGHT, COLLAPSED_HEIGHT},
      }}>
      <Animated.ScrollView
        scrollEventThrottle={30}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        style={styles.content}>
        <ViewPage navState={navState} value="home">
          <Home />
        </ViewPage>
        <ViewPage navState={navState} value="shopping">
          <CommingSoon />
        </ViewPage>
        <ViewPage navState={navState} value="posting">
          <Posting />
        </ViewPage>
        <ViewPage navState={navState} value="notification">
          <CommingSoon />
        </ViewPage>
        <ViewPage navState={navState} value="profile">
          <CommingSoon />
        </ViewPage>
      </Animated.ScrollView>

      <Animated.View
        opacity={scrollY.interpolate({
          inputRange: [0, NAVBAR_EXPANDED_HEIGHT - COLLAPSED_HEIGHT],
          outputRange: [NAVBAR_EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
          extrapolate: 'clamp',
        })}
        style={{
          ...styles.navigationBar,
          height: scrollY.interpolate({
            inputRange: [0, NAVBAR_EXPANDED_HEIGHT - COLLAPSED_HEIGHT],
            outputRange: [NAVBAR_EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
            extrapolate: 'clamp',
          }),
        }}>
        <Animated.View
          style={{...navigationStyle.pointer, transform: [{translateX}]}}
        />
        <CustomBottomBar onTabPress={handle.slide} />
      </Animated.View>
    </navContext.Provider>
  );
}

export default AppNavigator;
