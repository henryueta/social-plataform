import { useEffect, useState } from "react"

const Filter = ({filterList,onFilter}:
{
    filterList:{
    title:string,
    value:string
    }[],
    onFilter:(value:string)=>void
}
) => {

    const [currentFilter,setCurrentFilter] = useState(filterList[0].value);

    useEffect(()=>{

        onFilter(currentFilter)

    },[currentFilter])

  return (
    <div className="filterContainer">
        {
            filterList.map((item,index)=>
                <button
                key={index}
                onClick={()=>{
                    setCurrentFilter(item.value)
                }}
                >
                    {item.title}
                </button>
            )
        }
    </div>
  )
}

export default Filter
