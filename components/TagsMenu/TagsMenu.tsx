'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']; 

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/All`}
              className={css.menuLink}
              onClick={toggle}
            >
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li className={css.menuItem} key={tag}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={toggle}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
