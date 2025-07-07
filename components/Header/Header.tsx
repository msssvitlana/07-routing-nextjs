import css from './Header.module.css';
import Link from 'next/link';
import TagsMenu from '../TagsMenu/TagsMenu';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href='/' aria-label='Home'>
        NoteHub
      </Link>
      <nav aria-label='Main Navigation'>
        <ul className={css.navigation}>
          <li><TagsMenu /></li> 
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
