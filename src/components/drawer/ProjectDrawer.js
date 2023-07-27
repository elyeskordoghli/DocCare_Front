import ReactTagInput from "@pathofdev/react-tag-input";
import { useState } from "react";
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
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import useProductSubmit from "hooks/useProductSubmit";
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

import axios from 'axios';

//internal import

const ProjectDrawer = ({ id }) => {
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
    openModal,
    attribue,
    setValues,
    variants,
    // handleSubmit,
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
    tapValue,
    setTapValue,
    resetRefTwo,
    handleSkuBarcode,
    handleProjectTap,
    selectedCategory,
    setSelectedCategory,
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
  } = useProjectSubmit(id);

  const currency = globalSetting?.default_currency || "$";

  const [imageUrl, setImageUrl] = useState("");
  const [Seo_Keywords, setSeo_keywords] = useState("");
  const [Reference, setDefaultReference] = useState("1");
  const [Category, setDefaultCategory] = useState("1");

  const [title_en, setTitle_en] = useState("");
  const [SubTitle_en, setSubtitle_en] = useState("");
  const [Short_Description_en, setShort_description_en] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [Seo_Description_en, setSeo_description_en] = useState("");
  const [slug_en, setSlug_en] = useState("");

  const [title_fr, setTitle_fr] =useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Assurez-vous d'annuler le comportement par défaut du formulaire si nécessaire

    const data = {
      // ... Default ...
      seo_keywords:Seo_Keywords,
      reference:Reference,
      category:Category,
      image:imageUrl,
      // ... English ...
      title_en:title_en,
      subtitle_en:SubTitle_en,
      short_description_en:Short_Description_en,
      description_en:description_en,
      seo_description_en:Seo_Description_en,
      slug_en:slug_en,

      // ... French ...
      title_fr:title_fr,
      subtitle_fr:subtitle_fr,
      short_description_fr:Short_Description_fr,
      description_fr:Description_fr,
      seo_description_fr:Seo_Description_fr,
      slug_fr:slug_fr,

      // ... Arab ...
      title_ar:title_ar,
      subtitle_ar:SubTitle_ar,
      short_description_ar:Short_Description_ar,
      description_ar:description_ar,
      seo_description_ar:seo_description_ar,
      slug_ar:slug_ar,
    };

    const res = await ProjectServices.addProject(data);


  };
  

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
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateProduct")}
            description={t("UpdateProductDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("DrawerAddProduct")}
            description={t("AddProductDescription")}
          />
        )}
      </div>

      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
        <SwitchToggleForCombination
          product
          handleProcess={handleIsCombination}
          processOption={isCombination}
        />

        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Anglais"
              handleTap={handleProjectTap}
            />
          </li>

          <li className="mr-2">
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
          </li>

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


        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductImage")} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    product
                    folder="product"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                  />
                </div>
              </div>


             {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"ProductImage"} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    // name="imageUrl"
                    // product
                    folder="project"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    // onChange={(e) => setImageUrl(e.target.files[0])}

                  />
                </div>
              </div> */}

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Title (en) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`title_en`, {
                      required: "Title is required!",
                    })}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="title_en"
                    type="text"
                    placeholder={"Project Title (en) "}
                    // onBlur={(e) => handleProductSlug(e.target.value)}
                    onChange={(e) => setTitle_en(e.target.value)}
                    value={title_en}
                  />
                  {title_en??''} TTEEST
                  <Error errorName={errors.title_en} />
                </div>
              </div>



              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project SubTitle (en)  "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`SubTitle_en`, {
                      required: "SubTitle is required!",
                    })}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="SubTitle_en"
                    type="text"
                    placeholder={"Project SubTitle (en)  "}
                    onChange={(e) => setSubtitle_en(e.target.value)}
                    value={SubTitle_en}                 
                    />
                  <Error errorName={errors.SubTitle_en} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Short_Description (en) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    {...register("Short_Description_en", {
                      required: "Short_Description is required!",
                    })}
                    name="Short_Description_en"
                    placeholder={"Project Short_Description (en) "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setShort_description_en(e.target.value)}
                    value={Short_Description_en}   
                  />
                    {Short_Description_en??''} TTEEST

                  <Error errorName={errors.Short_Description_en} />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Description (en) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    {...register("description_en", {
                      required: "Description is required!",
                    })}
                    name="description_en"
                    placeholder={"Project Description (en) "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setDescription_en(e.target.value)}
                    value={description_en}
                  />
                                      {description_en??''} TTEEST

                  <Error errorName={errors.description_en} />
                </div>
              </div>



              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
               <LabelArea label={"Project Seo Keywords  "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`Seo_Keywords`, {
                      required: "Seo Keywords is required!",
                    })}
                    name="Seo_Keywords"
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    type="text"
                    placeholder={"Project Seo Keywords  "}
                    onChange={(e) => setSeo_keywords(e.target.value)}
                    value={Seo_Keywords}                 
                    />
                  <Error errorName={errors.Seo_Keywords} />
                </div>
              </div>


              {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Seo Keywords  "} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                   {...register("Seo_Keywords", {
                    required: "Seo Keywords is required!",
                  })}
                    name="Seo_Keywords"
                    placeholder={"Project Seo Keywords  "}
                    // tags={tag}
                    onChange={(e) => setSeo_keywords(e.target.value)}
                    value={Seo_Keywords}
                  />
                  <Error errorName={errors.Seo_Keywords} />

                </div>
              </div> */}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={"Project Seo Description (en)"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`Seo_Description_en`, {
                      required: "Seo Keywords is required!",
                    })}
                    name="Seo_Description_en"
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    type="text"
                    placeholder={"Project Seo description  "}
                    onChange={(e) => setSeo_description_en(e.target.value)}
                    value={Seo_Description_en}                 
                    />
                  <Error errorName={errors.Seo_Description_en} />
                </div>
              </div>

            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
               <LabelArea label={"Project Seo Description (en)"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`Seo_Description_en`, {
                      required: "Seo Description is required!",
                    })}
                    name="Seo_Description_en"
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    type="text"
                    placeholder={"Project Seo Keywords  "}
                    onChange={(e) => setSeo_description_en(e.target.value)}
                    value={Seo_Description_en}                 
                    />
                  <Error errorName={errors.Seo_Description_en} />
                </div>
              </div> */}

              {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Seo Description (en) "} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                  
                    name="Seo_Description_en"
                    placeholder={"Project Seo Description (en) "}
                    tags={tag}
                    onChange={(e) => setSeo_description_en(e.target.value)}
                    value={Seo_Description_en}
                    />

                </div>
              </div> */}







              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Category"} />
                <div className="col-span-8 sm:col-span-4">
                  <ParentCategory
                  {...register("Category", {
                    required: "Category is required!",
                  })}
                    name="Category"
                    lang={language}
                    value={Category}
                    disabled
                  />
                  <Error errorName={errors.Category} />

                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Reference"} />
                <div className="col-span-8 sm:col-span-4">
                  <ParentCategory
                    name="Reference"
                    lang={language}
                    value={Reference}
                    disabled
                  />

                </div>
              </div>

              {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("DefaultCategory")} />
                <div className="col-span-8 sm:col-span-4">
                  <Multiselect
                    displayValue="name"
                    isObject={true}
                    singleSelect={true}
                    ref={resetRefTwo}
                    hidePlaceholder={true}
                    onKeyPressFn={function noRefCheck() {}}
                    onRemove={function noRefCheck() {}}
                    onSearch={function noRefCheck() {}}
                    onSelect={(v) => setDefaultCategory(v)}
                    selectedValues={defaultCategory}
                    options={selectedCategory}
                    placeholder={"Default Category"}
                  ></Multiselect>
                </div>
              </div> */}




              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Slug"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`slug_en`, {
                      required: "Project Slug is required!",
                    })}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="slug_en"
                    type="text"
                    defaultValue={slug}
                    placeholder={"Project Slug"}
                    onChange={(e) => setSlug_en(e.target.value)}
                    value={slug_en}                  
                    />
                  <Error errorName={errors.slug_en} />
                </div>
              </div>
            </div>
          )}

          {tapValue === "French" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">

             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Title (fr) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`title_fr`, {
                      required: "Title is required!",
                    })}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="title_fr"
                    type="text"
                    placeholder={"Project Title (fr) "}
                    onChange={(e) => setTitle_fr(e.target.value)}
                    value={title_fr}   
                   />
                  <Error errorName={errors.title_fr} />
                </div>
              </div>



              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project SubTitle (fr)  "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`subtitle_fr`, {
                      required: "SubTitle is required!",
                    })}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="subtitle_fr"
                    type="text"
                    placeholder={"Project SubTitle  (fr)  "}
                    onChange={(e) => setSubtitle_fr(e.target.value)}
                    value={subtitle_fr}  
                    />
                  <Error errorName={errors.subtitle_fr} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Short_Description (fr) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    {...register("Short_Description_fr", {
                      required: "Short_Description is required!",
                    })}
                    name="Short_Description_fr"
                    placeholder={"Project Short_Description (fr) "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setShort_description_fr(e.target.value)}
                    value={Short_Description_fr}  
                  />
                  <Error errorName={errors.Short_Description_fr} />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Description (fr) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    {...register("Description_fr", {
                      required: "Description is required!",
                    })}
                    name="Description_fr"
                    placeholder={"Project Description (fr) "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setDescription_fr(e.target.value)}
                    value={Description_fr}  
                  />
                  <Error errorName={errors.Description_fr} />
                </div>
              </div>

              {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Project Seo Keywords (fr)")} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                    placeholder={t("Project Seo Keywords (fr)")}
                    tags={tag}
                    onChange={(newTags) => setTag(newTags)}
                  />
                </div>
              </div> */}


          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={"Project Seo Description (fr)"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`Seo_Description_fr`, {
                      required: "Seo Description is required!",
                    })}
                    name="Seo_Description_fr"
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    type="text"
                    placeholder={"Project Seo description  "}
                    onChange={(e) => setSeo_description_fr(e.target.value)}
                    value={Seo_Description_fr}                 
                    />
                  <Error errorName={errors.Seo_Description_fr} />
                </div>
              </div>



              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Slug"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`slug_fr`, {
                      required: "Project Slug is required!",
                    })}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="slug_fr"
                    type="text"
                    defaultValue={slug}
                    placeholder={"Project Slug (fr)"}
                    onChange={(e) => setSlug_fr(e.target.value)}
                    value={slug_fr}  
                 />
                  <Error errorName={errors.slug_fr} />
                </div>
              </div>
            </div>
          )}

          {tapValue === "Arabic" && (
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Title  "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`title_ar`, {
                      required: "Title is required!",
                    })}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="title_ar"
                    type="text"
                    placeholder={"Project Title (ar)"}
                    onChange={(e) => setTitle_ar(e.target.value)}
                    value={title_ar}  
                  />
                  <Error errorName={errors.title_ar} />
                </div>
              </div>



              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project SubTitle (ar)  "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`SubTitle_ar`, {
                      required: "SubTitle is required!",
                    })}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="SubTitle_ar"
                    type="text"
                    placeholder={"Project SubTitle (ar)  "}
                    onChange={(e) => setSubtitle_ar(e.target.value)}
                    value={SubTitle_ar}  
                    />
                  <Error errorName={errors.SubTitle_ar} />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Short_Description (fr) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    {...register("Short_Description_ar", {
                      required: "Short_Description is required!",
                    })}
                    name="Short_Description_ar"
                    placeholder={"Project Short_Description (fr) "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setShort_description_ar(e.target.value)}
                    value={Short_Description_ar}  
                  />
                  <Error errorName={errors.Short_Description_ar} />
                </div>
              </div>


              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Description (fr) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Textarea
                    className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    {...register("description_ar", {
                      required: "Description is required!",
                    })}
                    name="description_ar"
                    placeholder={"Project Description (fr) "}
                    rows="4"
                    spellCheck="false"
                    onChange={(e) => setDescription_ar(e.target.value)}
                    value={description_ar}  
                  />
                  <Error errorName={errors.description_ar} />
                </div>
              </div>


              {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Project Seo Keywords (ar)")} />
                <div className="col-span-8 sm:col-span-4">
                  <ReactTagInput
                    placeholder={t("Project Seo Keywords (ar)")}
                    tags={tag}
                    onChange={(newTags) => setTag(newTags)}
                  />
                </div>
              </div> */}

          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={"Project Seo Description (ar) "} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`seo_description_ar`, {
                      required: "Seo Description is required!",
                    })}
                    name="seo_description_ar"
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    type="text"
                    placeholder={"Project Seo description  "}
                    onChange={(e) => setSeo_description_ar(e.target.value)}
                    value={seo_description_ar}                 
                    />
                  <Error errorName={errors.seo_description_ar} />
                </div>
              </div>


            



              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={"Project Slug"} />
                <div className="col-span-8 sm:col-span-4">
                  <Input
                    {...register(`slug_ar`, {
                      required: "Project Slug is required!",
                    })}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    name="slug_ar"
                    type="text"
                    defaultValue={slug}
                    placeholder={"Project Slug (fr)"}
                    onChange={(e) => setSlug_ar(e.target.value)}
                    value={slug_ar}                   
                />
                  <Error errorName={errors.slug_ar} />
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
              handleProjectTap={handleProjectTap}
            />
          ) : (
            <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
          )}

          {tapValue === "Arabic" && (
            <DrawerButton id={id} title="Submit" isSubmitting={isSubmitting} />
          )}
           {tapValue === "Anglais" && (
            <DrawerButton id={id} title="Next" isSubmitting={isSubmitting} />
          )}
           {tapValue === "French" && (
            <DrawerButton id={id} title="Next" isSubmitting={isSubmitting} />
          )}
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

export default React.memo(ProjectDrawer);
