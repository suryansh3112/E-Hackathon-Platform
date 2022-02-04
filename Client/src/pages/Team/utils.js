import axios from 'axios';
import Constants from '../../common/Constants';

export const getTeam = async (teamId, token) => {
  const teams = await axios.get(`${Constants.server_url}/team/${teamId}`, {
    headers: { 'x-auth-token': token },
  });
  return teams?.data;
};

export const getAllTeams = async (token) => {
  const teams = await axios.get(`${Constants.server_url}/teams`, {
    headers: { 'x-auth-token': token },
  });
  return teams?.data;
};

export const createTeam = async (data, token) => {
  const res = await axios.post(`${Constants.server_url}/team/create`, data, {
    headers: { 'x-auth-token': token },
  });
  return res?.data;
};

export const deleteTeam = async (teamId, token) => {
  try {
    const teams = await axios.delete(`${Constants.server_url}/team/${teamId}`, {
      headers: { 'x-auth-token': token },
    });
    return teams.data;
  } catch (error) {
    const msg = error?.response?.data?.message;
    return { success: false, message: msg || error.message };
  }
};

export const joinTeam = async (teamCode, token) => {
  const res = await axios.post(
    `${Constants.server_url}/team/join/${teamCode}`,
    null,
    {
      headers: { 'x-auth-token': token },
    }
  );
  return res?.data;
};

// export const updateProfile = async (profileData, token) => {
//   const profileInfo = await axios.patch(
//     `${Constants.server_url}/profile`,
//     profileData,
//     { headers: { "x-auth-token": token } }
//   );
//   return profileInfo?.data;
// };
