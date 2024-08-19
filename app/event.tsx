import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import HeartCheckIcon from '@/components/icon/HeartCheckIcon';
import { useNavigation } from '@react-navigation/native';


export default function EventScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

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
           
            <Title>Monday, Aug 12</Title>

            <TouchableOpacity onPress={handleFavoritesScreen}>
                <HeartCheckIcon/>
            </TouchableOpacity>
        </Header>

        
        <Content contentContainerStyle={{ alignItems: 'center', paddingVertical: theme.spacing(5) }}>
            <VenueCardContainer>
                <VenueCard/ >
            </VenueCardContainer>
            {venues.map((venue) => (
              <VenueCardContainer key={venue.name}>
                <TextContainer>
                    <VenueName>{venue.name}</VenueName>
                    <EventDetails>{venue.event}</EventDetails>
                    <TimeDetails>{venue.time}</TimeDetails>
                </TextContainer>
              </VenueCardContainer>
            ))}
            <TicketContainer>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="location-outline" size={30} color={theme.colors.text.primary}/>
                        <EventDetails>  183 W 10th St, New York, NY 10014</EventDetails>
                    </View>
                </TouchableOpacity>
            </TicketContainer>
            <LocationContainer>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons 
                            name="ticket-outline" 
                            size={30} 
                            color={theme.colors.text.primary}
                            style={{ transform: [{ rotate: '45deg'}]}}
                        />
                        <EventDetails>  Ticket</EventDetails>
                    </View>
                </TouchableOpacity>
            </LocationContainer>

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
  marginLeft: theme.spacing(5),
  borderColor: theme.colors.border.primary,
  borderWidth: 1,
  height: 150,  
  width: '100%',
}));

const TextContainer = styled(View)(({ theme }) => ({
  flexDirection: 'column',  
  justifyContent: 'center',  
  paddingLeft: theme.spacing(9),  
  width: '100%',  
}));

const TicketContainer = styled(View)(({ theme }) => ({
    flexDirection: 'column',  
    justifyContent: 'center',  
    paddingLeft: theme.spacing(8),  
    paddingTop: theme.spacing(4),
    width: '100%',  
  }));

const LocationContainer = styled(View)(({ theme }) => ({
    flexDirection: 'column',  
    justifyContent: 'center',  
    paddingLeft: theme.spacing(8),  
    paddingTop: theme.spacing(4),
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
