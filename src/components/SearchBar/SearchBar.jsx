import { Field, Form, Formik } from 'formik';
import React from 'react';
import s from './SearchBar.module.css';

const SearchBar = ({ handleChangeQuery, toast }) => {
  const handleSubmit = (values, actions) => {
    const { query } = values;

    if (!query.trim()) {
      toast.error("Please enter a search query!");
      return;
    }

    if (query.trim().length < 3) {
      toast.error("Search term is too short!");
      return;
    }

    if (query.trim().length > 20) {
      toast.error("Search term is too long!");
      return;
    }

    handleChangeQuery(query.trim());
    actions.resetForm();
  };

  return (
    <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
      <Form className={s.searchForm}>
        <Field
          type="text"
          name="query"
          className={s.searchInput}
          placeholder="Search movies..."
        />
        <button className={s.searchBtn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default SearchBar;
