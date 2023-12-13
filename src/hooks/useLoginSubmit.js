import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { AdminContext } from 'context/AdminContext';
import AdminServices from 'services/AdminServices';
import { notifyError, notifySuccess } from 'utils/toast';
import Category from 'pages/Category';

const useLoginSubmit = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();

  const [connectedDoctorId, setConnectedDoctorId] = useState(""); // State pour conserver l'ID du docteur connecté

  <Category
  connectedDoctorId={connectedDoctorId}
  />

  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ( data ) => {

    const { nom,prenom,adresse,num,image,genre, email, specialite, password  } = data;

    setLoading(true);
    

    const cookieTimeOut = 0.5;
    if (location.pathname === '/login') {
      let response = AdminServices.loginAdmin({ email, password })
        .then((res) => {
          if (response) {
            setConnectedDoctorId(response.message); // Supposons que la réponse contienne l'ID du docteur

            setLoading(false);
            notifySuccess('Login Success!');
            dispatch({ type: 'USER_LOGIN', payload: response });
            Cookies.set('adminInfo', JSON.stringify(res.admin), {
              expires: cookieTimeOut,
            });

            // Rediriger vers /dashboard en provoquant un rafraîchissement
            window.location.href = '/dashboard';
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }
    

    if (location.pathname === '/signup') {
      AdminServices.registerAdmin({  nom,prenom,adresse,num,image,genre, email, specialite, password })
        .then((res) => {
          if (res) { 
            setLoading(false);
            notifySuccess('Register Success!');
            dispatch({ type: 'USER_LOGIN', payload: res });
            Cookies.set('adminInfo', JSON.stringify(res.Admin), {
              expires: cookieTimeOut,
            });
            history.replace('/dashboard');
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }

    // if (location.pathname === '/forgot-password') {
    //   AdminServices.forgetPassword({ verifyEmail })
    //     .then((res) => {
    //       setLoading(false);
    //       notifySuccess(res.message);
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //       notifyError(err ? err.response.data.message : err.message);
    //     });
    // }
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;
