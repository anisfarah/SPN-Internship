import Image from 'next/image';
import React from 'react';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  /**
   * Render the component based on the error state.
   *
   * @return {React.ReactElement} The rendered component.
   */
  render(): React.ReactElement {
    const { hasError } = this.state;
    const { children } = this.props;

    // Check if the error is thrown
    if (hasError) {
      // Render custom fallback UI
      return (
        <div className="size-full p-10">
          <div className="relative mx-auto flex size-48 flex-col items-center justify-center lg:size-96">
            <Image alt="warning" className="relative" fill src="/images/error.svg" />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="font-text text-xl">Something went wrong please try again later</h2>
          </div>
        </div>
      );
    }

    // Return children components in case of no error
    return children as React.ReactElement;
  }
}

export default ErrorBoundary;
