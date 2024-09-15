import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h2 className="title">
            We offer a wide range of property listings to help you find your
            dream home or investment property.
          </h2>
          <p>
            Welcome to CunoEstate. At CunoEstate, we are committed to making the
            home buying and selling process as smooth and transparent as
            possible. Our mission is to connect buyers and sellers in the real
            estate market, providing an unparalleled experience through our
            innovative platform.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>20+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>50+</h1>
              <h2>Awards Gained</h2>
            </div>
            <div className="box">
              <h1>100+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
