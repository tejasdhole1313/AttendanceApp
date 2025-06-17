import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
  onMenuPress?: () => void;
  onNotificationPress: () => void;
  isInternalPage?: boolean;
};

const Header: React.FC<HeaderProps> = ({ onMenuPress, onNotificationPress, isInternalPage = false }) => {
  const navigation = useNavigation<any>();
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <View style={styles.container}>
      {/* Left: Logo or Back Arrow */}
      <View style={styles.leftSection}>
        {isInternalPage ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#31b8ef" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onMenuPress}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          </TouchableOpacity>
        )}
      </View>

      {/* Center: Date */}
      <View style={styles.centerSection}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      {/* Right: Notification */}
      <TouchableOpacity onPress={onNotificationPress}>
        <Icon name="bell" size={22} color="#31b8ef" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 35,
    height: 20,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#31b8ef',
  },
  date: {
    fontSize: 13,
    color: '#64748B',
  },
});
