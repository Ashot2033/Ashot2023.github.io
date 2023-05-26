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
          setBooks(current => [{ "id": book.id, ...book.about }, ...current])
        })
      })
  }, [])

  return (
    <main className="books-list wrapper">
      <h1>Мои книги</h1>
      <p>Загрузка...</p>
      <div className="list">{
        books && books.map(book => (
          <a className="book-cont" href={"/kbooks/#/books/" + book.id} key={book.title}>
            <div className="cover-container">
              <div className="cover-cont">
                <div className="cover" style={{ backgroundImage: "url('https://ashot2003.github.io/kbooks/images/covers/" + book.cover + "')" }}/>
              </div>
            </div>
            <div className="about">
              <div className="title">{ book.title }</div>
              <div className="author">Князян Ашот</div>
              {/* <svg style={{ display: "block", marginLeft: "auto" }} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="0.24" y="0.24" width="21.52" height="21.52" rx="10.76" fill="white"/>
                <path d="M12.2867 7L16.3333 11.0467L12.2867 15.0933M5 11.0467H16.22" stroke="black" strokeWidth="0.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="0.24" y="0.24" width="21.52" height="21.52" rx="10.76" stroke="black" strokeWidth="0.48"/>
              </svg> */}
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}
 
export default BooksList