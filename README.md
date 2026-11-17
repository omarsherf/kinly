# Sara Care Prototype

Interactive mobile prototype (React 18 + Tailwind CSS 3 + Vite) built from five Figma frames.
English, LTR only. All choices persist in `localStorage`.

## Run

    npm install
    npm run dev

## Deploy

Push to GitHub, import the repo in Vercel. Vercel detects Vite: build command `npm run build`, output `dist`.

## Flow

- Journal -> gear opens Settings, "Ask someone for help" opens Who can help.
- Who can help -> pick recipients, edit messages, Review, Send, then preview as Kareem or Tante Nadia.
- Kareem and Tante Nadia views -> answer, see the confirmation, change the answer.
- Top bar switches between all five screens. "Reset demo" clears saved state.

## Structure

    src/store.js      persisted state (journal is stored under its own key and never shared)
    src/copy.js       request messages and button labels
    src/ui.jsx        shared buttons, chips, header, icons
    src/screens/      one file per screen
    tailwind.config.js  colors taken from Figma
