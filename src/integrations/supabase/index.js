import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useContext, useState, useEffect } from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

Products // table: products
    id: number
    name: string
    description: string
    price: number
    image_url: string

ShoppingCart // table: shopping_cart
    id: number
    user_id: string
    product_id: number
    quantity: number

*/

// Hooks for Products table
export const useProducts = () => useQuery({
    queryKey: ['products'],
    queryFn: () => fromSupabase(supabase.from('products').select('*')),
});

export const useAddProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProduct) => fromSupabase(supabase.from('products').insert([newProduct])),
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedProduct) => fromSupabase(supabase.from('products').update(updatedProduct).eq('id', updatedProduct.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (productId) => fromSupabase(supabase.from('products').delete().eq('id', productId)),
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });
};

// Hooks for ShoppingCart table
export const useShoppingCart = () => useQuery({
    queryKey: ['shopping_cart'],
    queryFn: () => fromSupabase(supabase.from('shopping_cart').select('*')),
});

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCartItem) => fromSupabase(supabase.from('shopping_cart').insert([newCartItem])),
        onSuccess: () => {
            queryClient.invalidateQueries('shopping_cart');
        },
    });
};

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedCartItem) => fromSupabase(supabase.from('shopping_cart').update(updatedCartItem).eq('id', updatedCartItem.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('shopping_cart');
        },
    });
};

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cartItemId) => fromSupabase(supabase.from('shopping_cart').delete().eq('id', cartItemId)),
        onSuccess: () => {
            queryClient.invalidateQueries('shopping_cart');
        },
    });
};

// Authentication Context and Hooks
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user ?? null);

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, []);

    return (
        React.createElement(AuthContext.Provider, { value: { user, setUser } }, children)
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useSignUp = () => {
    return useMutation(async ({ email, password }) => {
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return user;
    });
};

export const useSignIn = () => {
    return useMutation(async ({ email, password }) => {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return user;
    });
};

export const useSignOut = () => {
    const queryClient = useQueryClient();
    return useMutation(async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        queryClient.clear();
    });
};

export { supabase };