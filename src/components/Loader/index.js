import React from 'react'
import s from '../../styles/Loader.module.scss'
import load from './load.svg'

const Loader = () => {
   return (
     <>
        <div className={s.loader}>
          <img src={load} alt="loader"/>
        </div>
     </>
   )
}

export default Loader