import Spinner from "./Spinner"

const Load = ({isLoading}:{isLoading:boolean}) => {
  return !!isLoading && <Spinner/>
}

export default Load
