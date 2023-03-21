import {
  Flex,
  Heading,
  Image,
  Box,
  CardHeader,
  Stack,
  Center,
  Text,
  Card,
  CardBody,
  StackDivider,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import MenuAPI from '../../api/MenuAPI';
import { useMenuById } from '../../queries/query';
import { MenuType } from '../../types/type';

const MenuDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, isError, isSuccess, data, error } = useMenuById(
    Number(id)
  );

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error !!</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size='md'>
            {data?.data.categoryname} - {data?.data.name}
          </Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            {/* <Box>
              <Center>
                <Image
                  src='data:image/jpeg;base64,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'
                  alt='Dan Abramov'
                  boxSize='200px'
                />
              </Center>
            </Box> */}
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                종류
              </Heading>
              <Text pt='2' fontSize='sm'>
                {data?.data.type}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Summary
              </Heading>
              {data?.data.summary && (
                <Text
                  pt='2'
                  fontSize='sm'
                  dangerouslySetInnerHTML={{
                    __html: data.data.summary.replaceAll('\n', '<br/>'),
                  }}
                ></Text>
              )}
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Vintage
              </Heading>
              <Text pt='2' fontSize='sm'>
                {data?.data.vintage}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Amount
              </Heading>
              <Text pt='2' fontSize='sm'>
                {data?.data.amount}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Alcohol
              </Heading>
              <Text pt='2' fontSize='sm'>
                {data?.data.alcohol}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default MenuDetail;
