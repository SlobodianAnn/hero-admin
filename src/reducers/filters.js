import { MAIN, STATUS } from '../constants';

const initialState = {
  filters: [],
  elementsLoadingStatus: STATUS.IDLE,
  elements: [],
  filterType: 'all',
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

const filters = (state = initialState, action) => {
  const obj = new Map([
    [
      MAIN.ELEMENTS_FETCHING,
      {
        ...state,
        elementsLoadingStatus: STATUS.LOADING,
      },
    ],
    [
      MAIN.ELEMENTS_FETCHED,
      {
        ...state,
        elementsLoadingStatus: STATUS.IDLE,
        elements: action.payload,
      },
    ],
    [
      MAIN.ELEMENTS_FETCHING_ERROR,
      {
        ...state,
        elementsLoadingStatus: STATUS.ERROR,
      },
    ],
    [
      MAIN.HEROES_FILTER,
      {
        ...state,
        filterType: action.payload,
      },
    ],
  ]);

  const result = obj.get(action.type);

  if (result === undefined) {
    return state;
  }
  return result;
};

export default filters;
