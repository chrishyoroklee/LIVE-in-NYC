import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from '@emotion/native';

interface DateSelectorProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  dates: string[];
}

const DateSelectorNav: React.FC<DateSelectorProps> = ({ selectedDate, setSelectedDate, dates }) => {
  const handlePreviousDate = () => {
    const currentIndex = dates.indexOf(selectedDate);
    if (currentIndex > 0) {
      setSelectedDate(dates[currentIndex - 1]);
    }
  };

  const handleNextDate = () => {
    const currentIndex = dates.indexOf(selectedDate);
    if (currentIndex < dates.length - 1) {
      setSelectedDate(dates[currentIndex + 1]);
    }
  };

  return (
    <DateSelectorContainer>
      <TouchableOpacity onPress={handlePreviousDate}>
        <Ionicons name="chevron-back-outline" size={24} />
      </TouchableOpacity>
      <DateText>{selectedDate}</DateText>
      <TouchableOpacity onPress={handleNextDate}>
        <Ionicons name="chevron-forward-outline" size={24} />
      </TouchableOpacity>
    </DateSelectorContainer>
  );
};

export default DateSelectorNav;

const DateSelectorContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const DateText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-horizontal: 8px;
`;