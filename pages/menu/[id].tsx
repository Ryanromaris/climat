import { Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const MenuDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Flex
        height={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        direction={'column'}
      >
        <Heading>메뉴 상세페이지 {id}</Heading>
      </Flex>
    </>
  );
};

export default MenuDetail;
