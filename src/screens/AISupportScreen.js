import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, KeyboardAvoidingView, Platform, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme/colors';

const SUGGESTED = [
  'How to apply for NEF grant?',
  'What is SETA funding?',
  'How to apply for IDC loan?',
  'How to apply for mentorship?',
  'What is Pro subscription?',
  'How to verify a school?',
];

const INITIAL_MESSAGES = [
  {
    id: '1', role: 'bot',
    text: "Hi! I'm the Sumbandila AI Assistant 🤖\n\nI can help you navigate verification, funding eligibility, grant applications, and general app support.\n\nHow can I assist you today?",
  },
];

const RESPONSES = {
  nef: "🏦 **NEF (National Empowerment Fund)**\n\nThe NEF supports black-owned and black-empowered businesses. To apply:\n1. Register on nefcorp.co.za\n2. Prepare your business plan\n3. Provide CIPC registration\n4. Submit via the NEF Hub in our app\n\nFunding ranges from R500k – R75M.",
  seta: "📚 **SETA Funding**\n\nSETA (Sector Education and Training Authority) provides:\n• Bursaries for accredited courses\n• Learnerships & internships\n• Skills development grants\n\nApply via your relevant SETA (e.g., MERSETA, FASSET, HWSETA).",
  idc: "🏭 **IDC (Industrial Development Corporation)**\n\nIDC finances businesses in manufacturing, agro-processing, and green industries.\n\n• Loans from R1M+\n• Equity investments\n• Bridging finance\n\nApply at idc.co.za or use our Funding Hub.",
  verify: "✅ **How to Verify**\n\nUse the Verify tab to check:\n• 🎓 Schools & Colleges (DOE register)\n• 🩺 Doctors (HPCSA database)\n• ⚖️ Lawyers (Law Society register)\n• 📜 Accredited Training providers\n\nJust enter the institution name or scan their QR certificate.",
  pro: "👑 **Sumbandila Pro Plans**\n\n• **Individual Pro**: R49.99/month — Unlimited lookups, verified CV, CPD tracking\n• **Business Pro**: R299.99/month — Bulk verification, compliance dashboard, API access\n• **Institutional**: R299/month — Compliance alerts, digital badge\n\nUpgrade in Profile → Manage Subscription.",
};

const getResponse = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes('nef')) return RESPONSES.nef;
  if (lower.includes('seta')) return RESPONSES.seta;
  if (lower.includes('idc')) return RESPONSES.idc;
  if (lower.includes('verif')) return RESPONSES.verify;
  if (lower.includes('pro') || lower.includes('subscri')) return RESPONSES.pro;
  return "Thanks for your question! Let me connect you with our support team for a more detailed answer. In the meantime, you can browse the Funding Hub or check our Application Guides for more information. 😊";
};

export default function AISupportScreen({ navigation }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const flatRef = useRef(null);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');

    const userMsg = { id: Date.now().toString(), role: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    setTimeout(() => {
      const botMsg = { id: (Date.now() + 1).toString(), role: 'bot', text: getResponse(msg) };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
      setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1200);
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.botBubble]}>
      {item.role === 'bot' && (
        <View style={styles.botAvatar}><Text style={{ fontSize: 16 }}>🤖</Text></View>
      )}
      <View style={[styles.bubbleContent, item.role === 'user' ? styles.userContent : styles.botContent]}>
        <Text style={[styles.bubbleText, item.role === 'user' && styles.userText]}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1A237E', '#283593']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <View style={styles.avatarLarge}><Text style={{ fontSize: 28 }}>🤖</Text></View>
          <View>
            <Text style={styles.headerTitle}>AI Support</Text>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Sumbandila AI • Online</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={i => i.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messages}
          onContentSizeChange={() => flatRef.current?.scrollToEnd({ animated: true })}
        />

        {typing && (
          <View style={styles.typingRow}>
            <View style={styles.botAvatar}><Text style={{ fontSize: 14 }}>🤖</Text></View>
            <View style={styles.typingBubble}>
              <View style={styles.typingDots}>
                <View style={styles.dot} />
                <View style={[styles.dot, { opacity: 0.6 }]} />
                <View style={[styles.dot, { opacity: 0.3 }]} />
              </View>
            </View>
          </View>
        )}

        {/* Suggested */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggested}>
          {SUGGESTED.map((s, idx) => (
            <TouchableOpacity key={idx} style={styles.chip} onPress={() => sendMessage(s)}>
              <Text style={styles.chipText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything…"
            placeholderTextColor={COLORS.textMuted}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => sendMessage()}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={() => sendMessage()}
            disabled={!input.trim()}
          >
            <LinearGradient colors={['#1A237E', '#1565C0']} style={styles.sendGrad}>
              <Text style={{ color: '#fff', fontSize: 18 }}>➤</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  header: { paddingTop: 52, paddingBottom: SPACING.lg, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  backBtn: { marginBottom: 12 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarLarge: { width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2ECC71' },
  onlineText: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  messages: { padding: SPACING.md, paddingBottom: 8 },
  bubble: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-end', gap: 8 },
  userBubble: { flexDirection: 'row-reverse' },
  botBubble: {},
  botAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E8EAF6', justifyContent: 'center', alignItems: 'center' },
  bubbleContent: { maxWidth: '78%', borderRadius: RADIUS.lg, padding: 12 },
  userContent: { backgroundColor: COLORS.primary, borderBottomRightRadius: 4 },
  botContent: { backgroundColor: '#fff', borderBottomLeftRadius: 4, ...SHADOW.small },
  bubbleText: { fontSize: 14, color: COLORS.text, lineHeight: 20 },
  userText: { color: '#fff' },
  typingRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, paddingHorizontal: SPACING.md, marginBottom: 6 },
  typingBubble: { backgroundColor: '#fff', borderRadius: RADIUS.lg, padding: 14, ...SHADOW.small },
  typingDots: { flexDirection: 'row', gap: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.textMuted },
  suggested: { paddingHorizontal: SPACING.md, paddingVertical: 8, maxHeight: 50 },
  chip: { backgroundColor: '#E8EAF6', borderRadius: RADIUS.full, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, borderWidth: 1, borderColor: COLORS.primary + '30' },
  chipText: { color: COLORS.primary, fontSize: 12, fontWeight: '600' },
  inputBar: { flexDirection: 'row', padding: SPACING.md, gap: 10, alignItems: 'flex-end', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: COLORS.border },
  input: { flex: 1, backgroundColor: COLORS.background, borderRadius: RADIUS.lg, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border, maxHeight: 100 },
  sendBtn: { borderRadius: 24, overflow: 'hidden' },
  sendBtnDisabled: { opacity: 0.5 },
  sendGrad: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },
});
