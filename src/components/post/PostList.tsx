import { Link } from "react-router-dom"
import useHandlePath from "../../hooks/useHandlePath"
import PostCard from "./PostCard"
import { useRef } from "react";
import Load from "../Load";
import type { PostCardComponentProps } from "../../types/post-type";
import ProfileView from "../profile/ProfileView";
import { post_list_filter } from "../../constants/post-constant";
import DataFetcher from "../data/DataFetcher";
import useHandlePost from "../../hooks/useHandlePost";
import useHandleList from "../../hooks/useHandleList";

const PostList = ({user_username}:{user_username?:string}) => {

    const {onGetPost,postQueryState} = useHandlePost();
    const {onMatch,pathname} = useHandlePath();
    const postListDataRef = useRef<HTMLDivElement>(null);

    const onQueryPostList = ()=>{
      onGetPost({
          mode:'group',
          type:(!!user_username
          ? "especific"
          : "all")
        },{
          onThen(result) {
        const current_response = result.response.data;
        setListState({
          type:"data",
          value:{
            value:current_response.post_list,
            remaining:current_response.post_list_count_remaining,
            liked:current_response.post_list.filter((post:PostCardComponentProps)=>{
              return current_response.liked_posts.includes(post.post_id)
            })
          }
        })
          },
          onCatch(error) {
            console.log(error)
          },
        },
        {
          limit:listState.filter.limit,
          username:user_username
        })
    }

    const {listState,setListState} = useHandleList<PostCardComponentProps>({
      config:{
        limit:5,
        mode:"automatic"
      },
      functions:{
        query:onQueryPostList
      },
      identifier:user_username,
      references:{
        listContainerRef:postListDataRef
      }
    });

  return (
    <div className="postListContainer" ref={postListDataRef}>
            {
              !!user_username
              &&
              <ProfileView username={user_username}/>
            }
            <div className="postListFilter">
              {
                !user_username
                &&
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
            <div className="postList">
              {
                <DataFetcher
                data={{
                type:'array',
                value:listState.data.value as object[],
                title:'Postagem',
                word_gender:"f"
                }}
                isLoading={!!postQueryState.isLoading}
              >
                {
                !!listState.data.value
                  &&
                  listState.data.value.map((post)=>
                  <PostCard
                  detailedView={false}
                  key={post.post_id}
                  postData={post}
                  liked={!!listState.data.liked?.includes(post)}
                  />
                  )
                }
              </DataFetcher>
              }
                <div className="loadListContainer">
                  <Load
                isLoading={!!postQueryState.isLoading}
                />
                </div>
            </div>
    </div>
  )
}

export default PostList
