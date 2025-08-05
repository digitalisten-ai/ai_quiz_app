# AI Quiz App

Detta projekt är en fullstack-quizapplikation byggd i **React** (frontend) och **Node.js + Express** (backend). Den är skapad för att användare ska kunna logga in, spela quiz, och se sina resultat. Frontend hostas via **GitHub Pages** och backend kommer deployas till **Render**.

---

## 📁 Projektstruktur

```
aiquizapp_final/
│
├── frontend/              # React-app (Vite)
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/               # Express.js backend med MongoDB
    ├── controllers/
    ├── routes/
    ├── models/
    ├── server.js
    └── package.json
```

---

## 🧠 Funktionalitet

### ✅ Frontend
- Inloggning / registrering
- Token-baserad autentisering
- Starta quiz (olika typer: flervals, essä, sortering)
- Resultatsida
- Vacker UI med Tailwind + Lucide

### ✅ Backend
- Autentisering med JWT
- MongoDB för lagring av användare & resultat
- REST API med Express.js
- Skyddade routes via middleware

---

## 🚀 Deployment

### 🔸 Frontend – GitHub Pages

Bygg och deploy:
```bash
cd frontend
npm run build
npm run deploy
```

Se till att `vite.config.js` har rätt `base`:
```js
base: '/ai_quiz_app/',
```

### 🔸 Backend – Render

1. Skapa ett nytt Web Service-projekt på [Render](https://render.com)
2. Koppla till ditt repo (eller manuellt ladda upp)
3. Inställningar:
   - **Start command:** `node server.js`
   - **Environment:** Node
   - **Build command:** `npm install`
   - **Port:** 10000 eller `process.env.PORT`
4. Lägg till miljövariabler:
   - `MONGO_URI`
   - `JWT_SECRET`

---

## 🧪 Kommandon

### Frontend:
```bash
cd frontend
npm install
npm run dev      # Startar lokalt (Vite)
```

### Backend:
```bash
cd backend
npm install
node server.js   # Startar servern
```

---

## 📦 Viktigt vid push/deploy

- ✅ Se till att både `frontend` och `backend` har egna `package.json`
- ✅ Push sker från projektets rotmapp (`aiquizapp_final`)
- ✅ Glöm inte `.env`-filen lokalt (lägg inte till i Git!)

---

## 👨‍💻 Skapad av

Digitalisten AI  
[https://digitalisten-ai.github.io/ai_quiz_app/](https://digitalisten-ai.github.io/ai_quiz_app/)
