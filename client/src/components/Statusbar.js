import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'

import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import AuthContext from '../auth'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
const Statusbar = () =>{
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);

    function handleCreateNewList() {
        store.createNewList();
    }
    let text = "";
    if (store.currentList)
        text = store.currentList.name;

    if (auth.loggedIn){
        return (
            <div id="top5-statusbar">
                    <Fab 
                        color="primary" 
                        aria-label="add"
                        id="add-list-button"
                        onClick={handleCreateNewList}
                    >
                        <AddIcon />
                    </Fab>
                    <Typography variant="h4">{text}</Typography>
            </div>)
    }
    else
        return null;
}

export default Statusbar;