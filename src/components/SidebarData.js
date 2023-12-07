import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    icon: <img src="LogoWakeWheel.svg" alt="Logo" />,
    cName: 'wakewheel-logo'
  },
  {
    title: 'Dashboard',
    path: '/',
    // Replace the icon with an image reference
    icon: <img src="dashboard.svg" alt="Dashboard" />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Sign In',
  //   path: '/',
  //   icon: <BiIcons.BiUserCircle />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Drivers',
    path: '/',
    icon: <img src="car.svg" alt="Drivers" />,
    cName: 'nav-text'
  },
  {
    title: 'Live Alerts',
    path: '/reports',
    icon: <img src="bell.svg" alt="Live Alerts" />,
    cName: 'nav-text'
  },
  {
    title: 'Analytics',
    path: '/',
    icon: <img src="line.svg" alt="Analytics" />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <img src="settings.svg" alt="Settings" />,
    cName: 'nav-text-bottom'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <img src="help.svg" alt="Support" />,
    cName: 'nav-text-bottom'
  }
];
