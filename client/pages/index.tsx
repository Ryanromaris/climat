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

import { useRouter } from 'next/router';

import CategoryItems from '../components/CategoryItems';
import { useCategoryList, useMenuList } from '../queries/query';

const Home = () => {
  const router = useRouter();

  const categoryQuery = useCategoryList();
  const menus = useMenuList();

  if (categoryQuery.isLoading || menus.isLoading) {
    return <div>Loading</div>;
  }
  if (categoryQuery.isError || menus.isError) {
    return <div>Error !!</div>;
  }

  if (categoryQuery.isSuccess) {
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
          {categoryQuery.data.data.map((category, idx: number) => (
            <AccordionItem key={idx}>
              <h2>
                <AccordionButton
                  onClick={() => {
                    Number(router.query.index) === idx
                      ? router.push('/')
                      : router.push(`?index=${idx}`);
                  }}
                >
                  <Box as='span' flex='1' textAlign='left'>
                    {category.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {menus?.data?.data && (
                  <CategoryItems
                    category={category.name}
                    menus={menus.data.data}
                  />
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </>
    );
  }
};

export default Home;
