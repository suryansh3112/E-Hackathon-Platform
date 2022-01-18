import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { getTeam } from "./utils";
import { useAuth } from "../../contexts/AuthContext";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useNavigate, useParams } from "react-router-dom";
import UserCard from "../../components/UserCard";

const useStyles = makeStyles({
  members: {
    display: "flex",
    flexWrap: "wrap",
  },
  heading: {
    textAlign: "center",
  },
  code: {
    backgroundColor: "#eeeeee",
    padding: 10,
    display: "inline",
  },
});

export default function TeamInfo() {
  const classes = useStyles();
  const { userData } = useAuth();
  const [team, setTeam] = useState(null);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await getTeam(params.teamId, userData.token);
        if (res?.data) {
          setTeam(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getInfo();
  }, [userData]);

  if (!team) {
    return <h1>No Data Found</h1>;
  }

  return (
    <div>
      <h1 className={classes.heading}>{team.name}</h1>
      <h3>Invite Code </h3>
      <h4 className={classes.code}>{team.teamCode}</h4>
      <h1>Team Members</h1>
      <div className={classes.members}>
        {team.members.map((member, idx) => {
          return (
            <UserCard
              user={member}
              admin={member.id === team.leaderId}
              key={idx}
            />
          );
        })}
      </div>
    </div>
  );
}
