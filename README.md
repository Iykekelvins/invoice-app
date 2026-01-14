# Invoice App

A full-stack invoice management application built with Next.js, featuring Google authentication, real-time database syncing, and PDF generation capabilities.

## Features

- Invoice Management: Create, edit, view, and filter invoices
- Authentication: Secure Google authentication via Clerk
- Dark/Light Mode: Full theme support with persistent preferences
- PDF Export: Download invoices as PDF documents
- Email Invoices: Send invoice copies directly to clients
- User-Specific Data: Invoices are private and can only be managed by their creator

## Tech Stack

- Framework: Next.js
- Authentication: Clerk (Google OAuth)
- Database: Convex
- Styling: CSS Variables for theming and TailwindCSS
- Theme Management: next-themes

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Clerk account for authentication
- Convex account for database

### Installation

1. Clone the repository

git clone <https://github.com/Iykekelvins/invoice-app>
cd invoice-app

2. Install dependencies

npm install

3. Set up environment variables

Create a .env.local file with:
CONVEX_DEPLOYMENT
NEXT_PUBLIC_CONVEX_UR
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_JWT_ISSUER_DOMAIN
BREVO_API_KEY for sending emails

4. Run the development server

npm run dev

5. Open http://localhost:3000 in your browser

## How I Built This

### 1. Initial Setup

Started with a fresh Next.js application:

- Created new Next.js app
- Set up CSS color variables for both light and dark modes
- Installed and configured next-themes package
- Implemented a theme provider component to manage theme state globally

### 2. Core Pages & Components

Homepage

- Invoice listing with filtering capabilities
- Overview of all user invoices
- Quick actions for invoice management

Side Modal

- Reusable form component for creating new invoices
- Edit functionality for existing invoices
- Smooth slide-in animation

Invoice Detail Page

- Single invoice view with complete details
- Actions for editing, downloading, and sending

### 3. Authentication & Database

Clerk Integration

- Set up Google OAuth authentication
- User session management
- Protected routes

Convex Database
Created two main schemas:

Users Schema

- Stores user profile information
- Links to authentication data

Invoices Schema

- Complete invoice data (items, totals, client info, etc.)
- User ID reference for ownership

Security: Implemented user-based authorization ensuring users can only view and modify their own invoices.

### 4. Additional Features

- PDF Generation: Export invoices as formatted PDF documents
- Email Integration: Send invoice copies directly to clients via email

## Development

### Theme System

The app uses CSS variables for consistent theming across light and dark modes.

### Authorization

All invoice operations are protected with user-specific authorization checks in Convex functions to ensure data privacy and security.
