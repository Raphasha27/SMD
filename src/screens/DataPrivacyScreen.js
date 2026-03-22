import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Switch, 
  TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

export default function DataPrivacyScreen({ navigation }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // POPIA Consent States
  const [consent, setConsent] = useState({
    verification: true,
    marketing: false,
    thirdParty: false,
    analytics: true
  });

  const handleUpdatePrivacy = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          privacy_settings: consent,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      Alert.alert("Privacy Updated", "Your POPIA consent settings have been saved.");
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  const requestDeletion = () => {
    Alert.alert(
      "🗑️ Delete Account?",
      "Under POPIA, you have the 'Right to be Forgotten'. This will permanently delete your identity data from Sumbandila. Proceed?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete My Data", 
          style: "destructive", 
          onPress: () => confirmDeletion() 
        }
      ]
    );
  };

  const confirmDeletion = async () => {
    setLoading(true);
    // In a real app, this would trigger a Supabase Edge Function to wipe data
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Request Received", "Your data deletion request is being processed. You will be logged out.");
      // Logic to logout
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Privacy & POPIA 🇿🇦</Text>
        <Text style={styles.subtitle}>Manage your personal information consent</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🛡️</Text>
          <Text style={styles.infoText}>
            Sumbandila complies with the Protection of Personal Information Act (POPIA). 
            We only process data necessary for identity verification.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>CONSENT SETTINGS</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelBox}>
            <Text style={styles.settingLabel}>Verification Processing</Text>
            <Text style={styles.settingDesc}>Allow us to verify your credentials with institutions.</Text>
          </View>
          <Switch 
            value={consent.verification} 
            disabled 
            trackColor={{ true: COLORS.primary }}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLabelBox}>
            <Text style={styles.settingLabel}>Analytics & AI</Text>
            <Text style={styles.settingDesc}>Use anonymized data to improve fraud detection logic.</Text>
          </View>
          <Switch 
            value={consent.analytics} 
            onValueChange={(val) => setConsent({...consent, analytics: val})}
            trackColor={{ true: COLORS.primary }}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingLabelBox}>
            <Text style={styles.settingLabel}>Marketing Notifications</Text>
            <Text style={styles.settingDesc}>Hear about new partner institutions and scholarship tools.</Text>
          </View>
          <Switch 
            value={consent.marketing} 
            onValueChange={(val) => setConsent({...consent, marketing: val})}
            trackColor={{ true: COLORS.primary }}
          />
        </View>

        <TouchableOpacity 
          style={styles.saveBtn} 
          onPress={handleUpdatePrivacy}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save Privacy Preferences</Text>}
        </TouchableOpacity>

        <View style={styles.dangerZone}>
          <Text style={styles.dangerTitle}>DANGER ZONE</Text>
          <TouchableOpacity style={styles.deleteBtn} onPress={requestDeletion}>
            <Text style={styles.deleteBtnText}>Request Data Deletion (POPIA)</Text>
          </TouchableOpacity>
          <Text style={styles.dangerFooter}>
            Deleting your data will permanently remove all your verification history.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 30, paddingTop: 60, backgroundColor: COLORS.primary, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  backBtn: { fontSize: 24, color: '#fff', marginBottom: 15 },
  title: { fontSize: 24, fontWeight: '900', color: '#fff' },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 5 },
  body: { padding: 25 },
  infoCard: { 
    flexDirection: 'row', 
    backgroundColor: '#EFF6FF', 
    padding: 20, 
    borderRadius: RADIUS.lg, 
    marginBottom: 30,
    alignItems: 'center',
    gap: 15
  },
  infoIcon: { fontSize: 24 },
  infoText: { flex: 1, fontSize: 12, color: COLORS.primary, fontWeight: '600', lineHeight: 18 },
  sectionTitle: { fontSize: 11, fontWeight: '900', color: COLORS.textMuted, letterSpacing: 1.5, marginBottom: 20 },
  settingRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: RADIUS.md,
    ...SHADOW.small
  },
  settingLabelBox: { flex: 1, paddingRight: 20 },
  settingLabel: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  settingDesc: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
  saveBtn: { 
    backgroundColor: COLORS.primary, 
    height: 55, 
    borderRadius: RADIUS.lg, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 20,
    ...SHADOW.medium
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  dangerZone: { marginTop: 50, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 30 },
  dangerTitle: { fontSize: 11, fontWeight: '900', color: COLORS.danger, letterSpacing: 1.5, marginBottom: 15 },
  deleteBtn: { 
    borderWidth: 1, 
    borderColor: COLORS.danger, 
    height: 50, 
    borderRadius: RADIUS.md, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  deleteBtnText: { color: COLORS.danger, fontWeight: '700' },
  dangerFooter: { fontSize: 11, color: COLORS.textMuted, textAlign: 'center', marginTop: 12 }
});
