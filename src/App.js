import React, { lazy, Suspense, useState } from 'react'; // Importez useState
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from './utils/toast';
import { ClipLoader, PropagateLoader, RingLoader, BarLoader } from 'react-spinners'; // Importez les spinners
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';
const Layout = lazy(() => import('./layout/Layout'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const ForgetPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

const App = () => {
  const [loading, setLoading] = useState(true); // Initialisez la variable loading avec useState

  return (
    <div className="App">
      <h4>
        Add a loading animation in React using react-spinners -{' '}
        <a href="https://www.cluemediator.com">Clue Mediator</a>
      </h4>
      <button onClick={() => setLoading(!loading)}>Toggle Loaders</button>

      <div className="spinners">
        <ClipLoader
          color="#d03801" // Utilisez la couleur que vous avez mentionnée (#d03801)
          size={30}
          loading={loading}
          cssOverride={{
            display: 'block',
          }}
        />
        <PropagateLoader loading={loading} />
        <RingLoader loading={loading} />
        <BarLoader loading={loading} color="purple" />
      </div>

      <div className="note">
        <b>Note:</b> It accepts basic colors: maroon, red, orange, yellow, olive, green, purple, white, fuchsia, lime, teal, aqua, blue, navy, black, gray, silver
      </div>

      <ToastContainer />
      <Router>
        <AccessibleNavigationAnnouncer />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forgot-password" component={ForgetPassword} />
            <Route path="/reset-password/:token" component={ResetPassword} />
            <Route path="/" component={Layout} /> {/* Supprimez le commentaire et PrivateRoute ici */}
            <Redirect exact from="/" to="/login" />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
