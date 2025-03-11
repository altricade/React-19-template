// Type declarations for Webpack HMR
interface WebpackHotModule {
  hot?: {
    accept(
      dependencies: string | string[],
      callback?: (updatedDependencies: any[]) => void,
    ): void;
    decline(dependencies: string | string[]): void;
    dispose(callback: (data: any) => void): void;
    addDisposeHandler(callback: (data: any) => void): void;
    removeDisposeHandler(callback: (data: any) => void): void;
    status(): string;
    addStatusHandler(callback: (status: string) => void): void;
    removeStatusHandler(callback: (status: string) => void): void;
  };
}

// Extend the NodeJS Module interface
declare global {
  interface NodeModule extends WebpackHotModule {}
}

export {};
