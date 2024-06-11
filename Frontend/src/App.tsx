
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'


function App() {
 

  return (
    <>
<BrowserRouter>
<Routes>
  <Route path='/signin' element={<Signin></Signin>}></Route>
  <Route path='/signup' element={<Signup></Signup>} ></Route>
 <Route path='/Blog/:id' element={<Blog></Blog>}></Route>
 <Route path='/Blogs' element={<Blogs></Blogs>}></Route>

</Routes>
</BrowserRouter>

     </>
  )
}

export default App
