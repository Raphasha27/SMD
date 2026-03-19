import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';

import SplashScreen         from './src/screens/SplashScreen';
import LoginScreen          from './src/screens/LoginScreen';
import SignupScreen         from './src/screens/SignupScreen';
import MainTabs             from './src/navigation/MainTabs';
import TrustCenterScreen    from './src/screens/TrustCenterScreen';
import AdminScreen          from './src/screens/AdminScreen';
import QRScannerScreen      from './src/screens/QRScannerScreen';

// Verification
import VerificationSelectionScreen from './src/screens/VerificationSelectionScreen';
import EducationVerificationScreen from './src/screens/EducationVerificationScreen';
import MedicalVerificationScreen   from './src/screens/MedicalVerificationScreen';
import LegalVerificationScreen     from './src/screens/LegalVerificationScreen';
import VerificationResultScreen    from './src/screens/VerificationResultScreen';
import DocumentUploadScreen       from './src/screens/DocumentUploadScreen';

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
    <AuthProvider>
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Splash"   component={SplashScreen} />
        <Stack.Screen name="Login"    component={LoginScreen} />
        <Stack.Screen name="Signup"   component={SignupScreen} />
        <Stack.Screen name="Main"     component={MainTabs} />

        {/* Verification */}
        <Stack.Screen name="VerificationSelection" component={VerificationSelectionScreen} />
        <Stack.Screen name="EducationVerification" component={EducationVerificationScreen} />
        <Stack.Screen name="MedicalVerification"   component={MedicalVerificationScreen} />
        <Stack.Screen name="LegalVerification"     component={LegalVerificationScreen} />
        <Stack.Screen name="VerificationResult"    component={VerificationResultScreen} />
        <Stack.Screen name="DocumentUpload"        component={DocumentUploadScreen} />

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

        {/* Legal & Trust */}
        <Stack.Screen name="TrustCenter" component={TrustCenterScreen} />

        {/* Administration */}
        <Stack.Screen name="Admin" component={AdminScreen} />

        {/* Utilities */}
        <Stack.Screen name="QRScanner" component={QRScannerScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
