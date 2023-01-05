import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import CategoryRoute from './routes/category.route';
import PharmacyRoute from './routes/pharmacy.route';
import PosteRoute from './routes/poste.route';
import TypePharmacyRoute from './routes/typePharmacy.route';
import UserStatusRoute from './routes/userStatus.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new UserStatusRoute(),
  new PharmacyRoute(),
  new TypePharmacyRoute(),
  new PosteRoute(),
  new CategoryRoute(),
]);

app.listen();
