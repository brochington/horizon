import React, { FC } from 'react';
import { MantineProvider, AppShell, Navbar as MNavbar, Header as MHeader } from '@mantine/core';
import {
  BrowserRouter as Router,
  Route,
  useParams,
  Link
} from "react-router-dom";

// import SideNav from './SideNav';
import Routes from './Routes';
import ColorSchemeToggle from './ColorSchemeToggle';

type NavbarProps = {};

const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  const {} = props;

  return (
    <MNavbar width={{ base: 300 }} height="100vh" p="sm">
      <Link to="/height">Height</Link>
      <Link to="/color">Color</Link>
      <Link to="/shadows">Shadows</Link>
      <Link to="/surfaces">Surfaces</Link>
    </MNavbar>
  );
};

type HeaderProps = {};

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {} = props;

  return (
    <MHeader height={60} p="sm">
      <ColorSchemeToggle />
    </MHeader>
  );
};

const App: FC = () => {
  return (
    <MantineProvider theme={{ colorScheme: 'light' }}>
      <Router>
        <AppShell navbar={<Navbar />} header={<Header />}>
          <Routes />
        </AppShell>
      </Router>
    </MantineProvider>
  );
};

export default App;
