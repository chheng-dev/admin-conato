import axios from "axios"
const API_BASE_URL = process.env.REACT_APP_API_URL;

class BrandServiceApi{
  static async getBrandList() {
    try {
      const response = await axios.get(`${API_BASE_URL}/brands`);
      return response.data;
    } catch (error) {
      console.error('Error fetching items', error);
      throw error;
    }
  }

  static async createBrand(brandData){
    try {
      const response = await axios.post(`${API_BASE_URL}/brand`, brandData);
      return response.data;
    } catch(err) {
      console.log('Error creating brand', err);
      throw err;
    }
  }

  static async getBrandById(id) {
    try{
      const response = await axios.get(`${API_BASE_URL}/brand/${id}`);
      return response.data;
    }
    catch(err){
      console.error(`Error fetching item with ID ${id}`, err);
      throw err;
    }
  }

  static async updateBrand(brandId, formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/brand/${brandId}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to update brand');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteBrand(brandId) {
    try{
      const response = await axios.delete(`${API_BASE_URL}/brand/${brandId}`);
      return response.data;
    }catch(err){
      console.log('Brand given id not found.');
      throw err;
    }
  }
}

export default BrandServiceApi;