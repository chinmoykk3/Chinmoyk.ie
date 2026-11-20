'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface Props {
  children: ReactNode;
  chapterId?: string;
  chapterTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ChapterErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[ChapterErrorBoundary (${this.props.chapterId || 'unknown'})]:`, error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <section
          id={this.props.chapterId}
          aria-label={`Error in ${this.props.chapterTitle || 'Chapter'}`}
          className="w-full py-20 border-t border-theme-border/60 bg-theme-surface/50"
        >
          <Container size="md" className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-rose/40 bg-theme-rose/10 text-theme-rose text-xs font-mono">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>VISUAL SCENE RECOVERY</span>
            </div>

            <h3 className="font-serif font-bold text-xl text-theme-text">
              {this.props.chapterTitle || 'Chapter Scene'} Paused
            </h3>

            <p className="text-xs sm:text-sm text-theme-muted max-w-md mx-auto leading-relaxed">
              This scene encountered an unexpected rendering condition. The remainder of the
              documentary remains fully intact and accessible below.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-theme-border bg-theme-surface hover:bg-theme-surface-elevated text-xs font-mono text-theme-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-gold"
              >
                <RotateCcw className="w-3.5 h-3.5 text-theme-gold" />
                <span>Re-initialize Scene</span>
              </button>
            </div>
          </Container>
        </section>
      );
    }

    return this.props.children;
  }
}
