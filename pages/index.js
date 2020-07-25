import '../styles/global-styles.scss';
import Head from 'next/head';
import HomePage from '../components/pages/index';

const Index = () => {
  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/icons/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
        <title>Members | Real Dev Squad</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <HomePage />
      <footer>
        <p className="info-repo">The contents of this website are deployed from this <a href="https://github.com/Real-Dev-Squad/website-members" target="_blank" rel="noopener noreferrer">open sourced repo</a></p>
      </footer>
    </div>
  );
};

export default Index;
