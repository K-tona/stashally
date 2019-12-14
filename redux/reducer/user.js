const user = (state, action) => {
  const {type, input} = action;
  switch (type) {
    case 'UPDATE_USER_LIKE_STATUS':
      const isLike = state.liking.find(s => s.id === input.id)
        ? state.liking.find(s => s.id === input.id).status
        : 0;
      const newLiking =
        isLike === 0
          ? [...state.liking, {id: input.id, status: 1}]
          : state.liking.map(l =>
              l.id === input.id ? {...l, status: l.status * -1} : l,
            );
      return {...state, liking: [...newLiking]};
    default:
      return state;
  }
};
export default user;
