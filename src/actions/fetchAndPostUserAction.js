export const getAllUsers = (usersData) => {
    return (dispatch) => {
        dispatch({
            type: "GET_ALL_USERS",
            payload: usersData
        });
    }
};

export const fetchUsers = () => {
  return (dispatch) => {

    //fetching data from fake api
    fetch("https://jsonplaceholder.typicode.com/users?_limit=3")
      .then((response) => response.json())
      .then((response) => {
        response.forEach((obj) => {

          //adding custom properties in returned objects
          obj.location = obj.address.city;
          obj.gender = "Female";

          //changing date and time format
          var date = new Date();
          obj.dateOfJoin =
            date.getDate() +
            "/" +
            date.getMonth() +
            1 +
            "/" +
            date.getFullYear();

          var time = new Date();
          obj.reportTime = time.getHours() + ":" + time.getMinutes();
        });

        dispatch({
          type: "FETCH_USERS",
          payload: response,
        });
    });
  };
};

//creating new object

var newUser = {};

function createObject(postData) {
  newUser.name = postData.fullName;
  newUser.email = postData.email;
  newUser.phone = postData.phoneNumber;
  newUser.gender = postData.gender;
  newUser.dateOfJoin = postData.joinDate;
  newUser.reportTime = postData.reportTime;
  newUser.location = postData.location;
}

export const postUser = (postData) => {
  createObject(postData);

  return (dispatch) => {

    //submitting form data to fake api 

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => {

        //changing date and time format

        var date = new Date(response.dateOfJoin);
        console.log(date);

        response.dateOfJoin =
          date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear();

        var time = new Date(response.reportTime);
        var hours = time.getHours() === 0 ? '00' : time.getHours();
        var minutes = time.getMinutes() === 0 ? '00' : time.getMinutes();

        response.reportTime = hours + ":" + minutes;

        console.log(response);

        dispatch({
          type: "POST_USER",
          payload: response
        });
      });
  };
};