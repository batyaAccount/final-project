
import { Box } from '@mui/material'
import './App.css'
import Manager from './components/Manager'

function App() {
  
  return (
    <>
     <Box
     sx={{
           position: 'absolute', 
           top: 0, 
           left: 0,
           width: '100%', 
           height: '100vh', 
           zIndex: 0, 
           minHeight: '100vh',
           overflowY: 'auto' 
       }}
     >
      <Manager></Manager>
    </Box>
    </>
  )
}

export default App
