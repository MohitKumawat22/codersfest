# 🛍️ Apna Store - AI-Powered E-Commerce Platform

An innovative e-commerce platform featuring **Aura**, an AI fashion assistant powered by a hybrid architecture combining fast local rules with Ollama's LLM capabilities.

## ✨ Features

### 🤖 AI-Powered Shopping Assistant (Aura)
- **Hybrid AI Architecture**: 
  - FastBrain: Instant intent recognition for common queries
  - Smart Brain: Ollama-powered LLM for complex fashion advice
- Real-time chat interface with contextual product recommendations
- Natural language product filtering and navigation

### 🛒 Core E-Commerce Features
- Product catalog with multiple categories (Fashion, Beauty, Electronics, Home & Living)
- Shopping cart with local storage persistence
- Product detail pages with reviews and ratings
- Virtual try-on with Aura-Fit™ technology
- Responsive design for all devices

### 🎨 Virtual Try-On (Aura-Fit™)
- Body morphing based on height and weight
- Live camera integration for virtual fitting
- Smart clothing overlays
- Multiple visualization modes (Mannequin/Camera/Photo)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Ollama** (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd codersfest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your configuration:
   ```env
   OLLAMA_API_URL=http://localhost:11434/api/generate
   NEXT_PUBLIC_APP_NAME="Apna Store"
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```

4. **Set up Ollama**

   **Install Ollama:**
   - Download from [ollama.ai](https://ollama.ai)
   - Follow installation instructions for your OS

   **Pull the required model:**
   ```bash
   ollama pull llama3
   ```

   **Start Ollama server:**
   
   For Windows, use the provided batch file:
   ```bash
   ./start-aura-brain.bat
   ```

   Or manually:
   ```bash
   ollama serve
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
codersfest/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   └── aura/         # AI chat endpoint
│   │   ├── beauty/           # Beauty category page
│   │   ├── cart/             # Shopping cart page
│   │   ├── product/[id]/     # Dynamic product pages
│   │   └── layout.jsx        # Root layout
│   ├── components/            # React components
│   │   ├── ChatInterface.tsx # AI chat widget
│   │   ├── VirtualMannequin.tsx # Virtual try-on
│   │   ├── Navbar.js         # Navigation bar
│   │   └── Footer.js         # Footer component
│   ├── context/              # React Context providers
│   │   └── CartContext.js   # Shopping cart state
│   └── lib/                  # Utilities and data
│       ├── catalog.ts        # Virtual try-on products
│       ├── data.js           # Main product catalog
│       ├── fastBrain.ts      # Quick intent processing
│       └── thermoFit.ts      # Fit calculation logic
├── public/                   # Static assets
└── .env.local               # Environment variables (create this)
```

## 🧠 AI Architecture

### Hybrid Brain System

```
User Query
    ↓
FastBrain (Instant)
    ↓
    ├─ Match found? → Instant response
    └─ No match → Smart Brain (Ollama)
                      ↓
                  LLM Response
```

**FastBrain Rules:**
- Color-based filtering (red, blue, etc.)
- Category navigation (shoes, jackets, etc.)
- Common intents (refund policy, etc.)

**Smart Brain (Ollama):**
- Complex fashion advice
- Personalized recommendations
- Context-aware conversations

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server (port 3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Ollama Configuration

If using ngrok for remote Ollama access:
1. Start ngrok: `ngrok http 11434`
2. Update `.env.local` with ngrok URL
3. Restart dev server

### Image Optimization

External images are configured in `next.config.mjs`:
```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'placehold.co' }
  ]
}
```

## 🎯 Key Technologies

- **Framework**: Next.js 16.1.4 (App Router)
- **Language**: TypeScript + JavaScript
- **Styling**: Tailwind CSS 4
- **AI**: Ollama (llama3 model)
- **State Management**: React Context API
- **Icons**: Lucide React
- **Compiler**: React Compiler (experimental)

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OLLAMA_API_URL` | Ollama API endpoint | `http://localhost:11434/api/generate` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Apna Store` |
| `NEXT_PUBLIC_API_BASE_URL` | Base API URL | `http://localhost:3000` |

## 🐛 Troubleshooting

### AI Chat Not Working

1. **Check Ollama is running:**
   ```bash
   curl http://localhost:11434/api/generate
   ```

2. **Verify model is installed:**
   ```bash
   ollama list
   ```

3. **Check browser console** for error messages

### Build Errors

1. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run build
   ```

2. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules
   npm install
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy! Vercel will handle the build automatically

**Note**: You'll need to deploy Ollama separately (e.g., on a cloud VM) and update the `OLLAMA_API_URL` environment variable.

### Alternative Platforms

- **Netlify**: Works with static export or server functions
- **Railway**: Good for full-stack deployment with Ollama
- **Docker**: Use provided Dockerfile (if available)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Ollama** for local LLM capabilities
- **Next.js** team for the amazing framework
- **Lucide** for beautiful icons
- **Tailwind CSS** for utility-first styling

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section

---

**Built with ❤️ for the hackathon**
