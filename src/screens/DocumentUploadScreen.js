import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Alert, ActivityIndicator, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

export default function DocumentUploadScreen({ route, navigation }) {
  const { type = 'General', entityName = '' } = route.params || {};
  const [uploading, setUploading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const { user } = useAuth();

  const handlePickDocument = async () => {
    // In a real app, use expo-document-picker or expo-image-picker
    // For this Phase 2 MVP, we simulate picking.
    Alert.alert(
      "Attach Evidence",
      "Choose a document type to upload for verification.",
      [
        { text: "Identity Document (ID)", onPress: () => setSelectedDoc({ name: "national_id.pdf", type: "ID" }) },
        { text: "Certificate / Degree", onPress: () => setSelectedDoc({ name: "degree_certificate.jpg", type: "Academic" }) },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const handleUpload = async () => {
    if (!selectedDoc) {
      Alert.alert("No Document", "Please select a document first.");
      return;
    }

    setUploading(true);
    
    // Simulate network delay and Supabase storage upload
    setTimeout(async () => {
      try {
        if (!user) throw new Error("User must be logged in.");

        // Log the request to the 'verification_requests' table
        const { error } = await supabase.from('verification_requests').insert([{
          user_id: user.id,
          entity_type: type,
          entity_name: entityName,
          document_url: `simulated-storage-path/${selectedDoc.name}`,
          status: 'PENDING_REVIEW'
        }]);

        setUploading(false);
        Alert.alert(
          "Request Submitted",
          "Your documents are being reviewed by our compliance team. You will be notified of the result.",
          [{ text: "Back to Dashboard", onPress: () => navigation.navigate('Main') }]
        );
      } catch (err) {
        setUploading(false);
        Alert.alert("Upload Error", err.message);
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryLight]} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Submit Evidence</Text>
        <Text style={styles.subtitle}>{type} Verification for {entityName}</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Why manual verification? 🛡️</Text>
          <Text style={styles.infoText}>
            If automated registry checks fail, our experts can manually verify your credentials 
            using high-fidelity document analysis. This process usually takes 24-48 hours.
          </Text>
        </View>

        <View style={styles.uploadBox}>
          <Text style={styles.label}>ATTACH DOCUMENT</Text>
          <TouchableOpacity 
            style={[styles.pickerBtn, selectedDoc && styles.pickerBtnActive]} 
            onPress={handlePickDocument}
          >
            <Text style={styles.pickerIcon}>{selectedDoc ? '📄' : '📤'}</Text>
            <Text style={styles.pickerText}>
              {selectedDoc ? selectedDoc.name : 'Click to select document'}
            </Text>
            {selectedDoc && <Text style={styles.changeText}>Change</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.requirements}>
          <Text style={styles.reqTitle}>Requirements:</Text>
          <Text style={styles.reqItem}>• High resolution scan or photo</Text>
          <Text style={styles.reqItem}>• PDF, JPG, or PNG format</Text>
          <Text style={styles.reqItem}>• Max file size: 10MB</Text>
        </View>

        <TouchableOpacity 
          style={[styles.uploadBtn, (uploading || !selectedDoc) && styles.btnDisabled]} 
          onPress={handleUpload}
          disabled={uploading || !selectedDoc}
        >
          {uploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.uploadBtnText}>Submit for Review</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 30, paddingTop: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  backBtn: { marginBottom: 20 },
  backText: { fontSize: 24, color: '#fff' },
  title: { fontSize: 24, fontWeight: '900', color: '#fff' },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 5, fontWeight: '600' },
  content: { padding: 25 },
  infoCard: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: RADIUS.lg, 
    marginBottom: 30,
    ...SHADOW.small,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent 
  },
  infoTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  infoText: { fontSize: 13, color: COLORS.textLight, lineHeight: 20 },
  uploadBox: { marginBottom: 40 },
  label: { fontSize: 11, fontWeight: '900', color: COLORS.textMuted, letterSpacing: 1, marginBottom: 15 },
  pickerBtn: { 
    height: 120, 
    borderWidth: 2, 
    borderColor: COLORS.border, 
    borderStyle: 'dashed', 
    borderRadius: RADIUS.xl, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  pickerBtnActive: { borderColor: COLORS.primary, backgroundColor: '#EFF6FF', borderStyle: 'solid' },
  pickerIcon: { fontSize: 32, marginBottom: 10 },
  pickerText: { fontSize: 15, color: COLORS.textLight, fontWeight: '600' },
  changeText: { fontSize: 12, color: COLORS.primary, fontWeight: '800', marginTop: 10 },
  requirements: { marginBottom: 40 },
  reqTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text, marginBottom: 10 },
  reqItem: { fontSize: 13, color: COLORS.textMuted, marginBottom: 5 },
  uploadBtn: { 
    backgroundColor: COLORS.primary, 
    height: 60, 
    borderRadius: RADIUS.lg, 
    justifyContent: 'center', 
    alignItems: 'center',
    ...SHADOW.medium
  },
  uploadBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  btnDisabled: { opacity: 0.6 }
});
