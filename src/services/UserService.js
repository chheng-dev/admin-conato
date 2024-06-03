import axios from "axios"
const API_BASE_URL = process.env.REACT_APP_API_URL; 

class UserService {
  static async getUserProfile(token){
    try {
      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    }catch(err){
      console.log('Token not found or invalid.');
      throw err;
    }
  }
}

export default UserService;