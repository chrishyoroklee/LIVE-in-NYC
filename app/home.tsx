import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, ScrollView, FlatList, Touchable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import HeartCheckIcon from '@/components/icon/HeartCheckIcon';
import SearchBar from '@/components/searchbar/SearchBar';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from './loadingScreen'; 
import jazzData from '../data/JazzData.json';

interface Show {
  id: string;
  time: string;
  doorsOpen: string;
  band: string;
}

interface VenueShows {
  [venue: string]: Show[];
}

interface Schedule {
  [date: string]: VenueShows;
}

interface DayCircleProps {
  isSelected: boolean;
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const currentDayIndex = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(new Date());

  const [shows, setShows] = useState<{ venue: string; shows: Show[] }[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); 
    }, 3000);
  }, []);

  useEffect(() => {
    const formattedDate = `${selectedDay.getFullYear()}-${String(selectedDay.getMonth() + 1).padStart(2, '0')}-${String(selectedDay.getDate()).padStart(2, '0')}`;
    const dayShows = jazzData[formattedDate as keyof typeof jazzData];
    
    if (dayShows) {
      const venuesWithShows = Object.entries(dayShows).map(([venue, shows]) => {
        return { venue, shows };
      });
      setShows(venuesWithShows);
    } else {
      setShows([]); // Set to empty array if no shows found for the selected date
    }
  }, [selectedDay]);

  const handleDayChange = (dayIndex: number) => {
    const date = new Date();
    const todayIndex = date.getDay();
    const selectedDate = new Date(date.setDate(date.getDate() + (dayIndex - todayIndex)));
    setSelectedDay(selectedDate);
  };

  const handleSettingsScreen = () => {
    navigation.navigate('settings');
  };

  const handleFavoritesScreen = () => {
    navigation.navigate('favorites');
  };

  const handleDetailsScreen = () => {
    navigation.navigate('details');
  };

  const handleLoadingScreen = () => {
    navigation.navigate('loadingScreen');
  };

  return (
    <Container>
        <Header>
            <TouchableOpacity onPress={handleSettingsScreen}>
                <Ionicons name="settings-outline" size={24} color={theme.colors.text.primary}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFavoritesScreen}>
                <HeartCheckIcon/>
            </TouchableOpacity>
        </Header>

        {/* <Title>{`LIVE NYC`}</Title> */}

        <SearchBar placeholder="Artists, venues, and events"/>

        {/* <TouchableOpacity onPress={handleLoadingScreen} style={{ marginTop: 20, marginBottom: 20 }}>
            <Text>Go to Loading Screen</Text>
        </TouchableOpacity> */}
        
        <DaySelector>
          <FlatList
            horizontal
            data={days}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleDayChange(index)}>
                <DayCircle isSelected={selectedDay.getDay() === index}>
                  <DayText>{item}</DayText>
                </DayCircle>
              </TouchableOpacity>
            )}
          />
        </DaySelector>
        <SeeAll onPress={handleDetailsScreen}>
            <SeeAllText>See all {'>'}</SeeAllText>
        </SeeAll>
        
        <Content contentContainerStyle={{ alignItems: 'center', paddingVertical: theme.spacing(5) }}>
            {shows.map(({ venue, shows }) => (
              <View key={venue} style={{ width: '100%' }}>
                {shows.map(show => (
                  <TouchableOpacity
                    key={show.id}
                    onPress={() => navigation.navigate('event', {
                      venue: venue,
                      date: selectedDay
                    })}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', alignSelf: 'flex-start' }}
                  >
                    <VenueCardContainer>
                      <VenueCard>
                        <VenueName>{venue}</VenueName>
                      </VenueCard>
                      <TextContainer>
                        <BandName>{show.band}</BandName>
                        <EventDetails>{show.time}</EventDetails>
                        <TimeDetails>{`Doors Open: ${show.doorsOpen}`}</TimeDetails>
                      </TextContainer>
                    </VenueCardContainer>
                  </TouchableOpacity>
                ))}
              </View>
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
    marginLeft: theme.spacing(4),
  }));

const DaySelector = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: theme.spacing(2),
  paddingTop: theme.spacing(4),
}));

const DayCircle = styled(View)<DayCircleProps>(({ theme, isSelected }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 6,
  borderWidth: isSelected ? 1 : 0, 
  borderColor: isSelected ? theme.colors.text.primary : undefined,
  marginRight: 8,
}));

const DayText = styled(Text)(({ theme }) => ({
  color: theme.colors.text.primary,
  fontWeight: 'bold',
  fontSize: 24,
}));

const SeeAll = styled(TouchableOpacity)(({ theme }) => ({
  alignItems: 'flex-end',
  paddingRight: theme.spacing(6),
  paddingTop: theme.spacing(4),
}));

const SeeAllText = styled(Text)(({ theme }) => ({
  color: theme.colors.text.primary,
  fontWeight: 'bold',
  fontSize: 14,
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
  width: '70%',  
}));

const VenueName = styled(Text)(({ theme }) => ({
  fontSize: 15,
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  color: theme.colors.text.primary,
  flexWrap: 'wrap',
  width: '100%'
}));

const BandName = styled(Text)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  color: theme.colors.text.primary,
  flexWrap: 'wrap',
  width: '100%'
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
