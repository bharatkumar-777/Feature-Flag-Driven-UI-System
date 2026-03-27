import { FeatureFlag } from "./types";

export const DEFAULT_FLAGS: FeatureFlag[] = [
  {
    name: "new_dashboard",
    enabled: false,
    description: "Redesigned dashboard layout with modern cards",
    depends_on: [],
  },
  {
    name: "analytics_base",
    enabled: true,
    description: "Base analytics widget",
    depends_on: [],
  },
  {
    name: "premium_analytics",
    enabled: false,
    description: "Premium analytics with advanced charts",
    depends_on: ["analytics_base"],
  },
  {
    name: "dark_mode",
    enabled: false,
    description: "Dark mode toggle for the application",
    depends_on: [],
  },
  {
    name: "chat_widget",
    enabled: false,
    description: "Live chat support widget",
    depends_on: [],
  },
];

export const LOCALSTORAGE_KEY = "feature-flags-cache";
export const FLAGS_API_URL = "/api/flags";
