import { useDispatch } from 'react-redux';
import { filterHeroes } from '../../actions';

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const onFilter = (e) => {
    const filter = e.target.getAttribute('data-filter');
    dispatch(filterHeroes(filter));
  };
  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          <button onClick={onFilter} data-filter="all" className="btn btn-outline-dark active">
            Все
          </button>
          <button onClick={onFilter} data-filter="fire" className="btn btn-danger">
            Огонь
          </button>
          <button onClick={onFilter} data-filter="water" className="btn btn-primary">
            Вода
          </button>
          <button onClick={onFilter} data-filter="wind" className="btn btn-success">
            Ветер
          </button>
          <button onClick={onFilter} data-filter="earth" className="btn btn-secondary">
            Земля
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
