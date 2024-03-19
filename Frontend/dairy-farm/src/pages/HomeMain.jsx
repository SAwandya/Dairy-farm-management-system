import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Button } from '@mui/material';

const RootContainer = styled('div')({
  marginTop:80,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  padding: '20px',
});

const StyledCard = styled(Card)({
  minWidth: 275,
  maxWidth: 300,
  margin: '20px',
  backgroundColor: '#E7F1F7',
  flex: '1 1 calc(25% - 40px)', // Adjust flex basis for 4 columns
});

const Title = styled(Typography)({
  fontSize: 24,
  color: '#38775B',
  marginBottom: '10px',
  fontFamily: 'Poppins, sans-serif',
});

const StyledButton = styled(Button)({
  backgroundColor: '#38775B',
  color: '#FFFFFF',
  marginTop: '10px',
  fontFamily: 'Poppins, sans-serif',
});

const HomePage = () => {
  return (
    <RootContainer>
      <StyledCard>
        <CardContent>
          <Title>Grazing Management</Title>
          <StyledButton variant="contained" href="/pastureinfo">View Dashboard</StyledButton>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Title>Milking Management</Title>
          <StyledButton variant="contained" href="/milkingdashboard">View Dashboard</StyledButton>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Title>Product Management</Title>
          <StyledButton variant="contained" href="/product-management">View Dashboard</StyledButton>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Title>Veterinary Management</Title>
          <StyledButton variant="contained" href="/vetdashboard">View Dashboard</StyledButton>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Title>Sales Management</Title>
          <StyledButton variant="contained" href="/SalesDashboard">View Dashboard</StyledButton>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Title>Employee Management</Title>
          <StyledButton variant="contained" href="/employeedashboard">View Dashboard</StyledButton>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Title>Finance Management</Title>
          <StyledButton variant="contained" href="/financedashboard">View Dashboard</StyledButton>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Title>Supplier Management</Title>
          <StyledButton variant="contained" href="/supplierdashboard">View Dashboard</StyledButton>
        </CardContent>
      </StyledCard>
    </RootContainer>
  );
};

export default HomePage;
