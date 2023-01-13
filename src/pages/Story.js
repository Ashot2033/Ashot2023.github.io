// react
import { useEffect, useState } from "react"
// router
import { useParams } from "react-router-dom"
// handlers
import { redirect } from "../handlers/redirect"

const Story = () => {
  const [chapter, setChapter] = useState()
  const [title, setTitle] = useState()
  const [chaptersLength, setChaptersLength] = useState()

  // get url params
  const params = useParams()

  // get chapter
  useEffect(()=>{
    window.addEventListener("scroll", ()=>{
      document.querySelector('main.story .progress').style.width = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100 + "%"
    })
    fetch('https://ashot2003.github.io/kbooks/api/books.json')
      .then(res => { return res.json() })
      .then(data => {
        const chapters = data[params.id].text.length
        const name = chapters > 1 ? data[params.id].about.contents[params.chapter-1] : data[params.id].about.title
        const text = data[params.id].text[params.chapter-1]
        setChaptersLength(chapters)
        setTitle(name)
        setChapter(text)
      })
  }, [])

  return (
    <main className="story wrapper">
      <div className="progress"/>
      <h1>{ title }</h1>
      <div className="divider" />
      <div className="text">{
        chapter && chapter.split("\n").map((paragraph, i) => (
          <p key={i}>{ paragraph }</p>
        ))}
      </div>
      <nav>
        {
          params.chapter < chaptersLength &&
            <button className="btn" onClick={ () => redirect("/kbooks/#/story/" + params.id + "/" + (parseInt(params.chapter)+1)) }>Следующая глава</button>
        }
        {
          params.chapter > 1 &&
            <button className="btn light" onClick={ () => redirect("/kbooks/#/story/" + params.id + "/" + (parseInt(params.chapter)-1)) }>Предыдущая глава</button>
        }
      </nav>
    </main>
  )
}
 
export default Story