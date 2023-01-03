// react
import { useState } from "react"
// router
import { useParams } from "react-router-dom"
// hooks
import useFetch from "../hooks/useFetch"

const Details = () => {
  const [book, setBook] = useState()

  // get url params
  const params = useParams()

  // get books
  useFetch('/api/books.json')
    .then(data => setBook(data[params.id].about))
    .catch(err => {})

  return (
    <main className="details wrapper">

      <h1 className="title">{ book && book.title }</h1>

      <div className="cont">
        <img src={book && "/images/covers/" + book.cover} />
        <div className="about">
          <ul>
            <li>Автор: <span>Князян А.З.</span></li>
            <li>Категории: <span>{ book && book.categories.join(', ') }</span></li>
          </ul>
          <a href={"/story/" + params.id + "/1"} className="btn">Читать</a>
        </div>
      </div>

      <div className="description">
        <h4>Описание:</h4>
        <p>{ book && book.description }</p>
      </div>

      <div className="contents">
        <h4>Содержание</h4>
        {
          book && book.contents.map((chapter, i) => (
            <a href={"/story/" + params.id + "/" + (i+1)} key={i}>{ chapter }</a>
          ))
        }
      </div>

    </main>
  )
}
 
export default Details