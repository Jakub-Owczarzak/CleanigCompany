import React from 'react';
import { Link } from 'react-router-dom';

import styles from './landing.module.scss';
import LinkItemButton from '../LinkItemButton/LinkItemButton';

const Landing = () => {
  return (
    <div>
      <div className={styles.mainWrapper}>
        <div className={styles.contentWrapper}>
          <div className={styles.signWrapper}>
            <h1>Witaj w APARTMENS CLEAN COMPANY</h1>
            <ul>
              <li>
                <p>
                  {' '}
                  Załóż konto i skłdaj zlecenie na sprzątanie nieruchomości{' '}
                </p>
              </li>
              <li>
                <p>Działamy na terenie całego kraju</p>
              </li>
              <li>
                <p>Masz podgląd do stanu realizacji zamówienia</p>
              </li>
              <li>
                <p>Atrakcyjne ceny!</p>
              </li>
              <li>
                <p>Dzięki nam zaoszczędzisz czas i pieniadze</p>
              </li>
            </ul>
            <div className={styles.buttonWrapper}>
              <Link to="/login">
                <LinkItemButton text={'zaloguj się'} />
              </Link>
            </div>
          </div>
          <div className={styles.pictureWrapper}></div>
        </div>
        <footer className={styles.contactWrapper}>
          <p>Copyright &#169; 2021 Clean Company sp.zoo All Rights Reserved </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
