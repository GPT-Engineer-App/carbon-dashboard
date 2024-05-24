import { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, Box, IconButton, useToast } from "@chakra-ui/react";
import { FaLeaf, FaCalculator } from "react-icons/fa";

const Index = () => {
  const [electricity, setElectricity] = useState("");
  const [gas, setGas] = useState("");
  const [water, setWater] = useState("");
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const toast = useToast();

  const calculateFootprint = () => {
    if (!electricity || !gas || !water) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const electricityFootprint = parseFloat(electricity) * 0.527; // Example conversion factor
    const gasFootprint = parseFloat(gas) * 2.204; // Example conversion factor
    const waterFootprint = parseFloat(water) * 0.001; // Example conversion factor

    const totalFootprint = electricityFootprint + gasFootprint + waterFootprint;
    setCarbonFootprint(totalFootprint.toFixed(2));
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack spacing={2}>
          <FaLeaf size="2em" color="green" />
          <Text fontSize="2xl" fontWeight="bold">
            Carbon Footprint Calculator
          </Text>
        </HStack>
        <Text>Enter your monthly usage to calculate your carbon footprint.</Text>
        <VStack spacing={4} width="100%">
          <Input placeholder="Electricity (kWh)" value={electricity} onChange={(e) => setElectricity(e.target.value)} />
          <Input placeholder="Gas (therms)" value={gas} onChange={(e) => setGas(e.target.value)} />
          <Input placeholder="Water (gallons)" value={water} onChange={(e) => setWater(e.target.value)} />
          <Button leftIcon={<FaCalculator />} colorScheme="green" onClick={calculateFootprint}>
            Calculate
          </Button>
        </VStack>
        {carbonFootprint !== null && (
          <Box p={4} mt={4} borderWidth={1} borderRadius="md" width="100%" textAlign="center">
            <Text fontSize="lg">Your Carbon Footprint is:</Text>
            <Text fontSize="2xl" fontWeight="bold">
              {carbonFootprint} kg CO2
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
