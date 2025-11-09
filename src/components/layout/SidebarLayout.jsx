import { Box } from '@chakra-ui/react';
import Announcement from '../../components/common/Misc/Announcement';
import Header from '../../components/navs/Header';
import Sidebar from '../../components/navs/Sidebar';
import SponsorsCard from '../common/SponsorsCard';

export default function SidebarLayout({ children }) {
  return (
    <main className="app-container">
      <Announcement />
      <Header />
      <section className="category-wrapper">
        <Sidebar />

        {children}

        <aside className="right-panel">
          <Box className="right-panel-inner">
            <SponsorsCard />
          </Box>
        </aside>
      </section>
    </main>
  );
}
