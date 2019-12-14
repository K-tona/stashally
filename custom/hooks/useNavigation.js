import {useReducer} from 'react';

const useNavigation = () => {
  const initialState = {
    activeIndex: 0,
    activeColor: '#3BE1FF',
    inActiveColor: 'black',
    // availableRoute: [
    //   {label: '', value: '', iconProps: {name: '', size: 12, color: 'red'}},
    // ],
    availableRoutes: [],
  };
  const reducer = (state, action) => {
    const {type, payload, input} = action;
    switch (type) {
      case 'SET_ROUTES':
        return {
          ...state,
          availableRoutes: payload,
        };
      case 'SET_ACTIVE_INDEX':
        return {...state, activeIndex: payload};
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const handler = {
    setRoutes: routeLst => dispatch({type: 'SET_ROUTES', payload: routeLst}),
    navigate: value => {
      const idx = state.availableRoutes.findIndex(d => d.value === value);
      dispatch({type: 'SET_ACTIVE_INDEX', payload: idx});
    },
  };
  return {state, handler};
};

export default useNavigation;
