// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, desciption, keywords, author }) => {
  return (
    <>
      <Helmet>
          <meta charset="UTF-8" />
          <meta name="description" content={desciption} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="min-h-[90vh]">
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Welcome to NexEcom",
  desciption: "We sell the best products for best prices",
  keywords: "electronics, buy electronics, best electronics",
  author: "NexEcom",
};

export default Layout;
