import React, { useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  Animated, Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

export default function VerificationResultScreen({ navigation, route }) {
  const {
    type = 'Education',
    name = 'St Stithians College',
    reg = 'DOE-12345-GP',
    accredited = 'CHE, QCTO, Umalusi',
    courses = 'National Senior Certificate (NSC), IEB',
    entityType = 'Private School',
    status = 'VERIFIED',
    searchTerm = '',
  } = route.params || {};

  const isVerified = status === 'VERIFIED';
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Sumbandila Verification\n\n${isVerified ? '✅ VERIFIED' : '❌ UNABLE TO VERIFY'}\n\n${name}\nType: ${entityType}\nReg: ${reg}\nAccredited: ${accredited}\n\nVerified via Sumbandila App`,
      });
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={isVerified ? ['#0A2463', '#1565C0'] : ['#7B241C', '#E74C3C']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification Results</Text>
        <Text style={styles.headerSub}>{type} Verification</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Status Badge */}
        <Animated.View style={[styles.statusCard, { transform: [{ scale: scaleAnim }], opacity: fadeAnim }]}>
          <View style={[styles.statusBadge, { backgroundColor: isVerified ? '#D5F5E3' : '#FDEDEC' }]}>
            <Text style={styles.statusIcon}>{isVerified ? '✅' : '❌'}</Text>
            <Text style={[styles.statusText, { color: isVerified ? '#1E8449' : '#C0392B' }]}>
              {isVerified ? 'VERIFIED' : 'UNABLE TO VERIFY'}
            </Text>
          </View>

          {/* Entity Details */}
          <View style={styles.detailsCard}>
            <View style={styles.entityHeader}>
              <View style={styles.entityIcon}>
                <Text style={{ fontSize: 28 }}>
                  {type === 'Education' ? '🎓' : type === 'Medical' ? '🩺' : '⚖️'}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.entityName}>{name}</Text>
                <Text style={styles.entityType}>{entityType}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {isVerified ? (
              <>
                <DetailRow label="DOE/Reg Registered" value={reg} color={COLORS.success} />
                <DetailRow label="Courses Accredited" value={accredited} />
                <DetailRow label="List of Courses" value={courses} />
              </>
            ) : (
              <View style={styles.notFoundBox}>
                <Text style={styles.notFoundTitle}>Professional {name}</Text>
                <Text style={styles.notFoundText}>
                  Not found in {type === 'Medical' ? 'HPCSA' : type === 'Legal' ? 'Law Society' : 'DOE'} database.
                </Text>
                <Text style={styles.notFoundSub}>
                  Please verify the name or registration number and try again.
                </Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
              <Text style={styles.shareIcon}>📤</Text>
              <Text style={styles.shareText}>Share Result</Text>
            </TouchableOpacity>
            {!isVerified && (
              <TouchableOpacity
                style={styles.reportBtn}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.reportText}>🚩 Report Issue</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {/* Verification Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ✅ Verified against official South African government databases
          </Text>
          <Text style={styles.footerSub}>Last updated: {new Date().toLocaleDateString('en-ZA')}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const DetailRow = ({ label, value, color }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={[styles.detailValue, color && { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 55, paddingBottom: SPACING.xl, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  backBtn: { marginBottom: 8 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
  body: { padding: SPACING.lg },
  statusCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.lg, ...SHADOW.large },
  statusBadge: { borderRadius: RADIUS.full, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'center', marginBottom: SPACING.lg },
  statusIcon: { fontSize: 22 },
  statusText: { fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  detailsCard: { backgroundColor: COLORS.background, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md },
  entityHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: SPACING.md },
  entityIcon: { width: 60, height: 60, borderRadius: 16, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center' },
  entityName: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  entityType: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: SPACING.md },
  detailRow: { marginBottom: 10 },
  detailLabel: { fontSize: 11, fontWeight: '700', color: COLORS.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 },
  detailValue: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  notFoundBox: { alignItems: 'center', padding: SPACING.md },
  notFoundTitle: { fontSize: 16, fontWeight: '700', color: COLORS.danger, marginBottom: 8 },
  notFoundText: { fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginBottom: 6 },
  notFoundSub: { fontSize: 12, color: COLORS.textMuted, textAlign: 'center' },
  actions: { flexDirection: 'row', gap: 10, marginTop: SPACING.sm },
  shareBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingVertical: 12, gap: 6 },
  shareIcon: { fontSize: 16 },
  shareText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  reportBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: COLORS.danger, borderRadius: RADIUS.md, paddingVertical: 12 },
  reportText: { color: COLORS.danger, fontWeight: '700', fontSize: 14 },
  footer: { alignItems: 'center', padding: SPACING.lg },
  footerText: { fontSize: 13, color: COLORS.textLight, textAlign: 'center', marginBottom: 4 },
  footerSub: { fontSize: 12, color: COLORS.textMuted },
});
