import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import LogoSvg from '@site/static/img/logo.svg';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner, styles.heroBannerBackground)}>
      <div className="container">
        <div className="row row--no--gutters">
          <div className={clsx('col col--3')}>
            <LogoSvg className={styles.image} />
          </div>
          <div className="col col--9">
            <div className={styles.heroWrapper}>
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link
                  className="button button--secondary button--lg shadow--lw"
                  to="/docs/intro"
                >
                  Get started
                </Link>
                <Link
                  className={clsx(
                    styles.githubButton,
                    'button button--outline button--primary button--lg shadow--lw',
                  )}
                  to="https://github.com/abbl/electron-broker"
                >
                  <div className={styles.githubLogo} />
                  Source code
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`ElectronBroker - ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main className={styles.main}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
