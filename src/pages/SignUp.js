import React from "react";
import { Link } from "react-router-dom";
import { Input, Label, Button } from "@windmill/react-ui";
import { ImFacebook, ImGoogle } from "react-icons/im";
import { useTranslation } from "react-i18next";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import SelectRole from "components/form/SelectRole";
import useLoginSubmit from "hooks/useLoginSubmit";
import ImageLight from "assets/img/create-account-office.jpeg";
import ImageDark from "assets/img/create-account-office-dark.jpeg";
import { Select } from '@windmill/react-ui';
import { useState } from "react";

const SignUp = () => {
  const {t}=useTranslation()
  const { onSubmit, register, handleSubmit, errors, loading } = useLoginSubmit();

  const [image,setImage]=useState("");

  const [nom,setNom]=useState("");
  const [prenom,setPrenom]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [num,setNum]=useState("");
  const [specialite,setSpecialite]=useState("");
  const [genre,setGenre]=useState("");
  const [adresse,setAdresse]=useState("");


  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

  };
  


  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                {"Cree un compte"}
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>

              
              <div className="w-full px-32 mb-4">
              <div className="flex items-center">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <img src={image ? URL.createObjectURL(image) : 'https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png'} alt="Upload" className="w-20 h-20 object-cover rounded-full" />
                  <input id="image-upload" type="file" className="hidden"  onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
              <Error errorName={errors.image} />
            </div>




             <div className="flex flex-wrap -mx-4">


             <div className="w-full md:w-1/2 px-4 mb-4">
                <LabelArea label="Nom" />
                <InputArea
                 register={register}
                  label="Nom"
                  name="nom"
                  type="text"
                  placeholder="Admin"
                  onChange={(e) => setNom(e.target.value)} // Utilisation directe de setNom
                />
                <Error errorName={errors.name} />
              </div>


              <div className="w-full md:w-1/2 px-4 mb-4">
                <LabelArea label="Prenom" />
                <InputArea
                  register={register}
                  label="Prenom"
                  name="prenom"
                  type="text"
                  placeholder="Admin"
                  onChange={(e) => setPrenom(e.target.value)} // Utilisation directe de setNom

                />
                <Error errorName={errors.name} />
              </div>

              <div className="w-full md:w-1/2 px-4 mb-4">
                <LabelArea label="Email" />
                <InputArea
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="john@doe.com"
                  onChange={(e) => setEmail(e.target.value)} // Utilisation directe de setNom

                />
                <Error errorName={errors.email} />
              </div>

              <div className="w-full md:w-1/2 px-4 mb-4">
                <LabelArea label="Password" />
                <InputArea
                  register={register}
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="***************"
                  onChange={(e) => setPassword(e.target.value)} // Utilisation directe de setNom

                />
                <Error errorName={errors.password} />
              </div>

              <div className="w-full md:w-1/2 px-4 mb-4">
                <LabelArea label="NumeroTelephone" />
                <InputArea
                  register={register}
                  label="NumeroTelephone"
                  name="num"
                  type="text"
                  placeholder="+216"
                  onChange={(e) => setNum(e.target.value)} // Utilisation directe de setNom

                />
                <Error errorName={errors.password} />
              </div>

              <div className="w-full md:w-1/2 px-4 mb-4">
                <LabelArea label="Genre" />
                <div className="col-span-8 sm:col-span-4">
                <Select
                  register={register}
                  onChange={(e) => setGenre(e.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  
                >
                  <option value="" defaultValue hidden>
                  Votre genre 
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  
                </Select>                  
                <Error errorName={errors.role} />
                </div>
              </div>

              <div className="w-full px-4 mb-4">
                <LabelArea label="Adresse" />
                <InputArea
                  register={register}
                  label="Adresse"
                  name="adresse"
                  type="text"
                  placeholder="Rue..."
                  onChange={(e) => setAdresse(e.target.value)} // Utilisation directe de setNom

                />
                <Error errorName={errors.password} />
              </div>

              <div className="w-full px-4 mb-4">
                <LabelArea label="Specialite" />
                <div className="col-span-8 sm:col-span-4">
                <Select
                  register={register}
                  name="specialite" // Ajoutez l'attribut 'name' pour spécifier le nom du champ
                  onChange={(e) => setSpecialite(e.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  
                  >
                  <option value="" defaultValue hidden>
                  selectionner votre specialite
                  </option>
                  <option value="Cardiologue">Cardiologue</option>
                  <option value="Dermatologue">Dermatologue</option>
                  <option value="Pédiatre">Pédiatre</option>
                  <option value="Neurologue">Neurologue</option>
                  <option value="Psychiatre"> Psychiatre </option>
                  <option value="Orthopédiste">Orthopédiste</option>
                  
                </Select>                    
                <Error errorName={errors.role} />
                </div>
              </div>
            </div>



              
              <Label className="mt-6" check>
                  <Input type="checkbox" />
                  <span className="ml-2">
                    {t("Iagree")} <span className="underline">{t("privacyPolicy")}</span>
                  </span>
                </Label>


                <Button
                  disabled={loading}
                  type="submit"
                  className="mt-4 h-12 w-full"
                  to="/dashboard"
                  block
                >
                  {t("CreateAccountTitle")}
                </Button>
              </form>

              <hr className="my-10" />

              <button
                disabled
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2 md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-blue-600 h-11 md:h-12 w-full mr-2"
              >
                <ImFacebook className="w-4 h-4 mr-2" /> <span className="ml-2"> {t("LoginWithFacebook")} </span>
              </button>
              <button
                disabled
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2  md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
              >
                <ImGoogle className="w-4 h-4 mr-2" /> <span className="ml-2">{t("LoginWithGoogle")}</span>
              </button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-orange-500 dark:text-orange-400 hover:underline"
                  to="/login"
                >
                 {t("AlreadyAccount")}
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
