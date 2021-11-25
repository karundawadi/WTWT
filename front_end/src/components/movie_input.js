import React from 'react'
import {Autocomplete, TextField, Typography, Grid, Button, Box, createFilterOptions, Modal, CircularProgress} from '@mui/material'
import axios from 'axios'
import {ArrowRight} from 'react-bootstrap-icons'

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function MovieInput(props){
    const [movieName, onMovieNameChange] = React.useState("")
    const [numberPeople,onNumberPeopleChange] = React.useState(100)
    const [open, setOpen] = React.useState(false);
    const [recommended_movies,onRecommendedMoviesChange] = React.useState([])
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [loadingopen, setLoadingOpen] = React.useState(false)
    const handleLoadingOpen = () => setLoadingOpen(true)
    const handleLoadingClose = () => setLoadingOpen(false)

    const data = require('../movies_name/movies.json');
    const movies = []

    const movies_recommended_list = recommended_movies.map(
        (name_of_movie) => 
            <Typography sx={{ mt: 2 }}><ArrowRight/> {name_of_movie}</Typography>
        )

    for (let i = 0; i < data.length; i++) {
        movies.push(data[i].title)
    }
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        limit: 500,
    });
    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Box style={{textAlign:'center'}}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Recommended Movies
                        </Typography>
                    </Box>       
                    <Box p={2} />    
                    <Typography id="modal-modal-title">
                        If you watched {movieName}, you might like:
                    </Typography>       
                    {movies_recommended_list}
                    <Box p={2} />
                    <Box style={{textAlign:'center'}}>
                        <Button variant="outlined" color="error" onClick={handleClose}>Close</Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={loadingopen}
                onClose={handleLoadingClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Box style={{textAlign:'center'}}>
                        <Typography >Loading</Typography>
                        <CircularProgress/>
                    </Box>
                </Box>
            </Modal>

            <Box mt={8} pl={2}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography pt={2}>Which movie did you watch recently?</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                        filterOptions={filterOptions}
                        disablePortal
                        onChange={
                            (event,value)=>{
                                onMovieNameChange(value)
                            }
                        }
                        id="combo-box-demo"
                        options={movies}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} value={movieName} label="Movie name" />}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ p: 1 }}/>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography pt={2}>How many ratings do you want to consider?</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField onChange={(event)=>{
                            onNumberPeopleChange(event.target.value)
                        }} value={numberPeople} label="Number" />
                    </Grid>

                    <Grid container justifyContent="center" pt={4}>
                        <Button onClick={()=>{
                            // Checking for the data types entered     
                            if(movieName == "" || numberPeople <= 0){
                                alert("There is a data verification error. \nPlease check the input fields again!")
                            }else{
                                handleLoadingOpen()
                                var string_to_pass = "http://127.0.0.1:5000/recommend/"+ String(movieName) + "/" + String(numberPeople)
                                axios.get(string_to_pass).then(
                                    response=>{
                                        console.log("The response is: ")
                                        console.log(response.data)
                                        var movies_seen = response.data
                                        onRecommendedMoviesChange(movies_seen)
                                        handleOpen()
                                    }
                                ).catch(
                                    respons=>{
                                        console.log(respons)
                                    }
                                ).finally(()=>{
                                    handleLoadingClose()
                                })
                            }
                        }} variant="outlined" color="success">Sumbit</Button>
                    </Grid>
                </Grid> 
            </Box>
        </React.Fragment>
    )
}



export default MovieInput