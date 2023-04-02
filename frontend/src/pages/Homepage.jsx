import React from 'react'
import {  useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

function Homepage() {
  let userss = JSON.parse(localStorage.getItem("loginData"))
  const navigate = useNavigate()

  const handleClick = () => {
    if (userss) {
      localStorage.removeItem("loginData");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box maxW="600px" mx="auto" p="20px">
      <Stack spacing="20px">
        <Button
          bg="orange"
          color="black"
          _hover={{ bg: "red.600" }}
          _active={{ bg: "red.700" }}
          _focus={{ boxShadow: "none" }}
          onClick={handleClick}
        >
          {userss ? "Logout" : "Login"}
        </Button>
        {userss && (
          <Center flexDirection="column">
           
           
            <Box mb="5px">
              
            </Box>
          </Center>
        )}
      </Stack>

      <Box p={4} bg="#f9f9f9" borderRadius={8} boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" color="blue.500">
        Welcome to my website! 
      </Text>
      <Text fontSize="xl" fontWeight="bold" color="#333">
        Firstname  :  {userss.firstname}
      </Text>
      <Text fontSize="xl" fontWeight="bold" color="#333">
        Lastname :  {userss.lastname}
      </Text>
      <Text fontSize="xl" fontWeight="bold" color="#333">
        Mobile Number :  {userss.firstname}
      </Text>
     
    </Box>
    </Box>   
  )
}

export default Homepage