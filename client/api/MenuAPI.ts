import axios from 'axios';
import URLService from '../service/URLService';
import { MenuType } from '../types/type';

class MenuAPI {
  getMenu() {
    return axios.get<MenuType[]>(URLService.DefaultAPI('/menu'));
  }

  getMenuById(id: number) {
    return axios.get<MenuType>(URLService.DefaultAPI(`/menu/${id}`));
  }

  createMenu({
    name,
    categoryname,
    type,
    summary,
    alcohol,
    amount,
    vintage,
  }: Omit<MenuType, 'id'>) {
    return axios.post(URLService.DefaultAPI('/menu'), {
      name,
      categoryname,
      type,
      summary,
      alcohol,
      amount,
      vintage,
    });
  }

  deleteMenu(id: Number) {
    return axios.delete(URLService.DefaultAPI(`/menu/${id}`), {
      data: { userKey: '1234' },
    });
  }
}

export default new MenuAPI();
