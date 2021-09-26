import { Container, Tab } from "./TabElements";
import { MdToday,MdMoveToInbox, MdWatchLater } from "react-icons/md";

const Tabs = ({ activeTab, setTab }) => {
  return (
    <div>
      <Container>
        <Tab
          to="/inbox"
          onClick={setTab}
          active={activeTab === 1 ? 1 : 0}
        >
        <MdMoveToInbox /> Inbox
        </Tab>
        <Tab
          to="/today"
          onClick={setTab}
          active={activeTab === 2 ? 1 : 0}
        >
        <MdToday /> Today
        </Tab>
        <Tab
          to="/upcoming"
          onClick={setTab}
          active={activeTab === 3 ? 1 : 0}
        >
        <MdWatchLater />  Upcoming
        </Tab>
      </Container>
    </div>
  );
};

export default Tabs;
