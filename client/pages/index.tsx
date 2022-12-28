import {
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  OrderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import axios from 'axios';

import { useQuery } from 'react-query';

const Home = () => {
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    'categories',
    () =>
      axios({
        method: 'get',
        url: 'http://localhost:8080/category',
        responseType: 'json',
      })
  );

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
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

      <Accordion allowToggle>
        {data?.data.map((category: string, idx: number) => (
          <AccordionItem key={idx}>
            <h2>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  {category}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <OrderedList>
                <ListItem>
                  <Link href='/menu/1'>links can live inline with text</Link>
                </ListItem>
                <ListItem>Consectetur adipiscing elit</ListItem>
                <ListItem>Integer molestie lorem at massa</ListItem>
                <ListItem>Facilisis in pretium nisl aliquet</ListItem>
              </OrderedList>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Home;
