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
import AuthContext from "../auth";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");
  const { top5List } = props;
  //const { idNamePair, selected } = props;
  const [comment, setComment] = useState("");

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
      if (ex) {
        store.updateView(top5List);
      }
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

    function handleEditList(event) {
      event.stopPropagation();
      store.setCurrentList(top5List._id);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        // let _id = event.target.id;
        // _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleNewComment(event) {
      setComment(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.comment(top5List, text);
            setComment("");
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleLike(event) {
      event.stopPropagation();
      store.updateLikes(top5List);
    }

    function handleDislike(event){
      event.stopPropagation();
      store.updateDislikes(top5List);
    }

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let likeDis = false;
    let dislikeDis = false;
    let commentDis = false;
    let deleteDis = false;

    let items = (
      <List
        sx={{
          border: 2,
          borderRadius: 8,
          width: "100%",
          bgcolor: "#9595f6",
        }}
      >
        {top5List.items.map((item, index) => (
          <ListItem key={index}>
            <Typography>{index + 1 + ". " + item}</Typography>
          </ListItem>
        ))}
      </List>
    );

  let strings = Object.keys(top5List.comments);
  let users = Object.values(top5List.comments);

  let comments = (
    <Box>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 200,
        }}
      >
        {users.map((user, index) => (
          <ListItem
            key={index}
            sx={{
              border: 2,
              borderRadius: 8,
              bgcolor: "#9595f6",
              width: "100%",
              marginTop: "2px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography display="inline" style={{ fontSize: "12pt" }}>
                  {user}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography display="inline" style={{ fontSize: "12pt" }}>
                  {strings[index]}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          border: 2,
          borderRadius: 2,
          width: "100%",
          marginTop: "12px",
        }}
      >
        <TextField
          label="Comment"
          sx={{ width: "100%" }}
          margin="normal"
          id={"comment"}
          name="comment"
          disabled={commentDis}
          onKeyPress={handleKeyPress}
          onChange={handleNewComment}
          value={comment}
          inputProps={{ style: { fontSize: 14 } }}
          InputLabelProps={{ style: { fontSize: 14 } }}
        />
      </Box>
    </Box>
  );

    if (store.isGuest) {
      likeDis = true;
      dislikeDis = true;
      commentDis = true;
      deleteDis = true;
    }
    else{
      if (
        store.listView === "community" ||
        auth.user.userName !== top5List.username
      ) {
        deleteDis = true;
      }
      if (store.listView !== "community" && !top5List.published) {
        likeDis = true;
        dislikeDis= true;
        commentDis = true;
      }
    }
    let cardElement = (
      <ListItem
        id={top5List._id}
        key={top5List._id}
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
              {top5List.name}
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
            <Typography display="inline">{top5List.likes.length}</Typography>
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
            <Typography display="inline">{top5List.dislikes.length}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={(event) => {
                handleDeleteList(event, top5List._id);
              }}
              aria-label="delete"
            >
              <DeleteIcon style={{ fontSize: "20pt" }} />
            </IconButton>
          </Grid>
          <Grid item xs={9}>
            <Typography display="inline">{"By: " + top5List.userName}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography display="inline">{"Views: " + top5List.views}</Typography>
          </Grid>
          <Grid item xs={11}>
            <Typography display="inline">
              {"Published: " + top5List.publishedDate}
            </Typography>
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
          id={top5List._id}
          key={top5List._id}
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
                {top5List.name}
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
              <Typography display="inline">{top5List.likes.length}</Typography>
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
              <Typography display="inline">{top5List.dislikes.length}</Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={(event) => {
                  handleDeleteList(event, top5List._id);
                }}
                aria-label="delete"
              >
                <DeleteIcon style={{ fontSize: "20pt" }} />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Typography display="inline">
                {"By: " + top5List.userName}
              </Typography>
            </Grid>
 
            <Grid item xs={6}>
              {items}
            </Grid>
            <Grid item xs={6}>
              {comments}
            </Grid>
 
            <Grid item xs={9}>
              <Typography display="inline">
                {"Published: " + top5List.publishedDate}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography display="inline">
                {"Views: " + top5List.views}
              </Typography>
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