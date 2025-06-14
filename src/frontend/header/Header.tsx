import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; 
import { useNavigation

 } from '@react-navigation/native';

type HeaderProps = {
  onMenuPress: () => void;
  onNotificationPress: () => void;
};

const Header: React.FC<HeaderProps> = ({ onMenuPress, onNotificationPress }) => {
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      {/* Left: Menu Button */}
      <TouchableOpacity onPress={onMenuPress}>
        <Icon name="menu" size={24} color="#31b8ef" />
      </TouchableOpacity>

      {/* Center: Date Info */}
      <View style={styles.textWrapper}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      {/* Right: Notification Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
  <Icon name="bell" size={22} color="#31b8ef" />
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#31b8ef',
  },
  date: {
    fontSize: 14,
    color: '#64748B',
  },
});

export default Header;