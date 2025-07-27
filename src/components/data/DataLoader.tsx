import Load from "../ui/Load"

const DataLoader = ({isLoading,children}:{isLoading:boolean,children:React.ReactNode}) => {
  return (
    <>
        <Load
        isLoading = {isLoading}
        />
        {
            !isLoading
            &&
            children
        }
    </>
  )
}

export default DataLoader
