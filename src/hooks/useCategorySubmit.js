import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import CategoryServices from "services/CategoryServices";
import { notifyError, notifySuccess } from "utils/toast";

const useCategorySubmit = (id, data) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [checked, setChecked] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [children, setChildren] = useState([]);
  const [language, setLanguage] = useState(lang);
  const [published, setPublished] = useState(true);
  const [selectCategoryName, setSelectCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name_en, setName_en] = useState("");
  const [name_fr, setName_fr] = useState("");
  const [name_ar, setName_ar] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  // console.log("lang", lang, language);
// console.log('id',id);
  // const onSubmit = async (data) => {
  //   try {
  //     setIsSubmitting(true);
  //     const categoryData = {
  //       name_en: data.name_en,
  //       name_fr: data.name_fr,
  //       name_ar: data.name_ar,
  //     };

  //    console.log('category submit', categoryData);

  //     if (id) {
  //       const res = await CategoryServices.updateCategory(id, categoryData);
  //       setIsUpdate(true);
  //       setIsSubmitting(false);
  //       notifySuccess(res.message);
  //       closeDrawer();
  //       reset();
  //     } else {
  //       const res = await CategoryServices.addCategory(categoryData);
  //       setIsUpdate(true);
  //       setIsSubmitting(false);
  //       notifySuccess(res.message);
  //       closeDrawer();
  //     }
  //   } catch (err) {
  //     setIsSubmitting(false);
  //     notifyError(err ? err?.response?.data?.message : err?.message);
  //     closeDrawer();
  //   }
  // };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("name", resData.name[lang ? lang : "en"]);
      setValue("description", resData.description[lang ? lang : "en"]);
    }
  };

  // useEffect(() => {
  //   if (!isDrawerOpen) {
  //     setResData({});
  //     setValue("name_en");
  //     setValue("name_fr");
  //     setValue("name_ar");
  //     clearErrors("name_en");
  //     clearErrors("name_fr");
  //     clearErrors("name_ar");
   
  //     // clearErrors("parentName");
  //     // clearErrors("description");
  //     setSelectCategoryName("Home");
  //     setLanguage(lang);
  //     setValue("language", language);

  //     if (data !== undefined && data[0]?._id !== undefined) {
  //       setChecked(data[0]._id);
  //     }
  //     return;
  //   }
  //   if (id) {
  //     (async () => {
  //       try {
  //         const res = await CategoryServices.getCategoryById(id);
  //         console.log("res category", res);

  //         if (res) {
  //           setResData(res);
  //           setName_en(res.data.name_en);
  //           setName_fr(res.data.name_fr);
  //           setName_ar(res.data.name_ar);

  //           // setValue("name_en", res.name_en);
  //           // setValue("name_fr", res.name_fr);
  //           // setValue("name_ar", res.name_ar);
  //         }
  //       } catch (err) {
  //         notifyError(err ? err.response.data.message : err.message);
  //       }
  //     })();
  //   }
  // }, [id, setValue, isDrawerOpen, language, clearErrors, data, lang]);

  return {
    register,
    handleSubmit,
    // onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    children,
    setChildren,
    published,
    setPublished,
    checked,
    setChecked,
    isSubmitting,
    selectCategoryName,
    setSelectCategoryName,
    handleSelectLanguage,
  };
};

export default useCategorySubmit;
