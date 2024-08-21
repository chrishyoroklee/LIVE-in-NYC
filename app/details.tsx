import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, View, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import HeartCheckIcon from '@/components/icon/HeartCheckIcon';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import jazzData from '../data/JazzData.json';

interface DayCircleProps {
  isSelected: boolean;
}

interface DayItem {
    dayOfWeek: string;
    day: number;
  }

interface Show {
  id: string;
  time: string;
  doorsOpen: string;
  band: string;
}

interface VenueShows {
  [venue: string]: Show[];
}

export default function DetailsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const flatListRef = useRef<FlatList>(null);

  const today = new Date();
  const currentMonth = today.toLocaleString('en-US', { month: 'long'});
  const currentYear = today.getFullYear();

  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [days, setDays] = useState<DayItem[]>([]);
  const [shows, setShows] = useState<{ venue: string; shows: Show[] }[]>([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const generateDaysArray = (month: number, year: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray: DayItem[] = [];

    for (let day = 1; day <= daysInMonth; day++){
      const date = new Date(year, month, day);
      const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
      daysArray.push({ dayOfWeek, day});
    }

    return daysArray;
  };

  useEffect(() => {
    const month = today.getMonth();
    const year = today.getFullYear();
    const currentDay = today.getDate();

    const generatedDays = generateDaysArray(month, year);
    setDays(generatedDays);

    const todayIndex = generatedDays.findIndex((d) => d.day === currentDay);
    setSelectedDay(today)

    setTimeout(() => {
      const offset = (todayIndex - 2) * 52;
      flatListRef.current?.scrollToOffset({ offset, animated: true });
    }, 0);
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
      setShows([]); 
    }
  }, [selectedDay]);

  const handleDateChange = (date: Date) => {
    setSelectedDay(date); // Update the selected day to the chosen date
  };


  const handleFavoritesScreen = () => {
    navigation.navigate('favorites');
  };

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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  }

  const handleConfirm = (date: Date) => {
    handleDateChange(date);
    hideDatePicker();
  }

  return (
    <Container>
        <Header>
            <TouchableOpacity onPress={navigation.goBack}>
              <Ionicons name="chevron-back-outline" size={24} color={theme.colors.text.primary}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={showDatePicker} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Title>{`${currentMonth} ${currentYear}`}</Title>
                <Ionicons
                    name="chevron-down-outline"
                    size={13}
                    color={theme.colors.text.primary}
                    style={{ marginLeft: theme.spacing(1) }}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFavoritesScreen}>
                <HeartCheckIcon/>
            </TouchableOpacity>
        </Header>

        <DaySelector>
        <FlatList
          ref={flatListRef} // Reference to FlatList
          horizontal
          data={days}
          keyExtractor={(item) => `${item.dayOfWeek}-${item.day}`}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleDateChange(new Date(today.getFullYear(), today.getMonth(), item.day))}>
              <View style={{ alignItems: 'center' }}>
                <DayOfWeekText>{item.dayOfWeek}</DayOfWeekText>
                <DayCircle isSelected={selectedDay.getDate() === item.day}>
                  <DayText>{item.day}</DayText>
                </DayCircle>
              </View>
            </TouchableOpacity>
          )}
          getItemLayout={(data, index) => (
            { length: 52, offset: 52 * index, index }
          )}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
            });
          }}
        />
        </DaySelector>
        
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
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                width: '90%', 
                alignSelf: 'flex-start' 
              }}              
              >
                <VenueCardContainer key={show.id}>
                  <VenueCard>
                    <VenueName>{venue}</VenueName>
                  </VenueCard>
                  <TextContainer>
                    <VenueName>{show.band}</VenueName>
                    <EventDetails>{show.time}</EventDetails>
                    <TimeDetails>{`Doors Open: ${show.doorsOpen}`}</TimeDetails>
                  </TextContainer>
                </VenueCardContainer>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </Content>

        <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
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

const DayOfWeekText = styled(Text)(({ theme }) => ({
    color: theme.colors.text.primary,
    fontSize: 14,
    marginBottom: 4,
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
  width: '65%',  
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
  flexWrap: 'wrap',
}));

const TimeDetails = styled(Text)(({ theme }) => ({
  fontSize: 14,
  color: theme.colors.text.secondary,
  flexWrap: 'wrap',
}));
