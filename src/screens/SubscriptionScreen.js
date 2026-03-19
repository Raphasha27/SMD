import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Alert, ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

export default function SubscriptionScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const plans = [
    {
      id: 'individual',
      name: 'Individual Pro',
      price: 'R149',
      period: '/mo',
      features: ['Unlimited Verifications', 'Priority Manual Review', 'Downloadable Certificates', 'Trust Badge']
    },
    {
      id: 'business',
      name: 'Business Elite',
      price: 'R899',
      period: '/mo',
      features: ['Batch Verification', 'API Access', 'Employee Monitoring', 'Dedicated Support']
    }
  ];

  const handleSubscribe = async (plan) => {
    setLoading(true);
    // Simulate Payment Gateway (PayFast / Peach Payments)
    setTimeout(async () => {
      try {
        if (!user) throw new Error("Please log in to subscribe.");

        // Update user's profile with premium status in Supabase
        const { error } = await supabase
          .from('profiles')
          .update({ 
            subscription_status: 'PREMIUM',
            plan_id: plan.id,
            subscription_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          })
          .eq('id', user.id);

        if (error) throw error;

        setLoading(false);
        Alert.alert(
          "Welcome to Premium! 💎",
          `Success! You now have ${plan.name} access. Start verifying with no limits.`,
          [{ text: "Go to Dashboard", onPress: () => navigation.navigate('Main') }]
        );
      } catch (err) {
        setLoading(false);
        Alert.alert("Subscription Error", err.message);
      }
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E293B', '#0F172A']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Go Premium 💎</Text>
        <Text style={styles.subtitle}>Unlock the full power of Sumbandila</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {plans.map((plan) => (
          <View key={plan.id} style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.period}>{plan.period}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.features}>
              {plan.features.map((feat, i) => (
                <Text key={i} style={styles.featItem}>✅ {feat}</Text>
              ))}
            </View>

            <TouchableOpacity 
              style={[styles.subBtn, plan.id === 'business' && styles.subBtnAlt]} 
              onPress={() => handleSubscribe(plan)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.subBtnText}>Activate {plan.name}</Text>
              )}
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.secureBanner}>
          <Text style={styles.secureText}>🔒 Secure SSL Encrypted Payments powered by PayFast</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 30, paddingTop: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  backBtn: { marginBottom: 20 },
  backText: { fontSize: 24, color: '#fff' },
  title: { fontSize: 26, fontWeight: '900', color: '#fff' },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 5 },
  content: { padding: 25 },
  planCard: { 
    backgroundColor: '#fff', 
    borderRadius: RADIUS.xl, 
    padding: 25, 
    marginBottom: 25,
    ...SHADOW.large,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  planName: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  priceRow: { alignItems: 'flex-end' },
  price: { fontSize: 24, fontWeight: '900', color: COLORS.primary },
  period: { fontSize: 12, color: COLORS.textMuted },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 20 },
  features: { marginBottom: 30 },
  featItem: { fontSize: 14, color: COLORS.textLight, marginBottom: 12, fontWeight: '500' },
  subBtn: { 
    backgroundColor: COLORS.primary, 
    height: 55, 
    borderRadius: RADIUS.lg, 
    justifyContent: 'center', 
    alignItems: 'center',
    ...SHADOW.medium
  },
  subBtnAlt: { backgroundColor: '#1E293B' },
  subBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  secureBanner: { marginTop: 10, alignItems: 'center' },
  secureText: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600' }
});
