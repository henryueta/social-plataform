
interface TitleHeaderProps {

    title:string,
    subtitle?:string

}

const TitleHeader = ({title,subtitle}:TitleHeaderProps) => {
  return (
    <section className="headerSection">
        <div className="titleContainer">
            <h1>
                {
                    title
                }
            </h1>
        </div>
        <div className="subtitleContainer">
            <p>
                {
                    subtitle
                }
            </p>
        </div>
    </section>
  )
}

export default TitleHeader
