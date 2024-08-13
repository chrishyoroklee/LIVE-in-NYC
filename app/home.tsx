import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '@/components/searchbar/SearchBar';
import { useNavigation } from '@react-navigation/native';

interface DayCircleProps {
  isSelected: boolean;
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [selectedDay, setSelectedDay] = useState({ day: 'M', index: 1 });

  const handleSettingsScreen = () => {
    navigation.navigate('settings');
  };

  const handleFavoritesScreen = () => {
    navigation.navigate('favorites');
  };

  // const handleSmallsScreen = () => {
  //   navigation.navigate('venues/smalls', { selectedDate });
  // };

  const venues = [
    {
      name: 'Smalls',
      event: 'Livestream, J',
      time: '5:30 PM (Doors 4:30PM)',
    },
    {
      name: 'Birdland',
      event: 'Livestream, A',
      time: '5:30 PM (Doors 4:30PM)',
    },
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

        <DaySelector>
          <FlatList
            horizontal
            data={days}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setSelectedDay({ day: item, index})}>
                <DayCircle isSelected={selectedDay.day === item && selectedDay.index === index}>
                  <DayText>{item}</DayText>
                </DayCircle>
              </TouchableOpacity>
            )}
          />
        </DaySelector>
        <SeeAll onPress={() => { /* Handle See All Navigation */ }}>
            <Text>See all {'>'}</Text>
        </SeeAll>
        
        <Content contentContainerStyle={{ alignItems: 'center', paddingVertical: theme.spacing(5) }}>
            {venues.map((venue) => (
              <VenueCardContainer key={venue.name}>
                <VenueCard/ >
                <TextContainer>
                  <VenueName>{venue.name}</VenueName>
                  <EventDetails>{venue.event}</EventDetails>
                  <TimeDetails>{venue.time}</TimeDetails>
                </TextContainer>
              </VenueCardContainer>
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

const DaySelector = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: theme.spacing(2),
  paddingTop: theme.spacing(4),
}));

const DayCircle = styled(View)<DayCircleProps>(({ theme, isSelected }) => ({
  width: 52,
  height: 33,
  borderRadius: 15,
  backgroundColor: isSelected ? theme.colors.button.primary : undefined,
  justifyContent: 'center',
  alignItems: 'center',
}));

const DayText = styled(Text)(({ theme }) => ({
  color: theme.colors.text.primary,
  fontWeight: 'bold',
  fontSize: 20,
}));

const SeeAll = styled(TouchableOpacity)(({ theme }) => ({
  alignItems: 'flex-end',
  padding: theme.spacing(2),
  paddingTop: theme.spacing(4),
}));

const Content = styled.ScrollView({
  flexGrow: 1,
});

const VenueCardContainer = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
  width: '90%', 
  alignSelf: 'flex-start', 
}));

const VenueCard = styled(View)(({ theme }) => ({
  flexDirection: 'row',  
  alignItems: 'center',
  backgroundColor: theme.colors.background.screen,
  borderRadius: 10,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  marginLeft: theme.spacing(8),
  borderColor: theme.colors.border.primary,
  borderWidth: 1,
  height: 80,  
  width: '40%',
  alignSelf: 'flex-start', 
}));

const TextContainer = styled(View)(({ theme }) => ({
  flexDirection: 'column',  
  justifyContent: 'center',  
  paddingLeft: theme.spacing(4),  
  width: '100%',  
}));

const VenueName = styled(Text)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const EventDetails = styled(Text)(({ theme }) => ({
  fontSize: 16,
  color: theme.colors.text.secondary,
  marginBottom: theme.spacing(1),
}));

const TimeDetails = styled(Text)(({ theme }) => ({
  fontSize: 14,
  color: theme.colors.text.secondary,
}));
