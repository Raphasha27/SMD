import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';
import { supabase } from '../config/supabase';

export default function AdminScreen({ navigation }) {
  const [stats, setStats] = useState({ totalDocs: 0, totalInst: 0, totalVerif: 0 });
  const [logs, setLogs] = useState([]);
  const [manualRequests, setManualRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchLogs();
    fetchManualRequests();

    // 🏆 Real-time Subscription for Phase 2
    const channel = supabase
      .channel('admin_feed')
      .on('postgres_changes', { event: 'INSERT', table: 'verifications' }, (payload) => {
        setLogs(prev => [payload.new, ...prev].slice(0, 20));
        fetchStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStats = async () => {
    try {
      const { count: instCount } = await supabase.from('institutions').select('*', { count: 'exact', head: true });
      const { count: profCount } = await supabase.from('professionals').select('*', { count: 'exact', head: true });
      const { count: verifCount } = await supabase.from('verifications').select('*', { count: 'exact', head: true });
      
      setStats({
        totalInst: instCount || 0,
        totalDocs: profCount || 0,
        totalVerif: verifCount || 0
      });
    } catch (e) {
      console.error(e);
    }
  };

  const fetchManualRequests = async () => {
    try {
      const { data } = await supabase
        .from('verification_requests')
        .select('*')
        .eq('status', 'PENDING_REVIEW');
      setManualRequests(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLogs = async () => {
    try {
      const { data } = await supabase
        .from('verifications')
        .select(`
          *,
          profiles:user_id ( full_name )
        `)
        .order('created_at', { ascending: false })
        .limit(20);
      setLogs(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('verification_requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchManualRequests(); // Refresh list
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator color={COLORS.primary} size="large" /></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pilot Control Panel</Text>
        <Text style={styles.headerSub}>Admin Monitoring Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { borderLeftColor: '#1565C0' }]}>
            <Text style={styles.statVal}>{stats.totalInst}</Text>
            <Text style={styles.statLabel}>Colleges</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: '#27AE60' }]}>
            <Text style={styles.statVal}>{stats.totalDocs}</Text>
            <Text style={styles.statLabel}>Pros</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: '#F59E0B' }]}>
            <Text style={styles.statVal}>{stats.totalVerif}</Text>
            <Text style={styles.statLabel}>Verifs</Text>
          </View>
        </View>
 
        {/* Pending Reviews Section */}
        {manualRequests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PENDING MANUAL REVIEWS ({manualRequests.length})</Text>
            {manualRequests.map((req) => (
              <View key={req.id} style={[styles.logItem, { borderLeftWidth: 4, borderLeftColor: COLORS.secondary }]}>
                <View style={styles.logHeader}>
                  <Text style={styles.logUser}>{req.entity_name}</Text>
                  <View style={styles.pendingBadge}><Text style={styles.pendingText}>PENDING</Text></View>
                </View>
                <Text style={styles.logMeta}>Type: {req.entity_type} • Ref: {req.id.slice(0, 8)}</Text>
                
                <View style={styles.adminActions}>
                  <TouchableOpacity 
                    style={[styles.actionBtn, styles.approveBtn]} 
                    onPress={() => handleStatusUpdate(req.id, 'APPROVED')}
                  >
                    <Text style={styles.actionBtnText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionBtn, styles.rejectBtn]} 
                    onPress={() => handleStatusUpdate(req.id, 'REJECTED')}
                  >
                    <Text style={styles.actionBtnText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
 
        {/* Live Logs */}
        <Text style={styles.sectionTitle}>LIVE VERIFICATION FEED</Text>
        {logs.map((log) => (
          <View key={log.id} style={styles.logItem}>
            <View style={styles.logHeader}>
              <Text style={styles.logUser}>{log.profiles?.full_name || 'Anonymous'}</Text>
              <Text style={[styles.logStatus, { color: log.status === 'VERIFIED' ? '#27AE60' : '#E74C3C' }]}>
                {log.status}
              </Text>
            </View>
            <Text style={styles.logMeta}>Target: {log.type} Verification</Text>
            <Text style={styles.logTime}>{new Date(log.created_at).toLocaleTimeString()}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.refreshBtn} onPress={() => { setLoading(true); fetchLogs(); fetchStats(); }}>
          <Text style={styles.btnText}>🔄 Refresh Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: COLORS.primary, padding: 30, paddingTop: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: '900' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
  body: { padding: 20, paddingBottom: 100 },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  statCard: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 15, borderLeftWidth: 4, ...SHADOW.small },
  statVal: { fontSize: 20, fontWeight: '900', color: COLORS.text },
  statLabel: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  sectionTitle: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, letterSpacing: 1.5, marginBottom: 15 },
  logItem: { backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 10, ...SHADOW.small },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  logUser: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  logStatus: { fontSize: 11, fontWeight: '900' },
  logMeta: { fontSize: 12, color: COLORS.textLight },
  logTime: { fontSize: 10, color: COLORS.textMuted, marginTop: 6, textAlign: 'right' },
  refreshBtn: { marginTop: 20, backgroundColor: COLORS.background, paddingVertical: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  btnText: { color: COLORS.primary, fontWeight: '800' },
  section: { marginBottom: 30 },
  pendingBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  pendingText: { color: '#D97706', fontSize: 10, fontWeight: '900' },
  adminActions: { flexDirection: 'row', gap: 10, marginTop: 15, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12 },
  actionBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  approveBtn: { backgroundColor: '#DEF7EC' },
  rejectBtn: { backgroundColor: '#FDE8E8' },
  actionBtnText: { fontSize: 12, fontWeight: '700' }
});
