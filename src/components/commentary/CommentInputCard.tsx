
const CommentInputCard = () => {
  return (
    <article className="commentInputCardArticle">
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

export default CommentInputCard
