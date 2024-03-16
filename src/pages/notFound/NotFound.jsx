import { Link, useNavigate } from "react-router-dom";
import { CustomButton, Navbar } from "../../components";
import "./notFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="wd-not-found--wrapper">
        <p className="wd-not-found--header">Page not found</p>
        <p className="wd-not-found--message">
          It seems that this page doesn't exist or isn't available at the
          moment.
        </p>
        <div className="wd-not-found--redirect-buttons">
          <div className="wd-not-found--redirect-buttons--left-button">
            <Link to="/">
              <CustomButton text="Back to home page" />
            </Link>
          </div>
          <div className="wd-not-found--redirect-buttons--right-button">
            <Link to="/search-options">
              <CustomButton text="Back to search page" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
