import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { getAllTeams, createTeam, joinTeam } from "./utils";
import { useAuth } from "../../contexts/AuthContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Constants from "../../common/Constants";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  flexOne: {
    flex: 1,
  },
  flexAlign: {
    display: "flex",
    alignItems: "center",
  },
});
export default function Teams() {
  const classes = useStyles();
  const { userData } = useAuth();
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await getAllTeams(userData.token);
        if (res?.data) {
          setTeams(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getInfo();
  }, [userData]);

  const handleCreate = async () => {
    try {
      const res = await createTeam({ name: teamName }, userData.token);
      showSnackbar(res.message);
    } catch (error) {
      const message =
        error?.response?.data?.message || Constants.strings.somethingWentWrong;
      showSnackbar(message, "error");
    }
  };
  const handleJoin = async () => {
    try {
      const res = await joinTeam(teamCode, userData.token);
      showSnackbar(res.message);
    } catch (error) {
      const message =
        error?.response?.data?.message || Constants.strings.somethingWentWrong;
      showSnackbar(message, "error");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.flexOne}>
        <h1>Teams</h1>
        {teams?.length > 0 ? (
          <List>
            {teams.map((team, idx) => {
              return (
                <ListItem key={idx}>
                  <ListItemButton component={Link} to={`/teams/${team.id}`}>
                    <ListItemText primary={team.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <h1>No Teams Found</h1>
        )}
      </div>
      <div className={classes.flexOne}>
        <div className={classes.flexAlign}>
          <TextField
            required
            label="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            margin="normal"
          />

          <Button
            className={classes.btn}
            onClick={handleCreate}
            variant="contained"
          >
            Create Team
          </Button>
        </div>
        <div className={classes.flexAlign}>
          <TextField
            required
            label="Team Code"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            margin="normal"
          />

          <Button
            className={classes.btn}
            onClick={handleJoin}
            variant="contained"
          >
            Join Team
          </Button>
        </div>
      </div>
    </div>
  );
}
