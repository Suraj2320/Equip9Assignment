import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
 
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobileNumber: '',
    password: '',
    profilePicture: null,
  });
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post('https://aswassign.onrender.com/users/login', formData)
      console.log(response.data.message, "hello sunil")
      if (response.data.message == 'login sucess') {
        localStorage.setItem('loginData', JSON.stringify(response.data.user));
        console.log(response.data, "suraj bhai indbaad")
        navigate("/")
      }
    }
    catch (e) {
      console.log(e)
    }
  };


  const another = () => {
    navigate("/signup")
  }



  return (

    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Mobile Number</FormLabel>
              <Input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </FormControl>

            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link onClick={another} color={'blue.400'}>SignUp</Link>
              </Text>
            </Stack>
            <Stack spacing={10}>

              <Button
                onClick={handleSubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Log in
              </Button>


            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>



  );
};

export default LoginForm;
