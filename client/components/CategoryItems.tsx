import { Link, ListItem, OrderedList } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Menu } from '../pages/menu/[id]';

type Props = {
  menus: Menu[];
  category: string;
};

const CategoryItems = ({ menus, category }: Props) => {
  const router = useRouter();

  const menusByCategory = menus.filter((m) => m.category === category);

  return (
    <>
      <OrderedList>
        {menusByCategory?.map((menu) => (
          <ListItem>
            <Link href={`/menu/${menu.id}`}>{menu.name}</Link>
          </ListItem>
        ))}
      </OrderedList>
    </>
  );
};

export default CategoryItems;
