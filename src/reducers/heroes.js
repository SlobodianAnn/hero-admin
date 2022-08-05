import { MAIN, STATUS } from '../constants';

const initialState = {
  heroes: [],
  heroesLoadingStatus: STATUS.IDLE,
};

// replace switch case with new Map
// https://www.technicalfeeder.com/2022/01/typescript-replace-switch-case-logic-with-record-object/

// statuses move to json
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case MAIN.HEROES_FETCHING:
//       return {
//         ...state,
//         heroesLoadingStatus: 'loading',
//       };
//     case MAIN.HEROES_FETCHED:
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: 'idle',
//       };
//     case MAIN.HEROES_FETCHING_ERROR:
//       return {
//         ...state,
//         heroesLoadingStatus: 'error',
//       };

//     case MAIN.HEROES_DELETE:
//       return {
//         ...state,
//         heroes: state.heroes.filter((item) => item.id !== action.payload),
//       };

//     case MAIN.HEROES_ADD_FORM:
//       return {
//         ...state,
//         heroes: [...state.heroes, action.payload],
//       };
//     case MAIN.ELEMENTS_FETCHING:
//       return {
//         ...state,
//         elementsLoadingStatus: 'loading',
//       };
//     case MAIN.ELEMENTS_FETCHED:
//       return {
//         ...state,
//         elementsLoadingStatus: 'idle',
//         elements: action.payload,
//       };

//     case MAIN.ELEMENTS_FETCHING_ERROR:
//       return {
//         ...state,
//         elementsLoadingStatus: 'error',
//       };
//     case MAIN.HEROES_FILTER:
//       return {
//         ...state,
//         filterType: action.payload,
//       };

//     default:
//       return state;
//   }
// };

const heroes = (state = initialState, action) => {
  const obj = new Map([
    [
      MAIN.HEROES_FETCHING,
      {
        ...state,
        heroesLoadingStatus: STATUS.LOADING,
      },
    ],
    [
      MAIN.HEROES_FETCHED,
      {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: STATUS.IDLE,
      },
    ],
    [
      MAIN.HEROES_FETCHING_ERROR,
      {
        ...state,
        heroesLoadingStatus: STATUS.ERROR,
      },
    ],
    [
      MAIN.HEROES_DELETE,
      {
        ...state,
        heroes: state.heroes.filter((item) => item.id !== action.payload),
      },
    ],
    [
      MAIN.HEROES_ADD_FORM,
      {
        ...state,
        heroes: [...state.heroes, action.payload],
      },
    ],
  ]);

  const result = obj.get(action.type);

  if (result === undefined) {
    return state;
  }
  return result;
};

export default heroes;
