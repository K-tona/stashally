import {useReducer} from 'react';

const useSearchInput = () => {
  const initialState = {
    value: '',
  };
  const reducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
      case 'SET_INPUT':
        return {value: payload};
      case 'RESET_INPUT':
        return initialState;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const handle = {
    setInput: text => {
      dispatch({type: 'SET_INPUT', payload: text});
    },
    resetInput: () => {
      dispatch({type: 'RESET_INPUT'});
    },
  };
  return [state, handle];
};
export default useSearchInput;
