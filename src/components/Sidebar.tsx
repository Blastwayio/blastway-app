'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '/public/images/Logo.svg';
import MLogo from '/public/images/mini-logo.svg';
import ConnectButton from './ConnectButton';
import FaucetButton from './FaucetButton';
import { usePathname } from 'next/navigation';
import FaucetGasButton from './FaucetGasButton';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItem = (href: string, label: string, isDisabled?: boolean) => {
    const isPathActive = (path: string) => {
      return pathname === path || pathname.startsWith(`${path}/`);
    };

    const isRootPath = href === '/';
    let isActive = isRootPath ? isPathActive(href) : isPathActive(href);

    return (
      <li className="w-60 pr-4">
        <Link
          href={isDisabled ? '#' : href}
          passHref
          className={`flex items-center gap-2 rounded-r-xl p-3 ${
            isActive
              ? 'w-full bg-[#131313] p-3 text-white shadow-xl'
              : 'text-gray-400 transition-colors duration-300 hover:text-white'
          } group`}
        >
          {label === 'Markets' && (
            <svg
              className={isActive ? 'text-[#FFF200]' : isDisabled ? 'text-gray-600' : 'text-gray-400'}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M9 21H7C4.79086 21 3 19.2091 3 17V10.7076C3 9.30884 3.73061 8.01172 4.92679 7.28676L9.92679 4.25646C11.2011 3.48418 12.7989 3.48418 14.0732 4.25646L19.0732 7.28676C20.2694 8.01172 21 9.30884 21 10.7076V17C21 19.2091 19.2091 21 17 21H15M9 21V17C9 15.3431 10.3431 14 12 14C13.6569 14 15 15.3431 15 17V21M9 21H15"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {label === 'Lending' && (
            <svg
              className={isActive ? 'text-[#FFF200]' : 'text-gray-400'}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z"
                strokeWidth="1.5"
              />
              <path
                d="M15 8.5C14.315 7.81501 13.1087 7.33855 12 7.30872M12 7.30872C10.6809 7.27322 9.5 7.86998 9.5 9.50001C9.5 12.5 15 11 15 14C15 15.711 13.5362 16.4462 12 16.391M12 7.30872V5.5M9 15C9.64448 15.8593 10.8428 16.3494 12 16.391M12 16.391V18.5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {label === 'Swap' && (
            <svg
              className={isActive ? 'text-[#FFF200]' : 'text-gray-400'}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M17 20V4M17 4L20 7M17 4L14 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 4V20M7 20L10 17M7 20L4 17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {label === 'Quests' && (
            <svg
              className={isActive ? 'text-[#FFF200]' : 'text-gray-400'}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M10 15C8.34315 15 7 13.6569 7 12C7 10.3431 8.34315 9 10 9C11.6569 9 13 10.3431 13 12C13 13.6569 11.6569 15 10 15Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 14V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 9.5L13.5 8.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 9.5L6.5 8.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 15.5L7.5 14.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5 15.5L12.5 14.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M2 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 6H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 16H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 18H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {label === 'Dashboard' && (
            <svg
              className={`${isActive ? 'text-[#FFF200]' : 'text-gray-400'} lucide lucide-square-user-round`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 21a6 6 0 0 0-12 0" />
              <circle cx="12" cy="11" r="4" />
              <rect width="18" height="18" x="3" y="3" rx="2" />
            </svg>
          )}

          <span className="text-md">{label}</span>
        </Link>
      </li>
    );
  };

  return (
    <>
      <div className="mt-2 flex flex-col p-2 sm:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleMenu}
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="items-center rounded-lg text-sm text-white sm:hidden "
          >
            <span className="sr-only">Open sidebar</span>
            <Image src={MLogo} alt="logo" width={24} />
          </button>
          <div className="flex items-center space-x-4 pt-2 sm:hidden">
            <ConnectButton />
          </div>
        </div>
        <div className="mx-auto flex items-center gap-2 px-2 sm:hidden">
          <FaucetGasButton />
          <FaucetButton />
        </div>
      </div>

      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-50 min-h-screen transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex min-h-screen flex-col justify-between overflow-y-auto border-r border-[#232323] bg-[#0e0e0e]">
          <div>
            <Link href="/" className="flex w-full">
              <Image className="ml-4 py-8" src={logo} alt="logo" width={225} />
            </Link>
            <ul className="space-y-4 py-8 text-center text-sm text-white">
              {menuItem('/', 'Markets')}
              {menuItem('/lending', 'Lending')}
              {menuItem('/swap', 'Swap')}
              {menuItem('/quests', 'Quests')}
              {/* @todo: add profile page later, use if needed as a reference */}
              {menuItem('/dashboard', 'Dashboard')}
            </ul>
          </div>
          <div className="hidden flex-col sm:flex">
            <ConnectButton />
            <FaucetGasButton />
            <FaucetButton />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
