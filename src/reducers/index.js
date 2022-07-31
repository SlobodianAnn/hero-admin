import { MAIN } from '../constants'

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  elementsLoadingStatus: 'idle',
  elements: [],
  filteredHeroes: [],
  filterType: 'all',
};

// replace switch case with new Map
// https://www.technicalfeeder.com/2022/01/typescript-replace-switch-case-logic-with-record-object/

// statuses move to json
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIN.HEROES_FETCHING:
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case MAIN.HEROES_FETCHED:
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle',
        filteredHeroes: action.payload,
      };
    case MAIN.HEROES_FETCHING_ERROR:
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };

    case MAIN.HEROES_DELETE:
      const newHeroList = state.heroes.filter((item) => item.id !== action.payload);
      return {
        ...state,
        heroes: newHeroList,
        filteredHeroes: newHeroList,
      };

    case MAIN.HEROES_ADD_FORM:
      const newHeroArr = [...state.heroes, action.payload];
      const filteredWithHero = state.filterType === 'all' ? newHeroArr : newHeroArr.filter((item) => item.element === state.filterType);
      return {
        ...state,
        heroes: newHeroArr,
        filteredHeroes: filteredWithHero,
      };
    case MAIN.ELEMENTS_FETCHING:
      return {
        ...state,
        elementsLoadingStatus: 'loading',
      };
    case MAIN.ELEMENTS_FETCHED:
      return {
        ...state,
        elementsLoadingStatus: 'idle',
        elements: action.payload,
      };

    case MAIN.ELEMENTS_FETCHING_ERROR:
      return {
        ...state,
        elementsLoadingStatus: 'error',
      };
    case MAIN.HEROES_FILTER:
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
