import Document from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
    static async getInitialProps (ctx) {
        const sheet = new ServerStyleSheet() //Permite crear una hoja de estilo en el lado del servidor
        const originalRenderPage = ctx.renderPage //Funcion con la cual se van a renderizar las paginas

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles ( <App {...props} />),
                })

                const initialProps = await Document.getInitialProps(ctx)

                return {
                    ...initialProps,
                    styles: (
                        <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                        </>
                    )
                }
            }
            finally {
                sheet.seal ()
            }

    }
}