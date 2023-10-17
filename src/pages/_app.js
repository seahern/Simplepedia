/* eslint-disable */
import "../styles/globals.css";
import { useState } from "react";
import Head from "next/head";

import data from "../../data/seed.json";
import styles from "../styles/Simplepedia.module.css";

import { useRouter } from "next/router";

function MainApp({ Component, pageProps }) {
  const [collection, setCollection] = useState(data);
  //const [currentArticle, setCurrentArticle2] = useState();

  const router = useRouter();
  const { id } = router.query;

  const currentArticle = id
    ? collection.find((article) => article.id === Number(id))
    : undefined;

  function setCurrentArticle(article) {
    if (arguments.length === 0) {
      router.back();
    } else if (article === undefined) {
      router.push("/articles/");
    } else {
      const articleName = "/articles/" + article.id;
      router.push(articleName);
    }
  }

  const props = {
    ...pageProps,
    collection,
    setCollection,
    setCurrentArticle,
    currentArticle,
    id,
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Simplepedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">Simplepedia</h1>
        <Component {...props} />
      </main>

      <footer>CS 312 Assignment 3</footer>
    </div>
  );
}

export default MainApp;
