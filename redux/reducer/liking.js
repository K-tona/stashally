const liking = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'INITIATE_LIKING':
      return payload;
    default:
      return state;
  }
};

export default liking;
