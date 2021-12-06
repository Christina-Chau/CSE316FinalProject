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
import AuthContext from "../auth";

import Grid from "@mui/material/Grid";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const { auth } = useContext(AuthContext);
    const isMenuOpen = Boolean(anchorEl);
    const [search, setSearch] = useState("");
    const { innerWidth: width, innerHeight: height } = window;
    const [editActive, setEditActive] = useState(false);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleUpdateSearch(event) {
        setSearch(event.target.value);
     }
     function handleKeyPress(event) {
       if (event.code === "Enter") {
         let text = event.target.value;
         // store.newSearch(text);
        }
      }

    // let listCard = <List></List>;
    // if (store.currentLists) {
    //   listCard = (
    //     <List sx={{ height: "50%", marginTop: "20px" }}>
    //       {store.currentLists.map((list) => (
    //         <ListCard top5List={list} />
    //       ))}
    //     </List>
    //   );
    // }

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%'}}>
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

    function handleSortList(sort){
        store.sortLists(sort);

    }

    function displayList(listType){
        store.displayScreen(listType);
    }

    const handleProfileMenuOpen = (event) => {
        if(isMenuOpen)
            setAnchorEl(null);
        else
            setAnchorEl(event.currentTarget);
    };
    
    return (
        <div>
            <Grid container spacing={2}>
        <Grid item xs={10}>
            <IconButton aria-label="your lists" color="primary"
                disabled= {store.guest ? true : false}
                onClick = {displayList("home")}
            >
            <HomeIcon
                sx={{
                width: 40,
                height: 40,
                }}
            />
            </IconButton>
            <IconButton aria-label="all lists" color="primary" size="large" onClick = {displayList("all")}>
            <PeopleIcon
                sx={{
                width: 40,
                height: 40,
                }}
            />
            </IconButton>
            <IconButton aria-label="user lists" color="primary" size="large" onClick = {displayList("user")}>
            <PersonIcon
                sx={{
                width: 40,
                height: 40,
                }}
            />
            </IconButton>
            <IconButton aria-label="community lists" color="primary" size="large" onClick = {displayList("community")}>
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
            onKeyPress={handleKeyPress}
            onChange={handleUpdateSearch}
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
                    <MenuItem id = "sortItem" onClick={handleSortList("newDate")}>Publish Date (Newest)</MenuItem>
                    <MenuItem id = "sortItem" onClick={handleSortList("oldDate")}>Publish Date (Oldest)</MenuItem>
                    <MenuItem id = "sortItem" onClick={handleSortList("views")}>Views</MenuItem>
                    <MenuItem id = "sortItem" onClick={handleSortList("likes")}>Likes</MenuItem>
                    <MenuItem id = "sortItem" onClick={handleSortList("dislikes")}>Dislikes</MenuItem>
                </Menu>
            </IconButton>
        </Grid>
        </Grid>
        <div>
            {listCard}
            <MUIDeleteModal />
        </div>
    </div>
   );
}

export default HomeScreen;