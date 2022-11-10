import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class SpecialDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="text-neutral h-auto dark:bg-base-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default SpecialDocument;
