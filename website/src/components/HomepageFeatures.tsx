import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  iconClass?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Simple API',
    description: (
      <>
        Create endpoints for your messages, with the use of classes and
        decorators, and reuse them between the processes.
      </>
    ),
    iconClass: styles.simpleApiSvg,
  },
  {
    title: 'Cross process',
    description: (
      <>
        {' '}
        Easily broadcast your messages between all Electron's processes, such as
        renderer, main, or node child process.
      </>
    ),
    iconClass: styles.crossProcessSvg,
  },
  {
    title: 'Extendable',
    description: (
      <>Modify incoming and outgoing messages with middleware classes.</>
    ),
    iconClass: styles.extendableSvg,
  },
];

function Feature({ title, iconClass, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.svgWrapper}>
        <div className={clsx(styles.featureSvg, iconClass)} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
