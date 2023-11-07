/* eslint-disable */
import "../styles/globals.css";
import { useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../material/theme";
import createEmotionCache from "../material/createEmotionCache";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import data from "../../data/seed.json";

import { useRouter } from "next/router";

const clientSideEmotionCache = createEmotionCache();

// We need an alternate name for theme since it is used above
const Footer = styled("footer")(({ theme: styledTheme }) => ({
  borderTop: "1px solid #eaeaea",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: styledTheme.spacing(5),
  paddingTop: styledTheme.spacing(2),
}));

function MainApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const [collection, setCollection] = useState(data);
  //const [currentArticle, setCurrentArticle2] = useState();

  const router = useRouter();
  const { id } = router.query;

  const currentArticle = id
    ? collection.find((article) => article.id === Number(id))
    : undefined;

  function setCurrentArticle(article) {
    if (!article) {
      router.back();
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
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Simplepedia</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <main>
          <Container>
            <Typography variant="h2" align="center">
              Simplepedia
            </Typography>
            <Component {...props} />
          </Container>
        </main>

        <Footer>CS 312 Practical: CSS Frameworks</Footer>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MainApp;
