import { useEffect } from "react"

const Header = () => {
  useEffect(()=>{
    // close menu on outside or link click
    document.addEventListener("click", (e)=>{
      const label = document.querySelector('header label')
      const input = document.querySelector('header input[type=checkbox]')
      if(!label.contains(e.target) && !input.contains(e.target)) input.checked = false
    })
    document.addEventListener("touchstart", (e)=>{
      const label = document.querySelector('header label')
      const input = document.querySelector('header input[type=checkbox]')
      const nav = document.querySelector('header ul')
      if(!label.contains(e.target) && !input.contains(e.target) && !nav.contains(e.target)) input.checked = false
    })
  }, [])

  return (
    <header className="wrapper">
      <div className="container wrapper">
        <a href="/" className="logo">KBooks</a>
        <input type="checkbox" id="menuBtn" />
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/books">Книги</a></li>
        </ul>
        <label htmlFor="menuBtn"/>
      </div>
    </header>
  )
}
 
export default Header