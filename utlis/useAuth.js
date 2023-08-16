import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from 'react';

const url = import.meta.env.VITE_REACT_URL;
const api = import.meta.env.VITE_REACT_API;
const supabase = createClient(url, api);


export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setIsLoading(false);
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleClick = () => {
        supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }

    return {session, isLoading, handleClick};
}