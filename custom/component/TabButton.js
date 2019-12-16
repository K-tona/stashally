import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useComponentLayout} from '../hooks';

const translateX = new Animated.Value(responsiveWidth(3));
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: responsiveWidth(80),
    height: responsiveHeight(5),
    paddingTop: responsiveHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabWrapper: {
    flexDirection: 'column',
  },
  fontWrapper: {
    flexDirection: 'row',
  },
  tabButtonStyle: {
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(3),
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
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        <View style={styles.fontWrapper}>
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
                      ? responsiveWidth(3)
                      : (tabLayout.width + responsiveWidth(3)) * 2,
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
    </View>
  );
}

export default React.memo(TabButton);
