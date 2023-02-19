import axios from "axios";

export const initiateLogin = async (walletAddress) => {
  let endpoint = `${process.env.REACT_APP_ENDPOINT}user/initLogin`;
  let payload = {
    walletAddress: walletAddress,
  };

  let response = await axios.post(endpoint, payload);
  response = response.data;
  return response;
};

export const login = async (walletAddress, signature) => {
  let endpoint = `${process.env.REACT_APP_ENDPOINT}user/login`;
  let payload = {
    walletAddress: walletAddress,
    signature: signature,
  };

  let response = await axios.post(endpoint, payload);
  response = response.data;
  return response;
};

export const getToken = async () => {
  let token = localStorage.getItem("token");
  let options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return options;
};

export const getAllDevices = async () => {
  let endpoint = `${process.env.REACT_APP_ENDPOINT}device`;
  const options = await getToken();

  let response = await axios.get(endpoint, options);
  response = response.data;
  return response;
};

export const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
