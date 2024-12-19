import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const useAuthStatus = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth
            .getSession()
            .then(({ data: { session } }) => {
                if (session) {
                    setIsSignedIn(true);
                    setUserId(session.user?.id);
                } else {
                    setIsSignedIn(false);
                    setUserId(null);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching session:', error);
                setIsSignedIn(false);
                setUserId(null);
            });

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
export default useAuthStatus;
