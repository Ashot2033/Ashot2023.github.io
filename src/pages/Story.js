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
  const [bg, setBg] = useState()

  // get url params
  const params = useParams()

  useEffect(()=>{
    const main = document.querySelector('main.story')
    const progress = document.querySelector('main.story .progress')
    // main top padding
    main.style.paddingTop = document.querySelector('header').offsetHeight + "px"
    // bg
    if(localStorage.getItem('bg')) setBg(localStorage.getItem('bg'))
    // progressbar
    window.addEventListener("scroll", ()=>{
      progress.style.width = window.scrollY / (document.querySelector('main.story > .wrapper').scrollHeight - window.innerHeight) * 100 + "%"
    })
    // get chapter
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

  useEffect(()=>{
    const main = document.querySelector('main.story')
    const progress = document.querySelector('main.story .progress')
    if(bg === "#222"){
      main.style.color = "#ccc"
      progress.style.background = "#ccc"
      main.querySelectorAll('nav button').forEach(btn => {
        btn.style.background = "#ccc"
        btn.style.color = "#000"
      })
    }
    else{
      main.style.color = "#444"
      progress.style.background = "#444"
      main.querySelectorAll('nav button').forEach(btn => {
        btn.style.background = "#000"
        btn.style.color = "#fff"
      })
    }
  }, [bg])

  const changeBG = (bg_param) => {
    localStorage.setItem('bg', bg_param)
    setBg(bg_param)
  }

  return (
    <main className="story" style={{ background: bg }}>
    <div className="progress"/>
      <div className="wrapper">
        <h1>
          { title }
          <div className="settings">
            <ul className="colors">
              <li onClick={()=>{ changeBG('#fff') }} />
              <li onClick={()=>{ changeBG('#CDCAB7') }} />
              <li onClick={()=>{ changeBG('#222') }} />
            </ul>
          </div>
        </h1>
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
              <button className="btn" onClick={ () => redirect("/kbooks/#/story/" + params.id + "/" + (parseInt(params.chapter)-1)) }>Предыдущая глава</button>
          }
        </nav>
      </div>
    </main>
  )
}
 
export default Story