import Swal from 'sweetalert2';

const axios = require('axios');

async function signUp(username, email, password) {
  const response = axios
    .post(process.env.REACT_APP_BASE_URL + '/user/signup', {
      username,
      email,
      password,
    })
    .then((response) => {
      console.log(response.data, ' response.data');
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data, ' error');
      return error.response.data;
    });

  return response;
}

async function signIn(username, password) {
  const response = axios
    .post(process.env.REACT_APP_BASE_URL + '/user/signIn', {
      username,
      password,
    })
    .then((response) => {
      console.log(response.data, ' response.data');
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data, ' error');
      return error.response.data;
    });

  return response;
}

async function addRecord(
  sheetKey,
  credential,
  onWorkTime,
  offWorkTime,
  workHours,
  crontabString,
) {
  const token = window.localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      title: 'Error',
      text: '請先登入',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }

  const response = axios
    .post(
      process.env.REACT_APP_BASE_URL + '/auto-puncher/record/edit',
      {
        sheetKey,
        credential,
        onWorkTime,
        offWorkTime,
        workHours,
        crontabString,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
}

async function updateRecord(
  sheetKey,
  credential,
  onWorkTime,
  offWorkTime,
  workHours,
  crontabString,
) {
  const token = window.localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      title: 'Error',
      text: '請先登入',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }

  const response = axios
    .put(
      process.env.REACT_APP_BASE_URL + '/auto-puncher/record/edit',
      {
        sheetKey,
        credential,
        onWorkTime,
        offWorkTime,
        workHours,
        crontabString,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
}

async function getMyRecord() {
  const token = window.localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      title: 'Error',
      text: '請先登入',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }
  const result = axios
    .get(process.env.REACT_APP_BASE_URL + '/auto-puncher/record', {
      headers: { Authorization: token },
    })
    .then((response) => {
      return response.data;
    });
  return result;
}

async function getMyData() {
  const token = window.localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      title: 'Error',
      text: '請先登入',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }
  const result = axios
    .get(process.env.REACT_APP_BASE_URL + '/user/myData', {
      headers: { Authorization: token },
    })
    .then((response) => {
      return response.data.data.subscribe;
    });
  return result;
}

async function startSubscribe() {
  const token = window.localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      title: 'Error',
      text: '請先登入',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }
  const result = axios
    .get(process.env.REACT_APP_BASE_URL + '/user/start', {
      headers: { Authorization: token },
    })
    .then((response) => {
      return response.data;
    });
  return result;
}
async function cancelSubscribe() {
  const token = window.localStorage.getItem('token');
  if (!token) {
    Swal.fire({
      title: 'Error',
      text: '請先登入',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }
  const result = axios
    .get(process.env.REACT_APP_BASE_URL + '/user/cancel', {
      headers: { Authorization: token },
    })
    .then((response) => {
      return response.data;
    });
  return result;
}
export {
  signUp,
  signIn,
  addRecord,
  updateRecord,
  getMyRecord,
  startSubscribe,
  cancelSubscribe,
  getMyData,
};
