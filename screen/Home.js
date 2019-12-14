import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import {
  SearchInput,
  TabButton,
  PostCard,
  CustomHeader,
} from '../custom/component';
import {useTabPage, useSearchInput} from '../custom/hooks';
import {useSelector, useDispatch} from 'react-redux';
import {navContext} from '../navigator/AppNavigator';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: responsiveFontSize(2),
    paddingBottom: responsiveHeight(1),
    textAlign: 'center',
    fontFamily: 'VisbyRoundCF-Bold',
    color: 'white',
  },
  SearhContainer: {
    flexDirection: 'column',
    padding: responsiveHeight(1),
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  afterHeader: {
    flexDirection: 'row-reverse',
    width: responsiveWidth(95),
    alignItems: 'center',
  },
});

function Home() {
  const [tabState, tabHandler] = useTabPage();
  const {user, posts, users, liking} = useSelector(state => state);
  const dispatch = useDispatch();
  const [leftColumn, setLeftColumn] = useState([]);
  const [rightColumn, setRightColumn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchState, searchHandler] = useSearchInput();
  const {headerAnimation} = useContext(navContext);
  const {scrollY, HEADER_EXPANDED_HEIGHT, COLLAPSED_HEIGHT} = headerAnimation;

  useEffect(() => {
    tabHandler.setMenu([{name: 'FEED'}, {name: 'COMMUNITY'}]);
  }, []);

  useEffect(() => {
    user ? dispatch({type: 'INITIATE_LIKING', payload: user.liking}) : null;
  }, [user]);

  useEffect(() => {
    const merging = (posts, users, liking, noColumn) => {
      return posts
        .filter(d =>
          d.title
            ? `${d.title}`
                .toLowerCase()
                .includes(searchState.value.toLowerCase())
            : true,
        )
        .filter((p, i) => i % 2 === noColumn)
        .map(d => {
          const isLike = liking.find(u => u.id === d.id);
          const us = users.find(u => u.id === d.user_id);
          return {
            ...d,
            user_name: us.name,
            user_pp: us.picture,
            dispatch,
            isLike: isLike ? isLike.status : -1,
          };
        });
    };

    if (posts && users && liking) {
      setLeftColumn(merging(posts, users, liking, 0));
      setRightColumn(merging(posts, users, liking, 1));
      setLoading(false);
    }
  }, [posts, users, liking, searchState]);

  return (
    <>
      <Animated.View
        opacity={scrollY.interpolate({
          inputRange: [0, HEADER_EXPANDED_HEIGHT - COLLAPSED_HEIGHT],
          outputRange: [HEADER_EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
          extrapolate: 'clamp',
        })}
        style={{
          ...styles.header,
          height: scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
            extrapolate: 'clamp',
          }),
        }}>
        <CustomHeader>
          <Text style={styles.logo}>stashally</Text>
          <SearchInput searchHandler={searchHandler} />
        </CustomHeader>
      </Animated.View>
      <View style={styles.afterHeader}>
        <TouchableOpacity style={{heigth: responsiveHeight(4)}}>
          <Icon name="reorder" style={{textAlign: 'right'}} />
        </TouchableOpacity>
        <TabButton tabState={tabState} {...tabHandler} />
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <FlatList
          key={1}
          data={leftColumn}
          style={{padding: responsiveWidth(2)}}
          renderItem={({item: p}) => <PostCard post={p} />}
          ItemSeparatorComponent={() => (
            <View style={{height: responsiveHeight(2)}} />
          )}
        />
        <FlatList
          key={2}
          data={rightColumn}
          style={{padding: responsiveWidth(2)}}
          renderItem={({item: p}) => <PostCard post={p} />}
          ItemSeparatorComponent={() => (
            <View style={{height: responsiveHeight(2)}} />
          )}
        />
      </View>
    </>
  );
}

export default React.memo(Home);
