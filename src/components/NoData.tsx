import Load from "./Load"

const NoData = (
    {data_title,word_gender,isLoading}:
    {data_title:string,word_gender:'f'|'m',isLoading:boolean}
) => {
  return (
    !isLoading
    ? <div className="noDataContainer">
        {`Nenhum${
            word_gender === 'f'
            ? 'a'
            : ''
        } ${data_title}
        encontrad${
            word_gender === 'm'
            ? 'o'
            : 'a'
        }`}
        </div>
    : <Load
    isLoading={isLoading}
    />
  )
}

export default NoData
