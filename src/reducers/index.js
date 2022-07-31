const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  elementsLoadingStatus: 'idle',
  elements: [],
  filteredHeroes: [],
  filterType: 'all',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle',
        filteredHeroes: action.payload,
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };

    case 'HEROES_DELETE':
      const newHeroList = state.heroes.filter((item) => item.id !== action.payload);
      return {
        ...state,
        heroes: newHeroList,
        filteredHeroes: newHeroList,
      };

    case 'HEROES_ADD_FORM':
      const newHeroArr = [...state.heroes, action.payload];
      const filteredWithHero = state.filterType === 'all' ? newHeroArr : newHeroArr.filter((item) => item.element === state.filterType);
      return {
        ...state,
        heroes: newHeroArr,
        filteredHeroes: filteredWithHero,
      };
    case 'ELEMENTS_FETCHING':
      return {
        ...state,
        elementsLoadingStatus: 'loading',
      };
    case 'ELEMENTS_FETCHED':
      return {
        ...state,
        elementsLoadingStatus: 'idle',
        elements: action.payload,
      };

    case 'ELEMENTS_FETCHING_ERROR':
      return {
        ...state,
        elementsLoadingStatus: 'error',
      };
    case 'HEROES_FILTER':
      const filteredHeroList = action.payload === 'all' ? state.heroes : state.heroes.filter((item) => item.element === action.payload);

      return {
        ...state,
        filteredHeroes: filteredHeroList,
        filterType: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
