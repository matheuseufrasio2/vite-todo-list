import styles from './Header.module.css';

import logoWithLetters from '../../assets/logo-with-letters.svg';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src={logoWithLetters} alt="Logo" />
    </header>
  );
}
