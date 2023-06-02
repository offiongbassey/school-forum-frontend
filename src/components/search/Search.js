import React from 'react';
import styles from "./Search.module.css";
import {BiSearch} from "react-icons/bi";


const Search = ({value, onChange}) => {
  return (
    <div className={styles.search}>
        <div className='form-group'>
        <BiSearch size={18} className={styles.icon}/>
        <input type="text" placeholder='Search Products' 
        value={value} onChange={onChange}
        className='form-control' 
        />
        </div>
    </div>
  )
}

export default Search
