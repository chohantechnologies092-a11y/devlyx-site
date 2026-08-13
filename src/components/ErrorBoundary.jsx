import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center text-white selection:bg-[#6a35ff]">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Something went wrong.</h1>
          <p className="text-gray-400 font-medium max-w-lg mb-10 text-lg leading-relaxed">
            An unexpected error has occurred in the application. We apologize for the inconvenience. 
          </p>
          
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-3 px-8 py-4 bg-[#6a35ff] text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#5829d6] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-purple-500/20"
          >
            <RefreshCw size={16} /> Reload Application
          </button>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mt-12 p-6 bg-red-950/30 border border-red-900/50 rounded-2xl text-left max-w-4xl w-full overflow-auto">
              <h2 className="text-red-400 font-bold mb-2">Error Details (Development Only)</h2>
              <p className="text-red-300 font-mono text-sm mb-4">{this.state.error.toString()}</p>
              <pre className="text-gray-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
