import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class SpecialDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-white dark:bg-neutral900 text-">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default SpecialDocument;
