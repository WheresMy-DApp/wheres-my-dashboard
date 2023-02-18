import axios from "axios";

export const initiateLogin = async (walletAddress) => {
    let endpoint = `${process.env.REACT_APP_ENDPOINT}user/initLogin`;
    let payload = {
        "walletAddress": walletAddress,
    }

    let response = await axios.post(endpoint, payload);
    response = response.data;
    return response;
}