import combinate from "combinate";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";

//internal import
import useAsync from "./useAsync";
import { SidebarContext } from "context/SidebarContext";
import AttributeServices from "services/AttributeServices";
import ProductServices from "services/ProductServices";
import { notifyError, notifySuccess } from "utils/toast";
import SettingServices from "services/SettingServices";
import { showingTranslateValue } from "utils/translate";
import ProjectServices from "services/ProjectServices";

const useProjectSubmit = (id) => {
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);

  // const { data: attribue } = useAsync(AttributeServices.getShowingAttributes);
  // const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  // react ref
  const resetRef = useRef([]);
  const resetRefTwo = useRef("");

  // react hook
  const [tag, setTag] = useState([]);
  const [values, setValues] = useState({});
  let [variants, setVariants] = useState([]); 
  const [variant, setVariant] = useState([]);
  // const [totalStock, setTotalStock] = useState(0);
  // const [quantity, setQuantity] = useState(0);

  const [originalPrice, setOriginalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [handleTap,setHandleTap] =useState("handleProjectTap")
  const [isBasicComplete, setIsBasicComplete] = useState(false);
  const [tapValue, setTapValue] = useState("Anglais");
  const [isCombination, setIsCombination] = useState(false);
  const [attTitle, setAttTitle] = useState([]);
  const [variantTitle, setVariantTitle] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [productId, setProductId] = useState("");
  const [updatedId, setUpdatedId] = useState(id);
  const [imgId, setImgId] = useState("");
  const [isBulkUpdate, setIsBulkUpdate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [resData, setResData] = useState({});
  const [language, setLanguage] = useState(lang);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //states
const [imageUrl, setImageUrl] = useState("");
// const [seo_keywords, setSeo_keywords] = useState("");
// const [defaultReference, setDefaultReference] = useState("");
const [defaultCategory, setDefaultCategory] = useState("");
// const [title_en, setTitle_en] = useState("");
// const [subtitle_en, setSubtitle_en] = useState("");
// const [short_description_en, setShort_description_en] = useState("");
// const [description_en, setDescription_en] = useState("");
// const [seo_description_en, setSeo_description_en] = useState("");
// const [slug_en, setSlug_en] = useState("");

// const [title_fr, setTitle_fr] =useState("");
// const [subtitle_fr, setSubtitle_fr] = useState("");
// const [short_description_fr, setShort_description_fr] = useState("");
// const [description_fr, setDescription_fr] = useState("");
// const [seo_description_fr, setSeo_description_fr] = useState("");
// const [slug_fr, setSlug_fr] = useState("");

// const [title_ar, setTitle_ar] = useState("");
// const [subtitle_ar, setSubtitle_ar] = useState("");
// const [short_description_ar, setShort_description_ar] = useState("");
// const [description_ar, setDescription_ar] = useState("");
// const [seo_description_ar, setSeo_description_ar] = useState("");
// const [slug_ar, setSlug_ar] = useState("");




  // console.log("lang", lang);

  // console.log(
  //   "defaultCategory",
  //   defaultCategory,
  //   "selectedCategory",
  //   selectedCategory
  // );

  // handle click
  const onCloseModal = () => setOpenModal(false);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  // const onSubmit = async (data) => {
  //   console.log(data??'_____');

  //   // console.log('data is data',data)
  //   try {
     


  //           // ... Default ...
  //           setSeo_keywords(data.Seo_Keywords);
  //           setReference(data.Reference);
  //           setCategory(data.Category);
  //           setImage(data.image);

  //           // ... English ...
  //           setTitle_en(data.title_en);
  //           setSubtitle_en(data.subtitle_en);
  //           setShort_description_en(data.short_description_en);
  //           setDescription_en(data.description_en);
  //           setSeo_description_en(data.Seo_Description_en);
  //           setSlug_en(data.slug_en);

  //           // ... French ...
  //           setTitle_fr(data.title_fr);
  //           setSubtitle_fr(data.subtitle_fr);
  //           setShort_description_fr(data.short_description_fr);
  //           setDescription_fr(data.description_fr);
  //           setSeo_description_fr(data.Seo_Description_fr);
  //           setSlug_fr(data.slug_fr);

  //           // ... Arabic ...
  //           setTitle_ar(data.title_ar);
  //           setSubtitle_ar(data.SubTitle_ar);
  //           setShort_description_ar(data.Short_Description_ar);
  //           setDescription_ar(data.description_ar);
  //           setSeo_description_ar(data.seo_description_ar);
  //           setSlug_ar(data.slug_ar);

  //     setIsBasicComplete(true);

  //     const projectData = {
  //       // ... Default ...
  //       seo_keywords: data.Seo_Keywords,
  //       reference: data.Reference,
  //       category:data.Category,
  //       image:data.image,
  //       // ... English ...
  //       title_en: data.title_en,
  //       subtitle_en: data.subtitle_en,
  //       short_description_en: data.short_description_en,
  //       description_en: data.description_en,
  //       seo_description_en: data.Seo_Description_en,
  //       slug_en: data.slug_en,

  //       // ... French ...
  //       title_fr: data.title_fr,
  //       subtitle_fr: data.subtitle_fr,
  //       short_description_fr: data.short_description_fr,
  //       description_fr: data.description_fr,
  //       seo_description_fr: data.Seo_Description_fr,
  //       slug_fr: data.slug_fr,

  //       // ... English ...
  //       title_ar: data.title_ar,
  //       subtitle_ar: data.SubTitle_ar,
  //       short_description_ar: data.Short_Description_ar,
  //       description_ar: data.description_ar,
  //       seo_description_ar: data.seo_description_ar,
  //       slug_ar: data.slug_ar,
      
        
  //     };

  //     console.log(projectData);

  //     // console.log("productData ===========>", productData, "data", data);
  //     // return setIsSubmitting(false);

  //     if (updatedId) {
  //       const res = await ProjectServices.updateProject(updatedId, projectData);
  //       console.log(res);
  //       if (res) {
  //         if (isCombination) {
  //           setIsUpdate(true);
  //           notifySuccess(res.message);
  //           setIsBasicComplete(true);
  //           setIsSubmitting(false);
  //           handleProjectTap("Combination", true);
  //         } else {
  //           setIsUpdate(true);
  //           notifySuccess(res.message);
  //           setIsSubmitting(false);
  //         }
  //       }

  //       if (
  //         tapValue === "Combination" ||
  //         (tapValue !== "Combination" && !isCombination)
  //       ) {
  //         closeDrawer();
  //       }
  //     } else {
  //       const res = await ProjectServices.addProject(projectData);
  //       // console.log("res is ", res);
  //       if (isCombination) {
  //         setUpdatedId(res._id);
  //         setTitle(data.title);
  //         setSubtitle(data.subtitle);
  //         setShort_description(data.short_description);
  //         setDescription(data.description);
  //         setSeo_keywords(data.seo_keywords);
  //         setSeo_description(data.seo_description);
  //         setDefaultCategory(data.defaultCategory);
  //         setDefaultReference(data.defaultReference);
  //         // setSlug(data.slug);
          
  //         setIsUpdate(true);
  //         setIsBasicComplete(true);
  //         setIsSubmitting(false);
  //         handleProjectTap("Combination", true);
  //         notifySuccess("Project Added Successfully!");
  //       } else {
  //         setIsUpdate(false);
  //         notifySuccess("Failed to Add Project");
  //       }

  //       if (
  //         tapValue === "Combination" ||
  //         (tapValue !== "Combination" && !isCombination)
  //       ) {
  //         setIsSubmitting(false);
  //         closeDrawer();
  //       }
  //     }
  //   } catch (err) {
  //     console.log("err", err);
  //     setIsSubmitting(false);
  //     notifyError(err ? err?.response?.data?.message : err.message);
  //     closeDrawer();
  //   }
  // };

  // useEffect(() => {
  //   if (!isDrawerOpen) {
  //     // setSlug("");
  //     setLanguage(lang);
  //     setValue("language", language);
  //     handleProjectTap("Anglais", true);
  //     setResData({});
  //     setValue("sku");
  //     setValue("title");
  //     setValue("slug");
  //     setValue("description");
  //     setValue("quantity");
  //     setValue("stock");
  //     setValue("originalPrice");
  //     setValue("price");
  //     setValue("barcode");
  //     setValue("productId");

  //     setProductId("");
  //     // setValue('show');
  //     setImageUrl([]);
  //     setTag([]);
  //     setVariants([]);
  //     setVariant([]);
  //     setValues({});
  //     // setTotalStock(0);
  //     setSelectedCategory([]);
  //     setDefaultCategory([]);
  //     if (location.pathname === "/products") {
  //       resetRefTwo?.current?.resetSelectedValues();
  //     }

  //     clearErrors("sku");
  //     clearErrors("title");
  //     clearErrors("slug");
  //     clearErrors("description");
  //     clearErrors("stock");
  //     clearErrors("quantity");
  //     setValue("stock", 0);
  //     setValue("costPrice", 0);
  //     setValue("price", 0);
  //     setValue("originalPrice", 0);
  //     clearErrors("show");
  //     clearErrors("barcode");
  //     setIsCombination(false);
  //     setIsBasicComplete(false);
  //     setIsSubmitting(false);
  //     setAttributes([]);

  //     setUpdatedId();
  //     return;
  //   } else {
  //     handleProjectTap("Anglais", true);
  //   }

  //   if (id) {
  //     setIsBasicComplete(true);
  //     (async () => {
  //       try {
  //         const res = await ProjectServices.getProjectById(id);

  //         // console.log("res", res);

  //         if (res) {
  //           setResData(res);
  //           // setSlug(res.slug);
  //           setUpdatedId(res._id);
  //           setValue("title", res.title[language ? language : "en"]);
  //           setValue(
  //             "description",
  //             res.description[language ? language : "en"]
  //           );
  //           setValue("slug", res.slug);
  //           setValue("show", res.show);
  //           setValue("sku", res.sku);
  //           setValue("barcode", res.barcode);
  //           setValue("stock", res.stock);
  //           setValue("productId", res.productId);
  //           setValue("price", res?.prices?.price);
  //           setValue("originalPrice", res?.prices?.originalPrice);
  //           setValue("stock", res.stock);
  //           setProductId(res.productId ? res.productId : res._id);
  //           setBarcode(res.barcode);
  //           setSku(res.sku);

  //           res.categories.map((category) => {
  //             category.name = showingTranslateValue(category?.name, lang);

  //             return category;
  //           });

  //           res.category.name = showingTranslateValue(
  //             res?.category?.name,
  //             lang
  //           );

  //           setSelectedCategory(res.categories);
  //           setDefaultCategory([res?.category]);
  //           setTag(JSON.parse(res.tag));
  //           setImageUrl(res.image);
  //           setVariants(res.variants);
  //           setIsCombination(res.isCombination);
  //           // setQuantity(res?.stock);
  //           // setTotalStock(res.stock);
  //           setOriginalPrice(res?.prices?.originalPrice);
  //           setPrice(res?.prices?.price);
  //         }
  //       } catch (err) {
  //         notifyError(err ? err?.response?.data?.message : err.message);
  //       }
  //     })();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   id,
  //   setValue,
  //   isDrawerOpen,
  //   location.pathname,
  //   clearErrors,
  //   language,
  //   lang,
  // ]);

  //for filter related attribute and extras for every product which need to update
  // useEffect(() => {
  //   const result = attribue
  //     ?.filter((att) => att.option !== "Checkbox")
  //     .map((v) => {
  //       return {
  //         label: showingTranslateValue(v?.title, lang),
  //         value: showingTranslateValue(v?.title, lang),
  //       };
  //     });

  //   setAttTitle([...result]);

  //   const res = Object?.keys(Object.assign({}, ...variants));
  //   const varTitle = attribue?.filter((att) => res.includes(att._id));

  //   // if (variants?.length > 0) {
  //   //   const totalStock = variants?.reduce((pre, acc) => pre + acc.quantity, 0);
  //   //   setTotalStock(Number(totalStock));
  //   // }
  //   setVariantTitle(varTitle);
  // }, [attribue, variants, language, lang]);

  //for adding attribute values
  // const handleAddAtt = (v, el) => {
  //   const result = attribue.filter((att) => {
  //     const attribueTItle = showingTranslateValue(att?.title, lang);
  //     return v.some((item) => item.label === attribueTItle);
  //   });

  //   const attributeArray = result.map((value) => {
  //     const attributeTitle = showingTranslateValue(value?.title, lang);
  //     return {
  //       ...value,
  //       label: attributeTitle,
  //       value: attributeTitle,
  //     };
  //   });

  //   setAttributes(attributeArray);
  // };

  //generate all combination combination
  const handleGenerateCombination = () => {
    if (Object.keys(values).length === 0) {
      return notifyError("Please select a variant first!");
    }

    const result = variants.filter(
      ({
        originalPrice,
        discount,
        price,
        // quantity,
        barcode,
        sku,
        productId,
        image,
        ...rest
      }) => JSON.stringify({ ...rest }) !== "{}"
    );

    // console.log("result", result);

    setVariants(result);

    const combo = combinate(values);

    combo.map((com, i) => {
      if (JSON.stringify(variant).includes(JSON.stringify(com))) {
        return setVariant((pre) => [...pre, com]);
      } else {
        const newCom = {
          ...com,

          originalPrice: originalPrice || 0,
          price: price || 0,
          // quantity: Number(quantity),
          discount: Number(originalPrice - price),
          productId: productId && productId + "-" + (variants.length + i),
          barcode: barcode,
          sku: sku,
          image: imageUrl[0] || "",
        };

        setVariants((pre) => [...pre, newCom]);
        return setVariant((pre) => [...pre, com]);
      }
    });

    setValues({});

    // resetRef?.current?.map((v, i) =>
    //   resetRef?.current[i]?.resetSelectedValues()
    // );
  };

  //for clear selected combination
  const handleClearVariant = () => {
    setVariants([]);
    setVariant([]);
    setValues({});
    resetRef?.current?.map(
      async (v, i) => await resetRef?.current[i]?.resetSelectedValues()
    );

    // console.log('value', selectedList, removedItem, resetRef.current);
  };

  //for edit combination values
  const handleEditVariant = (variant) => {
    setTapValue("Arabic");
    setTapValue("French");
  };

  //for remove combination values
  const handleRemoveVariant = (vari, ext) => {
    // console.log("handleRemoveVariant", vari, ext);
    swal({
      title: `Are you sure to delete this ${ext ? "Extra" : "combination"}!`,
      text: `(If Okay, It will be delete this ${
        ext ? "Extra" : "combination"
      })`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const result = variants.filter((v) => v !== vari);
        setVariants(result);
        // console.log("result", result);
        const {
          originalPrice,
          price,
          discount,
          // quantity,
          barcode,
          sku,
          productId,
          image,
          ...rest
        } = vari;
        const res = variant.filter(
          (obj) => JSON.stringify(obj) !== JSON.stringify(rest)
        );
        setVariant(res);
        setIsBulkUpdate(true);
        // setTimeout(() => setIsBulkUpdate(false), 500);
        const timeOutId = setTimeout(() => setIsBulkUpdate(false), 500);
        return clearTimeout(timeOutId);
      }
    });
  };

  // handle notification for combination and extras
  const handleIsCombination = () => {
    if ((isCombination && variantTitle.length) > 0) {
      swal({
        title: "Are you sure to remove combination from this product!",
        text: "(It will be delete all your combination and extras)",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((value) => {
        // console.log(value);
        if (value) {
          setIsCombination(!isCombination);
          setTapValue("Anglais");
          setVariants([]);
          setVariant([]);
        }
      });
    } else {
      setIsCombination(!isCombination);
      setTapValue("Anglais");
    }
  };

  //for select bulk action images
  const handleSelectImage = (img) => {
    if (openModal) {
      variants[imgId].image = img;
      setOpenModal(false);
    }
  };

  //for select individual combination image
  const handleSelectInlineImage = (id) => {
    setImgId(id);
    setOpenModal(!openModal);
  };

  //this for variant/combination list
  const handleSkuBarcode = (value, name, id) => {
    variants[id][name] = value;
  };

  const handleProjectTap = (e, value, name) => {

    // if (value) {
    //   if (!value)
    //     return notifyError(
    //       `${"Please save product before adding combinations!"}`
    //     );
    // } else {
    //   if (!isBasicComplete)
    //     return notifyError(
    //       `${"Please save product before adding combinations!"}`
    //     );
    // }
    setTapValue(e);
  };

  //this one for combination list
  // const handleQuantityPrice = (value, name, id, variant) => {
  //   // console.log("handleQuantityPrice", name, "value", value);
  //   if (name === "price" && Number(variant.originalPrice) < Number(value)) {
  //     // variants[id][name] = Number(variant.originalPrice);
  //     notifyError("SalePrice must be less then or equal of product price!");
  //     setValue("price", variant.originalPrice);
  //     setIsBulkUpdate(true);
  //     const timeOutId = setTimeout(() => setIsBulkUpdate(false), 100);
  //     return () => clearTimeout(timeOutId);
  //   }
  //   setVariants((pre) =>
  //     pre.map((com, i) => {
  //       if (i === id) {
  //         const updatedCom = {
  //           ...com,
  //           [name]: Math.round(value),
  //         };

  //         return updatedCom;
  //       }
  //       return com;
  //     })
  //   );

  //   const totalStock = variants.reduce(
  //     (pre, acc) => pre + Number(acc.quantity),
  //     0
  //   );
  //   // setTotalStock(Number(totalStock));
  // };

  //for change language in product drawer
  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("title", resData.title[lang ? lang : "en"]);
      setValue("description", resData.description[lang ? lang : "en"]);
    }
  };

  //for handle product slug
  const handleProductSlug = (value) => {
    setValue("slug", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    // setSlug(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  };

  return {
    tag,
    setTag,
    values,
    language,
    register,
    // onSubmit,
    errors,
    // slug,
    openModal,
    // attribue,
    setValues,
    variants,
    imageUrl,
    setImageUrl,
    handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    // handleAddAtt,
    productId,
    onCloseModal,
    isBulkUpdate,
    // globalSetting,
    isSubmitting,
    tapValue,
    setTapValue,
    resetRefTwo,
    handleSkuBarcode,
    handleProjectTap,
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
    // handleQuantityPrice,
    handleSelectImage,
    handleSelectInlineImage,
    handleGenerateCombination,
  };
};

export default useProjectSubmit;
