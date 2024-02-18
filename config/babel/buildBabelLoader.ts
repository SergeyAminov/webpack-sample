import { BuildOptions } from "../build/types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader({ mode }: BuildOptions) {

    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins = []

    if(isProd) {
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ['data-testid']
            }
        ])
    }

    /*
        options можно вынести в отдельный файл babel.config.json:
        {
            "presets": [
                "@babel/preset-env",
                "@babel/preset-typescript",
                [
                    "@babel/preset-react",
                    {
                        "runtime": "automatic"
                    }
                ]
            ]
        }
    */

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                    [
                        "@babel/preset-react",
                        {
                            "runtime": isDev ? "automatic" : "classic"
                        }
                    ]
                ],
                plugins: plugins.length ? plugins : undefined
            }
        }
    }
}