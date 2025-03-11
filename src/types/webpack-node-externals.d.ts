declare module 'webpack-node-externals' {
  interface NodeExternalsOptions {
    allowlist?: (string | RegExp)[] | ((moduleName: string) => boolean);
    importType?: 'commonjs' | 'commonjs2' | ((moduleName: string) => string);
    modulesDir?: string;
    modulesFromFile?: boolean | { include?: string[]; exclude?: string[] };
    includeAbsolutePaths?: boolean;
  }
  
  function nodeExternals(options?: NodeExternalsOptions): any;
  
  export = nodeExternals;
}
