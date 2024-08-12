import React from 'react';
import { TouchableOpacity, Text, View, Touchable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '@/components/SearchBar';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const handleSettingsScreen = () => {
    navigation.navigate('settings');
  };

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

  return (
    <Container>
        <Header>
            <TouchableOpacity onPress={handleSettingsScreen}>
                <Ionicons name="settings-outline" size={24} color={theme.colors.text.primary}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} color={theme.colors.text.primary}/>
            </TouchableOpacity>
        </Header>

        <Title>{`LIVE in NYC`}</Title>

        <SearchBar placeholder="Musician, venue, or band name"/>

        <DateSelector>
            <Ionicons name="chevron-back-outline" size={24} color={theme.colors.text.primary}/>
            <DateText>{`Sunday, Aug 11`}</DateText>
            <Ionicons name="chevron-forward-outline" size={24} color={theme.colors.text.primary}/>
        </DateSelector>

        <Content contentContainerStyle={{ alignItems: 'center', paddingVertical: theme.spacing(5) }}>
            {venues.map((venue) => (
            <VenueContainer key={venue}>
                <Circle/>
                <VenueText>{venue}</VenueText>
            </VenueContainer>
            ))}
        </Content>
        </Container>
  );
}

const Container = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.screen,
}));

const Header = styled(View)(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
}));

const Title = styled(Text)(({ theme }) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(2),
  }));

const DateSelector = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(5),
  marginTop: theme.spacing(2),
}));

const DateText = styled(Text)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 'bold',
  color: theme.colors.text.primary,
  marginHorizontal: theme.spacing(2),
}));

const Content = styled.ScrollView({
  flexGrow: 1,
});


const VenueContainer = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  width: '90%',
  paddingVertical: theme.spacing(2),
  borderBottomColor: theme.colors.border.primary,
  borderBottomWidth: 1,
}));

const Circle = styled(View)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  borderColor: theme.colors.text.primary,
  borderWidth: 1,
  marginRight: theme.spacing(3),
}));

const VenueText = styled(Text)(({ theme }) => ({
  fontSize: 16,
  color: theme.colors.buttonText.primary,
}));
