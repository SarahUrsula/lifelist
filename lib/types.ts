export type ItemStatus = "want_to_try" | "planned" | "booked" | "done";

export type CategoryKey =
  | "food"
  | "movies"
  | "travel"
  | "activities"
  | "music"
  | "books"
  | "shopping"
  | "other";

export interface Category {
  key: CategoryKey;
  label: string;
  emoji: string;
}

export const CATEGORIES: Category[] = [
  { key: "food", label: "Food & Drink", emoji: "🍽️" },
  { key: "movies", label: "Movies & TV", emoji: "🎬" },
  { key: "travel", label: "Travel", emoji: "✈️" },
  { key: "activities", label: "Activities", emoji: "🎯" },
  { key: "music", label: "Music & Events", emoji: "🎵" },
  { key: "books", label: "Books", emoji: "📚" },
  { key: "shopping", label: "Shopping", emoji: "🛍️" },
  { key: "other", label: "Other", emoji: "💡" },
];

export const STATUS_LABELS: Record<ItemStatus, string> = {
  want_to_try: "Want to try",
  planned: "Planned",
  booked: "Booked",
  done: "Done ✓",
};

export const STATUS_COLORS: Record<ItemStatus, string> = {
  want_to_try: "bg-indigo-100 text-indigo-700",
  planned: "bg-amber-100 text-amber-700",
  booked: "bg-green-100 text-green-700",
  done: "bg-gray-100 text-gray-500",
};

export interface Item {
  id: string;
  user_id: string;
  title: string;
  category: CategoryKey;
  status: ItemStatus;
  notes: string | null;
  url: string | null;
  image_url: string | null;
  location_name: string | null;
  latitude: number | null;
  longitude: number | null;
  completed_at: string | null;
  rating: number | null;
  memory_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
}
