import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "./utils";
import { useAuth } from "../../contexts/AuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginTop: 20,
  },
});
export default function MyProfile() {
  const classes = useStyles();

  const { userData } = useAuth();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    linkedin_url: "",
    github_url: "",
    twitter_url: "",
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await getProfile(userData.user.userName, userData.token);
        if (res?.profile) {
          setProfileData((prev) => {
            return { ...prev, ...res.profile };
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getInfo();
  }, [userData]);

  const handleChange = (event) => {
    setProfileData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleClick = async () => {
    try {
      updateProfile(profileData, userData.token);
      alert("profile Updated");
    } catch (error) {
      alert("Something went wrong,Please try again.");
      console.log(error.message);
    }
  };

  return (
    <div className={classes.root}>
      <TextField
        required
        label="First Name"
        name="firstName"
        value={profileData.firstName}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        required
        label="Last Name"
        name="lastName"
        value={profileData.lastName}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        required
        label="Bio"
        name="bio"
        value={profileData.bio}
        onChange={handleChange}
        margin="normal"
      />

      <Button className={classes.btn} onClick={handleClick} variant="contained">
        Update
      </Button>
    </div>
  );
}
