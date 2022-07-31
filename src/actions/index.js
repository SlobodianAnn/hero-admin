import { MAIN } from '../constants'

export const heroesFetching = () => ({ type: MAIN.HEROES_FETCHING })
export const elementsFetching = () => ({ type: MAIN.ELEMENTS_FETCHING })
export const heroesFetchingError = () => ({ type: MAIN.HEROES_FETCHING_ERROR })
export const elementsFetchingError = () => ({ type: MAIN.ELEMENTS_FETCHING_ERROR })

const helperFunc = (typeName, payload) => ({ type: typeName, payload })

export const heroesFetched =(heroes) => helperFunc(MAIN.HEROES_FETCHED, heroes)

export const deleteHero = (id) => helperFunc(MAIN.HEROES_DELETE, id)

export const addHeroForm = (data) => helperFunc(MAIN.HEROES_ADD_FORM, data)

export const elementsFetched = (elements) => helperFunc(MAIN.ELEMENTS_FETCHED, elements)

export const filterHeroes = (filter) => helperFunc(MAIN.HEROES_FILTER, filter)