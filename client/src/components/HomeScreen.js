import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
 import Box from "@mui/material/Box";
 import IconButton from "@mui/material/IconButton";
 import Button from "@mui/material/Button";
 import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

 import PersonIcon from "@mui/icons-material/Person";
 import PeopleIcon from "@mui/icons-material/People";
 import HomeIcon from "@mui/icons-material/Home";
 import FunctionsIcon from "@mui/icons-material/Functions";
 import TextField from "@mui/material/TextField";
 import SortIcon from "@mui/icons-material/Sort";

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'

import Grid from "@mui/material/Grid";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [search, setSearch] = useState("");

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    const handleProfileMenuOpen = (event) => {
        if(isMenuOpen)
            setAnchorEl(null);
        else
            setAnchorEl(event.currentTarget);
    };

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <Grid container spacing={2}>
       <Grid item xs={10}>
         <IconButton aria-label="your lists" color="primary"
            disabled= {store.isGuest ? true : false}
        >
           <HomeIcon
             sx={{
               width: 40,
               height: 40,
             }}
           />
         </IconButton>
         <IconButton aria-label="all lists" color="primary" size="large">
           <PeopleIcon
             sx={{
               width: 40,
               height: 40,
             }}
           />
         </IconButton>
         <IconButton aria-label="user lists" color="primary" size="large">
           <PersonIcon
             sx={{
               width: 40,
               height: 40,
             }}
           />
         </IconButton>
         <IconButton aria-label="community lists" color="primary" size="large">
           <FunctionsIcon
             sx={{
               width: 40,
               height: 40,
             }}
           />
         </IconButton>
         <TextField
           sx={{width:"50%"}}
           margin="normal"
           id={"search"}
           name="search"
           align= "center"
           inputProps={{ style: { fontSize: 18 } }}
           InputLabelProps={{ style: { fontSize: 18 } }}
         />
       </Grid>
       <Grid item xs={2} align='right'>
         <Typography display="inline" >
           Sort by
         </Typography>
        <IconButton aria-label="sort" color="primary" size="large" onClick={handleProfileMenuOpen}>
            <SortIcon
                sx={{
                width: 40,
                height: 40,
                }}
            />
            <Menu
                anchorEl={anchorEl}
                // anchorOrigin={{
                //     vertical: 'top',
                //     horizontal: 'right',
                // }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
            >
                <MenuItem id = "sortItem" onClick={handleProfileMenuOpen}><Link to='/'>Publish Date (Newest)</Link></MenuItem>
                <MenuItem id = "sortItem" onClick={handleProfileMenuOpen}><Link to='/'>Publish Date (Oldest)</Link></MenuItem>
                <MenuItem id = "sortItem" onClick={handleProfileMenuOpen}><Link to='/'>Views</Link></MenuItem>
                <MenuItem id = "sortItem" onClick={handleProfileMenuOpen}><Link to='/'>Likes</Link></MenuItem>
                <MenuItem id = "sortItem" onClick={handleProfileMenuOpen}><Link to='/'>Dislikes</Link></MenuItem>
            </Menu>
        </IconButton>
       </Grid>
     </Grid>
   );
}

export default HomeScreen;