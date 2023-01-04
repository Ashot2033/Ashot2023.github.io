// react
import { useState } from "react"
// custom hooks
import useFetch from "../hooks/useFetch"

const BooksList = () => {
  const [books, setBooks] = useState()

  // get books
  useFetch('https://raw.githubusercontent.com/ashot2003/kbooks/1632e0ba0ce3b7db8daaf8a85bc8c557feafb2ce/public/api/books.json')
    .then(data => {
      let arr = []
      data.forEach(obj => arr.push(obj.about))
      setBooks(arr)
    })
    .catch(err => {})

  return (
    <main className="books-list wrapper">
      <h1>Мои книги</h1>
      { !books && <p>Загрузка...</p> }
      <div className="list">{
        books && books.map(book => (
          <a className="book" href={"/kbooks/#/books/" + book.id} key={book.title}>
            <img className="cover" src={"https://raw.githubusercontent.com/ashot2003/kbooks/main/public/images/covers/" + book.cover} />
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