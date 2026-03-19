import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Dimensions, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const verifyCards = [
  { icon: '🎓', label: 'Schools/\nColleges', screen: 'EducationVerification', color: '#3B82F6' },
  { icon: '🩺', label: 'Doctors', screen: 'MedicalVerification', color: '#10B981' },
  { icon: '⚖️', label: 'Lawyers', screen: 'LegalVerification', color: '#8B5CF6' },
  { icon: '📜', label: 'Accredited\nTraining', screen: 'AccreditedTraining', color: '#F59E0B', isNew: true },
];

const opportunityCards = [
  { icon: '🤝', label: 'Talent\nMarketplace', screen: 'CareerHubDirect', color: '#059669', isNew: true },
  { icon: '📋', label: 'B2B\nProcurement', screen: 'B2BProcurement', color: '#1E293B', isNew: true },
  { icon: '🏛️', label: 'Grants &\nFunding', screen: 'FundingDetail', color: '#DC2626', logos: 'dti · NEF' },
  { icon: '🏢', label: 'Compliance\nPortal', screen: 'Compliance', color: '#D97706', isNew: true },
  { icon: '🏅', label: 'Trust\nBadges', screen: 'VendorDirectory', color: '#2563EB', isNew: true },
  { icon: '🤲', label: 'Corporate\nCSR', screen: 'Support', color: '#475569' },
];

export default function DashboardScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  const navigate = (screen) => {
    if (screen === 'CareerHubDirect') {
      navigation.navigate('Career Hub');
    } else if (screen === 'Support') {
      navigation.navigate('Biz Tools');
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Modern Header with Dynamic Gradient */}
      <LinearGradient 
        colors={[COLORS.primaryLight, COLORS.primary]} 
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Welcome back {user?.user_metadata?.full_name || '✨'}</Text>
            <Text style={styles.headerTitle}>Sumbandila Hub</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.iconText}>❓</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('ApplicationTracker')}>
              <Text style={styles.iconText}>🔔</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search professional verifications..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.body} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Verification Selection */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>INSTANT VERIFICATION</Text>
            <TouchableOpacity onPress={() => navigation.navigate('VerificationSelection')}>
              <Text style={styles.seeAll}>View all ›</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {verifyCards.map((card, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.verifyCard}
                onPress={() => navigation.navigate(card.screen)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[card.color + '20', card.color + '05']}
                  style={styles.verifyIconBox}
                >
                  <Text style={styles.verifyIcon}>{card.icon}</Text>
                </LinearGradient>
                <Text style={styles.verifyLabel}>{card.label}</Text>
                {card.isNew && (
                  <View style={styles.newTag}>
                    <Text style={styles.newTagText}>NEW</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Highlighted Opportunity Banner */}
        <TouchableOpacity 
          style={styles.mainBanner} 
          onPress={() => navigation.navigate('Career Hub')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#059669', '#10B981']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.mainBannerGrad}
          >
            <View style={styles.bannerContent}>
              <View style={styles.bannerIconBox}>
                <Text style={{ fontSize: 24 }}>🌍</Text>
              </View>
              <View>
                <Text style={styles.bannerTitle}>Verified Talent Hub</Text>
                <Text style={styles.bannerSub}>Connect with accredited professionals</Text>
              </View>
            </View>
            <Text style={styles.bannerArrow}>›</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Grid of Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TOOLS & OPPORTUNITIES</Text>
          <View style={styles.gridContainer}>
            {opportunityCards.map((card, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.gridCard}
                onPress={() => navigate(card.screen)}
                activeOpacity={0.8}
              >
                <View style={[styles.gridIconCircle, { backgroundColor: card.color + '10' }]}>
                  <Text style={{ fontSize: 22 }}>{card.icon}</Text>
                </View>
                <View style={styles.gridTextContent}>
                  <Text style={styles.gridLabel}>{card.label}</Text>
                  {card.logos && <Text style={styles.gridSubText}>{card.logos}</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Subscription / Pro Card */}
        <TouchableOpacity 
          style={styles.proCard} 
          onPress={() => navigation.navigate('Subscription')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={user?.subscription_status === 'PREMIUM' ? ['#064E3B', '#065F46'] : [COLORS.primary, '#1E1B4B']}
            style={styles.proGrad}
          >
            <View>
              <Text style={styles.proTitle}>
                {user?.subscription_status === 'PREMIUM' ? 'Member Benefits 💎' : 'Go Premium'}
              </Text>
              <Text style={styles.proSubtitle}>
                {user?.subscription_status === 'PREMIUM' ? 'You have unlimited access' : 'Unlimited verifications & tools'}
              </Text>
            </View>
            <View style={styles.proBadge}>
              <Text style={styles.proPrice}>
                {user?.subscription_status === 'PREMIUM' ? 'ACTIVE' : 'R149'}
              </Text>
              <Text style={styles.proMonth}>{user?.subscription_status === 'PREMIUM' ? '' : '/mo'}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* AI Assistant Hook */}
        <TouchableOpacity 
          style={styles.aiHint} 
          onPress={() => navigation.navigate('AISupport')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[COLORS.accent, '#2563EB']}
            style={styles.aiGrad}
          >
            <Text style={{ fontSize: 20 }}>🤖</Text>
            <Text style={styles.aiText}>Ask Sumbandila AI anything...</Text>
            <View style={styles.aiGo}>
              <Text style={styles.aiGoText}>Chat</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    ...SHADOW.large,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
  headerIcons: { flexDirection: 'row', gap: 10 },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: { fontSize: 18 },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.danger,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 8, fontWeight: '900' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: RADIUS.md,
    paddingHorizontal: 15,
    height: 52,
  },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', fontSize: 15, fontWeight: '500' },
  body: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: 24 },
  section: { marginBottom: 32 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 12, fontWeight: '900', color: COLORS.textMuted, letterSpacing: 1.5 },
  seeAll: { fontSize: 13, color: COLORS.accent, fontWeight: '700' },
  horizontalScroll: { marginHorizontal: -SPACING.lg, paddingHorizontal: SPACING.lg },
  verifyCard: { marginRight: 18, alignItems: 'center', width: 85 },
  verifyIconBox: {
    width: 68,
    height: 68,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    ...SHADOW.small,
  },
  verifyIcon: { fontSize: 30 },
  verifyLabel: { fontSize: 11, fontWeight: '800', color: COLORS.text, textAlign: 'center' },
  newTag: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.danger,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  newTagText: { color: '#fff', fontSize: 8, fontWeight: '900' },
  mainBanner: { borderRadius: RADIUS.lg, overflow: 'hidden', marginBottom: 32, ...SHADOW.medium },
  mainBannerGrad: { padding: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bannerContent: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  bannerIconBox: { width: 52, height: 52, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  bannerTitle: { color: '#fff', fontSize: 17, fontWeight: '800' },
  bannerSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 2 },
  bannerArrow: { color: '#fff', fontSize: 24, opacity: 0.8 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  gridCard: {
    width: (width - SPACING.lg * 2 - 12) / 2,
    backgroundColor: '#fff',
    borderRadius: RADIUS.md,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...SHADOW.small,
  },
  gridIconCircle: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  gridTextContent: { flex: 1 },
  gridLabel: { fontSize: 13, fontWeight: '800', color: COLORS.text, lineHeight: 16 },
  gridSubText: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },
  proCard: { borderRadius: RADIUS.lg, overflow: 'hidden', marginBottom: 24, ...SHADOW.medium },
  proGrad: { padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  proTitle: { color: '#fff', fontSize: 19, fontWeight: '900' },
  proSubtitle: { color: COLORS.secondary, fontSize: 14, marginTop: 4, fontWeight: '600' },
  proBadge: { alignItems: 'flex-end' },
  proPrice: { color: '#fff', fontSize: 22, fontWeight: '900' },
  proMonth: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  aiHint: { borderRadius: RADIUS.md, overflow: 'hidden', ...SHADOW.small },
  aiGrad: { padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  aiText: { flex: 1, color: '#fff', fontSize: 15, fontWeight: '700' },
  aiGo: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  aiGoText: { color: COLORS.accent, fontWeight: '800', fontSize: 13 },
});
