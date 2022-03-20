import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createTableElements from "../components/table";
import { useAuth } from "../contexts/AuthContext";

const Home = props => {

  const [user, setUser] = useState({
    "name": "",
    "username": "",
    "password": "",
    "role": "",
    "department": "",
    "position": "",
    "phoneNumber": 0,
    "email": "",
    "officeNo": "",
    "timeTable": []
  });

  const [timetables, setTimetables] = useState(createTableElements([]));
  const tableHours = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();


  useEffect(async () => {
    let username = auth.username;

    if (username != '') {
      let response;

      await axios.get(`api/book_user/${username}`)
        .then(res => response = res)
        .catch(x => console.log(x));

      console.log(response);
      if (response && response.status === 200) {
        setUser(response.data);
        setTimetables(createTableElements(response.data.timeTable));
      }
    }
  }, [auth]);


  return (
    <div class="card bg-light mt-2 mb-2" >
      <div class="card-body">
        <h5 class="card-title">Welcome to Uskudar University Address Book, {user.name}!</h5>
        {/* <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> --> */}
        <p class="card-text">Name : {user.name}</p>
        <p class="card-text">Department : {user.department}</p>
        <p class="card-text">Position : {user.position}</p>
        <p class="card-text">Phone Number : {user.position}</p>
        <p class="card-text">E-mail : {user.email}</p>
        <p class="card-text">Office No : {user.officeNo}</p>
        <p class="card-text">Time Table:</p>

        {/* <!-- TIME TABLE--> */}

        <div class="table-responsive">
          <table class="table table-bordered text-center">

            {/* <!-- COLS --> */}
            <thead>
              <tr class="bg-light-gray">
                <th class="text-uppercase">Time
                </th>
                <th class="text-uppercase">Monday</th>
                <th class="text-uppercase">Tuesday</th>
                <th class="text-uppercase">Wednesday</th>
                <th class="text-uppercase">Thursday</th>
                <th class="text-uppercase">Friday</th>
                <th class="text-uppercase">Saturday</th>
              </tr>
            </thead>

            {/* <!-- ROWS--> */}

            <tbody>
              {
                tableHours.map(hour => {

                  return (
                    <tr>
                      <td class="align-middle">{hour}</td>
                      {
                        timetables[hour].map(t => {
                          console.log(t.label);
                          if (t.label != '') console.log(t.label != '');
                          {/* console.log(t.id) */ }
                          if (t.label) {
                            return <td>
                              <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">MATH302</span>
                              <div class="margin-10px-top font-size14">ONLINE</div>
                            </td>
                          }
                          return <td class="bg-light-gray"></td>
                        })
                      }
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        </div>

        <button class="btn btn-info my-2 my-sm-0" type="submit">Update Informations</button>
      </div>
    </div>
  );
}
export default Home;