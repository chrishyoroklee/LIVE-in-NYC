import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import HeartCheckIcon from '@/components/icon/HeartCheckIcon';
import { useNavigation } from '@react-navigation/native';

interface DayCircleProps {
  isSelected: boolean;
}

interface DayItem {
    dayOfWeek: string;
    day: number;
  }

export default function DetailsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const days: DayItem[] = [
    { dayOfWeek: 'Thu', day: 1 },
    { dayOfWeek: 'Fri', day: 2 },
    { dayOfWeek: 'Sat', day: 3 },
    { dayOfWeek: 'Sun', day: 4 },
    { dayOfWeek: 'Mon', day: 5 },
    { dayOfWeek: 'Tue', day: 6 },
    { dayOfWeek: 'Wed', day: 7 },
    { dayOfWeek: 'Thu', day: 8 },
    { dayOfWeek: 'Fri', day: 9 },
    { dayOfWeek: 'Sat', day: 10 },
    { dayOfWeek: 'Sun', day: 11 },
    { dayOfWeek: 'Mon', day: 12 },
    { dayOfWeek: 'Tue', day: 13 },
    { dayOfWeek: 'Wed', day: 14 },
    { dayOfWeek: 'Thu', day: 16 },
    { dayOfWeek: 'Fri', day: 17 },
    { dayOfWeek: 'Sat', day: 18 },
    { dayOfWeek: 'Sun', day: 19 },
    { dayOfWeek: 'Mon', day: 20 },
    { dayOfWeek: 'Tue', day: 21 },
    { dayOfWeek: 'Wed', day: 22 },
    { dayOfWeek: 'Thu', day: 23 },
    { dayOfWeek: 'Fri', day: 24 },
    { dayOfWeek: 'Sat', day: 25 },
    { dayOfWeek: 'Sun', day: 26 },
    { dayOfWeek: 'Mon', day: 27 },
    { dayOfWeek: 'Tue', day: 28 },
    { dayOfWeek: 'Wed', day: 29 },
    { dayOfWeek: 'Thu', day: 30 },
    { dayOfWeek: 'Fri', day: 31 },
  ];

  const [selectedDay, setSelectedDay] = useState({ day: 31, index: 3 });

  const handleFavoritesScreen = () => {
    navigation.navigate('favorites');
  };

  const handleBack = () => {
    navigation.goBack();
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

  return (
    <Container>
        <Header>
            <TouchableOpacity>
                <Ionicons 
                    name="chevron-back-outline" 
                    size={24} 
                    color={theme.colors.text.primary} 
                    onPress={handleBack}
                />
            </TouchableOpacity>
            <Title>Aug 2024</Title>
            <TouchableOpacity onPress={handleFavoritesScreen}>
                <HeartCheckIcon/>
            </TouchableOpacity>
        </Header>

        <DaySelector>
          <FlatList
            horizontal
            data={days}
            keyExtractor={(item, index) => `${item.dayOfWeek}-${item.day}-${index}`}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setSelectedDay({ day: item.day, index})}>
                <View style={{ alignItems: 'center' }}>
                    <DayOfWeekText>{item.dayOfWeek}</DayOfWeekText>
                    <DayCircle isSelected={selectedDay.day === item.day && selectedDay.index === index}>
                    <DayText>{item.day}</DayText>
                    </DayCircle>
                </View>
              </TouchableOpacity>
            )}
          />
        </DaySelector>
        
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
  width: '100%',  
}));

const VenueName = styled(Text)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  color: theme.colors.text.primary,
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
