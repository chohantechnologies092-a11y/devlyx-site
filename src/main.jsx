import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize Diagnostics
console.log("%c[DEVLYX] System Initializing...", "color: #6a35ff; font-weight: bold; font-size: 1.2em;");

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { 
    return { hasError: true, error }; 
  }
  componentDidCatch(error, info) {
    console.error("[DEVLYX ERROR]", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#020204] text-white p-6 text-center font-sans">
          <div className="max-w-md">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
              <span className="text-red-500 text-2xl font-black">!</span>
            </div>
            <h1 className="text-3xl font-black mb-4 tracking-tighter">System Interruption.</h1>
            <p className="text-gray-400 mb-8 font-light text-sm">The application encountered a critical runtime exception. The engine is attempting to recover.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-8 py-4 bg-[#6a35ff] hover:bg-[#8b5cf6] rounded-full font-bold transition-all shadow-[0_15px_30px_rgba(106,53,255,0.3)] text-[11px] uppercase tracking-widest"
            >
              Restart Engine
            </button>
            {this.state.error && (
              <div className="mt-8 p-4 bg-white/5 rounded-xl text-[10px] font-mono text-left opacity-30 whitespace-pre-wrap">
                {this.state.error.toString()}
              </div>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("[DEVLYX FATAL] Root element not found. Initialization aborted.");
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}
