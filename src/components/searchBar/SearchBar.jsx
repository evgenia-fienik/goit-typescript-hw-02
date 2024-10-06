import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

const SearchBar = ({onSubmit}) => { 
    const [input, setInput] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!input.trim()) {
        toast.error('Please enter a search term.');
        return;
      }
        onSubmit(input.trim());
        setInput('');
    };
  return (
      
    <header className={css.header} >
     
      <form className={css.form} onSubmit={handleSubmit}>
          
          <input className={css.input}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={input}
      onChange={(e)=> setInput(e.target.value)}
        />
        <button className={css.btnSearch} type="submit"><FaSearch /></button>
        </form>
       
</header>
    )
}

export default SearchBar;