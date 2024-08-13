import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from '@emotion/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@emotion/react'

interface Show {
  id: string;
  time: string;
  doorsOpen: string;
  band: string;
}

const smallsData: Record<string, Show[]> = require('../../data/Smalls.json');

const SmallsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { selectedDate: initialSelectedDate } = route.params as { selectedDate: string };

  const dates = Object.keys(smallsData);

  const [selectedDate, setSelectedDate] = useState<string>(initialSelectedDate);
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    const showsForDate = smallsData[selectedDate] || [];
    setShows(showsForDate);
  }, [selectedDate]);  
 
  const handleBack = () => {
    navigation.goBack();
  };

  const handlePreviousDate = () => {
    const currentIndex = dates.indexOf(selectedDate);
    if (currentIndex > 0) {
      setSelectedDate(dates[currentIndex - 1]);
    }
  };

  const handleNextDate = () => {
    const currentIndex = dates.indexOf(selectedDate);
    if (currentIndex < dates.length - 1){
      setSelectedDate(dates[currentIndex + 1]);
    }
  }

  return (
    <Container>
      <Header>
        <Ionicons 
          name="chevron-back-outline" 
          size={24} 
          color={theme.colors.text.primary} 
          onPress={handleBack}
        />
        <Title>smalls</Title>
      </Header>
      
      <DateSelector>
        <TouchableOpacity onPress={handlePreviousDate}>
            <Ionicons name="chevron-back-outline" size={24} color={theme.colors.text.primary}/>
        </TouchableOpacity>
            <DateText>{selectedDate}</DateText>
        <TouchableOpacity onPress={handleNextDate}>
            <Ionicons name="chevron-forward-outline" size={24} color={theme.colors.text.primary}/>
        </TouchableOpacity>
      </DateSelector>
      {shows.map((show, index) => (
        <View key={index}>
          <VenueText>{`${show.time} (Doors ${show.doorsOpen})`}</VenueText>
          <SubTitle>{show.band}</SubTitle>
        </View>
      ))}
    </Container>
  )
}

export default SmallsScreen;

const Container = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.screen,
}));

const Header = styled(View)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(8),
    position: 'relative',
}));

const Title = styled(Text)(({ theme }) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    position: 'absolute',
    left: '50%',
  }));

  const SubTitle = styled(Text)(({ theme }) => ({
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    left: '5%',
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
  left: '5%',
}));

