# 🏆 Sports Quiz Monorepo

An interactive collection of sports and geography quiz web applications built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**.

Test your knowledge of team logos, stadiums, geographical locations on interactive maps, divisions, and team trivia across major leagues around the world!

---

## 🎮 Included Quizzes

| Quiz | League | Sport | Map / Region |
| :--- | :--- | :--- | :--- |
| **AllsvenskanQuiz** | Allsvenskan | Football (Soccer) | 🇸🇪 Sweden |
| **MLBQuiz** | Major League Baseball (MLB) | Baseball | 🇺🇸 United States |
| **MLSQuiz** | Major League Soccer (MLS) | Football (Soccer) | 🇺🇸 United States |
| **NBAQuiz** | National Basketball Association (NBA) | Basketball | 🇺🇸 United States |
| **NFLQuiz** | National Football League (NFL) | American Football | 🇺🇸 United States |
| **NHLQuiz** | National Hockey League (NHL) | Ice Hockey | 🇺🇸 🇨🇦 North America |
| **PremierLeagueQuiz** | Premier League (EPL) | Football (Soccer) | 🇬🇧 United Kingdom |
| **SHLQuiz** | Svenska hockeyligan (SHL) | Ice Hockey | 🇸🇪 Sweden |

---

## ⚡ Getting Started

This repository uses **npm workspaces** to manage all quiz projects in one place.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- `npm` (v7 or newer for workspaces support)

### Installation
Install dependencies for all quizzes from the root:
```bash
npm install
```

### Running a Quiz
To start the local development server for any quiz:
```bash
# Example: Premier League Quiz
npm run dev --workspace=PremierLeagueQuiz

# Example: NHL Quiz
npm run dev --workspace=NHLQuiz

# Or navigate directly into the folder:
cd PremierLeagueQuiz
npm run dev
```

### Running Tests
Run Vitest across all projects simultaneously:
```bash
npm test
```
Or test an individual quiz:
```bash
npm test --workspace=PremierLeagueQuiz
```

### Building for Production
Build all quizzes:
```bash
npm run build
```
Or build a single quiz:
```bash
npm run build --workspace=MLBQuiz
```

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/)
