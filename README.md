# 🛒 ShopHub - Product Listing Web App

A premium, production-grade Product Listing application built with **React 19**, **Vite**, and **Tailwind CSS**. This project demonstrates advanced React patterns, state management, and high-performance UI/UX design.

---

## 🔗 Live Demo
**[Click here to view the live site](https://product-listing-web-app-ten.vercel.app/)**

---

## ✨ Features

### 🚀 Performance & Logic
- **Smart Search:** Real-time search with `useDebounce` hook to prevent performance lag and unnecessary re-renders.
- **Advanced Filtering:** Multi-layer filtering by category and price sorting (High to Low / Low to High) simultaneously.
- **Global State Management:** Powered by **React Context API** for seamless favorite management across components.
- **Persistent Favorites:** Custom `useLocalStorage` hook ensures user favorites are saved even after page refreshes.
- **Logic-based Recommendations:** Smart "Recommended" badges triggered by rating (>4) and pricing algorithms.

### 🎨 UI/UX Excellence
- **Fluid Animations:** Integrated **Framer Motion** for smooth page transitions, list filtering effects, and interactive modal/sidebar entry.
- **Responsive Layout:** Adaptive grid system from mobile (`grid-cols-1`) to desktop (`grid-cols-4`).
- **Dual View Modes:** Toggle between modern **Grid** and detailed **List** views instantly.
- **Smart Navigation:** Fixed pagination behavior with an "Instant Scroll to Top" feature for better user flow.
- **Professional States:** Skeleton loaders (`animate-pulse`) and custom error handling for a polished feel.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | UI Library |
| **Vite** | Build Tool (Fast Refresh) |
| **Tailwind CSS** | Utility-first Styling |
| **Framer Motion** | Advanced Animations |
| **Lucide-React** | Icon Library |
| **Context API** | Global State Management |

---

## 📂 Folder Structure

```text
src/
├── components/ # Reusable UI components (ProductCard, Navbar, etc.)
├── context/    # Global state management (FavouriteContext)
├── hooks/      # Custom logic (useDebounce, useLocalStorage)
├── pages/      # Main page layouts (ProductList)
├── services/   # API integration (FakeStoreAPI)
└── utils/      # Utility functions (cn.js, recommendation logic)
```

---
## ⚙️ Setup & Installation

Follow these steps to run the project locally on your machine:

### 1) Clone the repository
```bash
git clone https://github.com/Kasun09/Product-Listing-Web-App.git
```

### 2) Navigate to the project folder
```bash
cd product-listing-web-app
```

### 3) Install dependencies
```bash
npm install
```

### 4) Start the development server
```bash
npm run dev
```

---

## 🤖 AI Tools Usage

This project utilized AI tools (Gemini/ChatGPT) for:

* **Architecture Planning:** Validating a modular folder structure.
* **Logic Optimization:** Refining `useDebounce` and `useMemo` hooks.
* **Debugging:** Resolving CSS layout and async API issues.
* **Documentation:** Structuring technical analysis and README.

---

## 📝 Evaluation Criteria Met

- [x] **API Handling:** Robust async logic with error handling.
- [x] **Component Design:** Modular components following Atomic Design.
- [x] **State Management:** Effective use of `useState`, `useEffect`, and `Context API`.
- [x] **Code Clarity:** Clean, documented, and maintainable code.































