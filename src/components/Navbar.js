import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {

  const [auth, setAuth] = useAuth();
  const [searchType, setSearchType] = useState("name");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-info-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li className="nav-item">
              <Link class="nav-link" to='/' id="navbar-home">Home</Link>

            </li>
            {
              auth.role == "ROLE_HUMAN RESOURCES" &&
              <li className="nav-item">
                <Link class="nav-link" to='/add' id="navbar-add">Add</Link>
              </li>
            }
            <li className="nav-item">
              <Link className="nav-link" to='/viewAll' id="navbar-viewAll">View All</Link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <div className="input-group">
              <input class="form-control mr-sm-2" type="search" style={{ width: "250px" }} id="searchText" placeholder="Search" aria-label="Search" onInput={(e) => setSearchText(e.target.value)} />
              <select class="form-control mr-sm-2 custom-select" style={{ width: "120px" }} onChange={(e) => setSearchType(e.target.value)}>
                <option defaultValue value="name" id="searchName">Name</option>
                <option value="department" id="searchDepartment">Department</option>
              </select>
            </div>
            <button type="button" id="searchButton" class="btn btn-outline-light my-2 my-sm-0" onClick={() => { window.location.href = `/search/${searchType}/${searchText}`; }}>Search</button>
          </form>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;