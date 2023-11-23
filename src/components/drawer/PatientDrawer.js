import ReactTagInput from "@pathofdev/react-tag-input";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  TableCell,
  TableContainer,
  TableHeader,
  Textarea,
  Table,
} from "@windmill/react-ui";
import Multiselect from "multiselect-react-dropdown";
import React, { useContext } from "react";
import { SidebarContext } from "context/SidebarContext";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import useProjectSubmit from "hooks/useProjectSubmit";
import ProjectServices from "services/ProjectServices";
import UploaderThree from "components/image-uploader/UploaderThree";
import Title from "components/form/Title";
import SwitchToggleForCombination from "components/form/SwitchToggleForCombination";
import ActiveButton from "components/form/ActiveButton";
import LabelArea from "components/form/LabelArea";
import Error from "components/form/Error";
import Uploader from "components/image-uploader/Uploader";
import InputArea from "components/form/InputArea";
import ParentCategory from "components/category/ParentCategory";
import InputValue from "components/form/InputValue";
import InputValueFive from "components/form/InputValueFive";
import AttributeOptionTwo from "components/attribute/AttributeOptionTwo";
import DrawerButton from "components/form/DrawerButton";
import AttributeListTable from "components/attribute/AttributeListTable";
import { showingTranslateValue } from "utils/translate";
import { useForm } from 'react-hook-form';
import { notifyError, notifySuccess } from "../../utils/toast";
import Drawer from "rc-drawer";
import Loader from 'components/loader/Loader';

import axios from "axios";
import CategoryServices from "services/CategoryServices";
import SelectCategory from "components/form/SelectCategory";
import SelectReferences from "components/form/SelectReferences";
import PatientServices from "services/PatientServices";
import JSZip from 'jszip';


//internal import

const PatientDrawer = ({ id, isLoading, setIsLoading, setCategory,setServiceId,References,categories, isCheck, setIsCheck }) => {
  const { t } = useTranslation();

  const {
    tag,
    setTag,
    values,
    language,
    register,
    onSubmit,
    slug,
    openModal,
    // attribue,
    setValues,
    variants,
    // handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,

    onCloseModal,
    isBulkUpdate,
    globalSetting,
    isSubmitting,
    tapValue,
    setTapValue,
    resetRefTwo,
    handleSkuBarcode,
    handleProjectTap,

    handleSelectLanguage,
    handleIsCombination,
    handleEditVariant,
    setIsSubmitting,
    handleRemoveVariant,
    handleClearVariant,
    handleQuantityPrice,
    handleSelectImage,
    handleSelectInlineImage,
    handleGenerateCombination,
  } = useProjectSubmit(id);
  const { closeDrawer } = useContext(SidebarContext)




  const currency = globalSetting?.default_currency || "$";

  const [imageUrl, setImageUrl] = useState("");
  const [oldImageUrl, setOldImageUrl] = useState("");
  const [Seo_Keywords, setSeo_keywords] = useState("");
  

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedReference, setSelectedReferences] = useState(null);

  const [title_en, setTitle_en] = useState("");
  const [SubTitle_en, setSubtitle_en] = useState("");
  const [Short_Description_en, setShort_description_en] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [Seo_Description_en, setSeo_description_en] = useState("");
  const [slug_en, setSlug_en] = useState("");

  const [title_fr, setTitle_fr] = useState("");
  const [subtitle_fr, setSubtitle_fr] = useState("");
  const [Short_Description_fr, setShort_description_fr] = useState("");
  const [Description_fr, setDescription_fr] = useState("");
  const [Seo_Description_fr, setSeo_description_fr] = useState("");
  const [slug_fr, setSlug_fr] = useState("");

  const [title_ar, setTitle_ar] = useState("");
  const [SubTitle_ar, setSubtitle_ar] = useState("");
  const [Short_Description_ar, setShort_description_ar] = useState("");
  const [description_ar, setDescription_ar] = useState("");
  const [seo_description_ar, setSeo_description_ar] = useState("");
  const [slug_ar, setSlug_ar] = useState("");


//les states du patient : 
const [nom , setNom]=useState("");
const [prenom , setPrenom]=useState("");
const [DateN , setDateN]=useState("");
const [Adresse , setAdresse]=useState("");
const [Num , setNum]=useState("");
const [zipBlob, setZipBlob] = useState(null);

const [dossiersMedicale, setDossiersMedicaux] = useState([]);
//fin des states du patient . 
  const handleSubmit = async (e) => {
    e.preventDefault(); // Assurez-vous d'annuler le comportement par défaut du formulaire si nécessaire

    const Error = ({ errorName }) => {
      return (
        <div className="text-red-500 text-sm mt-1">{errorName && errorName.message}</div>
      );
    };

    
    
    const formData = new FormData();

    // Ajout du fichier à FormData
    formData.append('dossierMedical', zipBlob);
    
    // Ajout des autres champs
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('DateN', DateN);
    formData.append('Adresse', Adresse);
    formData.append('Num', Num);
    
      
    // const patientData = {
    //   nom: nom,
    //   prenom: prenom,
    //   DateN: DateN,
    //   Adresse: Adresse,
    //   Num: Num,
    // };
    


    
   

    try {
      if (id == null) {
        setIsLoading(true);

        const res = await PatientServices.addPatient(formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },

        });

        
        closeDrawer();
        setIsLoading(false);
        setServiceId();
        setIsCheck([]);
        setIsSubmitting(false);
   
        notifySuccess(res.message);


      } else {
        setIsLoading(true);
        const response = await PatientServices.updatePatient(id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },


        });

        closeDrawer();
        setIsLoading(false);
   
        notifySuccess(response.message);


      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error);
    }
   
  };
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const zip = new JSZip();
  
      // Ajouter chaque fichier sélectionné à JSZip
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        zip.file(file.name, file);
      }
  
      // Générer le fichier .zip avec JSZip
      zip.generateAsync({ type: 'blob' }).then((blob) => {
        // Mettre à jour le state avec le blob du fichier .zip
        setZipBlob(blob);
        // Enregistrer le blob dans le state ou effectuer d'autres opérations nécessaires
      });
    }
  };
  

  console.log("id ta patient : ",id);

  const initFormForUpdate = async (id) => {
    setIsLoading(true);
    const res = await PatientServices.Details(id);
    setIsLoading(false);
    setNom(res.data.nom);
    setPrenom(res.data.prenom);
    setDateN(res.data.dateN);
    setNum(res.data.num);
    setAdresse(res.data.adresse);
    setDossiersMedicaux(res.data.dossiersMedicaux);
  };

  useEffect(() => {
    if (id && id !== undefined) {

      initFormForUpdate(id);

    } else{
      setNom("");
      setPrenom("");
      setDateN("");
      setAdresse("");
      setNum("");
      setDossiersMedicaux("");
    }
  }, [id]);



  const { formState: { errors } } = useForm();

  

  // const handleNextClick = () => {
  //   if (tapValue === 'Anglais') {
  //     setTapValue('French');
  //   } else if (tapValue === 'French') {
  //     setTapValue('Arabic');
  //   }
  // };




  const [imageBinary, setImageBinary] = useState(null);
  useEffect(() => {
    async function fetchImageBinary() {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        setImageBinary(blob);
      } catch (error) {
        console.error('Error fetching image binary:', error);
      }
    }

    fetchImageBinary();
  }, [imageUrl]);

  

  return (
    <>


      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        closeIcon={
          <div className="absolute top-0 right-0 text-red-500 focus:outline-none active:outline-none text-xl border-0">
            <FiX className="text-3xl" />
          </div>
        }
      >
        <div className="cursor-pointer">
          <UploaderThree
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleSelectImage={handleSelectImage}
          />
        </div>
      </Modal>

      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={"Modifier la patient"}
            description={"Modifier les informations du patient"}
          />
        ) : (
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={"Ajouter un nouveau patient "}
            description={"Remplir la formulaire pour ajouter un nouveau patient a la liste des patients  "}
          />
        )}
      </div>

      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">


        <ul className="flex flex-wrap -mb-px">
          {/* <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Anglais"
              handleTap={handleProjectTap}
            />
          </li> */}

          {/* <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="French"
              handleTap={handleProjectTap}
            />
          </li>

          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Arabic"
              handleTap={handleProjectTap}
            />
          </li> */}

          {isCombination && (
            <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue="Combination"
                handleProjectTap={handleProjectTap}
              />
            </li>
          )}
        </ul>
      </div>

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit} className="block" id="block">
          {/* <form onSubmit={handleSubmit(onSubmit)} className="block" id="block"> */}
          {tapValue === "Anglais" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">


              {/* */}



              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Nom : "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="nom"
                    type="text"
                    placeholder={"Nom du patien  "}

                    onChange={(e) => setNom(e.target.value)}
                    value={nom}
                  />
                  <Error errorName={errors.title_en} />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Prenom  : "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input

                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="prenom"
                    id="SubTitle_en"
                    type="text"
                    placeholder={"Prenom du patien  "}
                    onChange={(e) => setPrenom(e.target.value)}
                    value={prenom}
                  />
                  <Error errorName={errors.SubTitle_en} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Date de naissance   : "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input

                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="Date de naissance"
                    id="DateN"
                    type="text"
                    placeholder={"Date de naissance "}
                    onChange={(e) => setDateN(e.target.value)}
                    value={DateN}
                  />
                  <Error errorName={errors.SubTitle_en} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Adresse : "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"

                    name="Adresse"
                    placeholder={"Adresse : "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setAdresse(e.target.value)}
                    value={Adresse}
                  />
                  <Error errorName={errors.description_en} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Numero de telephone :   "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input

                    name="Num"
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    type="text"
                    placeholder={"Numero de telephone  "}
                    onChange={(e) => setNum(e.target.value)}
                    value={Num}
                  />
                  <Error errorName={errors.Seo_Keywords} />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Dossiers médicaux : "} />
                <div className="col-span-8 sm:col-span-4">
                  <input
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="DossMedical"
                    type="file"
                    multiple // Permet la sélection de plusieurs fichiers
                    onChange={handleFileChange}
                  />
                  <Error errorName={errors.imageUrl} />
                </div>
              </div>



              
            </div>
          )}
            {isCombination ? (
            <DrawerButton
              id={id}
              save
              title="Patient"
              isSubmitting={isSubmitting}
              handleProjectTap={handleProjectTap}
             />
            ) : (
            <DrawerButton id={id} title="Project" isSubmitting={isSubmitting} />
            )}

            {
            id ? (
              <>
                {tapValue === "Anglais" && (
                  <DrawerButton id={id} title="Patient" value="aaaa" onClick={handleSubmit} />
                )}
                {/* {tapValue === "French" && (
                  <DrawerButton id={id} title="Next" value="submit" onClick={handleNextClick} />
                )}
                {tapValue === "Arabic" && (
                  <DrawerButton id={id} title="Submit" value="submit" isSubmitting={isSubmitting}  />
                )} */}
              </>
            ) : (
              <>
                {tapValue === "Anglais" && (
                  <DrawerButton id={id} title="Patient" value="aaaa" onClick={handleSubmit} />
                )}
                {/* {tapValue === "French" && (
                  <DrawerButton id={id} title="Next" value="next" onClick={handleNextClick} />
                )}
                {tapValue === "Arabic" && (
                  <DrawerButton id={id} title="Submit" value="submit" isSubmitting={isSubmitting}  />
                )} */}
              </>
            )
          }
{/* onClick={handleSubmitClick} */}



        </form>

        {tapValue === "Combination" &&
          isCombination &&
          variantTitle.length > 0 && (
            <div className="px-6">
              {/* {variants?.length >= 0 && ( */}
              {isCombination && (
                <TableContainer className="md:mb-32 mb-40 rounded-b-lg">
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableCell>{t("Image")}</TableCell>
                        <TableCell>{t("Combination")}</TableCell>
                        <TableCell>{t("Sku")}</TableCell>
                        <TableCell>{t("Barcode")}</TableCell>
                        <TableCell>{t("Price")}</TableCell>
                        <TableCell>{t("SalePrice")}</TableCell>
                        <TableCell>{t("QuantityTbl")}</TableCell>
                        <TableCell className="text-right">
                          {t("Action")}
                        </TableCell>
                      </tr>
                    </TableHeader>

                    <AttributeListTable
                      lang={language}
                      variants={variants}
                      setTapValue={setTapValue}
                      variantTitle={variantTitle}
                      isBulkUpdate={isBulkUpdate}
                      handleSkuBarcode={handleSkuBarcode}
                      handleEditVariant={handleEditVariant}
                      handleRemoveVariant={handleRemoveVariant}
                      handleQuantityPrice={handleQuantityPrice}
                      handleSelectInlineImage={handleSelectInlineImage}
                    />
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
      </Scrollbars>
    </>
  );
};

export default React.memo(PatientDrawer);
