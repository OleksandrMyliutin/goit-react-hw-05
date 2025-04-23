import React from 'react'
import { Formik, Form, Field } from 'formik';
import s from './MoviesPage.module.css'
const MoviesPage = () => {
    return (
        <div className={s.container}>
            <h2 className={s.trendsTitle}>Movies</h2>
            <div >
                <Formik >
                    <Form className={s.searchForm}>
                        <Field type="text" name="query"/>
                        <button className={s.searchBtn} type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default MoviesPage
