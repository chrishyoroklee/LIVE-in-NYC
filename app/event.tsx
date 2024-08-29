import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import jazzData from '../data/JazzData.json';

type Event = {
  id: string;
  time: string;
  doorsOpen: string;
  band: string;
};

type VenueEvents = {
  [venueName: string]: Event[];
};

type JazzData = {
  [date: string]: VenueEvents;
};

export default function EventScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();

  const { venue, date } = route.params as { venue: string; date: string };
  const [venueEvents, setVenueEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchJazzData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/chrishyoroklee/live-in-nyc-data/main/JazzData.json');
        const data: JazzData = await response.json();
        const formattedDate = date;
        const events = data[formattedDate]?.[venue] || [];
        setVenueEvents(events);
      } catch(error){
        console.error('Error fetching data:', error);
      }
    };

    fetchJazzData();
  }, [venue, date]);

  if (!date) {
    console.error('Date is undefined');
    return <Text>Error: Date is not defined</Text>;
  }

  const handleFavoritesScreen = () => {
    navigation.navigate('favorites');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // // Format the date to match the keys in your jazzData JSON
  // const formattedDate = date;

  // // Retrieve the events for the selected date and venue
  // const venueEvents = (jazzData as JazzData)[formattedDate]?.[venue] || [];

  const localDate = new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60000);
  const displayDate = localDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });


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
           
            <Title>{displayDate}</Title>

            <TouchableOpacity onPress={handleFavoritesScreen}>
              <Ionicons name="heart-outline" size={24} color={theme.colors.button.primary} />
            </TouchableOpacity>
        </Header>

        
        <Content contentContainerStyle={{ alignItems: 'center', paddingVertical: theme.spacing(5) }}>
            <VenueCardContainer>
                <VenueCard>
                  <VenueName>{venue}</VenueName>
                </VenueCard>
            </VenueCardContainer>

            {venueEvents.length > 0 ? (
              venueEvents.map((event, index) => (
              <VenueCardContainer key={index}>
                <TextContainer>
                    <BandName>{event.band}</BandName>
                    <EventDetails>{event.time}</EventDetails>
                    <TimeDetails>{`Doors Open: ${event.doorsOpen}`}</TimeDetails>
                </TextContainer>
              </VenueCardContainer>
              ))
            ) : (
              <Text>No events found for this venue and date.</Text>
            )}
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
    fontSize: 20,
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
  justifyContent: 'center',
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

const BandName = styled(Text)(({ theme }) => ({
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
