import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Dimensions, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const { width } = Dimensions.get('window');

const PLANS = [
  {
    name: 'Free Plan',
    price: 'R0',
    period: '/month',
    color: '#6B7A99',
    icon: '🔓',
    features: [
      '5 verifications per day',
      'Core registration info',
      'Basic funding listings',
      'AI chat (limited)',
    ],
    cta: 'Current Plan',
    isCurrent: true,
  },
  {
    name: 'Individual Pro',
    price: 'R49.99',
    period: '/month',
    annual: 'R499.99/year',
    color: '#1565C0',
    icon: '👤',
    popular: true,
    features: [
      'Unlimited verifications',
      'Global CV visibility',
      'Accredited learning discounts',
      'Priority verification',
      'CPD tracking dashboard',
      'Instant Verified Apply',
      'No in-app ads',
      'Priority support',
    ],
    cta: 'Subscribe Now',
    isCurrent: false,
  },
  {
    name: 'Business Tier',
    price: 'R299.99',
    period: '/month per user',
    annual: 'R2999.99/year',
    color: '#0A7163',
    icon: '🏢',
    features: [
      'Bulk verification tools',
      'Compliance alerts & dashboard',
      'Job posting tools',
      'B2B directory listing',
      'BBBEE compliance monitoring',
      'Team management (up to 10)',
      'Verified Vendor Badge',
      'Dedicated account manager',
    ],
    cta: 'Subscribe Now',
    isCurrent: false,
  },
  {
    name: 'Corporate / Enterprise',
    price: 'Custom',
    period: 'pricing',
    color: '#0A2463',
    icon: '🏭',
    features: [
      'Full B2B API Integration',
      'Tender management portal',
      'Unlimited API access',
      'Advanced analytics & reports',
      'Dedicated support team',
      'Procurement automation',
      'White-label options',
      'SLA guarantees (99.9% uptime)',
    ],
    cta: 'Contact Sales',
    isCurrent: false,
  },
];

export default function SubscriptionScreen({ navigation }) {
  const [billingAnnual, setBillingAnnual] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A2463', '#1A237E']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sumbandila Premium Tiers</Text>
        <Text style={styles.headerSub}>Realistic ZAR pricing · Cancel anytime</Text>

        {/* Billing Toggle */}
        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, !billingAnnual && styles.toggleLabelActive]}>Monthly</Text>
          <TouchableOpacity
            style={styles.toggleTrack}
            onPress={() => setBillingAnnual(!billingAnnual)}
          >
            <View style={[styles.toggleThumb, billingAnnual && styles.toggleThumbOn]} />
          </TouchableOpacity>
          <Text style={[styles.toggleLabel, billingAnnual && styles.toggleLabelActive]}>
            Annual <Text style={styles.saveBadge}>Save 20%</Text>
          </Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {PLANS.map((plan, idx) => (
          <View
            key={idx}
            style={[styles.planCard, plan.popular && styles.planCardPopular]}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>⭐ MOST POPULAR</Text>
              </View>
            )}

            <View style={styles.planHeader}>
              <View style={[styles.planIcon, { backgroundColor: plan.color + '18' }]}>
                <Text style={{ fontSize: 26 }}>{plan.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={[styles.planPrice, { color: plan.color }]}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
                {plan.annual && billingAnnual && (
                  <Text style={styles.annualNote}>{plan.annual} billed annually</Text>
                )}
              </View>
            </View>

            <View style={styles.featuresList}>
              {plan.features.map((feature, fi) => (
                <View key={fi} style={styles.featureRow}>
                  <Text style={[styles.featureCheck, { color: plan.color }]}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.ctaBtn, plan.isCurrent && styles.ctaBtnCurrent]}
              onPress={() => {
                if (plan.name === 'Corporate / Enterprise') {
                  Alert.alert('Contact Sales', 'Email us at enterprise@sumbandila.co.za or call 010-123-4567');
                } else if (!plan.isCurrent) {
                  Alert.alert('Subscribe', `You selected ${plan.name}. Payment integration coming soon.`);
                }
              }}
            >
              {plan.isCurrent ? (
                <Text style={styles.ctaTextCurrent}>{plan.cta}</Text>
              ) : (
                <LinearGradient
                  colors={[plan.color, plan.color + 'CC']}
                  style={styles.ctaGrad}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.ctaText}>{plan.cta}</Text>
                </LinearGradient>
              )}
            </TouchableOpacity>
          </View>
        ))}

        {/* Trust Footer */}
        <View style={styles.trustRow}>
          {['🔒 Secure Payment', '↩️ Cancel Anytime', '🇿🇦 ZAR Pricing'].map((item, i) => (
            <View key={i} style={styles.trustItem}>
              <Text style={styles.trustText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 52, paddingBottom: SPACING.xl, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  backBtn: { marginBottom: 10 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: '800' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 16 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: '600' },
  toggleLabelActive: { color: '#fff' },
  toggleTrack: { width: 48, height: 26, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', paddingHorizontal: 2 },
  toggleThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff' },
  toggleThumbOn: { alignSelf: 'flex-end', backgroundColor: COLORS.secondary },
  saveBadge: { fontSize: 11, color: COLORS.secondary, fontWeight: '800' },
  body: { flex: 1, paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  planCard: { backgroundColor: '#fff', borderRadius: RADIUS.xl, padding: SPACING.lg, marginBottom: 14, ...SHADOW.medium },
  planCardPopular: { borderWidth: 2, borderColor: '#1565C0' },
  popularBadge: { backgroundColor: '#1565C0', borderRadius: RADIUS.full, paddingHorizontal: 14, paddingVertical: 5, alignSelf: 'center', marginBottom: 12 },
  popularText: { color: '#fff', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  planHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: SPACING.md },
  planIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  planName: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 2 },
  planPrice: { fontSize: 24, fontWeight: '900' },
  planPeriod: { fontSize: 12, color: COLORS.textLight },
  annualNote: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  featuresList: { marginBottom: SPACING.md },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 7 },
  featureCheck: { fontSize: 13, fontWeight: '900', marginTop: 1 },
  featureText: { flex: 1, fontSize: 13, color: COLORS.text, lineHeight: 19 },
  ctaBtn: { borderRadius: RADIUS.md, overflow: 'hidden' },
  ctaBtnCurrent: { borderWidth: 1.5, borderColor: COLORS.border, paddingVertical: 12, alignItems: 'center' },
  ctaTextCurrent: { color: COLORS.textLight, fontWeight: '700', fontSize: 14 },
  ctaGrad: { paddingVertical: 13, alignItems: 'center' },
  ctaText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  trustRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: SPACING.md },
  trustItem: { backgroundColor: '#fff', borderRadius: RADIUS.full, paddingHorizontal: 12, paddingVertical: 6, ...SHADOW.small },
  trustText: { fontSize: 12, color: COLORS.textLight, fontWeight: '600' },
});
