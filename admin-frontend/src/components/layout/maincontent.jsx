import RevenueChart from "./revenuechart";
import WorldMap from "./worldmap";
import SmallCard from "./card";
import DirectChat from "./directchat";
// import SortableWrapper from "./sortablewrapper";
// import CountryForm from "./form";
// import CountryList from "./countrylist";
// import CreatePost from "./createpost";
// import PostsHorizontalSection from "./postscarousel";
// import PostsManager from "./megepost";

const MainContent = () => {
  return (
    <main className="app-main">

      {/* Header */}
      <div className="app-content-header">
        <div className="container-fluid">
          <h3 className="mb-0">Dashboard</h3>
        </div>
      </div>

      {/* Content */}
      <div className="app-content">
        <div className="container-fluid">

          {/* Cards */}
          <div className="row">
            <SmallCard
              value="150"
              label="New Orders"
              color="primary"
              footerTheme="light"
              icon={
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.25 2.25a.75.75 0 000 1.5..." />
                </svg>
              }
            />

            <SmallCard
              value={
                <>
                  53<sup className="fs-5">%</sup>
                </>
              }
              label="Bounce Rate"
              color="success"
              footerTheme="light"
            />

            <SmallCard
              value="44"
              label="User Registrations"
              color="warning"
              footerTheme="dark"
            />

            <SmallCard
              value="65"
              label="Unique Visitors"
              color="danger"
              footerTheme="light"
            />
          </div>
          {/* (keep your small-box JSX as-is) */}

          <div className="row">
              <div className="col-lg-7">
                <div className="card mb-4">
                  <div className="card-header">
                    <h3 className="card-title">Sales Value</h3>
                  </div>
                  <div className="card-body">
                    <RevenueChart />
                  </div>
                </div>
                <DirectChat />
              </div>
              <div className="col-lg-5">
                <div className="card bg-primary text-white mb-4">
                  <div className="card-header">
                    <h3 className="card-title">Sales Value</h3>
                  </div>
                  <div className="card-body">
                    <WorldMap />
                  </div>
                </div>
              </div> 
              {/* <CountryForm />          */}
              {/* <CountryList /> */}
              {/* <CreatePost />
              <PostsHorizontalSection /> */}
              {/* <PostsManager /> */}
            </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
