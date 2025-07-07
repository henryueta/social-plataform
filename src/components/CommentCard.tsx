
const CommentCard = () => {
  return (
    <article className="commentCardArticle">
        <div className="fieldContainer">
            <input
            placeholder="Adicione um comentário"
             type="text" />
        </div>
        <div className="sendContainer">
            <button>Enviar</button>
        </div>
    </article>
  )
}

export default CommentCard
