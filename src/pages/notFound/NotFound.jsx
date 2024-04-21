import { Link, useNavigate } from "react-router-dom";
import { ButtonPrimary, Navbar } from "../../components";
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
              <ButtonPrimary lg>Back to home page</ButtonPrimary>
            </Link>
          </div>
          <div className="wd-not-found--redirect-buttons--right-button">
            <Link to="/search-options">
              <ButtonPrimary lg>Back to search page</ButtonPrimary>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
