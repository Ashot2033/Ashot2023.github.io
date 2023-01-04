// react
import { useEffect, useState } from "react"

const BooksList = () => {
  const [books, setBooks] = useState([])

  // get books
  useEffect(()=>{
    fetch('https://ashot2003.github.io/kbooks/api/books.json')
      .then(res => { return res.json() })
      .then(data => {
        data.forEach(book => {
          setBooks([...books, book.about])
        })
      })
  }, [])

  return (
    <main className="books-list wrapper">
      <h1>Мои книги</h1>
      { !books && <p>Загрузка...</p> }
      <div className="list">{
        books && books.map((book, i) => (
          <a className="book" href={"/kbooks/#/books/" + i} key={book.title}>
            <img className="cover" src={"https://ashot2003.github.io/kbooks/images/covers/" + book.cover} />
            <div className="content">
              <div className="type">{ book.type }</div>
              <div className="title">{ book.title }</div>
              <div className="autor">Князян А.З.</div>
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}
 
export default BooksList