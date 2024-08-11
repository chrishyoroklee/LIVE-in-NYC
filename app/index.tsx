import React from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';

export default function HomeScreen() {
  const theme = useTheme();

  const venues = [
    'Bar Bayeux',
    'Bar LunAtico',
    'Birdland',
    'Blue Note NYC',
    'Cellar Dog',
    'Jazz at Lincoln Center',
    'Mezzrow',
    "Minton's Playhouse",
    'Nublu',
    'Ornithology Jazz Club',
    'Room 623',
    'Smalls Jazz Club',
    'Smoke Jazz Club',
    'The Django',
    'The Iridium',
    'The Jazz Gallery',
    'The Stone',
    'The Village Vanguard',
    'Zinc Bar',
  ];

  const handlePress = (venue: string) => {
    alert(`You pressed ${venue}`);
  };

  return (
    <Container>
      <Content contentContainerStyle={{ alignItems: 'center', paddingVertical: theme.spacing(5) }}>
        <Title>{`LIVE in NYC`}</Title>
        {venues.map((venue) => (
          <ButtonContainer key={venue}>
            <Button title={venue} onPress={() => handlePress(venue)} color={theme.colors.button.primary} />
          </ButtonContainer>
        ))}
      </Content>
    </Container>
  );
}

const Container = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.screen,
}));

// Ensure layout styles like alignItems are applied using contentContainerStyle
const Content = styled.ScrollView({
  flexGrow: 1,
});

const Title = styled(Text)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 'bold',
  color: theme.colors.text.primary,
  marginBottom: theme.spacing(5),
}));

const ButtonContainer = styled(View)(({ theme }) => ({
  marginVertical: theme.spacing(2.5),
  width: '80%',
}));