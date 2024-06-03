import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
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

export { supabase };