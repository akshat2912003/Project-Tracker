# 🚀 Project Tracker (Frontend Assignment)

A modern task management application built using React, Zustand, and TypeScript.  
This project demonstrates advanced frontend concepts like drag-and-drop, virtual scrolling, and URL-synced filters.

## 🔥 Features

### 📌 1. Kanban View
- Drag and drop tasks between columns (To Do, In Progress, In Review, Done)
- Real-time status updates
- Visual feedback with placeholder and drop highlighting
- Smooth snap-back behavior for invalid drops

### 📋 2. List View
- High-performance rendering using **virtual scrolling**
- Handles 500+ tasks efficiently
- Sorting functionality:
  - Title
  - Priority
  - Due Date
- Inline status editing

### 📊 3. Timeline View (Gantt Chart)
- Tasks displayed as horizontal bars based on date
- Priority-based color coding
- Today indicator (vertical line)
- Handles missing start dates with dot markers

### 🔍 4. Filters
- Multi-select filters:
  - Status
  - Priority
  - Assignee
  - Date range
- Instant filtering across all views
- Active filter display with removable tags
- Clear filters option

### 🌐 5. URL Synchronization
- Filters are synced with URL query parameters
- Supports:
  - Page refresh persistence
  - Back/forward navigation
  - Shareable filtered links

## ⚙️ Tech Stack

- **React + TypeScript**
- **Zustand** (state management)
- **Tailwind CSS** (UI styling)
- **React Router** (URL handling)

## 🧠 Key Concepts Implemented

- Custom drag-and-drop (without external libraries)
- Virtual scrolling for performance optimization
- Global state management with Zustand
- URL-based state synchronization
- Reusable utility-based filtering logic


## 🚀 How to Run

```bash
npm install
npm run dev