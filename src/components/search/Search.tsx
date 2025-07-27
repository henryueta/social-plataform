import { useState } from "react"
import search_icon from "../../assets/icons/search_icon.png"

const Search = ({onSearch}:{onSearch:(value:string)=>void}) => {
    const [searchValue,setSearchValue] = useState("");

  return (
    <div className="searchContainer">
        <input 
        type="search" 
        value={searchValue}
        onChange={(e)=>{
            setSearchValue(e.target.value)
        }}
        />
        <button
        onClick={()=>{
            onSearch(searchValue)
        }}
        >
            <img src={search_icon} alt="search_icon" />
        </button>
    </div>
  )
}

export default Search
