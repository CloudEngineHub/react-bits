import { Box } from '@chakra-ui/react';
import Announcement from '../../components/common/Misc/Announcement';
import AnnouncementBar from '../landing/AnnouncementBar/AnnouncementBar';
import Header from '../../components/navs/Header';
import Sidebar from '../../components/navs/Sidebar';
import ProCard from '../common/ProCard';
import SponsorsCard from '../common/SponsorsCard';

export default function SidebarLayout({ children }) {
  return (
    <main className="app-container">
      <AnnouncementBar
        message="Get React Bits Pro - 85+ components, 100+ UI blocks, 5 full templates - click here!"
        link="https://pro.reactbits.dev"
        backgroundColor="linear-gradient(to right, #060010, #5227FF, #060010)"
        noBorder={true}
      />
      <Announcement />
      <Header />
      <section className="category-wrapper">
        <Sidebar />

        {children}

        <aside className="right-panel">
          <Box className="right-panel-inner">
            <ProCard />
            <SponsorsCard />
          </Box>
        </aside>
      </section>
    </main>
  );
}
