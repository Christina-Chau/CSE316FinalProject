import { useContext, useState } from "react";
 import { GlobalStoreContext } from "../store";
 import Box from "@mui/material/Box";
 import DeleteIcon from "@mui/icons-material/Delete";
 import EditIcon from "@mui/icons-material/Edit";
 import IconButton from "@mui/material/IconButton";
 import ListItem from "@mui/material/ListItem";
 import TextField from "@mui/material/TextField";
 import ThumbUpIcon from "@mui/icons-material/ThumbUp";
 import ThumbDownIcon from "@mui/icons-material/ThumbDown";
 import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
 import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
 import List from "@mui/material/List";

 import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");
  //const { top5List } = props;
   const { idNamePair, selected } = props;

     //list expand
    const [expanded, setExpanded] = useState(false);

    //comments
    //const [comment, setComment] = useState("");

    // function handleLoadList(event, id) {
    //   console.log("handleLoadList for " + id);
    //   if (!event.target.disabled) {
    //     let _id = event.target.id;
    //     if (_id.indexOf("list-card-text-") >= 0)
    //       _id = ("" + _id).substring("list-card-text-".length);
 
    //     console.log("load " + event.target.id);
 
    //     // CHANGE THE CURRENT LIST
    //     store.setCurrentList(id);
    //   }
    // }

    function handleLoadList(event, id) {
      console.log("handleLoadList for " + id);
      if (!event.target.disabled) {
          let _id = event.target.id;
          if (_id.indexOf('list-card-text-') >= 0)
              _id = ("" + _id).substring("list-card-text-".length);

          console.log("load " + event.target.id);

          // CHANGE THE CURRENT LIST
          store.setCurrentList(id);
      }
  }

    function handleOpenList(event, id) {
        event.stopPropagation();
        let ex = !expanded;
        setExpanded(ex);
        handleLoadList(event, idNamePair._id);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleLike(event) {
      
    }

    function handleDislike(event){

    }

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let cardElement = (
      <ListItem
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{
          border: 2,
          borderRadius: 8,
          width: "90%",
          margin: "auto",
          marginTop: "15px",
          display: "flex",
          p: 1,
        }}
        style={{ width: "100%" }}
        style={{
          fontSize: "16pt",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography display="inline" style={{ fontSize: "20pt" }}>
              {idNamePair.name}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="like"
              color="primary"
              onClick={(event) => {
                handleLike(event);
              }}
            >
              <ThumbUpIcon style={{ fontSize: "20pt" }} />
            </IconButton>
            {/* <Typography display="inline">{top5List.likes.length}</Typography> */}
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="like"
              color="primary"
              onClick={(event) => {
                handleDislike(event);
              }}
            >
              <ThumbDownIcon style={{ fontSize: "20pt" }} />
            </IconButton>
            {/* <Typography display="inline">{top5List.dislikes.length}</Typography> */}
          </Grid>
          <Grid item xs={1}>
            <IconButton
              // onClick={(event) => {
              //   handleDeleteList(event, top5List._id);
              // }}
              aria-label="delete"
            >
              <DeleteIcon style={{ fontSize: "20pt" }} />
            </IconButton>
          </Grid>
          <Grid item xs={9}>
            {/* <Typography display="inline">{"By: " + top5List.username}</Typography> */}
          </Grid>
          <Grid item xs={3}>
            {/* <Typography display="inline">{"Views: " + top5List.views}</Typography> */}
          </Grid>
          <Grid item xs={11}>
            {/* <Typography display="inline">
              {"Published: " + top5List.publishedDate}
            </Typography> */}
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="like"
              color="primary"
              onClick={(event) => {
                handleOpenList(event);
              }}
            >
              <KeyboardArrowDownIcon style={{ fontSize: "20pt" }} />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
    );
    if (expanded) {
      cardElement = (
        <ListItem
          id={idNamePair._id}
          key={idNamePair._id}
          sx={{
            border: 2,
            borderRadius: 8,
            width: "90%",
            margin: "auto",
            marginTop: "15px",
            display: "flex",
            p: 1,
          }}
          style={{ width: "100%" }}
          style={{
            fontSize: "16pt",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography display="inline" style={{ fontSize: "20pt" }}>
                {idNamePair.name}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="like"
                color="primary"
                // onClick={(event) => {
                //   handleLike(event);
                // }}
              >
                <ThumbUpIcon style={{ fontSize: "20pt" }} />
              </IconButton>
              {/* <Typography display="inline">{top5List.likes.length}</Typography> */}
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="like"
                color="primary"
                // onClick={(event) => {
                //   handleDislike(event);
                // }}
              >
                <ThumbDownIcon style={{ fontSize: "20pt" }} />
              </IconButton>
              {/* <Typography display="inline">{top5List.dislikes.length}</Typography> */}
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={(event) => {
                  handleDeleteList(event, idNamePair._id);
                }}
                aria-label="delete"
              >
                <DeleteIcon style={{ fontSize: "20pt" }} />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              {/* <Typography display="inline">
                {"By: " + top5List.username}
              </Typography> */}
            </Grid>
 
            {/* <Grid item xs={6}>
              {items}
            </Grid>
            <Grid item xs={6}>
              {comments}
            </Grid> */}
 
            <Grid item xs={9}>
              {/* <Typography display="inline">
                {"Published: " + top5List.publishedDate}
              </Typography> */}
            </Grid>
            <Grid item xs={2}>
              {/* <Typography display="inline">
                {"Views: " + top5List.views}
              </Typography> */}
            </Grid>
 
            <Grid item xs={1}>
              <IconButton
                aria-label="like"
                color="primary"
                onClick={(event) => {
                  handleOpenList(event);
                }}
              >
                <KeyboardArrowUpIcon style={{ fontSize: "20pt" }} />
              </IconButton>
            </Grid>
          </Grid>
        </ListItem>
      );
    }
    return cardElement;
  }

export default ListCard;