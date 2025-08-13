import { Link, useParams } from "react-router-dom"
import useHandlePath from "../../hooks/useHandlePath"
import PostCard from "./PostCard"
import { useRef } from "react";
import Load from "../ui/Load";
import type { PostCardComponentProps } from "../../types/post-type";
import ProfileView from "../profile/ProfileView";
import { post_list_filter } from "../../constants/post-constant";
import DataFetcher from "../data/DataFetcher";
import useHandlePost from "../../hooks/useHandlePost";
import useHandleList from "../../hooks/useHandleList";

const PostList = ({user_username,search,isForSearch}
  :{user_username?:string,search?:string,isForSearch?:boolean}) => {

    const {onGetPost,postQueryState} = useHandlePost();
    const {onMatch,pathname} = useHandlePath();
    const postListDataRef = useRef<HTMLDivElement>(null);
    const {type} = useParams();

    const onQueryPostList = ()=>{
      onGetPost({
          mode:'group',
          type:(!!user_username
          ? "especific"
          : 
            !!search
            ? "search"
            : type as 'following'|'all')
        },{
          onThen(result) {
        const current_response = result.response.data;
          setListState({
          type:"data",
          value:{
            value:current_response.isStart
            ? current_response.post_list
            :!!listState.data.value.length 
            ? [...listState.data.value,...current_response.post_list]
            : current_response.post_list,
            remaining:current_response.post_list_count_remaining,
            liked:current_response.post_list.filter((post:PostCardComponentProps)=>{
              return current_response.liked_posts.includes(post.post_id)
            })
          }
        })
          },
          onCatch(error) {
            console.log(error)
          }
        },
        {
          limit:listState.filter.limit,
          page:listState.filter.page,
          username:user_username,
          search:search
        })
    }

    const {listState,setListState,handleListView} = useHandleList<PostCardComponentProps>({
      config:{
        page:1,
        limit:5,
        mode:"automatic"
      },
      functions:{
        query:onQueryPostList
      },
      identifier:!!user_username
      ? user_username
      : 
        !!search
        ? search
        : type,
      references:{
        listContainerRef:postListDataRef
      }
    });

  return (
    <div 
    style={{
      paddingTop:
      isForSearch
      ? "7rem"
      : "0rem"
    }}
    className={"postListContainer"} 
    ref={postListDataRef} 
    onScrollEnd={()=>{
      (!postQueryState.isLoading
      &&
      handleListView())
    }}
    >
            {
              !!user_username
              &&
              <ProfileView username={user_username}/>
            }
            {
              !user_username || (!search && !user_username)
              &&
              <div className="postListFilter">
              {
          
                post_list_filter.map((post_filter)=>
                
                  <Link 
                  to={'/posts/'+post_filter.type}
                  style={{
                  borderBottom:
                    onMatch('/posts/'+post_filter.type as string,pathname)
                    ? "0.1rem solid gray"
                    : "none"
                  }}
                  >
                  {
                    post_filter.title
                  }
                  </Link>
                )
              }
            </div>
              
            }
            
            <div 
            style={{
                    paddingBottom:"10rem"
            }}
            className={"postList "+(!!search ? "search": "")}>
              {
                <DataFetcher
                noDataMessage={false}
                data={{
                type:'array',
                value:listState.data.value as object[],
                title:'Postagem',
                word_gender:"f"
                }}
                isLoading={!!postQueryState.isLoading}
              >
                {
                !!listState.data.value.length
                  &&
                  listState.data.value.map((post)=>
                  <PostCard
                  isSameUser={false}
                  detailedView={false}
                  key={post.post_id}
                  postData={post}
                  liked={!!listState.data.liked?.includes(post)}
                  />
                  )
                }
              </DataFetcher>
              }
                {
                  listState.data.remaining
                  &&
                  <div className="loadListContainer">
                      <Load
                    isLoading={!!postQueryState.isLoading}
                    />
                  </div>
                }
            </div>
    </div>
  )
}

export default PostList
