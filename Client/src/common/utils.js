import axios from 'axios';
import Constants from './Constants';

export const fetchAllUsersChannels = async (token) => {
  try {
    const channels = await axios.get(`${Constants.server_url}/channels`, {
      headers: { 'x-auth-token': token },
    });
    return channels.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
