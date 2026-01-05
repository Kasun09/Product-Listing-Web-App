# 🛒 ShopHub - Product Listing Web App

A premium, production-grade Product Listing application built with **React 19**, **Vite**, and **Tailwind CSS**. This project demonstrates advanced React patterns, state management, and high-performance UI/UX design.

---

## 🔗 Live Demo
**[Click here to view the live site](https://product-listing-web-app-ten.vercel.app/)**

---

## ✨ Features

### 🚀 Performance & Logic
- **Smart Search:** Real-time search with `useDebounce` hook to prevent performance lag.
- **Advanced Filtering:** Filter products by category and sort by price (High to Low / Low to High) simultaneously.
- **Global State Management:** Powered by **React Context API** to manage favorites across the entire app without prop drilling.
- **Persistent Favorites:** Favorites are synced with `localStorage` via a custom hook, ensuring data is saved even after a page refresh.
- **Logic-based Recommendations:** Products are dynamically highlighted as "Recommended" based on ratings (>4) and pricing algorithms.

### 🎨 UI/UX Excellence
- **Responsive Grid:** Fully adaptive layout from mobile (`grid-cols-1`) to desktop (`grid-cols-4`).
- **Dual View Modes:** Seamlessly switch between **Grid** and **List** views.
- **Dark Mode:** Native dark mode support using Tailwind's `dark` variant.
- **Skeleton Loaders:** Professional loading states using `animate-pulse` to improve perceived performance.
- **Micro-animations:** Custom CSS keyframes for smooth slide-in and scale-up effects.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | UI Library |
| **Vite** | Build Tool (Fast Refresh) |
| **Tailwind CSS** | Styling |
| **Lucide-React** | Icon Library |
| **Context API** | State Management |
| **Vercel** | Deployment |

---

## 📂 Folder Structure

```text
src/
├── components/ # Reusable UI components (ProductCard, Navbar, etc.)
├── context/    # Global state management (FavouriteContext)
├── hooks/      # Custom logic (useDebounce, useLocalStorage)
├── pages/      # Main page layouts (ProductList)
├── services/   # API integration (FakeStoreAPI)
└── utils/      # Recommendation logic
```

---
## ⚙️ Setup & Installation

Follow these steps to run the project locally on your machine:

### 1) Clone the repository
```bash
git clone https://github.com/your-username/product-listing-web-app.git
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































