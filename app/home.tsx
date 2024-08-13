import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '@/components/searchbar/SearchBar';
import { useNavigation } from '@react-navigation/native';
import DateSelectorNav from '../components/selector/DateSelector'

export default function HomeScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const dates = [
    '2024-08-12',
    '2024-08-13',
    '2024-08-14',
    '2024-08-15',
    '2024-08-16',
  ];

  const [selectedDate, setSelectedDate] = useState<string>(dates[0]);

  const handleSettingsScreen = () => {
    navigation.navigate('settings');
  };

  const handleFavoritesScreen = () => {
    navigation.navigate('favorites');
  };

  const handleSmallsScreen = () => {
    navigation.navigate('venues/smalls', { selectedDate });
  };

  const venues = [
    'Blue Note NYC',
    'Jazz at Lincoln Center',
    'Mezzrow',
    'Smalls Jazz Club',
    'The Stone',
    'The Village Vanguard',
  ];

  return (
    <Container>
        <Header>
            <TouchableOpacity onPress={handleSettingsScreen}>
                <Ionicons name="settings-outline" size={24} color={theme.colors.text.primary}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFavoritesScreen}>
                <Ionicons name="heart-outline" size={24} color={theme.colors.text.primary}/>
            </TouchableOpacity>
        </Header>

        <Title>{`LIVE in NYC`}</Title>

        <SearchBar placeholder="Musician, venue, or band name"/>

        <DateSelectorNav
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dates={dates}
        />

        <Content contentContainerStyle={{ alignItems: 'center', paddingVertical: theme.spacing(5) }}>
            {venues.map((venue) => (
            <TouchableOpacity
              key={venue}
              onPress={venue === 'Smalls Jazz Club' ? handleSmallsScreen : () => {}}
            >
              <VenueContainer key={venue}>
                  <Circle/>
                  <VenueText>{venue}</VenueText>
              </VenueContainer>
            </TouchableOpacity>
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
  flex: 1,
  fontSize: 16,
  color: theme.colors.buttonText.primary,
}));
