# LifeList — Claude Project Instructions

## Project Overview
A personal bucket list / life passport app. Users save experiences they want to try (restaurants, movies, travel, activities, etc.), track their status, and build a memory of completed ones.

**App name:** LifeList
**GitHub:** https://github.com/SarahUrsula/lifelist (personal account — NOT Embrace)
**Stack:** Expo (React Native) + Supabase + TypeScript

## Tech Stack
- **Frontend:** Expo (React Native) with Expo Router, TypeScript
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Backend/DB/Auth/Storage:** Supabase
- **Target platforms:** Web (primary for dev/testing), iOS, Android

## Key Principles
- This is a personal project — use SarahUrsula's personal GitHub, never Embrace repos or accounts
- Mobile-first design, but web must work well too
- The app should feel cozy, visual, inspiring — NOT like a task manager
- Quick capture is the #1 priority — saving an item must be frictionless
- No Embrace JIRA numbers needed for commits on this project

## Branching & Commits
- Branch naming: `feature/`, `fix/`, `quick/` prefixes (standard git flow)
- No "Co-authored by Claude" in commit messages
- No Jira/ES numbers needed — this is personal

## Core Features (MVP order)
1. Auth (sign up / sign in)
2. Add item (quick capture — title, category, optional link/photo)
3. List view of saved items
4. Item detail + status tracking (Want to try → Done ✅)
5. Categories
6. Map view for places
7. Memory layer (photos/rating after completing)
8. Social/sharing (future)

## Database (Supabase)
Tables:
- `profiles` — user profile extending auth.users
- `items` — the bucket list entries
- `categories` — predefined + custom categories
- `item_photos` — photos attached to items (storage bucket)

## File Structure
```
app/                  # Expo Router pages
  (auth)/             # login, signup screens
  (tabs)/             # main tab navigation
    index.tsx         # home / list view
    map.tsx           # map view
    profile.tsx       # user profile
components/           # shared UI components
lib/
  supabase.ts         # Supabase client
  types.ts            # shared TypeScript types
assets/               # images, fonts
```

## Environment Variables
Stored in `.env.local` (never commit):
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
