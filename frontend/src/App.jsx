import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import Home from "./Home"
import Create from "./Create"
import UpdateProduct from "./UpdateProduct"



function App() {


  return (
    <>
      <Box minH={'100vh'}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
