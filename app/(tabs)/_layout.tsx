import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['dark'].tint,
        tabBarInactiveTintColor: '#777777',
        animation: 'fade',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#121213',
          borderColor: '#252527',
        },
        tabBarLabelStyle: {
          fontFamily: 'Rubik_500Medium'
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color }) => <Feather name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          title: 'Panduan',
          tabBarIcon: ({ color }) => <Ionicons name="barbell-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="program"
        options={{
          title: 'Program',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar-check-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
