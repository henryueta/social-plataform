import type { DataFetcherComponentPros } from "../../types/data-fetcher-type";
import NoData from "../NoData"

const DataFetcher = ({
    data,
    isLoading,
    children,
    noDataMessage
}:DataFetcherComponentPros) => {
    
    const checkDataValue = 
    data.value
    &&
    (data.type === 'array'
    ? (()=>{
        const array_data = data.value as object[];
        return !!array_data.length
    })()
    : 
    data.type === 'object'
    &&
    (()=>{
        const object_data = data.value as object
        return !!object_data
    })())

  return (
    data.value
    &&
    checkDataValue
    ?
    children
    :
    !!(!checkDataValue && noDataMessage)
    &&
    <NoData 
    data_title={data.title} 
    word_gender={data.word_gender} 
    isLoading={isLoading}/>
  )
}

export default DataFetcher
