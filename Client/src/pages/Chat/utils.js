import axios from "axios";
import Constants from "../../common/Constants";

// export const getTeam = async (teamId, token) => {
//   const teams = await axios.get(`${Constants.server_url}/team/${teamId}`, {
//     headers: { "x-auth-token": token },
//   });
//   return teams?.data;
// };

export const fetchAllUsersChannels = async (token) => {
  try {
    const channels = await axios.get(`${Constants.server_url}/channels`, {
      headers: { "x-auth-token": token },
    });
    return channels.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
