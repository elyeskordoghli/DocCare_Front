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
import ReferencesServices from "services/ReferencesServices";
import useReferenceSubmit from "hooks/useReferenceSubmit";
//internal import

const ReferenceDrawer = ({ id, data, isLoading, setIsLoading, isCheck, setIsCheck }) => {
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
    handleServiceTap,
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
  } = useReferenceSubmit(id, data);

  const currency = globalSetting?.default_currency || "$";
  // closeDrawer();
  const { closeDrawer } = useContext(SidebarContext)

  const [imageUrl, setImageUrl] = useState("");
  const [oldImageUrl, setOldImageUrl] = useState("");
  const [name, setName] = useState("");
  const [working_field, setWorking_field] = useState("");


  const {
    setValue,

  } = useForm();
  console.log("reference drawer_id", id);
  const [retsData, setRestData] = useState({});



  const handleSubmit = async (e) => {
    e.preventDefault();

    const Error = ({ errorName }) => {
      return (
        <div className="text-red-500 text-sm mt-1">{errorName && errorName.message}</div>
      );
    };

    const formData = new FormData();
    formData.append('name', name);
    formData.append('working_field', working_field);
    formData.append('image', imageUrl);
    console.log(formData);
    if (id) {

      setIsLoading(true);
      const res = await ReferencesServices.updateReference(id, formData, {
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

      const res = await ReferencesServices.addReference(formData, {
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

    const res = await ReferencesServices.getReferenceById(id);
    console.log('referenceInputForm', res.data)

    setName(res.data.name);
    setWorking_field(res.data.working_field);
    setImageUrl(res.data.image);
    setImageBinary(res.data.image);
    setOldImageUrl(res.data.image);
    console.log('hahahahahah', oldImageUrl);
  };


  useEffect(() => {
    if (id && id !== undefined) {
      initFormForUpdate(id);
    } else {
      setName("");
      setWorking_field("");
      setImageUrl("");
      setImageBinary("");
      setOldImageUrl("")
      setIsCheck([]);

    }
  }, [id]);
  const handleSubmitClick = () => {
    // Place your submission logic here
  };


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
            title={"Update Reference"}
            description={"Update Reference Description"}
          />
        ) : (
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={"Add Reference"}
            description={"Add Reference Description"}
          />
        )}
      </div>
    

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit} className="block" id="block">
         
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Reference Image"} />
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
                <LabelArea label={" Reference Name "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="name"
                    type="text"
                    placeholder={"Reference Name "}
                    // onBlur={(e) => handleProductSlug(e.target.value)}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <Error errorName={errors.name} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Reference Work Field "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="working_field"
                    type="text"
                    placeholder={"Reference Work Field "}
                    onChange={(e) => setWorking_field(e.target.value)}
                    value={working_field}
                  />
                  <Error errorName={errors.working_field} />
                </div>
              </div>
            </div>
            <DrawerButton id={id} title="Submit" isSubmitting={isSubmitting} />
         

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

     
      </Scrollbars>




    </>
  );
};

export default React.memo(ReferenceDrawer);
