import React from 'react'
import s from './Navigation.module.css'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
const Header = () => {
    const setActiveClass = ({ isActive }) => {
        return clsx(s.link, isActive && s.active);
    }
    return (
        <header className={s.header}>
            <h2>Navigation</h2>
            <nav className={s.nav}>
                <NavLink className={setActiveClass} to="/">Home</NavLink>
                <NavLink className={setActiveClass} to="/movies">Movies</NavLink>
            </nav>
        </header>
    )
}

export default Header
