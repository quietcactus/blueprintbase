// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';


export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge " />
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <meta name="format-detection" content="telephone=no" />
          <meta charset="UTF-8" />
          <meta name="Copyright" content="PaperStreet Web Design" />
          <script src="https://kit.fontawesome.com/c6a738eb67.js" crossorigin="anonymous"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
