import Typography from "@mui/material/Typography";
 import Button from "@mui/material/Button";
 import Box from "@mui/material/Box";
 import { Link } from "react-router-dom";
 import List from "@mui/material/List";
 import { useContext } from "react";
 import GlobalStoreContext from "../store";
 import { useHistory } from "react-router-dom";
export default function SplashScreen() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    function handleGuest(){
        console.log("true");
        store.updateGuest(true);
        history.push("/");
    }

    return (
        <Box  id= "splash-screen" sx={{ width: "100%"}}>
          <Typography variant="h3" component="div" gutterBottom align="center">
            Welcome!
          </Typography>
          <div align="center">
            <Typography
              sx={{ width: "75%" }}
              variant="h6"
              gutterBottom
              component="div"
            >
              Create, view, and share Top 5 Lists
            </Typography>
          </div>
          <div align="center">
            <div>
              <Button
                variant="contained"
                color="success"
                size="large"
                href="/register/"
                sx={{ mt: 2, width: "50%", minHeight: "100px" }}
              >
                Create Account
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="success"
                size="large"
                href="/login/"
                sx={{ mt: 2, width: "50%", minHeight: "100px" }}
              >
                Login
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{ mt: 2, width: "50%", minHeight: "100px" }}
                onClick = {handleGuest}
              >
                Continue as Guest
              </Button>
            </div>
          </div>
          <Typography component="div" gutterBottom align="center">
            Created by Christina Chau
          </Typography>
        </Box>
      );
}