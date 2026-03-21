import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Dimensions, StatusBar, Animated, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { useAuth } from '../context/AuthContext';
import { useDashboardData } from '../hooks/useDashboardData';

const { width } = Dimensions.get('window');

const DARK_NAVY = '#0B1220';
const CARD_BG = '#1E293B';
const BORDER_COLOR = '#2D3F55';
const TEXT_LIGHT = '#F1F5F9';
const TEXT_MUTED = '#94A3B8';
const BRAND_BLUE = '#2563EB';

export default function DashboardScreen({ navigation }) {
    const { user } = useAuth();
    const { stats, recommendations, loading } = useDashboardData();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const navigate = (item) => {
        if (item.screen === 'CareerHubDirect') navigation.navigate('Career Hub');
        else if (item.screen === 'Support') navigation.navigate('Biz Tools');
        else navigation.navigate(item.screen);
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" backgroundColor="#fff" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                
                {/* 🏷️ Top Header (App Store Style) */}
                <View style={s.topHeader}>
                    <View style={s.appMetaRow}>
                        <View style={s.appIconFrame}>
                            <Text style={{ fontSize: 40 }}>🛡️</Text>
                        </View>
                        <View style={s.appNameCol}>
                            <Text style={s.appName}>Sumbandila Verify</Text>
                            <View style={s.ratingRow}>
                                <Text style={s.ratingStars}>⭐⭐⭐⭐⭐</Text>
                                <Text style={s.ratingText}>4.9 · 50K+ users</Text>
                            </View>
                        </View>
                    </View>

                    <View style={s.bulletsRow}>
                        <View style={s.bulletCol}>
                            <Text style={s.bullet}>✔️ Verify professionals instantly</Text>
                            <Text style={s.bullet}>✔️ Trusted national registry</Text>
                            <Text style={s.bullet}>✔️ Real-time results</Text>
                        </View>
                        <TouchableOpacity style={s.openButton} onPress={() => navigation.navigate('VerificationSelection')}>
                            <Text style={s.openButtonText}>Open ›</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Screenshot Mockups Horizontal Scroll */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.screenScroll}>
                        {[1, 2, 3].map((_, idx) => (
                            <View key={idx} style={s.screenMockup}>
                                <LinearGradient colors={[BRAND_BLUE + '44', 'transparent']} style={s.mockGradient} />
                                <View style={s.mockIndicator} />
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* 🛡️ Key Features Bar */}
                <View style={s.keyFeatures}>
                    <Text style={s.sectionTitle}>Key Features</Text>
                    <View style={s.featureItem}>
                        <Text style={s.featureText}>📈 Instant</Text>
                    </View>
                    <View style={s.featureItem}>
                        <Text style={s.featureText}>🛡️ Registry database scan</Text>
                    </View>
                    <View style={s.featureItem}>
                        <Text style={s.featureText}>🕒 Fraud detection alerts</Text>
                    </View>
                </View>

                {/* 📱 Apps for You */}
                <View style={s.sectionContainer}>
                    <Text style={s.sectionTitle}>Apps for You</Text>
                    <Text style={s.sectionSub}>Explore tools tailored to verification & trust</Text>
                    
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.horizontalScroll}>
                        {recommendations.map((app, idx) => (
                            <TouchableOpacity key={idx} style={s.appCard} onPress={() => navigate(app)}>
                                <View style={s.appCardIconBox}>
                                    <Text style={{ fontSize: 32 }}>{app.icon}</Text>
                                </View>
                                <Text style={s.appCardTitle}>{app.title}</Text>
                                <Text style={s.appCardRating}>⭐ 4.{9-idx} ⭐</Text>
                                <Text style={s.appCardSub}>{app.desc}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* 🏆 Top Charts */}
                <View style={s.sectionContainer}>
                    <Text style={s.sectionTitle}>Top Charts</Text>
                    <View style={s.chartList}>
                        {stats.trending?.slice(0, 3).map((item, idx) => (
                            <TouchableOpacity key={idx} style={s.chartItem} onPress={() => navigate({ screen: item.type === 'medical' ? 'MedicalVerification' : 'EducationVerification' })}>
                                <Text style={s.chartRank}>{idx + 1}.</Text>
                                <Text style={s.chartLabel}>{item.label}</Text>
                                <Text style={s.chartEmoji}>{idx === 0 ? '🏆' : idx === 1 ? '🥈' : '🥉'}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* 💡 Suggested for You (AI Section) */}
                <View style={s.sectionContainer}>
                    <Text style={s.sectionTitle}>Suggested for You</Text>
                    <View style={s.suggestionGrid}>
                        <TouchableOpacity style={s.suggestionCard} onPress={() => navigation.navigate('Career Hub')}>
                            <View style={s.suggIconBox}>
                                <Text style={{ fontSize: 24 }}>💼</Text>
                            </View>
                            <View>
                                <Text style={s.suggTitle}>Talent Marketplace</Text>
                                <Text style={s.suggSub}>Discover verified experts</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.suggestionCard} onPress={() => navigation.navigate('Compliance')}>
                            <View style={[s.suggIconBox, { backgroundColor: BRAND_BLUE + '11' }]}>
                                <Text style={{ fontSize: 24 }}>🛡️</Text>
                            </View>
                            <View>
                                <Text style={s.suggTitle}>Compliance Portal</Text>
                                <Text style={s.suggSub}>Institutional checks</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            {/* 🏠 Bottom Navigation Mockup */}
            <View style={s.bottomNav}>
                 <TouchableOpacity style={s.navItem}>
                    <Text style={s.navIcon}>🏠</Text>
                    <Text style={s.navLabel}>Home</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={s.navItem} onPress={() => navigation.navigate('VerificationSelection')}>
                    <Text style={s.navIcon}>📊</Text>
                    <Text style={s.navLabel}>Tools</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={s.navItem} onPress={() => navigation.navigate('AISupport')}>
                    <Text style={s.navIcon}>🔍</Text>
                    <Text style={s.navLabel}>Search</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={s.navItem} onPress={() => navigation.navigate('Profile')}>
                    <Text style={s.navIcon}>👤</Text>
                    <Text style={s.navLabel}>Profile</Text>
                 </TouchableOpacity>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    topHeader: { paddingHorizontal: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: '#eee' },
    appMetaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    appIconFrame: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#f0f4ff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e1e8ff' },
    appNameCol: { marginLeft: 15 },
    appName: { fontSize: 24, fontWeight: '900', color: '#1a1a1a' },
    ratingRow: { marginTop: 5 },
    ratingStars: { color: '#fbbf24', fontSize: 14 },
    ratingText: { color: '#666', fontSize: 13, fontWeight: '500', marginTop: 2 },
    bulletsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25 },
    bulletCol: { gap: 5 },
    bullet: { color: BRAND_BLUE, fontWeight: '900', fontSize: 13 },
    openButton: { backgroundColor: BRAND_BLUE, paddingHorizontal: 25, paddingVertical: 10, borderRadius: 20, alignSelf: 'center' },
    openButtonText: { color: '#fff', fontWeight: '900', fontSize: 16 },
    screenScroll: { marginHorizontal: -20, paddingHorizontal: 20, marginBottom: 30 },
    screenMockup: { width: 140, height: 180, borderRadius: 15, backgroundColor: '#f5f5f5', marginRight: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' },
    mockGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    mockIndicator: { position: 'absolute', top: 10, right: 10, width: 25, height: 25, borderRadius: 12, backgroundColor: BRAND_BLUE + '22' },
    keyFeatures: { paddingHorizontal: 20, paddingVertical: 25, borderBottomWidth: 1, borderBottomColor: '#eee' },
    sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1a1a1a', marginBottom: 8 },
    featureItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
    featureText: { fontSize: 14, fontWeight: '700', color: '#444' },
    sectionContainer: { marginTop: 30, paddingHorizontal: 20 },
    sectionSub: { fontSize: 13, color: '#666', marginBottom: 20, fontWeight: '500' },
    horizontalScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
    appCard: { width: 160, borderRadius: 20, backgroundColor: '#fff', padding: 15, marginRight: 15, borderElevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, marginBottom: 10, borderWidth: 1, borderColor: '#f0f0f0' },
    appCardIconBox: { width: 130, height: 90, borderRadius: 15, backgroundColor: '#f8faff', justifyContent: 'center', alignItems: 'center', marginBottom: 12, overflow: 'hidden' },
    appCardTitle: { fontSize: 15, fontWeight: '900', color: '#1a1a1a' },
    appCardRating: { fontSize: 11, color: '#fbbf24', marginVertical: 4, fontWeight: '800' },
    appCardSub: { fontSize: 11, color: '#666', fontWeight: '500' },
    chartList: { marginTop: 10 },
    chartItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
    chartRank: { fontSize: 18, fontWeight: '900', color: '#333', width: 30 },
    chartLabel: { flex: 1, fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
    chartEmoji: { fontSize: 20 },
    suggestionGrid: { flexDirection: 'column', gap: 12, marginTop: 15 },
    suggestionCard: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 15, backgroundColor: '#f8faff', borderWidth: 1, borderColor: '#e1e8ff' },
    suggIconBox: { width: 52, height: 52, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginRight: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 },
    suggTitle: { fontSize: 16, fontWeight: '900', color: '#1a1a1a' },
    suggSub: { fontSize: 13, color: '#666', marginTop: 2 },
    bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 75, backgroundColor: 'rgba(255,255,255,0.95)', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f1f1f1', paddingBottom: 15 },
    navItem: { alignItems: 'center' },
    navIcon: { fontSize: 22, color: BRAND_BLUE },
    navLabel: { fontSize: 10, fontWeight: '900', color: '#666', marginTop: 4 },
});
