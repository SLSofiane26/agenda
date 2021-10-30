let initialState = {
  nom: null,
  prenom: null,
  email: null,
  token: null,
  orientation: 'PORTRAIT',
};

let reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'register':
      console.log(action.payload.token);
      return Object.assign({}, state, {
        token: action.payload.token,
      });
      break;
    case 'login':
      return Object.assign({}, state, {
        token: action.payload.token,
      });
      break;
    case 'logout':
      return Object.assign({}, state, {
        token: null,
      });
      break;
    case 'user':
      return Object.assign({}, state, {
        nom: action.payload.data.firstName,
        prenom: action.payload.data.lastName,
        email: action.payload.data.email,
      });
      break;
    case 'change':
      return Object.assign({}, state, {
        orientation: action.payload.data,
      });
      break;
    default:
      break;
  }
  return state;
};

export default reducer;
