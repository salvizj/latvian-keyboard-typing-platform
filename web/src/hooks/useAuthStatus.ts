import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export const useAuthStatus = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (session) {
                setIsSignedIn(true);
                setUserId(session.user?.id || null);
            } else {
                setIsSignedIn(false);
                setUserId(null);
            }
            setLoading(false);
        };

        fetchSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setIsSignedIn(true);
                setUserId(session.user?.id || null);
            } else {
                setIsSignedIn(false);
                setUserId(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return { isSignedIn, userId, loading };
};
