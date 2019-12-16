import {useReducer} from 'react';

function useFormInput() {
  const initialState = {
    title: '',
    description: '',
    categories: [{key: 0, value: ''}],
    product: [],
    groups: [],
    stashes: [],
    images: [],
  };
  const reducer = (state, action) => {
    const {type, input, payload} = action;
    switch (type) {
      case 'SET_FIELD_TITLE':
        return {...state, title: payload};
      case 'SET_FIELD_DESCRIPTION':
        return {...state, description: payload};
      case 'SET_MULTIFIELD_CATEGORIES':
        return {
          ...state,
          categories: state.categories.map((c, idx) =>
            idx === input.key ? {...c, value: payload} : c,
          ),
        };
      case 'ADD_FIELD_CATEGORIES':
        return {
          ...state,
          categories: [
            ...state.categories,
            {key: state.categories.length, value: ''},
          ],
        };
      case 'SET_FIELD_PRODUCT':
        return {
          ...state,
          product: state.product.map((c, idx) =>
            idx === input.key ? {...c, value: payload} : c,
          ),
        };
      case 'ADD_FIELD_PRODUCT':
        return {
          ...state,
          product: [
            ...state.product,
            {key: state.product.length, value: payload},
          ],
        };
      case 'SET_FIELD_GROUPS':
        return {
          ...state,
          groups: state.groups.map((c, idx) =>
            idx === input.key ? {...c, value: payload} : c,
          ),
        };
      case 'ADD_FIELD_GROUPS':
        return {
          ...state,
          groups: [...state.groups, {key: state.groups.length, value: payload}],
        };
      case 'SET_FIELD_STASHES':
        return {...state, stashes: [{...state.stashes[0], value: payload}]};
      case 'ADD_FIELD_STASHES':
        return {
          ...state,
          stashes: [{key: state.stashes.length, value: payload}],
        };
      case 'SET_FIELD_IMAGES':
        return {...state, images: payload};
      case 'RESET_FORM':
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handle = {
    setFieldTouched: (text, field) => {
      dispatch({
        type: `SET_FIELD_${field.toUpperCase()}`,
        input: field,
        payload: text,
      });
    },
    setMultiFieldTouched: (text, field, key) => {
      dispatch({
        type: `SET_MULTIFIELD_${field.toUpperCase()}`,
        input: {field, key},
        payload: text,
      });
    },
    addFieldTouched: (text, field) => {
      dispatch({
        type: `ADD_FIELD_${field.toUpperCase()}`,
        payload: text,
      });
    },
    checkInput: () => {
      if (state.title !== '') {
        return true;
      } else {
        return false;
      }
    },
    resetForm: () => {
      dispatch({type: 'RESET_FORM'});
    },
  };
  return [state, handle];
}

export default useFormInput;
