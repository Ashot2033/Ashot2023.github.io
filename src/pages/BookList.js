// react
import { useState } from "react"
// custom hooks
import useFetch from "../hooks/useFetch"

const BooksList = () => {
  const [books, setBooks] = useState()

  // get books
  useFetch('/api/books.json')
    .then(data => {
      let arr = []
      data.forEach(obj => arr.push(obj.about))
      setBooks(arr)
    })
    .catch(err => {})

  return (
    <main className="books-list wrapper">
      <h1>Мои книги</h1>
      <div className="list">{
        books && books.map(book => (
          <a className="book" href={"/books/" + book.id} key={book.title}>
            <img className="cover" src={"/images/covers/" + book.cover} />
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