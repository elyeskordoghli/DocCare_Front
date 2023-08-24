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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importez les styles CSS
import { useForm } from "react-hook-form";
import { notifySuccess } from "utils/toast";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import useSliderSubmit from "hooks/useSliderSubmit";

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
import SlidersServices from "services/SlidersServices";
import DetailsServices from "services/DetailsServices";
//internal import

const DetailDrawer = ({ data, isLoading, setIsLoading, isCheck, setIsCheck }) => {
  const { t } = useTranslation();
  const[id,setId]=useState();

  console.log("Slider drawer_id", data);
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
    handleServiceTap,
    handleSliderTap,
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
  } = useSliderSubmit(id, data);

  const currency = globalSetting?.default_currency || "$";
  const { closeDrawer } = useContext(SidebarContext)

  const [imageUrl, setImageUrl] = useState("");
  const [oldImageUrl, setOldImageUrl] = useState("");
  const [adresse_en, setAdresse_en] = useState("");
  const [adresse_fr, setAdresse_fr] = useState("");
  const [adresse_ar, setAdresse_ar] = useState("");

  const [whatsapp_num, setWhatsapp_num] = useState("");
  const [standard_num, setStandard_num] = useState("");

  const [email, setEmail] = useState("");
  const [working_hours_en, setWorking_hours_en] = useState("");
  const [working_hours_fr, setWorking_hours_fr] = useState("");
  const [working_hours_ar, setWorking_hours_ar] = useState("");
  const [map_localisation, setMap_localisation] = useState("");

  const [video, setVideo] = useState("");

  const [facebook, setFacebook] = useState("");
  const [insta, setInsta] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedIn] = useState("");



  const {
    setValue,

  } = useForm();
  
  const [retsData, setRestData] = useState({});



  const handleSubmit = async (e) => {
    e.preventDefault();

    const Error = ({ errorName }) => {
      return (
        <div className="text-red-500 text-sm mt-1">{errorName && errorName.message}</div>
      );
    };

    const formData = {
      adresse_en: adresse_en,
      adresse_fr : adresse_fr,
      adresse_ar : adresse_ar,
      whatsapp_num: whatsapp_num,
      standard_num : standard_num,
      email : email,
      working_hours_en : working_hours_en,
      working_hours_fr : working_hours_fr,
      map_localisation : map_localisation,
      video : video,
      facebook : facebook ,
      insta : insta ,
      twitter : twitter ,
      linkedIn : linkedIn ,
      working_hours_en : working_hours_en,
      working_hours_fr : working_hours_fr ,
      working_hours_ar: working_hours_ar ,

    };

   

      setIsLoading(true);
      const res = await DetailsServices.updateDetail(id, formData, {
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
   
      // setIsUpdate(true);
      // setIsSubmitting(false);
      
    
  };
  const initFormForUpdate = async () => {
    setIsLoading(true);

    const res = await DetailsServices.getAllDetails();
    setIsLoading(false);

    if (res.data && res.data.length > 0) {
      const firstItem = res.data[0];
      console.log("first ",firstItem);
      setId(firstItem.id);
    setAdresse_en(firstItem.adresse_en);
    setAdresse_fr(firstItem.adresse_fr);
    setAdresse_ar(firstItem.adresse_ar);
    setEmail(firstItem.email);
    setFacebook(firstItem.facebook);
    setInsta(firstItem.insta);
    setTwitter(firstItem.twitter);
    setLinkedIn(firstItem.linkedIn);
    setWhatsapp_num(firstItem.whatsapp_num);
    setStandard_num(firstItem.standard_num);
    setWorking_hours_en(firstItem.working_hours_en);
    setWorking_hours_fr(firstItem.working_hours_fr);
    setWorking_hours_ar(firstItem.working_hours_ar);
    setVideo(firstItem.video);
    setMap_localisation(firstItem.map_localisation);
    }
  };


  useEffect(() => {
    // if (id && id !== undefined) {
      initFormForUpdate();
  },[]);
  const handleSubmitClick = () => {
    // Place your submission logic here
  };

console.log("hihi",adresse_en);
  // const handleNextClick = () => {
  //   if (tapValue === 'Anglais') {
  //     setTapValue('French');
  //   } else if (tapValue === 'French') {
  //     setTapValue('Arabic');
  //   }
  // };



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

      </Modal>

      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={"Update Detail"}
            description={"Update Detail Description"}
          />
 
      </div>
 

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit} className="block" id="block">
          {/* {tapValue === "Anglais" && ( */}
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-20 md:pb-32 lg:pb-32 xl:pb-32">


          

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Adresse (en) "} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="adresse_en"
                  type="text"
                  placeholder={"Adresse (en) "}
                  // onBlur={(e) => handleProductSlug(e.target.value)}
                  onChange={(e) => setAdresse_en(e.target.value)}
                  value={adresse_en}
                />
                {/* {title_en ?? ""} TTEEST */}
                <Error errorName={errors.adresse_en} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Adresse (fr) "} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="adresse_fr"
                  type="text"
                  placeholder={"Adresse (fr) "}
                  // onBlur={(e) => handleProductSlug(e.target.value)}
                  onChange={(e) => setAdresse_fr(e.target.value)}
                  value={adresse_fr}
                />
                {/* {title_en ?? ""} TTEEST */}
                <Error errorName={errors.adresse_fr} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Adresse (ar) "} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="adresse_ar"
                  type="text"
                  placeholder={"Adresse (ar) "}
                  // onBlur={(e) => handleProductSlug(e.target.value)}
                  onChange={(e) => setAdresse_ar(e.target.value)}
                  value={adresse_ar}
                />
                {/* {title_en ?? ""} TTEEST */}
                <Error errorName={errors.adresse_ar} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Whatsapp Number "} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="whatsapp_num"
                  type="text"
                  placeholder={"Whatsapp Number "}
                  // onBlur={(e) => handleProductSlug(e.target.value)}
                  onChange={(e) => setWhatsapp_num(e.target.value)}
                  value={whatsapp_num}
                />
                {/* {title_en ?? ""} TTEEST */}
                <Error errorName={errors.whatsapp_num} />
              </div>
            </div>
          
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Standard Number "} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="standard_num"
                  type="text"
                  placeholder={"Standard Number "}
                  // onBlur={(e) => handleProductSlug(e.target.value)}
                  onChange={(e) => setStandard_num(e.target.value)}
                  value={standard_num}
                />
                {/* {title_en ?? ""} TTEEST */}
                <Error errorName={errors.standard_num} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Email "} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="email"
                  type="text"
                  placeholder={"Email "}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Error errorName={errors.email} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Working hours (en) "} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="working_hours_en"
                  type="text"
                  placeholder={"Working hours (en) "}
                  onChange={(e) => setWorking_hours_en(e.target.value)}
                  value={working_hours_en}
                />
                <Error errorName={errors.working_hours_en} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Working hours (fr) "} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="working_hours_fr"
                  type="text"
                  placeholder={"Working hours (fr) "}
                  onChange={(e) => setWorking_hours_fr(e.target.value)}
                  value={working_hours_fr}
                />
                <Error errorName={errors.working_hours_fr} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Working hours (ar) "} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="working_hours_ar"
                  type="text"
                  placeholder={"Working hours (ar) "}
                  onChange={(e) => setWorking_hours_ar(e.target.value)}
                  value={working_hours_en}
                />
                <Error errorName={errors.working_hours_ar} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Map localisation "} />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  name="map_localisation"
                  placeholder={"Map localisation "}
                  rows="2"
                  spellCheck="false"
                  onChange={(e) => setMap_localisation(e.target.value)}
                  value={map_localisation}
                />
                <Error errorName={errors.map_localisation} />
              </div>
            </div>


            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Facebook "} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="facebook"
                  type="text"
                  placeholder={"Facebook"}
                  onChange={(e) => setFacebook(e.target.value)}
                  value={facebook}
                />
                <Error errorName={errors.facebook} />
              </div>
            </div>



            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Instagram "} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="insta"
                  type="text"
                  placeholder={"Instagram "}
                  onChange={(e) => setInsta(e.target.value)}
                  value={insta}
                />
                <Error errorName={errors.insta} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Twitter "} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="twitter"
                  type="text"
                  placeholder={"Twitter "}
                  onChange={(e) => setTwitter(e.target.value)}
                  value={twitter}
                />
                <Error errorName={errors.twitter} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"LinkedIn "} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="linkedIn"
                  type="text"
                  placeholder={"LinkedIn "}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  value={linkedIn}
                />
                <Error errorName={errors.linkedIn} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Youtube Video  "} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="video"
                  type="text"
                  placeholder={"Youtube Video  "}
                  onChange={(e) => setVideo(e.target.value)}
                  value={video}
                />
                <Error errorName={errors.video} />
              </div>
            </div>

          </div>
          {/* )} */}

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
              handleSliderTap={handleSliderTap}
            />
          ) : (
            <DrawerButton id={id} title="Service" isSubmitting={isSubmitting} />
          )}

          {
            id ? (
              <>

                <DrawerButton id={id} title="Submit" value="submit" isSubmitting={isSubmitting} onClick={handleSubmitClick} />

              </>
            ) : (
              <>

                <DrawerButton id={id} title="Submit" value="submit" isSubmitting={isSubmitting} onClick={handleSubmitClick} />

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

export default React.memo(DetailDrawer);
