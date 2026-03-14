import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const FUNDING_CARDS = [
  { icon: '🏦', label: 'Government\nGrants', desc: 'NEF, IDC, dti', color: '#C0392B', screen: 'FundingDetail' },
  { icon: '🤝', label: 'Corporate\nCSR', desc: 'Nedbank, Standard Bank', color: '#1565C0', screen: 'FundingDetail' },
  { icon: '📋', label: 'Application\nHelp', desc: 'Step-by-step guides', color: '#E67E22', screen: 'ApplicationTracker' },
  { icon: '🎓', label: 'Mentorship\nProg.', desc: 'Expert guidance', color: '#8E44AD', screen: 'Mentorship' },
];

const RECENT_GRANTS = [
  { name: 'NEF Black-Owned Enterprise Grant', amount: 'R3,000 – R3,500', deadline: 'July 2027', logo: '🏦', color: '#C0392B' },
  { name: 'IDC SMME Growth Fund', amount: 'Up to R75M', deadline: 'Rolling', logo: '🏭', color: '#1565C0' },
  { name: 'dti Enterprise Development', amount: 'R500k – R5M', deadline: 'Quarterly', logo: '🏛️', color: '#27AE60' },
];

export default function SupportHubScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#1565C0']} style={styles.header}>
        <Text style={styles.headerTitle}>Sumbandila Support Hub</Text>
        <Text style={styles.headerSub}>Funding · Guidance · AI Assistance</Text>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        {/* AI Assistant CTA */}
        <TouchableOpacity
          style={styles.aiCard}
          onPress={() => navigation.navigate('AISupport')}
          activeOpacity={0.9}
        >
          <LinearGradient colors={['#1A237E', '#283593']} style={styles.aiGrad}>
            <View style={styles.aiLeft}>
              <View style={styles.aiAvatar}><Text style={{ fontSize: 28 }}>🤖</Text></View>
              <View>
                <Text style={styles.aiTitle}>Sumbandila AI Assistant</Text>
                <Text style={styles.aiSub}>Instant help with verification, funding, and general queries</Text>
                <TouchableOpacity
                  style={styles.startChatBtn}
                  onPress={() => navigation.navigate('AISupport')}
                >
                  <Text style={styles.startChatText}>Start Chat →</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Quick suggested questions */}
        <View style={styles.suggestBox}>
          <Text style={styles.suggestTitle}>Quick Questions</Text>
          {[
            'How to apply for NEF grant?',
            'How to apply for SETA funding?',
            'How to apply to mentorship?',
          ].map((q, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.suggestChip}
              onPress={() => navigation.navigate('AISupport')}
            >
              <Text style={styles.suggestText}>{q}</Text>
              <Text style={{ color: COLORS.accent }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Funding & Guides Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FUNDING & GUIDES</Text>
          <View style={styles.grid}>
            {FUNDING_CARDS.map((card) => (
              <TouchableOpacity
                key={card.label}
                style={styles.gridCard}
                onPress={() => navigation.navigate(card.screen)}
                activeOpacity={0.85}
              >
                <View style={[styles.gridIcon, { backgroundColor: card.color + '18' }]}>
                  <Text style={{ fontSize: 26 }}>{card.icon}</Text>
                </View>
                <Text style={styles.gridLabel}>{card.label}</Text>
                <Text style={styles.gridDesc}>{card.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Current Opportunities */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>CURRENT OPPORTUNITIES</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FundingDetail')}>
              <Text style={styles.seeAll}>View all ›</Text>
            </TouchableOpacity>
          </View>

          {RECENT_GRANTS.map((grant, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.grantCard}
              onPress={() => navigation.navigate('FundingDetail')}
              activeOpacity={0.85}
            >
              <View style={[styles.grantLogo, { backgroundColor: grant.color + '18' }]}>
                <Text style={{ fontSize: 22 }}>{grant.logo}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.grantName}>{grant.name}</Text>
                <Text style={styles.grantAmount}>Amount: {grant.amount}</Text>
                <Text style={styles.grantDeadline}>Closing: {grant.deadline}</Text>
              </View>
              <View style={[styles.applyTag, { backgroundColor: grant.color }]}>
                <Text style={styles.applyTagText}>Apply</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Financial Services */}
        <TouchableOpacity
          style={styles.finBanner}
          onPress={() => navigation.navigate('FundingDetail', { type: 'financial' })}
          activeOpacity={0.9}
        >
          <LinearGradient colors={['#0D9E87', '#0A7163']} style={styles.finGrad}>
            <Text style={styles.finIcon}>💼</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.finTitle}>Financial Services</Text>
              <Text style={styles.finSub}>Insurance · Loans · Grant Management</Text>
            </View>
            <Text style={{ color: '#fff', fontSize: 22 }}>›</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 52, paddingBottom: SPACING.xl, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
  body: { flex: 1, paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  aiCard: { borderRadius: RADIUS.xl, overflow: 'hidden', marginBottom: SPACING.md, ...SHADOW.medium },
  aiGrad: { padding: SPACING.lg },
  aiLeft: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  aiAvatar: { width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  aiTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 4 },
  aiSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, lineHeight: 18, marginBottom: 10, maxWidth: 200 },
  startChatBtn: { backgroundColor: COLORS.secondary, borderRadius: RADIUS.full, paddingHorizontal: 16, paddingVertical: 8, alignSelf: 'flex-start' },
  startChatText: { color: '#0A2463', fontWeight: '900', fontSize: 13 },
  suggestBox: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOW.small },
  suggestTitle: { fontSize: 12, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1, marginBottom: 10 },
  suggestChip: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 11, borderTopWidth: 1, borderTopColor: COLORS.border },
  suggestText: { fontSize: 13, color: COLORS.text, fontWeight: '500' },
  section: { marginBottom: SPACING.md },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: 8 },
  seeAll: { fontSize: 12, color: COLORS.accent, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridCard: { backgroundColor: '#fff', borderRadius: RADIUS.lg, padding: 14, width: '47%', ...SHADOW.small },
  gridIcon: { width: 48, height: 48, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridLabel: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  gridDesc: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  grantCard: { backgroundColor: '#fff', borderRadius: RADIUS.lg, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8, ...SHADOW.small },
  grantLogo: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  grantName: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  grantAmount: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginTop: 2 },
  grantDeadline: { fontSize: 11, color: COLORS.textMuted },
  applyTag: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  applyTagText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  finBanner: { borderRadius: RADIUS.xl, overflow: 'hidden', ...SHADOW.small },
  finGrad: { padding: SPACING.md, flexDirection: 'row', alignItems: 'center', gap: 14 },
  finIcon: { fontSize: 28 },
  finTitle: { color: '#fff', fontSize: 16, fontWeight: '800' },
  finSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
});
