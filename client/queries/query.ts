import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import CategoryAPI from '../api/CategoryAPI';
import MenuAPI from '../api/MenuAPI';
import { MenuType } from '../types/type';
import { queryKeys } from './queryKeys';

//Category
export const useCategoryList = () => {
  return useQuery(queryKeys.category, () => CategoryAPI.getCategory());
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation((name: String) => CategoryAPI.createCategory(name), {
    onSuccess: (res) => {
      const newData = res.data[res.data.length - 1].name;
      toast({
        title: '카테고리 생성 완료',
        description: `'${newData}' 카테고리 생성이 완료되었습니다.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return queryClient.invalidateQueries(queryKeys.category);
    },
    onError: (err: any) => {
      toast({
        title: '카테고리 추가 실패',
        description: `${err.response.data.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation((id: Number) => CategoryAPI.deleteCategory(id), {
    onSuccess: () => {
      toast({
        title: '카테고리 삭제 완료',
        description: `카테고리 삭-제.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return queryClient.invalidateQueries(queryKeys.category);
    },
    onError: (err: any) => {
      toast({
        title: '카테고리 삭제 실패',
        description: `${err.response.data.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
  });
};

//Memos
export const useMenuList = () => {
  return useQuery(queryKeys.menu, () => MenuAPI.getMenu());
};

export const useMenuById = (id: number) => {
  return useQuery(queryKeys.menuById(id), () => MenuAPI.getMenuById(id), {
    enabled: !!id,
  });
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    ({
      name,
      categoryname,
      type,
      summary,
      alcohol,
      amount,
      vintage,
    }: Omit<MenuType, 'id'>) =>
      MenuAPI.createMenu({
        name,
        categoryname,
        type,
        summary,
        alcohol,
        amount,
        vintage,
      }),
    {
      onSuccess: (res) => {
        console.log('test', res.data);
        const newData = res.data[res.data.length - 1].name;
        toast({
          title: '메뉴 생성 완료',
          description: `'${newData}' 메뉴 생성이 완료되었습니다.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        return queryClient.invalidateQueries(queryKeys.menu);
      },
      onError: (err: any) => {
        toast({
          title: '메뉴 추가 실패',
          description: `${err.response.data.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      },
    }
  );
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation((id: Number) => MenuAPI.deleteMenu(id), {
    onSuccess: () => {
      toast({
        title: '메뉴 삭제 완료',
        description: `메뉴 삭-제.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return queryClient.invalidateQueries(queryKeys.menu);
    },
    onError: (err: any) => {
      toast({
        title: '메뉴 삭제 실패',
        description: `${err.response.data.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
  });
};
