import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL;
console.log(API_BASE_URL)
class CategoryServiceApi{
  static async getCategoriesList(){
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch(err){
      console.error('Error fecting category', err);
      throw err;
    }
  }

  static async createCategory(categoryData){
    try{
      const response = await axios.post(`${API_BASE_URL}/category`, categoryData);
      return response.data;
    }
    catch(err){
      console.log('Error creating category', err);
      throw err;
    }
  }

  static async getCategoryById(id){
    try{
      const response = await axios.get(`${API_BASE_URL}/category/${id}`);
      return response.data;
    }catch(err){
      console.log('Category given Id not found');
      throw err;
    }
  }

  static async updateCategoryById(id, categoryData){
    try{
      const { name, color } = categoryData;
      const response = await axios.put(`${API_BASE_URL}/category/${id}`, { name, color });
      return response.data;
      
    }catch(err){
      console.log('Category given ID not found');
      throw err;
    }
  }

  static async deleteCategoryById(id){
    try{
      const response = await axios.delete(`${API_BASE_URL}/category/${id}`);
      return response.data;

    }catch(err){
      console.log('Category given id not found.');
      throw err;
    }
  }

}

export default CategoryServiceApi;