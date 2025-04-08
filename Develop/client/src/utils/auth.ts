import {jwtDecode} from 'jwt-decode';

interface UserToken {
  data: {
    username: string;
    email: string;
    _id: string;
  };
}

// create a new class to instantiate for a user
class AuthService {
  // get user data
  static getProfile() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded = jwtDecode<UserToken>(token);
      return decoded.data;
    } catch (err) {
      return null;
    }
  }

  // check if user's logged in
  static loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  static isTokenExpired(token: string) {
    const decoded: any = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    } else return false;
  }

  static getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  static login(idToken: string) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  static logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default AuthService;