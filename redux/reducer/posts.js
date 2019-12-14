import uuid from 'uuid/v1';

const posts = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'ADD_POST':
      return [
        ...state,
        {
          id: uuid(),
          title: payload.title,
          user_id: payload.user_id,
          images: payload.images,
          description: payload.description,
          categories: payload.categories,
          groups: payload.groups,
          product: payload.product,
          stashes: payload.stashes,
          likeCounter: 0,
          likeStatus: 0,
        },
      ];
    case 'LIKE_POST':
      return state.map(s =>
        s.id === payload.id
          ? {...s, likeCounter: s.likeCounter + payload.isLike * -1}
          : s,
      );
    case 'DELETE_POST':
      return state.filter(s => s.id !== payload.id);
    default:
      return state;
  }
};

export default posts;
