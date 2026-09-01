# SeverMarket Analytics

Демонстрационная SaaS analytics/admin platform для вымышленной российской e-commerce компании SeverMarket. Проект создан как portfolio/freelance-style pet-project и не представляет реального клиента.

## Features

- Обзор с KPI, динамикой выручки, статусами заказов и регионами.
- Аналитика по месяцам и категориям, таблицы заказов, товаров и клиентов.
- Детальные страницы с типизированными Route Handlers, редактирование статуса заказа и товара.
- Поиск, pagination, loading/error/empty states, responsive layout, light/dark mode.

## Tech Stack

Next.js App Router, React, TypeScript strict, MUI, Redux Toolkit, RTK Query, Zustand, React Hook Form, Zod, Recharts, Vitest.

## Architecture

Feature-Sliced-inspired structure: `app` отвечает за маршруты, `widgets` — за композицию UI, `features` — за интерактивные сценарии, `entities` — за модели/API, `shared` — за типы, mock data и утилиты. Server Components используются для route entry points, интерактивные таблицы/графики — Client Components.

## State Management

RTK Query хранит server state, кэширует запросы и инвалидирует данные после mutations. Redux Toolkit используется как store-провайдер для RTK Query. Zustand хранит только UI state темы, чтобы не смешивать его с API state.

## Data Layer

Mock REST API находится в `src/app/api`. Детерминированные synthetic данные (184 заказа, 64 товара, 138 клиентов, регионы и месяцы аналитики) — `src/shared/mock/data.ts`.

## Getting Started

```bash
npm install
npm run dev
```

Откройте http://localhost:3000.

## Available Scripts

`npm run lint`, `npm run build`, `npm run test`, `npm run format`.

## Performance & Responsive Design

Pagination ограничивает объём таблиц, графики рендерят только нужные series, а адаптивная сетка переключается для tablet/mobile без горизонтального overflow. Следующий шаг — dynamic import тяжёлых chart widgets и серверная пагинация в настоящем API.

## Screenshots

Добавьте скриншоты dashboard и mobile layout после запуска.

## Future Improvements

Авторизация и RBAC, PostgreSQL backend, экспорт CSV/PDF, интерактивная карта России, e2e-тесты и полноценный audit log.
