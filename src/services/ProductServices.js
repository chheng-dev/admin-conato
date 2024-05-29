import axios from "axios"
const API_BASE_URL = process.env.REACT_APP_API_URL;

class ProductServiceApi{
  static async getProductList() {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      const products = response.data;

      const productDetailsPromies = products.map(async (product) =>{
        const [category, brand] = await Promise.all([
          this.getCategoryById(product.category_id),
          this.getBrandById(product.brand_id)
        ]);
        return { ...product, category, brand };
      });

      return await Promise.all(productDetailsPromies);

    } catch (error) {
      console.error('Error fetching products', error);
      throw error;
    }
  }

  static async getCategoryById(id){
    try {
      const response = await axios.get(`${API_BASE_URL}/category/${id}`);
      return response.data;

    } catch(error) {
      throw error;
    }
  }

  static async getBrandById(id){
    try {
      const response = await axios.get(`${API_BASE_URL}/brand/${id}`);
      return response.data;
      
    } catch(error) {
      throw error;
    }
  }

  static async createProduct(formData) {
    try{
      const response = axios.post(`${API_BASE_URL}/product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;

    } catch(error){
      throw error;
    }
  }

  static async getProductById(id){
    try {
      const productResponse = await axios.get(`${API_BASE_URL}/product/${id}`);
      const product = productResponse.data;

      const [category, brand] = await Promise.all([
        this.getCategoryById(product.category_id),
        this.getBrandById(product.brand_id),
      ]);

      return { ...product, category, brand };
      
    } catch(error) {
      throw error;
    }
  }

  static async updateProduct(id, formData){
    console.log('formData', formData);
    console.log('od', id);

    try {
      const response = await axios.put(`${API_BASE_URL}/product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (err) {
      console.log('Product given id not found.');
      throw err;
    }
  }

  static async deleteProduct(id){
    try{
      const response = await axios.delete(`${API_BASE_URL}/product/${id}`);
      return response.data;
    }catch(err){
      console.log('Product given id not found.');
      throw err;
    }
  }

}

export default ProductServiceApi;