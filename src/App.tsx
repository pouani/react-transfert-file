
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/esm/Col'
import './App.scss'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'


const Home = lazy (() => import('./components/Home'))
const File = lazy (() => import('./components/File'))
const RequestFile = lazy (() => import('./components/RequestFile'))
const FileSent = lazy (() => import('./components/FileSent'))

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Container className='mt-5'>
          <Col xl={{span:6, offset:3}}>
            <Routes>
              <Route path='/' element={<Suspense><Home /></Suspense>} />
              <Route path='/files' element={<Suspense><RequestFile /></Suspense>} />
              <Route path='/files/:id' element={<Suspense><File /></Suspense>} />
              <Route path='/sent' element={<Suspense><FileSent /></Suspense>} />
            </Routes>
          </Col>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
