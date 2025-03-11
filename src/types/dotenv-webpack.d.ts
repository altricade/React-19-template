declare module "dotenv-webpack" {
  import { Compiler } from "webpack";

  interface DotenvWebpackOptions {
    path?: string;
    safe?: boolean | string;
    systemvars?: boolean;
    silent?: boolean;
    defaults?: boolean | string;
    prefix?: string;
    ignoreStub?: boolean;
  }

  class DotenvWebpack {
    constructor(options?: DotenvWebpackOptions);
    apply(compiler: Compiler): void;
  }

  export = DotenvWebpack;
}
