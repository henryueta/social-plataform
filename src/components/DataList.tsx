// import { useRef } from "react"
// import useHandleList from "../hooks/useHandleList";
// import type { ListDataComponentProps } from "../types/lits-type";
// import DataFetcher from "./data/DataFetcher";
    
// const DataList =  <T,C extends HTMLElement>({
//     data,
//     config,
//     functions,
//     isLoading
// }:ListDataComponentProps<T ,C>) => {
//     const dataListContainer = useRef<HTMLDivElement>(null);
//     const dataListExpansionContainer = useRef<HTMLButtonElement>(null)

//     const {listState} = useHandleList<C,T>({
//         references:{
//             listContainerRef:dataListContainer,
//             listExpansionContainerRef:dataListExpansionContainer
//         },
//         config:{
//             limit:config.limit,
//             mode:config.mode
//         },
//         functions:{
//             map:functions.map,
//             query:functions.query
//         },
//         identifier:data.identifier
//     })

//     return (
//     <div ref={dataListContainer}>
        
//             <DataFetcher
//                 data={{
//                 type:'array',
//                 value:listState.data.value as object[],
//                 title:'Postagem',
//                 word_gender:"f"
//                 }}
//                 isLoading={!!isLoading}
//               >
//                 {
//                 !!listState.data.value
//                   &&
//                   listState.data.value.map((item,value)=>{
//                     return functions.map(item,value).map((element)=>{
//                         return<></>
//                     })
//                   })
//                 }
//               </DataFetcher>
              
//             {/* <div className="loadListContainer">
//                 <Load
//             isLoading={!!postQueryState.isLoading}
//             /> */}
        
//       <button ref={dataListExpansionContainer}>Ver mais</button>
//     </div>
//   )
// }

// export default DataList
