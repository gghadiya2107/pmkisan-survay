import Cookies from "js-cookie";

// Save the token in localStorage
export const saveToken = (data) => {
  Cookies.set("userName", JSON.stringify(data.userName)); // expires in 1 days
  Cookies.set("block", JSON.stringify(data.block)); // expires in 1 days
  Cookies.set("district", JSON.stringify(data.district)); // expires in 1 days
  Cookies.set("panchayat", JSON.stringify(data.panchayat)); // expires in 1 days
  Cookies.set("village", JSON.stringify(data?.village));
  Cookies.set("name", JSON.stringify(data.name));
  Cookies.set("roles", JSON.stringify(data.roles));
  Cookies.set('authToken', data.token, { expires: 1 }); // Set the token to expire in 7 days, adjust as needed
  Cookies.set('ulb', data.id, { expires: 1 }); // Set the token to expire in 7 days, adjust as needed
};

// Retrieve the token from localStorage
export const getToken = () => {
  return Cookies.get("authToken");
};

export const getUserName = () => {
  return Cookies.get("userName");
};
export const getName = () => {
  return Cookies.get("name");
};

export const getRoles = () => {
  return Cookies.get("roles");
};
export const getBlock = () => {
  return Cookies.get("block");
};
export const getDistrict = () => {
  return Cookies.get("district");
};
export const getPanchayat = () => {
  return Cookies.get("panchayat");
};
export const getVillage = () => {
  return Cookies.get("village");
};
export const getUlb = () => {
  return Cookies.get("id");
};

// Remove the token from localStorage
export const removeToken = () => {
  // Cookies.set('userName', null, { expires: 1 }); // expires in 1 days
  // Cookies.set('authToken', null, { expires: 1 });
  // Cookies.set('ulb', null, { expires: 1 }); // expires in 1 days

  Cookies.remove("authToken");
  Cookies.remove("userName");
  Cookies.remove("name");
  Cookies.remove("roles");
  Cookies.remove("block");
  Cookies.remove("district");
  Cookies.remove("panchayat");
  Cookies.remove("village");

  // Cookies.remove('authToken', { path: '' })
  // Cookies.remove('userName', { path: '' })
  // Cookies.remove('ulb', { path: '' })

  const cookies = Cookies.get(); // Get all cookies

  for (const cookie in cookies) {
    console.log(cookies, "asldnjkqjiwk");
    if (cookies.hasOwnProperty(cookie)) {
      Cookies.remove(cookie); // Remove each cookie
    }
  }
};
