import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { COLORS } from '../theme/colors';

import DashboardScreen     from '../screens/DashboardScreen';
import CareerHubScreen     from '../screens/CareerHubScreen';
import BusinessToolsScreen from '../screens/BusinessToolsScreen';
import ProfileScreen       from '../screens/ProfileScreen';

// Verify tab just re-uses the Verification Selection screen
import VerificationSelectionScreen from '../screens/VerificationSelectionScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, label, focused }) => (
  <View style={{ alignItems: 'center', paddingTop: 4 }}>
    <Text style={{ fontSize: focused ? 22 : 20 }}>{icon}</Text>
    <Text style={{
      fontSize: 10,
      marginTop: 2,
      fontWeight: focused ? '800' : '500',
      color: focused ? COLORS.primary : COLORS.textMuted,
    }}>
      {label}
    </Text>
  </View>
);

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#E8ECF0',
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 6,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🏠" label="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Verify"
        component={VerificationSelectionScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🔍" label="Verify" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Career Hub"
        component={CareerHubScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="💼" label="Career" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Biz Tools"
        component={BusinessToolsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🏢" label="Biz Tools" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="👤" label="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
