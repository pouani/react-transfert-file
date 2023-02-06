import React, { useContext } from 'react'
import {Navbar as BootstrapNavbar} from 'react-bootstrap'
import { Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import FirebaseService from '../_services/Firebase'

function Navbar() {

  const {currentUser, isLoaded} = useContext(AuthContext);

  return (
    <BootstrapNavbar>
        <Container>
            <BootstrapNavbar.Brand href="/">Transfert fichier</BootstrapNavbar.Brand>
            <Nav className='me-auto'>
                <Link to='/' className='nav-link'>Accueil</Link>
                <Link to='/files' className='nav-link'>Fichiers</Link>
                <Link to='/sent' className='nav-link'>Fichiers envoyés</Link>
            </Nav>
            <div className={isLoaded ? '' : 'd-none'}>
                  {
                  currentUser ? <button className="btn border border-danger">se déconnecter</button> 
                  : <button className="btn btn-primary" onClick={async () => await FirebaseService.signInWithGoogle()}>se connecter</button>
                  }
              </div>
        </Container>
    </BootstrapNavbar>
  )
}

export default Navbar