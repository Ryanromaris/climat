import axios from 'axios';
import URLService from '../service/URLService';
import { CategoryType } from '../types/type';

class CategoryAPI {
  getCategory() {
    return axios.get<CategoryType[]>(URLService.DefaultAPI('/category'));
  }

  createCategory(name: String) {
    return axios.post(URLService.DefaultAPI('/category'), {
      name,
    });
  }

  deleteCategory(id: Number) {
    return axios.delete(URLService.DefaultAPI(`/category/${id}`), {
      data: { userKey: '1234' },
    });
  }
}

export default new CategoryAPI();
