import { useEffect } from 'react'
// router
import { HashRouter, Routes, Route } from 'react-router-dom'
// layout components
import Header from "./layout/Header"
// components
import Home from "./pages/Home"
import BooksList from "./pages/BookList"
import Details from "./pages/Details"
import Story from "./pages/Story"

const App = () => {

  useEffect(()=>{
    // hide loader
    if(document.readyState === "complete") hideLoader()
    else{
      window.addEventListener("load", hideLoader)
      return () => window.removeEventListener("load", hideLoader)
    }
  }, [])
  
  const hideLoader = () => {
    const loader = document.querySelector('.loader')
    setTimeout(()=>{
      loader.style.transition = ".3s"
      loader.style.opacity = 0
      loader.style.pointerEvents = "none"
    }, 400)
  }

  return (
    <>
      <div className="loader"/>
      <Header/>
      <HashRouter>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/books">
            <Route index element={<BooksList />} />
            <Route path=":id" element={<Details />} />
          </Route>

          <Route path="/story">
            <Route path=":id">
              <Route path=":chapter" element={<Story />} />
            </Route>
          </Route>

        </Routes>
      </HashRouter>
    </>
  )
}
 
export default App