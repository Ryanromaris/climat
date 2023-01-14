import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';

import { CategoryList } from '../types/type';

// const MODAL_TYPE = ['category','menu']

const Admin = () => {
  const [auth, setAuth] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const passwordRef = useRef<any>();

  const [modal, setModal] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const categories = useQuery('categories', () =>
    axios.get<CategoryList>('http://localhost:8080/category')
  );

  if (!auth) {
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
          <Heading>관리자용 페이지</Heading>
        </Flex>
        <Center flexDirection='column'>
          <InputGroup w='50' size='md'>
            <Input
              type={show ? 'text' : 'password'}
              placeholder='Enter password'
              ref={passwordRef}
            />
            <InputRightElement width='4.5rem'>
              <Button size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            m={5}
            onClick={() => {
              if (passwordRef.current.value !== '1234') return;
              setAuth(true);
            }}
          >
            Submit
          </Button>
        </Center>
      </>
    );
  }

  if (categories.isLoading || categories.isError || !categories) return <></>;

  if (categories.isSuccess && categories.data) {
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
        <Center flexDirection='column'>
          <Button
            m='5'
            onClick={() => {
              setModal('category');
              onOpen();
            }}
          >
            카테고리 추가
          </Button>
          <Button
            m='5'
            onClick={() => {
              setModal('menu');
              onOpen();
            }}
          >
            메뉴 추가
          </Button>
        </Center>

        <Modal
          isOpen={isOpen && modal === 'category'}
          onClose={onClose}
          motionPreset='slideInBottom'
          size='md'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>카테고리 추가</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder='카테고리 입력하세용' />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>추가하기</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isOpen && modal === 'menu'}
          onClose={onClose}
          motionPreset='slideInBottom'
          size='md'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>메뉴 추가</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading mb='3' size='xs' textTransform='uppercase'>
                    Category
                  </Heading>
                  <Select placeholder='Select option'>
                    {categories.data.data?.map((category) => (
                      <option value={category}>{category}</option>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Heading mb='3' size='xs' textTransform='uppercase'>
                    Type
                  </Heading>
                  <Input placeholder='Red, White ...' />
                </Box>
                <Box>
                  <Heading mb='3' size='xs' textTransform='uppercase'>
                    Summary
                  </Heading>
                  <Input placeholder='' />
                </Box>
                <Box>
                  <Heading mb='3' size='xs' textTransform='uppercase'>
                    Vintage
                  </Heading>
                  <Input placeholder='' />
                </Box>
                <Box>
                  <Heading mb='3' size='xs' textTransform='uppercase'>
                    용량
                  </Heading>
                  <Input placeholder='' />
                </Box>
                <Box>
                  <Heading mb='3' size='xs' textTransform='uppercase'>
                    도수
                  </Heading>
                  <Input placeholder='' />
                </Box>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>추가하기</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
};

export default Admin;
