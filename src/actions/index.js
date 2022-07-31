export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING',
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR',
  };
};

export const deleteHero = (id) => {
  return {
    type: 'HEROES_DELETE',
    payload: id,
  };
};

export const addHeroForm = (data) => {
  return {
    type: 'HEROES_ADD_FORM',
    payload: data,
  };
};

export const elementsFetching = () => {
  return {
    type: 'ELEMENTS_FETCHING',
  };
};

export const elementsFetched = (elements) => {
  return {
    type: 'ELEMENTS_FETCHED',
    payload: elements,
  };
};

export const elementsFetchingError = () => {
  return {
    type: 'ELEMENTS_FETCHING_ERROR',
  };
};

export const filterHeroes = (filter) => {
  return {
    type: 'HEROES_FILTER',
    payload: filter,
  };
};
