import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen         from './src/screens/SplashScreen';
import LoginScreen          from './src/screens/LoginScreen';
import MainTabs             from './src/navigation/MainTabs';

// Verification
import VerificationSelectionScreen from './src/screens/VerificationSelectionScreen';
import EducationVerificationScreen from './src/screens/EducationVerificationScreen';
import MedicalVerificationScreen   from './src/screens/MedicalVerificationScreen';
import LegalVerificationScreen     from './src/screens/LegalVerificationScreen';
import VerificationResultScreen    from './src/screens/VerificationResultScreen';

// Support & Funding
import SupportHubScreen         from './src/screens/SupportHubScreen';
import FundingDetailScreen      from './src/screens/FundingDetailScreen';
import ApplicationTrackerScreen from './src/screens/ApplicationTrackerScreen';
import AISupportScreen          from './src/screens/AISupportScreen';

// Career & Learning
import AccreditedTrainingScreen from './src/screens/AccreditedTrainingScreen';
import MentorshipScreen         from './src/screens/MentorshipScreen';

// B2B & Business
import B2BProcurementScreen  from './src/screens/B2BProcurementScreen';
import VendorDirectoryScreen  from './src/screens/VendorDirectoryScreen';
import ComplianceScreen       from './src/screens/ComplianceScreen';

// Subscription
import SubscriptionScreen from './src/screens/SubscriptionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Splash"   component={SplashScreen} />
        <Stack.Screen name="Login"    component={LoginScreen} />
        <Stack.Screen name="Main"     component={MainTabs} />

        {/* Verification */}
        <Stack.Screen name="VerificationSelection" component={VerificationSelectionScreen} />
        <Stack.Screen name="EducationVerification" component={EducationVerificationScreen} />
        <Stack.Screen name="MedicalVerification"   component={MedicalVerificationScreen} />
        <Stack.Screen name="LegalVerification"     component={LegalVerificationScreen} />
        <Stack.Screen name="VerificationResult"    component={VerificationResultScreen} />

        {/* Support & Funding */}
        <Stack.Screen name="Support"            component={SupportHubScreen} />
        <Stack.Screen name="FundingDetail"      component={FundingDetailScreen} />
        <Stack.Screen name="ApplicationTracker" component={ApplicationTrackerScreen} />
        <Stack.Screen name="AISupport"          component={AISupportScreen} />

        {/* Career & Learning */}
        <Stack.Screen name="AccreditedTraining" component={AccreditedTrainingScreen} />
        <Stack.Screen name="Mentorship"         component={MentorshipScreen} />

        {/* B2B & Business */}
        <Stack.Screen name="B2BProcurement"  component={B2BProcurementScreen} />
        <Stack.Screen name="VendorDirectory" component={VendorDirectoryScreen} />
        <Stack.Screen name="Compliance"      component={ComplianceScreen} />

        {/* Subscription */}
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
