import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../constants';
import { createSelector } from 'reselect';

import { heroesFetching, heroesFetched, heroesFetchingError, deleteHero } from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.filters.filterType,
    (state) => state.heroes.heroes,
    (filter, heroes) => {
      if (filter === 'all') {
        console.log('render');
        return heroes;
      } else {
        return heroes.filter((item) => item.element === filter);
      }
    }
  );

  // const filteredHeroes = useSelector((state) => {
  //   if (state.filters.filterType === 'all') {
  //     return state.heroes.heroes;
  //   } else {
  //     return state.heroes.heroes.filter((item) => item.element === state.filters.filterType);
  //   }
  // });
  const heroesLoadingStatus = useSelector((state) => state.heroesLoadingStatus);
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    // check HeroesAddForm
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const onDeleteHero = (id) => {
    dispatch(deleteHero(id));
  };

  if (heroesLoadingStatus === STATUS.LOADING) {
    return <Spinner />;
  } else if (heroesLoadingStatus === STATUS.ERROR) {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem key={id} {...props} deleteHero={() => onDeleteHero(id)} />;
    });
  };

  const elements = renderHeroesList(filteredHeroes);

  return <ul>{elements}</ul>;
};

export default HeroesList;
