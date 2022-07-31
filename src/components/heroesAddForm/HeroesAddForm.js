/* eslint-disable react-hooks/exhaustive-deps */
import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addHeroForm } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { elementsFetched, elementsFetching, elementsFetchingError } from '../../actions';

const HeroesAddForm = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { elements, elementsLoadingStatus } = useSelector((state) => state);

  const formik = useFormik({
    initialValues: {
      name: '',
      text: '',
      element: '',
    },

    // Інформацію про валідацію винести в json (можливо підключити i18) 
    // поганий тон так зберігати інфу
    validationSchema: Yup.object({
      name: Yup.string().min(2, 'Введите не менее двух символов').required('Заполните поля'),
      text: Yup.string().min(10, 'Введите не менее 10 символов').required('Заполните поле'),
      element: Yup.string().required('Выберите элемент из списка'),
    }),

    onSubmit: (values, { resetForm }) => {
      const data = {
        id: uuidv4(),
        name: values.name,
        description: values.text,
        element: values.element,
      };

      dispatch(addHeroForm(data));
      resetForm();
    },
  });

  useEffect(() => {

    // async await ? https://devtrium.com/posts/async-functions-useeffect
    dispatch(elementsFetching());
    request('http://localhost:3001/filters')
      .then((data) => dispatch(elementsFetched(data)))
      .catch(() => dispatch(elementsFetchingError()));
  }, []);

  const renderHeroElements = (arr) => {
    if (arr.length !== 0 && elementsLoadingStatus === 'idle') {
      // eslint-disable-next-line array-callback-return
      return arr.map((item) => {
        for (const key in item) {
          return <OptionElement key={key} valueElement={key} text={item[key]} />;
        }
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input required type="text" name="name" className="form-control" id="name" placeholder="Как меня зовут?" {...formik.getFieldProps('name')} />
        {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: '130px' }}
          {...formik.getFieldProps('text')}
        />
        {formik.errors.text && formik.touched.text ? <div className="error">{formik.errors.text}</div> : null}
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select required className="form-select" id="element" name="element" {...formik.getFieldProps('element')}>
          <option>Я владею элементом...</option>
          {renderHeroElements(elements)}
        </select>
        {formik.errors.element && formik.touched.element ? <div className="error">{formik.errors.element}</div> : null}
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

const OptionElement = (props) => {
  const { valueElement, text } = props;
  return <option value={valueElement}>{text}</option>;
};

export default HeroesAddForm;
