
interface DataFetcherComponentPros {
    data:{
        value:object[] | object | null,
        title:string,
        word_gender:'m'|'f',
        type:'object'|'array'
    },
    isLoading:boolean,
    children:React.ReactNode
}

export type {
    DataFetcherComponentPros
}