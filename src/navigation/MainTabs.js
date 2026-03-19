import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { COLORS, SPACING, SHADOW, RADIUS } from '../theme/colors';

import DashboardScreen     from '../screens/DashboardScreen';
import CareerHubScreen     from '../screens/CareerHubScreen';
import BusinessToolsScreen from '../screens/BusinessToolsScreen';
import ProfileScreen       from '../screens/ProfileScreen';
import VerificationSelectionScreen from '../screens/VerificationSelectionScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, label, focused }) => (
  <View style={[styles.tabIconContainer, focused && styles.activeTabBg]}>
    <Text style={[styles.iconText, { opacity: focused ? 1 : 0.6 }]}>{icon}</Text>
    {focused && (
      <Text style={styles.tabLabel}>
        {label}
      </Text>
    )}
  </View>
);

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.accent,
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
          tabBarIcon: ({ focused }) => <TabIcon icon="🛡️" label="Verify" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Career Hub"
        component={CareerHubScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="💼" label="Talent" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Biz Tools"
        component={BusinessToolsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🚀" label="Tools" focused={focused} />,
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

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
    left: 20,
    right: 20,
    borderRadius: 25,
    height: 70,
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
    borderTopWidth: 0,
    ...SHADOW.large,
  },
  tabIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeTabBg: {
    backgroundColor: COLORS.background,
  },
  iconText: {
    fontSize: 22,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginLeft: 8,
  },
});
