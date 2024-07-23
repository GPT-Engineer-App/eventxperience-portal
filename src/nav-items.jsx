import { Home, Calendar, Beer, Map, HelpCircle, Ticket, Users, Bell, BarChart } from "lucide-react";
import Index from "./pages/Index.jsx";
import EventManagement from "./components/EventManagement";
import BarOrdering from "./components/BarOrdering";
import VenueNavigation from "./components/VenueNavigation";
import UserSupport from "./components/UserSupport";
import SchedulingInterface from "./components/SchedulingInterface";
import TicketingPayment from "./components/TicketingPayment";
import AttendeeManagement from "./components/AttendeeManagement";
import NotificationsReminders from "./components/NotificationsReminders";
import EventAnalytics from "./components/EventAnalytics";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Event Management",
    to: "/events",
    icon: <Calendar className="h-4 w-4" />,
    page: <EventManagement />,
  },
  {
    title: "Scheduling",
    to: "/scheduling",
    icon: <Calendar className="h-4 w-4" />,
    page: <SchedulingInterface />,
  },
  {
    title: "Bar Ordering",
    to: "/bar",
    icon: <Beer className="h-4 w-4" />,
    page: <BarOrdering />,
  },
  {
    title: "Venue Navigation",
    to: "/navigation",
    icon: <Map className="h-4 w-4" />,
    page: <VenueNavigation />,
  },
  {
    title: "User Support",
    to: "/support",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <UserSupport />,
  },
  {
    title: "Ticketing & Payment",
    to: "/ticketing",
    icon: <Ticket className="h-4 w-4" />,
    page: <TicketingPayment />,
  },
  {
    title: "Attendee Management",
    to: "/attendees",
    icon: <Users className="h-4 w-4" />,
    page: <AttendeeManagement />,
  },
  {
    title: "Notifications & Reminders",
    to: "/notifications",
    icon: <Bell className="h-4 w-4" />,
    page: <NotificationsReminders />,
  },
  {
    title: "Event Analytics",
    to: "/analytics",
    icon: <BarChart className="h-4 w-4" />,
    page: <EventAnalytics />,
  },
];