import React from 'react';
import { TextInput, View } from 'react-native';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@emotion/react';


type SearchBarProps = {
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onChangeText, value }) => {
    const theme = useTheme();
  
    return (
      <SearchBarContainer>
        <Ionicons name="search-outline" size={20} color={theme.colors.text.primary} />
        <SearchInput
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.secondary}
          onChangeText={onChangeText}
          value={value}
        />
      </SearchBarContainer>
    );
  };


const SearchBarContainer = styled(View)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.colors.border.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: theme.spacing(3),
    paddingVertical: theme.spacing(2),
    marginBottom: theme.spacing(3),
    marginHorizontal: theme.spacing(4),
  }));
  
  const SearchInput = styled(TextInput)(({ theme }) => ({
    flex: 1,
    marginLeft: theme.spacing(2),
    color: theme.colors.text.primary,
  }));
  
  export default SearchBar;