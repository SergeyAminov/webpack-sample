import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer({port}: BuildOptions): DevServerConfiguration {
    return {
        port,
        open: true,
        // Только для dev режима, если раздавать статику через nginx, то надо делать проксирование на index.html
        historyApiFallback: true,
        hot: true
    }
}
