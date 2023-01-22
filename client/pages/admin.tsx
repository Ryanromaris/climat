import {
  Box,
  Button,
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
  useToast,
  Text,
  Spacer,
  Textarea,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';

import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DialogContext } from '../context/DialogProvider';

import { CategoryType, MenuType } from '../types/type';

const Admin = () => {
  const { openSimpleDialog } = useContext(DialogContext);
  const [auth, setAuth] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const passwordRef = useRef<any>();

  const [modal, setModal] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const categoryNameRef = useRef<any>('');
  const toast = useToast();

  const categories = useQuery('categories', () =>
    axios.get<CategoryType[]>('http://localhost:8080/category')
  );

  const menus = useQuery('menus', () =>
    axios.get<MenuType[]>('http://localhost:8080/menu')
  );

  const queryClient = useQueryClient();
  const { mutate: createCategory } = useMutation(
    'categories',
    () =>
      axios.post('http://localhost:8080/category', {
        name: categoryNameRef.current.value,
      }),
    {
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
        return queryClient.invalidateQueries('categories');
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
    }
  );

  const { mutate: removeCategory }: { mutate: (id: number) => void } =
    useMutation(
      'categories',
      (id) =>
        axios.delete(`http://localhost:8080/category/${id}`, {
          data: { userKey: '1234' },
        }),
      {
        onSuccess: (res) => {
          toast({
            title: '카테고리 삭제 완료',
            description: `카테고리 삭-제.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top',
          });
          return queryClient.invalidateQueries('categories');
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
      }
    );

  const { mutate: removeMenu }: { mutate: (id: number) => void } = useMutation(
    'menus',
    (id) =>
      axios.delete(`http://localhost:8080/menu/${id}`, {
        data: { userKey: '1234' },
      }),
    {
      onSuccess: () => {
        toast({
          title: '메뉴 삭제 완료',
          description: `메뉴 삭-제.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        return queryClient.invalidateQueries('menus');
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
    }
  );

  const menuNameRef = useRef<any>('');
  const menuCategoryNameRef = useRef<any>('');
  const menuTypeRef = useRef<any>('');
  const menuSummaryRef = useRef<any>('');
  const menuAlcoholRef = useRef<any>('');
  const menuAmountRef = useRef<any>('');
  const menuVintageRef = useRef<any>('');

  const { mutate: createMenu } = useMutation(
    'menus',
    () =>
      axios.post('http://localhost:8080/menu', {
        name: menuNameRef.current.value,
        categoryname: menuCategoryNameRef.current.value,
        type: menuTypeRef.current.value,
        summary: menuSummaryRef.current.value,
        alcohol: menuAlcoholRef.current.value,
        amount: menuAmountRef.current.value,
        vintage: menuVintageRef.current.value,
      }),
    {
      onSuccess: (res) => {
        const newData = res.data[res.data.length - 1].name;
        toast({
          title: '메뉴 생성 완료',
          description: `'${newData}' 메뉴 생성이 완료되었습니다.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        return queryClient.invalidateQueries('menus');
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

            {categories.data.data.map((category) => (
              <Accordion allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: '#D3D3D3' }}>
                      <Text p='2'>{category.name}</Text>
                      <Spacer />
                      <Button
                        p='4'
                        mr='2'
                        onClick={(e) => {
                          e.preventDefault();
                          openSimpleDialog({
                            title: '카테고리 삭제',
                            content: `정말로 ${category.name} 카테고리를 삭제하시겠습니까?`,
                            handleConfirm: () => removeCategory(category.id),
                            handleClose: () => {},
                          });
                        }}
                      >
                        삭제
                      </Button>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  {menus.data?.data
                    .filter((menu) => menu.categoryname === category.name)
                    .map((menu) => (
                      <AccordionPanel ml={3} pb={2}>
                        <Flex>
                          <Text p='2'>- {menu.name}</Text>
                          <Spacer />
                          <Button
                            p='2'
                            mr='2'
                            onClick={(e) => {
                              e.preventDefault();
                              openSimpleDialog({
                                title: '카테고리 삭제',
                                content: `정말로 ${menu.name} 메뉴를 삭제하시겠습니까?`,
                                handleConfirm: () => removeMenu(menu.id),
                                handleClose: () => {},
                              });
                            }}
                          >
                            X
                          </Button>
                        </Flex>
                      </AccordionPanel>
                    ))}
                </AccordionItem>
              </Accordion>
            ))}

            <ModalBody m={2}>
              <Input placeholder='카테고리 입력하세용' ref={categoryNameRef} />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={() => createCategory()}>
                추가하기
              </Button>
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
                  <Select placeholder='Select option' ref={menuCategoryNameRef}>
                    {categories.data.data?.map((category) => (
                      <option value={category.name}>{category.name}</option>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Heading mb='3' size='xs' textTransform='uppercase'>
                    Name
                  </Heading>
                  <Input placeholder='' ref={menuNameRef} />
                </Box>
                <Box>
                  <Heading mb='3' size='xs' textTransform='uppercase'>
                    Type
                  </Heading>
                  <Input placeholder='Red, White ...' ref={menuTypeRef} />
                </Box>
                <Box>
                  <Heading mb='3' size='xs' textTransform='uppercase'>
                    Summary
                  </Heading>
                  <Textarea placeholder='' ref={menuSummaryRef} />
                </Box>
                <Box>
                  <Heading mb='3' size='xs' textTransform='uppercase'>
                    Vintage
                  </Heading>
                  <Input placeholder='' ref={menuVintageRef} />
                </Box>
                <Box>
                  <Heading mb='3' size='xs' textTransform='uppercase'>
                    용량
                  </Heading>
                  <Input placeholder='' ref={menuAmountRef} />
                </Box>
                <Box>
                  <Heading mb='3' size='xs' textTransform='uppercase'>
                    도수
                  </Heading>
                  <Input placeholder='' ref={menuAlcoholRef} />
                </Box>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                variant='ghost'
                onClick={() => {
                  createMenu();
                  onClose();
                }}
              >
                추가하기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
};

export default Admin;
