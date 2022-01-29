import axios from 'axios';
import Constants from '../../common/Constants';

export const getProfile = async (userName, token) => {
  try {
    const profileInfo = await axios.get(
      `${Constants.server_url}/profile/${userName}`,
      { headers: { 'x-auth-token': token } }
    );
    return profileInfo.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateProfile = async (profileData, token) => {
  try {
    const profileInfo = await axios.patch(
      `${Constants.server_url}/profile`,
      profileData,
      { headers: { 'x-auth-token': token } }
    );
    return profileInfo.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
