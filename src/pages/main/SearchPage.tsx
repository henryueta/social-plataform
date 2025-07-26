import { useParams } from "react-router-dom"
import SocialLayout from "../../layout/SocialLayout"
import Search from "../../components/Search";
import PostList from "../../components/post/PostList";
import { useState } from "react";
import "../../styles/search.css"
import ProfileList from "../../components/profile/ProfileList";
import Filter from "../../components/Filter";
import useHandlePath from "../../hooks/useHandlePath";

const SearchPage = () => {

  const {type} = useParams();
  const [searchValue,setSearchValue] = useState("");
  const {onTransition} = useHandlePath();

  return (
    <SocialLayout>
        <Search
        onSearch={(value)=>{
          setSearchValue(value)
        }}
        />
        <Filter
        filterList={[
          {
            title:"Post",
            value:"post"
          },
          {
            title:"Conta",
            value:"user"
          }
        ]}
        onFilter={(value)=>{
            onTransition("/search/"+value)
        }}
        />
        {
          type === 'post'
          ? <PostList
          search={searchValue}
          />
          : 
          type === 'user'
          &&
          <ProfileList
          type="search"
          isForPage
          search={searchValue}
          />
        }
    </SocialLayout>
  )
}

export default SearchPage
