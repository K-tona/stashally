import {useReducer, useCallback} from 'react';

function useTabPage() {
  const initialState = {
    index: 0,
    menu: [],
  };
  const reducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
      case 'SET_MENU':
        return {...state, menu: payload};
      case 'SET_PAGE':
        return {...state, index: payload};
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const handle = {
    changePage: useCallback(
      page => dispatch({type: 'SET_PAGE', payload: page}),
      [state.index],
    ),
    setMenu: useCallback(
      lstMenu => dispatch({type: 'SET_MENU', payload: lstMenu}),
      [state.menu],
    ),
  };

  return [state, handle];
}

export default useTabPage;
