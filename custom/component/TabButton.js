import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useComponentLayout} from '../hooks';

const translateX = new Animated.Value(responsiveHeight(12));
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: responsiveWidth(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonStyle: {
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(3),
  },
  tabWrapper: {
    justifyContent: 'center',
    height: responsiveHeight(5),
    paddingTop: responsiveHeight(1),
  },
});

function TabButton(props) {
  const {tabState, changePage} = props;
  const {index, menu} = tabState;
  const [tabLayout, onTabLayout] = useComponentLayout();
  const [pointer, setPointer] = useState({
    height: responsiveHeight(1),
    width: 0,
    backgroundColor: 'lightblue',
  });

  const handle = {
    slide: type => {
      Animated.spring(translateX, {toValue: type, Durration: 100}).start();
      setPointer(prevState => ({...prevState, width: tabLayout.width}));
    },
  };

  useEffect(() => {
    if (tabLayout) {
      setPointer(prevState => ({...prevState, width: tabLayout.width}));
    }
  }, [tabLayout]);

  return (
    <View style={styles.tabWrapper}>
      <View style={styles.container}>
        {menu.map((option, idx) => {
          const isActiveIndex = idx === index;
          const {name} = option;
          const page = idx;
          return (
            <TouchableOpacity
              style={styles.tabButtonStyle}
              key={idx}
              onPress={() => {
                changePage(page);
                handle.slide(
                  idx % 2 === 0
                    ? responsiveHeight(12)
                    : (tabLayout.width + responsiveHeight(7)) * 2,
                );
              }}>
              <Text
                style={{
                  color: isActiveIndex ? 'lightblue' : 'black',
                  fontSize: responsiveFontSize(2),
                }}
                onLayout={e => (idx % 2 === 0 ? onTabLayout(e) : null)}>
                {name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Animated.View style={{...pointer, transform: [{translateX}]}} />
    </View>
  );
}

export default React.memo(TabButton);
