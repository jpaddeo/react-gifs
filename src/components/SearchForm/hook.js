import { useReducer } from 'react';

const ACTIONS = {
  UPDATE_KEYWORD: 'update_keyword',
  UPDATE_RATING: 'update_rating',
  UPDATE_LANGUAGE: 'update_language',
};
const ACTIONS_REDUCERS = {
  [ACTIONS.UPDATE_KEYWORD]: (state, action) => ({
    ...state,
    keyword: action.payload,
    times: state.times + 1,
  }),
  [ACTIONS.UPDATE_RATING]: (state, action) => ({
    ...state,
    rating: action.payload,
  }),
  [ACTIONS.UPDATE_LANGUAGE]: (state, action) => ({
    ...state,
    language: action.payload,
  }),
};
const REDUCER_FUNCTIONAL = (state, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type];
  return actionReducer ? actionReducer(state, action) : state;
};
const REDUCER = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
        times: state.times + 1,
      };
    case ACTIONS.UPDATE_RATING:
      return {
        ...state,
        rating: action.payload,
      };
    case ACTIONS.UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

const useForm = ({
  initialKeyword = '',
  initialRating = 'g',
  initialLanguage = 'es',
} = {}) => {
  const [state, dispatch] = useReducer(REDUCER_FUNCTIONAL, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    times: 0,
    language: initialLanguage,
  });

  const { keyword, rating, language, times } = state;

  // TODO: useCallback para funciones

  return {
    keyword,
    rating,
    language,
    times,
    updateKeyword: (keyword) =>
      dispatch({
        type: ACTIONS.UPDATE_KEYWORD,
        payload: keyword,
      }),
    updateRating: (rating) =>
      dispatch({
        type: ACTIONS.UPDATE_RATING,
        payload: rating,
      }),
    updateLanguage: (language) =>
      dispatch({
        type: ACTIONS.UPDATE_LANGUAGE,
        payload: language,
      }),
  };
};

export default useForm;
