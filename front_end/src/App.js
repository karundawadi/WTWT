import React from 'react'
import NavigationBar from './components/navigation_bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieInput from './components/movie_input';
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {Container, Box} from '@mui/material'

function App() {
  return (
    <Box pt={20}>
      <Container maxWidth={'md'}>
        <NavigationBar/>
        <MovieInput/>
      </Container>
    </Box>
  );
}

export default App;
