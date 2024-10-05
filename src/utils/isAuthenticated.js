import Cookies from 'js-cookie';

const isAuthenticated = () => Cookies.get('jwt');

export default isAuthenticated;
