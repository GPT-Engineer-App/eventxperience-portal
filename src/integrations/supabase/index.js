import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

### event_feedback

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| event_id   | int8        | number | false    |
| user_id    | int8        | number | false    |
| rating     | integer     | number | false    |
| comments   | text        | string | false    |
| created_at | timestamptz | string | false    |
| updated_at | timestamptz | string | false    |

### orders

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| id          | int8        | number | true     |
| user_id     | int8        | number | false    |
| total_price | numeric     | number | false    |
| status      | text        | string | false    |
| created_at  | timestamptz | string | false    |
| updated_at  | timestamptz | string | false    |

### event_registrations

| name          | type        | format | required |
|---------------|-------------|--------|----------|
| id            | int8        | number | true     |
| event_id      | int8        | number | false    |
| user_id       | int8        | number | false    |
| ticket_id     | int8        | number | false    |
| quantity      | integer     | number | false    |
| total_price   | numeric     | number | false    |
| status        | text        | string | false    |
| created_at    | timestamptz | string | false    |
| updated_at    | timestamptz | string | false    |

### event_media

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| event_id   | int8        | number | false    |
| media_url  | text        | string | false    |
| media_type | text        | string | false    |
| created_at | timestamptz | string | false    |
| updated_at | timestamptz | string | false    |

### order_analytics

| name         | type   | format | required |
|--------------|--------|--------|----------|
| id           | int8   | number | true     |
| order_id     | int8   | number | false    |
| metric_name  | text   | string | false    |
| metric_value | text   | string | false    |

### menu_item_customizations

| name               | type        | format | required |
|--------------------|-------------|--------|----------|
| id                 | int8        | number | true     |
| item_id            | int8        | number | false    |
| customization_name | text        | string | false    |
| additional_price   | numeric     | number | false    |
| created_at         | timestamptz | string | false    |
| updated_at         | timestamptz | string | false    |

### menu_items

| name        | type        | format  | required |
|-------------|-------------|---------|----------|
| id          | int8        | number  | true     |
| name        | text        | string  | false    |
| description | text        | string  | false    |
| category    | text        | string  | false    |
| price       | numeric     | number  | false    |
| image_url   | text        | string  | false    |
| available   | boolean     | boolean | false    |
| created_at  | timestamptz | string  | false    |
| updated_at  | timestamptz | string  | false    |

### announcements

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| event_id   | int8        | number | false    |
| message    | text        | string | false    |
| created_at | timestamptz | string | false    |
| updated_at | timestamptz | string | false    |

### order_items

| name                  | type        | format | required |
|-----------------------|-------------|--------|----------|
| id                    | int8        | number | true     |
| order_id              | int8        | number | false    |
| item_id               | int8        | number | false    |
| quantity              | integer     | number | false    |
| customization_details | text        | string | false    |
| created_at            | timestamptz | string | false    |
| updated_at            | timestamptz | string | false    |

### event_analytics

| name         | type        | format | required |
|--------------|-------------|--------|----------|
| id           | int8        | number | true     |
| event_id     | int8        | number | false    |
| metric_name  | text        | string | false    |
| metric_value | text        | string | false    |
| recorded_at  | timestamptz | string | false    |

### venue_maps

| name           | type        | format | required |
|----------------|-------------|--------|----------|
| id             | int8        | number | true     |
| venue_id       | int8        | number | false    |
| floor_plan_url | text        | string | false    |
| created_at     | timestamptz | string | false    |
| updated_at     | timestamptz | string | false    |

### events

| name         | type        | format | required |
|--------------|-------------|--------|----------|
| id           | int8        | number | true     |
| name         | text        | string | false    |
| description  | text        | string | false    |
| date         | timestamptz | string | false    |
| time         | text        | string | false    |
| venue        | text        | string | false    |
| category     | text        | string | false    |
| organizer_id | int8        | number | false    |
| created_at   | timestamptz | string | false    |
| updated_at   | timestamptz | string | false    |

### users

| name          | type        | format | required |
|---------------|-------------|--------|----------|
| id            | int8        | number | true     |
| name          | text        | string | false    |
| email         | text        | string | false    |
| password_hash | text        | string | false    |
| role          | text        | string | false    |
| created_at    | timestamptz | string | false    |
| updated_at    | timestamptz | string | false    |

### event_tickets

| name               | type        | format | required |
|--------------------|-------------|--------|----------|
| id                 | int8        | number | true     |
| event_id           | int8        | number | false    |
| ticket_type        | text        | string | false    |
| price              | numeric     | number | false    |
| quantity           | integer     | number | false    |
| available_quantity | integer     | number | false    |
| created_at         | timestamptz | string | false    |
| updated_at         | timestamptz | string | false    |

### venues

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | false    |
| address    | text        | string | false    |
| map_url    | text        | string | false    |
| created_at | timestamptz | string | false    |
| updated_at | timestamptz | string | false    |

### notifications

| name       | type        | format  | required |
|------------|-------------|---------|----------|
| id         | int8        | number  | true     |
| user_id    | int8        | number  | false    |
| type       | text        | string  | false    |
| message    | text        | string  | false    |
| read       | boolean     | boolean | false    |
| created_at | timestamptz | string  | false    |
| updated_at | timestamptz | string  | false    |

*/

// Event Feedback
export const useEventFeedback = () => useQuery({
    queryKey: ['eventFeedback'],
    queryFn: () => fromSupabase(supabase.from('event_feedback').select('*'))
});

export const useAddEventFeedback = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFeedback) => fromSupabase(supabase.from('event_feedback').insert([newFeedback])),
        onSuccess: () => queryClient.invalidateQueries(['eventFeedback'])
    });
};

export const useUpdateEventFeedback = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('event_feedback').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['eventFeedback'])
    });
};

export const useDeleteEventFeedback = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('event_feedback').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['eventFeedback'])
    });
};

// Orders
export const useOrders = () => useQuery({
    queryKey: ['orders'],
    queryFn: () => fromSupabase(supabase.from('orders').select('*'))
});

export const useAddOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newOrder) => fromSupabase(supabase.from('orders').insert([newOrder])),
        onSuccess: () => queryClient.invalidateQueries(['orders'])
    });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('orders').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['orders'])
    });
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('orders').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['orders'])
    });
};

// Event Registrations
export const useEventRegistrations = () => useQuery({
    queryKey: ['eventRegistrations'],
    queryFn: () => fromSupabase(supabase.from('event_registrations').select('*'))
});

export const useAddEventRegistration = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newRegistration) => fromSupabase(supabase.from('event_registrations').insert([newRegistration])),
        onSuccess: () => queryClient.invalidateQueries(['eventRegistrations'])
    });
};

export const useUpdateEventRegistration = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('event_registrations').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['eventRegistrations'])
    });
};

export const useDeleteEventRegistration = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('event_registrations').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['eventRegistrations'])
    });
};

// Event Media
export const useEventMedia = () => useQuery({
    queryKey: ['eventMedia'],
    queryFn: () => fromSupabase(supabase.from('event_media').select('*'))
});

export const useAddEventMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMedia) => fromSupabase(supabase.from('event_media').insert([newMedia])),
        onSuccess: () => queryClient.invalidateQueries(['eventMedia'])
    });
};

export const useUpdateEventMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('event_media').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['eventMedia'])
    });
};

export const useDeleteEventMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('event_media').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['eventMedia'])
    });
};

// Order Analytics
export const useOrderAnalytics = () => useQuery({
    queryKey: ['orderAnalytics'],
    queryFn: () => fromSupabase(supabase.from('order_analytics').select('*'))
});

export const useAddOrderAnalytics = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newAnalytics) => fromSupabase(supabase.from('order_analytics').insert([newAnalytics])),
        onSuccess: () => queryClient.invalidateQueries(['orderAnalytics'])
    });
};

export const useUpdateOrderAnalytics = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('order_analytics').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['orderAnalytics'])
    });
};

export const useDeleteOrderAnalytics = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('order_analytics').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['orderAnalytics'])
    });
};

// Menu Item Customizations
export const useMenuItemCustomizations = () => useQuery({
    queryKey: ['menuItemCustomizations'],
    queryFn: () => fromSupabase(supabase.from('menu_item_customizations').select('*'))
});

export const useAddMenuItemCustomization = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCustomization) => fromSupabase(supabase.from('menu_item_customizations').insert([newCustomization])),
        onSuccess: () => queryClient.invalidateQueries(['menuItemCustomizations'])
    });
};

export const useUpdateMenuItemCustomization = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('menu_item_customizations').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['menuItemCustomizations'])
    });
};

export const useDeleteMenuItemCustomization = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('menu_item_customizations').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['menuItemCustomizations'])
    });
};

// Menu Items
export const useMenuItems = () => useQuery({
    queryKey: ['menuItems'],
    queryFn: () => fromSupabase(supabase.from('menu_items').select('*'))
});

export const useAddMenuItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newItem) => fromSupabase(supabase.from('menu_items').insert([newItem])),
        onSuccess: () => queryClient.invalidateQueries(['menuItems'])
    });
};

export const useUpdateMenuItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('menu_items').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['menuItems'])
    });
};

export const useDeleteMenuItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('menu_items').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['menuItems'])
    });
};

// Announcements
export const useAnnouncements = () => useQuery({
    queryKey: ['announcements'],
    queryFn: () => fromSupabase(supabase.from('announcements').select('*'))
});

export const useAddAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newAnnouncement) => fromSupabase(supabase.from('announcements').insert([newAnnouncement])),
        onSuccess: () => queryClient.invalidateQueries(['announcements'])
    });
};

export const useUpdateAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('announcements').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['announcements'])
    });
};

export const useDeleteAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('announcements').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['announcements'])
    });
};

// Order Items
export const useOrderItems = () => useQuery({
    queryKey: ['orderItems'],
    queryFn: () => fromSupabase(supabase.from('order_items').select('*'))
});

export const useAddOrderItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newItem) => fromSupabase(supabase.from('order_items').insert([newItem])),
        onSuccess: () => queryClient.invalidateQueries(['orderItems'])
    });
};

export const useUpdateOrderItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('order_items').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['orderItems'])
    });
};

export const useDeleteOrderItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('order_items').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['orderItems'])
    });
};

// Event Analytics
export const useEventAnalytics = () => useQuery({
    queryKey: ['eventAnalytics'],
    queryFn: () => fromSupabase(supabase.from('event_analytics').select('*'))
});

export const useAddEventAnalytics = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newAnalytics) => fromSupabase(supabase.from('event_analytics').insert([newAnalytics])),
        onSuccess: () => queryClient.invalidateQueries(['eventAnalytics'])
    });
};

export const useUpdateEventAnalytics = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('event_analytics').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['eventAnalytics'])
    });
};

export const useDeleteEventAnalytics = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('event_analytics').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['eventAnalytics'])
    });
};

// Venue Maps
export const useVenueMaps = () => useQuery({
    queryKey: ['venueMaps'],
    queryFn: () => fromSupabase(supabase.from('venue_maps').select('*'))
});

export const useAddVenueMap = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMap) => fromSupabase(supabase.from('venue_maps').insert([newMap])),
        onSuccess: () => queryClient.invalidateQueries(['venueMaps'])
    });
};

export const useUpdateVenueMap = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('venue_maps').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['venueMaps'])
    });
};

export const useDeleteVenueMap = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('venue_maps').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['venueMaps'])
    });
};

// Events
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*'))
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => queryClient.invalidateQueries(['events'])
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('events').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['events'])
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('events').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['events'])
    });
};

// Users
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*'))
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => queryClient.invalidateQueries(['users'])
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('users').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['users'])
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('users').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['users'])
    });
};

// Event Tickets
export const useEventTickets = () => useQuery({
    queryKey: ['eventTickets'],
    queryFn: () => fromSupabase(supabase.from('event_tickets').select('*'))
});

export const useAddEventTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTicket) => fromSupabase(supabase.from('event_tickets').insert([newTicket])),
        onSuccess: () => queryClient.invalidateQueries(['eventTickets'])
    });
};

export const useUpdateEventTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('event_tickets').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['eventTickets'])
    });
};

export const useDeleteEventTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('event_tickets').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['eventTickets'])
    });
};

// Venues
export const useVenues = () => useQuery({
    queryKey: ['venues'],
    queryFn: () => fromSupabase(supabase.from('venues').select('*'))
});

export const useAddVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newVenue) => fromSupabase(supabase.from('venues').insert([newVenue])),
        onSuccess: () => queryClient.invalidateQueries(['venues'])
    });
};

export const useUpdateVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('venues').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['venues'])
    });
};

export const useDeleteVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('venues').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['venues'])
    });
};

// Notifications
export const useNotifications = () => useQuery({
    queryKey: ['notifications'],
    queryFn: () => fromSupabase(supabase.from('notifications').select('*'))
});

export const useAddNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newNotification) => fromSupabase(supabase.from('notifications').insert([newNotification])),
        onSuccess: () => queryClient.invalidateQueries(['notifications'])
    });
};

export const useUpdateNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('notifications').update(updateData).eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['notifications'])
    });
};

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('notifications').delete().eq('id', id)),
        onSuccess: () => queryClient.invalidateQueries(['notifications'])
    });
};