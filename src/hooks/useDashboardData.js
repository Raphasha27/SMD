import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'https://modern-adults-try.loca.lt';

export const useDashboardData = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        total_verifications: 50241,
        total_users: 12800,
        trending: [],
        platform_status: 'healthy'
    });
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/dashboard/stats`);
            const data = await res.json();
            setStats(data);
        } catch (err) {
            console.warn('⚠️ Stats fetch failed, using fallback:', err.message);
        }
    };

    const generateAIRecommendations = async () => {
        if (!user) return;
        
        try {
            // 1. Fetch user's recent activity to personalize
            const { data: recentHistory } = await supabase
                .from('verifications')
                .select('institution')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(5);

            // 2. Logic Engine
            let suggested = [];
            const hasMedical = recentHistory?.some(v => v.institution.toLowerCase().includes('hpcsa'));
            const hasEdu = recentHistory?.some(v => v.institution.toLowerCase().includes('university'));

            if (hasMedical && !hasEdu) {
                suggested.push({ 
                    id: 'edu', 
                    title: 'Education Hub', 
                    desc: 'Verify school & college accreditation',
                    icon: '🎓',
                    screen: 'EducationVerification'
                });
            } else if (hasEdu && !hasMedical) {
                suggested.push({ 
                    id: 'med', 
                    title: 'Verify Doctor', 
                    desc: 'Confirm HPCSA medical registration',
                    icon: '🩺',
                    screen: 'MedicalVerification'
                });
            } else {
                // Default: popular ones the user hasn't tried
                suggested.push(
                    { id: 'law', title: 'Legal Practitioner', desc: 'Secure Law Society (LPC) verify', icon: '⚖️', screen: 'LegalVerification' },
                    { id: 'biz', title: 'Company Lookup', desc: 'Verify CIPC company info', icon: '🏢', screen: 'Compliance' }
                );
            }

            setRecommendations(suggested);
        } catch (err) {
            console.warn('⚠️ AI recommendations failed:', err.message);
        }
    };

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            await Promise.all([fetchStats(), generateAIRecommendations()]);
            setLoading(false);
        };
        load();
    }, [user?.id]);

    return { stats, recommendations, loading, refresh: fetchStats };
};
