/* eslint-disable @next/next/no-document-import-in-page */
import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, {Html, Head, Main, NextScript} from 'next/document';
import theme from "./theme";
import Fonts from "./ui/fonts";

export default class Document extends NextDocument{
    render() {
        return(
            <Html lang="en">
                <Fonts/>
                <Head />
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
