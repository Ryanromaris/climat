import {
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useQuery } from 'react-query';
import CategoryItems from '../components/CategoryItems';

const Home = () => {
  const router = useRouter();
  const [category, setCategory] = useState<string>('');
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    'categories',
    () =>
      axios({
        method: 'get',
        url: 'http://localhost:8080/category',
        responseType: 'json',
      })
  );
  const menus = useQuery('menus', () =>
    axios({
      method: 'get',
      url: 'http://localhost:8080/menu',
      responseType: 'json',
    })
  );

  if (isLoading || menus.isLoading) {
    return <div>Loading</div>;
  }
  if (isError || menus.isError) {
    return <div>Error !!</div>;
  }

  return (
    <>
      <Flex
        height={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        direction={'column'}
        p={4}
      >
        <Heading>Hello Climat</Heading>
      </Flex>

      <Accordion index={Number(router.query.index)} allowToggle>
        {data?.data.map((category: string, idx: number) => (
          <AccordionItem key={idx}>
            <h2>
              <AccordionButton
                onClick={() => {
                  router.push(`?index=${idx}`);
                  setCategory(category);
                }}
              >
                <Box as='span' flex='1' textAlign='left'>
                  {category}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {menus?.data?.data && (
                <CategoryItems category={category} menus={menus.data.data} />
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Home;
