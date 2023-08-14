import ReactTagInput from "@pathofdev/react-tag-input";
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
import React from "react";
import { useEffect, useState, useContext } from "react";
import { SidebarContext } from "context/SidebarContext";

import { useForm } from "react-hook-form";
import { notifySuccess } from "utils/toast";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
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
import ServiceServices from "services/ServiceServices";
import SidebarContent from "components/sidebar/SidebarContent";
import CareerServices from "services/CareerServices";
import useCareerSubmit from "hooks/useCareerSubmit";
//internal import

const CareerDrawer = ({ id, data, isLoading, setIsLoading, isCheck, setIsCheck }) => {
  const { t } = useTranslation();


  const {
    tag,
    setTag,
    values,
    language,
    register,
    onSubmit,
    errors,
    slug,
    tapValue,
    setTapValue,
    openModal,
    attribue,
    setValues,
    variants,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,
    // productId,
    onCloseModal,
    isBulkUpdate,
    globalSetting,
    isSubmitting,
    resetRefTwo,
    handleSkuBarcode,
    handleCareerTap,
    selectedCategory,
    setSelectedCategory,
    setDefaultCategory,
    defaultCategory,
    handleProductSlug,
    handleSelectLanguage,
    handleIsCombination,
    handleEditVariant,
    handleRemoveVariant,
    handleClearVariant,
    handleQuantityPrice,
    handleSelectImage,
    handleSelectInlineImage,
    handleGenerateCombination,
  } = useCareerSubmit(id, data);

  const currency = globalSetting?.default_currency || "$";
  const { closeDrawer } = useContext(SidebarContext)

  const [imageUrl, setImageUrl] = useState("");
  const [oldImageUrl, setOldImageUrl] = useState("");


  const [seo_keywords, setSeo_keywords] = useState("");
  const [title_en, setTitle_en] = useState("");
 
  const [Short_Description_en, setShort_description_en] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [Seo_Description_en, setSeo_description_en] = useState("");
  const [Responsibilities_en, setResponsibilities_en] = useState("");
  const [Requirements_en, setRequirements_en] = useState("");


  const [title_fr, setTitle_fr] = useState("");
 
  const [Short_Description_fr, setShort_description_fr] = useState("");
  const [Description_fr, setDescription_fr] = useState("");
  const [Seo_Description_fr, setSeo_description_fr] = useState("");
  const [Responsibilities_fr, setResponsibilities_fr] = useState("");
  const [Requirements_fr, setRequirements_fr] = useState("");

  const [title_ar, setTitle_ar] = useState("");
 
  const [Short_Description_ar, setShort_description_ar] = useState("");
  const [description_ar, setDescription_ar] = useState("");
  const [seo_description_ar, setSeo_description_ar] = useState("");
  const [Responsibilities_ar, setResponsibilities_ar] = useState("");
  const [Requirements_ar, setRequirements_ar] = useState("");





  const {
    setValue,

  } = useForm();
  console.log("career drawer_id", id);
  const [retsData, setRestData] = useState({});



  const handleSubmit = async (e) => {
    e.preventDefault();

    const Error = ({ errorName }) => {
      return (
        <div className="text-red-500 text-sm mt-1">{errorName && errorName.message}</div>
      );
    };

    const formData = new FormData();
    formData.append('title_en', title_en);
   
    formData.append('short_description_en', Short_Description_en);
    formData.append('description_en', description_en);
    formData.append('seo_description_en', Seo_Description_en);
    formData.append('Responsibilities_en', Responsibilities_en);
    formData.append('Requirements_en', Requirements_en);


    formData.append('title_fr', title_fr);
    
    formData.append('short_description_fr', Short_Description_fr);
    formData.append('description_fr', Description_fr);
    formData.append('seo_description_fr', Seo_Description_fr);
    formData.append('Responsibilities_fr', Responsibilities_fr);
    formData.append('Requirements_fr', Requirements_fr);

    formData.append('title_ar', title_ar);
   
    formData.append('short_description_ar', Short_Description_ar);
    formData.append('description_ar', description_ar);
    formData.append('seo_description_ar', seo_description_ar);
    formData.append('Responsibilities_ar', Responsibilities_ar);
    formData.append('Requirements_ar', Requirements_ar);

    formData.append('seo_keywords', seo_keywords);
    formData.append('image', imageUrl);
  
    console.log(formData);
    // const res = await CategoryServices.getCategoryById(id);
    // console.log("res category", res);


    if (id) {

      setIsLoading(true);
      const res = await CareerServices.updateCareer(id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // setIsUpdate(true);
      setIsLoading(false);
      setIsCheck([]);
      // setIsSubmitting(false);
      notifySuccess(res.message);
      closeDrawer();
      // reset();
    } else {
      setIsLoading(true);

      const res = await CareerServices.addCareer(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // setIsUpdate(true);
      // setIsSubmitting(false);
      setIsLoading(false);
      setIsCheck([]);

      notifySuccess(res.message);
      closeDrawer();
    }
  };
  const initFormForUpdate = async (id) => {

    const res = await CareerServices.getCareerById(id);
    console.log('careerInputForm', res.data)

    setTitle_en(res.data.title_en);
    
    setShort_description_en(res.data.short_description_en);
    setDescription_en(res.data.description_en);
    setSeo_description_en(res.data.seo_description_en);
    setRequirements_en(res.data.Requirements_en);
    setResponsibilities_en(res.data.Responsibilities_en);

    setTitle_fr(res.data.title_fr);
   
    setShort_description_fr(res.data.short_description_fr);
    setDescription_fr(res.data.description_fr);
    setSeo_description_fr(res.data.seo_description_fr);
    setRequirements_fr(res.data.Requirements_fr);
    setResponsibilities_fr(res.data.Responsibilities_fr);

    setTitle_ar(res.data.title_ar);
    
    setShort_description_ar(res.data.short_description_ar);
    setDescription_ar(res.data.description_ar);
    setSeo_description_ar(res.data.seo_description_ar);
    setRequirements_ar(res.data.Requirements_ar);
    setResponsibilities_ar(res.data.Responsibilities_ar);

    setSeo_keywords(res.data.seo_keywords);
    setImageUrl(res.data.image);
    setImageBinary(res.data.image);
    setOldImageUrl(res.data.image);

   


    // setPrevilege(res.data.previleges);
    // setDepartment(res.data.departments);
    console.log('hahahahahah', oldImageUrl);
  };


  useEffect(() => {
    if (id && id !== undefined) {
      initFormForUpdate(id);
    } else {
      setTitle_en("");
     
      setShort_description_en("");
      setDescription_en("");
      setSeo_description_en("");
      setRequirements_en("");
      setResponsibilities_en("");

      setTitle_fr("");
     
      setShort_description_fr("");
      setDescription_fr("");
      setSeo_description_fr("");
      setRequirements_fr("");
      setResponsibilities_fr("");

      setTitle_ar("");
     
      setShort_description_ar("");
      setDescription_ar("");
      setSeo_description_ar("");
      setRequirements_ar("");
      setResponsibilities_ar("");

      setSeo_keywords("");
      setImageUrl("");
      setImageBinary("");
      setOldImageUrl("")

      
      setIsCheck([]);

    }
  }, [id]);
  const handleSubmitClick = () => {
    // Place your submission logic here
  };


  const handleNextClick = () => {
    if (tapValue === 'Anglais') {
      setTapValue('French');
    } else if (tapValue === 'French') {
      setTapValue('Arabic');
    }
  };


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
            title={"Update Career"}
            description={"Update Career Description"}
          />
        ) : (
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={"Add Career"}
            description={"Add Career Description"}
          />
        )}
      </div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
        {/* <SwitchToggleForCombination
          product
          handleProcess={handleIsCombination}
          processOption={isCombination}
        /> */}

        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Anglais"
              handleTap={handleCareerTap}
            />
          </li>

          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="French"
              handleTap={handleCareerTap}
            />
          </li>

          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Arabic"
              handleTap={handleCareerTap}
            />
          </li>

          {isCombination && (
            <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue="Combination"
                handleTap={handleCareerTap}
              />
            </li>
          )}
        </ul>
      </div>

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit} className="block" id="block">
          {tapValue === "Anglais" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Image"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input

                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="imageUrl"
                    type="file"
                    placeholder={"Image "}
                    onChange={(e) => { setImageUrl(e.target.files[0]) }}
                  />
                  <Error errorName={errors.imageUrl} />
                  {imageUrl && (
                    <img
                      src={oldImageUrl} // Utiliser l'URL existante pour afficher l'image
                      alt="Old Image"
                      style={{ maxWidth: '100px', marginTop: '10px' }}
                    />
                  )}


                </div>
              </div>



              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Title (en) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input

                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="title_en"
                    type="text"
                    placeholder={"Career Title (en) "}
                    // onBlur={(e) => handleProductSlug(e.target.value)}
                    onChange={(e) => setTitle_en(e.target.value)}
                    value={title_en}
                  />
                  {/* {title_en ?? ""} TTEEST */}
                  <Error errorName={errors.title_en} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Requirements (en)  "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="Requirements_en"
                    type="text"
                    placeholder={"Career Requirements  (en)  "}
                    onChange={(e) => setRequirements_en(e.target.value)}
                    value={Requirements_en}
                  />
                  <Error errorName={errors.Requirements_en} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Responsibilities (en)  "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="Responsibilities_en"
                    type="text"
                    placeholder={"Career Responsibilities (en)  "}
                    onChange={(e) => setResponsibilities_en(e.target.value)}
                    value={Responsibilities_en}
                  />
                  <Error errorName={errors.Responsibilities_en} />
                </div>
              </div>



              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Short_Description (en) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"

                    name="Short_Description_en"
                    placeholder={"Career Short_Description (en) "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setShort_description_en(e.target.value)}
                    value={Short_Description_en}
                  />
                  {/* {Short_Description_en ?? ""} TTEEST */}
                  <Error errorName={errors.Short_Description_en} />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Description (en) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"

                    name="description_en"
                    placeholder={"Career Description (en) "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setDescription_en(e.target.value)}
                    value={description_en}
                  />
                  {/* {description_en ?? ""} TTEEST */}
                  <Error errorName={errors.description_en} />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Seo Keywords  "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input

                    name="Seo_Keywords"
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    type="text"
                    placeholder={"Career Seo Keywords  "}
                    onChange={(e) => setSeo_keywords(e.target.value)}
                    value={seo_keywords}
                  />
                  <Error errorName={errors.seo_keywords} />
                </div>
              </div>



              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Seo Description (en) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    name="Seo_Description_en"
                    placeholder={"Career Seo description  "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setSeo_description_en(e.target.value)}
                    value={Seo_Description_en}
                  />
                  <Error errorName={errors.Seo_Description_en} />
                </div>
              </div>
            </div>
          )}

          {tapValue === "French" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Title (fr) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input

                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="title_fr"
                    type="text"
                    placeholder={"Career Title (fr) "}
                    onChange={(e) => setTitle_fr(e.target.value)}
                    value={title_fr}
                  />
                  <Error errorName={errors.title_fr} />
                </div>
              </div>



              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Requirements (fr)  "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="Requirements_fr"
                    type="text"
                    placeholder={"Career Requirements  (fr)  "}
                    onChange={(e) => setRequirements_fr(e.target.value)}
                    value={Requirements_fr}
                  />
                  <Error errorName={errors.Requirements_fr} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Responsibilities (fr)  "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="Responsibilities_fr"
                    type="text"
                    placeholder={"Career Responsibilities (en)  "}
                    onChange={(e) => setResponsibilities_fr(e.target.value)}
                    value={Responsibilities_fr}
                  />
                  <Error errorName={errors.Responsibilities_fr} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Short_Description (fr) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    name="Short_Description_fr"
                    placeholder={"Career Short_Description (fr) "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setShort_description_fr(e.target.value)}
                    value={Short_Description_fr}
                  />
                  <Error errorName={errors.Short_Description_fr} />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Description (fr) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    name="Description_fr"
                    placeholder={"Career Description (fr) "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setDescription_fr(e.target.value)}
                    value={Description_fr}
                  />
                  <Error errorName={errors.Description_fr} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Seo description (fr)"} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    name="Seo_Description_fr"
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    rows="4"
                    spellCheck="false"
                    placeholder={"Career Seo description  "}
                    onChange={(e) => setSeo_description_fr(e.target.value)}
                    value={Seo_Description_fr}
                  />
                  <Error errorName={errors.Seo_Description_fr} />
                </div>
              </div>
            </div>
          )}

          {tapValue === "Arabic" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Title (ar) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="title_ar"
                    type="text"
                    placeholder={"Career Title (ar)"}
                    onChange={(e) => setTitle_ar(e.target.value)}
                    value={title_ar}
                  />
                  <Error errorName={errors.title_ar} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Requirements (ar)  "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="Requirements_ar"
                    type="text"
                    placeholder={"Career Requirements  (ar)  "}
                    onChange={(e) => setRequirements_ar(e.target.value)}
                    value={Requirements_ar}
                  />
                  <Error errorName={errors.Requirements_ar} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Responsibilities (ar)  "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="Responsibilities_ar"
                    type="text"
                    placeholder={"Career Responsibilities (ar)  "}
                    onChange={(e) => setResponsibilities_ar(e.target.value)}
                    value={Responsibilities_ar}
                  />
                  <Error errorName={errors.Responsibilities_ar} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Short_Description (ar) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    name="Short_Description_ar"
                    placeholder={"Career Short_Description (ar) "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setShort_description_ar(e.target.value)}
                    value={Short_Description_ar}
                  />
                  <Error errorName={errors.Short_Description_ar} />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Description (ar) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    name="description_ar"
                    placeholder={"Career Description (ar) "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setDescription_ar(e.target.value)}
                    value={description_ar}
                  />
                  <Error errorName={errors.description_ar} />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Career Seo Description (ar)"} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    name="seo_description_ar"
                    placeholder={"Career Seo description  "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setSeo_description_ar(e.target.value)}
                    value={seo_description_ar}
                  />
                  <Error errorName={errors.seo_description_ar} />
                </div>
              </div>



           




            </div>
          )}

          {tapValue === "Combination" &&
            isCombination &&
            (attribue.length < 1 ? (
              <div
                className="bg-teal-100 border border-teal-600 rounded-md text-teal-900 px-4 py-3 m-4"
                role="alert"
              >
                <div className="flex">
                  <div className="py-1">
                    <svg
                      className="fill-current h-6 w-6 text-teal-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm">
                      {t("AddCombinationsDiscription")}{" "}
                      <Link to="/attributes" className="font-bold">
                        {t("AttributesFeatures")}
                      </Link>
                      {t("AddCombinationsDiscriptionTwo")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {/* <h4 className="mb-4 font-semibold text-lg">Variants</h4> */}
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 md:gap-3 xl:gap-3 lg:gap-2 mb-3">
                  <MultiSelect
                    options={attTitle}
                    value={attributes}
                    onChange={(v) => handleAddAtt(v)}
                    labelledBy="Select"
                  />

                  {attributes?.map((attribute, i) => (
                    <div key={attribute._id}>
                      <div className="flex w-full h-10 justify-between font-sans rounded-tl rounded-tr bg-gray-200 px-4 py-3 text-left text-sm font-normal text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        {"Select"}
                        {showingTranslateValue(attribute?.title, language)}
                      </div>

                      <AttributeOptionTwo
                        id={i + 1}
                        values={values}
                        lang={language}
                        attributes={attribute}
                        setValues={setValues}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mb-6">
                  {attributes?.length > 0 && (
                    <Button
                      onClick={handleGenerateCombination}
                      type="button"
                      className="mx-2"
                    >
                      <span className="text-xs">{t("GenerateVariants")}</span>
                    </Button>
                  )}

                  {variantTitle.length > 0 && (
                    <Button onClick={handleClearVariant} className="mx-2">
                      <span className="text-xs">{t("ClearVariants")}</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}

          {isCombination ? (
            <DrawerButton
              id={id}
              save
              title="Product"
              isSubmitting={isSubmitting}
              handleCareerTap={handleCareerTap}
            />
          ) : (
            <DrawerButton id={id} title="Submit" isSubmitting={isSubmitting} />
          )}

          {
            id ? (
              <>
                {tapValue === "Anglais" && (
                  <DrawerButton id={id} title="Next" value="submit" onClick={handleNextClick} />
                )}
                {tapValue === "French" && (
                  <DrawerButton id={id} title="Next" value="submit" onClick={handleNextClick} />
                )}
                {tapValue === "Arabic" && (
                  <DrawerButton id={id} title="Submit" value="submit" isSubmitting={isSubmitting} onClick={handleSubmitClick} />
                )}
              </>
            ) : (
              <>
                {tapValue === "Anglais" && (
                  <DrawerButton id={id} title="Next" value="next" onClick={handleNextClick} />
                )}
                {tapValue === "French" && (
                  <DrawerButton id={id} title="Next" value="next" onClick={handleNextClick} />
                )}
                {tapValue === "Arabic" && (
                  <DrawerButton id={id} title="Submit" value="submit" isSubmitting={isSubmitting} onClick={handleSubmitClick} />
                )}
              </>
            )
          }
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

export default React.memo(CareerDrawer);
