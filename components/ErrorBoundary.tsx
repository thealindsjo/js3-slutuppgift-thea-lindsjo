"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="p-6 border rounded-lg bg-red-50 border-red-200"
          role="alert"
        >
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Något gick fel
          </h2>
          <p className="text-red-700 mb-4">
            {this.state.error?.message || "Ett oväntat fel inträffade"}
          </p>
          <Button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="bg-red-600 hover:bg-red-700"
          >
            Försök igen
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
