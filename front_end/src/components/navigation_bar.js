import React from 'react'
import {Navbar} from 'react-bootstrap'

function NavigationBar(props){
    return(
        <Navbar bg="light" expand="lg" className="justify-content-center">
            <Navbar.Brand href="/">What to watch tonight !</Navbar.Brand>
        </Navbar>
    )
}

export default NavigationBar