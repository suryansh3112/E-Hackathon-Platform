import axios from 'axios';
import Constants from '../../common/Constants';

export const createHackathon = async (data, token) => {
  try {
    const res = await axios.post(
      `${Constants.server_url}/hackathon/create`,
      data,
      {
        headers: { 'x-auth-token': token },
      }
    );
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || Constants.strings.somethingWentWrong;
    return { success: false, message };
  }
};

export const applyForHackathon = async (data, token) => {
  try {
    const res = await axios.post(
      `${Constants.server_url}/hackathon/apply`,
      data,
      {
        headers: { 'x-auth-token': token },
      }
    );
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || Constants.strings.somethingWentWrong;
    return { success: false, message };
  }
};

export const fetchAllHackathons = async (token) => {
  try {
    const res = await axios.get(`${Constants.server_url}/hackathon/`, {
      headers: { 'x-auth-token': token },
    });
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || Constants.strings.somethingWentWrong;
    return { success: false, message };
  }
};

export const fetchMyOrganisedHackathon = async (token) => {
  try {
    const res = await axios.get(
      `${Constants.server_url}/hackathon/my-organised-hackathon`,
      {
        headers: { 'x-auth-token': token },
      }
    );
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || Constants.strings.somethingWentWrong;
    return { success: false, message };
  }
};

export const fetchMyHackathons = async (token) => {
  try {
    const res = await axios.get(`${Constants.server_url}/myHackathons/`, {
      headers: { 'x-auth-token': token },
    });
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || Constants.strings.somethingWentWrong;
    return { success: false, message };
  }
};

export const fetchOrganisedHackathonById = async (hackathonId, token) => {
  try {
    const res = await axios.get(
      `${Constants.server_url}/hackathon/${hackathonId}`,
      {
        headers: { 'x-auth-token': token },
      }
    );
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || Constants.strings.somethingWentWrong;
    return { success: false, message };
  }
};
