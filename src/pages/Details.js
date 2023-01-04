// react
import { useEffect, useState } from "react"
// router
import { useParams } from "react-router-dom"

const Details = () => {
  const [book, setBook] = useState()

  // get url params
  const params = useParams()

  // get book
  useEffect(()=>{
    fetch('https://ashot2003.github.io/kbooks/api/books.json')
      .then(res => { return res.json() })
      .then(data => setBook(data[params.id].about))
  }, [])

  return (
    <main className="details wrapper">
      <div className="cont">
        <img src={book && "https://ashot2003.github.io/kbooks/images/covers/" + book.cover} />
        <div className="about">
          <ul>
            <h1 className="title">{ book && book.title }</h1>
            <li>Автор: <span>Князян А.З.</span></li>
            { book && "categories" in book && <li>Категории: <span>{ book && book.categories.join(', ') }</span></li> }
          </ul>
          <a href={"/kbooks/#/story/" + params.id + "/1"} className="btn">Читать</a>
        </div>
      </div>
      <div className="description">
        <h4>Описание:</h4>
        <p>{ book && "description" in book && book.description }</p>
        { book && !("description" in book) && <p>Отсутствует</p> }
      </div>
      <div className="contents">
        <h4>Содержание</h4>
        {
          book && book.contents.map((chapter, i) => (
            <a href={"/kbooks/#/story/" + params.id + "/" + (i+1)} key={i}>{ chapter }</a>
          ))
        }
      </div>
    </main>
  )
}
 
export default Details