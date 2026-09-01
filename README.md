# SeverMarket Analytics

## SaaS Analytics & Admin Dashboard Platform

SeverMarket Analytics is a modern analytics and management platform for e-commerce operations.

The application provides a centralized workspace for monitoring sales performance, managing orders, analyzing customers, tracking products, and making data-driven business decisions.

Built with modern frontend architecture principles, the platform combines scalable application structure, efficient state management, responsive UI, and production-oriented development practices.

---

# Overview

Modern e-commerce platforms require convenient tools for analyzing operational data:

- revenue performance;
- order processing;
- customer activity;
- product analytics;
- regional sales;
- business trends.

SeverMarket Analytics provides a unified dashboard where managers and analysts can quickly access key metrics and manage operational workflows.

---

# Features

## Dashboard

Main analytics workspace with:

- revenue overview;
- order statistics;
- customer metrics;
- average order value;
- sales trends;
- category performance;
- regional analytics.

Implemented KPI cards:

- Revenue
- Orders
- Customers
- Average Order Value

---

## Analytics

Advanced analytics section:

- revenue dynamics;
- order trends;
- conversion metrics;
- return statistics;
- category analysis;
- regional performance.

Charts are built using Recharts.

---

## Orders Management

Order management interface includes:

- orders table;
- search;
- filtering;
- sorting;
- pagination;
- URL query parameters;
- order details;
- status management.

Supported order statuses:

- New
- Processing
- Shipped
- Delivered
- Cancelled
- Returned

---

## Product Management

Product analytics and management:

- product catalog;
- categories;
- pricing;
- inventory tracking;
- sales statistics;
- revenue analysis;
- product editing.

Forms are implemented with:

- React Hook Form;
- Zod validation.

---

## Customer Management

Customer analytics:

- customer profiles;
- contact information;
- order history;
- total spending;
- average order value;
- customer activity.

---

# Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- App Router
- Material UI
- Recharts

## State Management

- Redux Toolkit
- RTK Query
- Zustand

## Forms & Validation

- React Hook Form
- Zod

## Testing

- Vitest
- React Testing Library

## Code Quality

- ESLint
- Prettier

---

# Architecture

The project follows Feature-Sliced Design principles.

```
src/
├── app/
├── widgets/
├── features/
├── entities/
└── shared/
```

Architecture separates:

- UI layer;
- business logic;
- API communication;
- domain entities;
- reusable utilities.

---

# State Management

## RTK Query

Used for server state:

- API requests;
- caching;
- mutations;
- cache invalidation;
- loading states;
- error handling.

## Redux Toolkit

Used for global application state.

## Zustand

Used for lightweight client-side UI state.

---

# API

The application uses internal REST API routes powered by Next.js Route Handlers.

```http
GET    /api/dashboard
GET    /api/analytics

GET    /api/orders
GET    /api/orders/[id]
PATCH  /api/orders/[id]

GET    /api/products
GET    /api/products/[id]
PATCH  /api/products/[id]

GET    /api/customers
GET    /api/customers/[id]

GET    /api/regions
```

The project uses deterministic mock data for development and testing.

---

# UI & UX

Implemented:

- responsive dashboard layout;
- sidebar navigation;
- light and dark themes;
- KPI cards;
- charts;
- tables;
- dialogs;
- drawers;
- tooltips;
- notifications;
- loading states;
- error states;
- empty states.

Supported platforms:

- desktop;
- tablet;
- mobile devices.

---

# Performance

Implemented:

- Next.js Server Components;
- Client Components only where required;
- route-based rendering;
- optimized data fetching;
- pagination;
- reusable UI components;
- controlled rendering.

---

# Testing

Implemented tests for:

- utility functions;
- formatting logic;
- application helpers;
- UI behavior.

Run:

```bash
npm run test
```

---

# Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
npm run test
```

---

# Environment Variables

Create `.env.local` using `.env.example` configuration.

---

# Responsive Design

Desktop:

- full sidebar navigation;
- analytics dashboard;
- advanced tables.

Tablet:

- adaptive layout;
- collapsed navigation.

Mobile:

- drawer navigation;
- optimized content layout;
- touch-friendly interface.

---

# Future Improvements

Potential improvements:

- authentication system;
- role-based access control;
- real backend integration;
- database layer;
- advanced reporting;
- data export;
- notification system.

---

# Screenshots

_Add application screenshots here._

---

# Live Demo

_Add deployment link here._

---

# Engineering Focus

Built with modern frontend architecture practices focused on scalability, maintainability, and production-ready development workflows.
