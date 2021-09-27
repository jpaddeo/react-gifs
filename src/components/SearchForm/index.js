import React, { useReducer } from 'react';
import { useLocation } from 'wouter';

const RATINGS = ['g', 'pg', 'pg-13', 'r'];

const ACTIONS = {
  UPDATE_KEYWORD: 'update_keyword',
  UPDATE_RATING: 'update_rating',
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
};
const reducerFunctinal = (state, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type];
  return actionReducer ? actionReducer(state, action) : state;
};
const reducer = (state, action) => {
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
    default:
      return state;
  }
};

function SearchForm({ initialKeyword = '', initialRating }) {
  const [state, dispatch] = useReducer(reducer, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    times: 0,
  });

  const { keyword, rating, times } = state;

  const [_, pushLocation] = useLocation();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    pushLocation(`/search/${keyword}/${rating}`);
  };

  const handleChange = (ev) => {
    dispatch({ type: ACTIONS.UPDATE_KEYWORD, payload: ev.target.value });
  };

  const handleChangeRating = (ev) => {
    dispatch({ type: ACTIONS.UPDATE_RATING, payload: ev.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={keyword}
        onChange={handleChange}
        placeholder='Search a gif...'
      />
      <select value={rating} onChange={handleChangeRating}>
        <option disabled>Rating type</option>
        {RATINGS.map((rating) => (
          <option key={rating}>{rating}</option>
        ))}
      </select>
      <small>{times}</small>
    </form>
  );
}

export default React.memo(SearchForm);
