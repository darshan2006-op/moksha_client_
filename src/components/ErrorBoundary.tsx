import { Component, ErrorInfo, ReactNode } from 'react';
import BaseButtonLink from '~base/BaseButtonLink';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="grid min-h-full place-items-center py-24 px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-amber-600">Error</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl">
              Something went wrong
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-400">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <BaseButtonLink to="/">Go back home</BaseButtonLink>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
