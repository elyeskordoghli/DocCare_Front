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
import ServiceServices from "services/ServiceServices";

const useServiceSubmit = (id,data) => {
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);

  const { data: attribue } = useAsync(AttributeServices.getShowingAttributes);
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

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

  // const [imageUrl, setImageUrl] = useState([]);
  // const [title,setTitle]=useState("");
  // const [subtitle,setSubtitle]=useState("");
  // const [short_description,setShort_description]=useState("");
  // const [description,setDescription]=useState("");
  // const [seo_keywords,setSeo_keywords]=useState("");
  // const [seo_description,setSeo_description]=useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [seo_keywords, setSeo_keywords] = useState("");
  const [title_en, setTitle_en] = useState("");
  const [SubTitle_en, setSubtitle_en] = useState("");
  const [Short_Description_en, setShort_description_en] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [Seo_Description_en, setSeo_description_en] = useState("");

  const [title_fr, setTitle_fr] = useState("");
  const [subtitle_fr, setSubtitle_fr] = useState("");
  const [Short_Description_fr, setShort_description_fr] = useState("");
  const [Description_fr, setDescription_fr] = useState("");
  const [Seo_Description_fr, setSeo_description_fr] = useState("");

  const [title_ar, setTitle_ar] = useState("");
  const [SubTitle_ar, setSubtitle_ar] = useState("");
  const [Short_Description_ar, setShort_description_ar] = useState("");
  const [description_ar, setDescription_ar] = useState("");
  const [seo_description_ar, setSeo_description_ar] = useState("");
  const [catalogueUrl, setCatalogueUrl] = useState("");
  const [iconUrl, setIconUrl] = useState("");

  const [defaultCategory, setDefaultCategory] = useState([]);
  const [defaultReference,setDefaultReference]=useState("");
  const [slug,setSlug]=useState("");

console.log('id',id)

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

  const onSubmit = async (data) => {
    // console.log('data is data',data)
    try {
      setIsSubmitting(true);
      if (!imageUrl) return notifyError("Image is required!");

      if (!title) {
        setIsSubmitting(false);
        return notifyError("Project Title is required!");
      }

      if (!subtitle) {
        setIsSubmitting(false);
        return notifyError("Project subtitle is required!");
      }

      if (!short_description) {
        setIsSubmitting(false);
        return notifyError("short description is required!");
      }

      if (!description) {
        setIsSubmitting(false);
        return notifyError("description is required!");
      }

      if (!seo_keywords) {
        setIsSubmitting(false);
        return notifyError("seo_keywords is required!");
      }

      if (!seo_description) {
        setIsSubmitting(false);
        return notifyError("seo_description is required!");
      }

      if (!defaultCategory[0]) {
        setIsSubmitting(false);
        return notifyError("Default Category is required!");
      }

      if (!defaultReference[0]) {
        setIsSubmitting(false);
        return notifyError("Default Reference is required!");
      }

      if (!slug) {
        setIsSubmitting(false);
        return notifyError("slug is required!");
      }


      // setTitle(data.title);
      // setSubtitle(data.subtitle);
      // setShort_description(data.short_description);
      // setDescription(data.description);
      // setSeo_keywords(data.seo_keywords);
      // setSeo_description(data.seo_description);
      // setDefaultCategory(data.defaultCategory);
      // setDefaultReference(data.defaultReference);
      // setSlug(data.slug);
      // setIsBasicComplete(true);

      // const serviceData = {
      //   // ... autres champs déjà définis ...
      //   image: data.image,
      //   icon: data.icon,
      //   title_fr: data.title_fr,
      //   title_r: data.title_ar,
      //   subtitle_en: data.subtitle_en,
      //   subtitle_fr: data.subtitle_fr,
      //   subtitle_ar: data.subtitle_ar,
      //   description_en: data.description_en,
      //   description_fr: data.description_fr,
      //   description_ar: data.description_ar,
      //   short_description_en: data.short_description_en,
      //   short_description_fr: data.short_description_fr,
      //   short_description_ar: data.short_description_ar,
      //   seo_description_en: data.seo_description_en,
      //   seo_description_fr: data.seo_description_fr,
      //   seo_description_ar: data.seo_description_ar,
      //   seo_keywords: data.seo_keywords,
      //   catalogue : data.catalogue
  
      
      // };
      const formData = new FormData();
      formData.append('title_en', title_en);
      formData.append('subtitle_en', SubTitle_en);
      formData.append('short_description_en', Short_Description_en);
      formData.append('description_en', description_en);
      formData.append('seo_description_en', Seo_Description_en);
    
      formData.append('title_fr', title_fr);
      formData.append('subtitle_fr', subtitle_fr);
      formData.append('short_description_fr', Short_Description_fr);
      formData.append('description_fr', Description_fr);
      formData.append('seo_description_fr', Seo_Description_fr);
    

      formData.append('title_ar', title_ar);
      formData.append('subtitle_ar', SubTitle_ar);
      formData.append('short_description_ar', Short_Description_ar);
      formData.append('description_ar', description_ar);
      formData.append('seo_description_ar', seo_description_ar);
     
      formData.append('seo_keywords', seo_keywords);
      formData.append('image', imageUrl);
      formData.append('icon', iconUrl);
      formData.append('catalogue', catalogueUrl);




      // console.log(formData);

        // const res = await ServiceServices.addService(formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });
      
      // console.log("productData ===========>", productData, "data", data);
      // return setIsSubmitting(false);
console.log('serviecData',formData);
      if (id) {
        const res = await ServiceServices.updateService(id, serviceData);
       console.log("res is ", res);

        if (res) {
          if (isCombination) {
            setIsUpdate(true);
            notifySuccess(res.message);
            setIsBasicComplete(true);
            setIsSubmitting(false);
            handleServiceTap("Combination", true);
          } else {
            setIsUpdate(true);
            notifySuccess(res.message);
            setIsSubmitting(false);
          }
        }

        if (
          tapValue === "Combination" ||
          (tapValue !== "Combination" && !isCombination)
        ) {
          closeDrawer();
        }
      } else {
        const res = await ServiceServices.addService(serviceData);
        // console.log("res is ", res);
        if (isCombination) {
          setUpdatedId(res.id);
          setTitle(data.title);
          setSubtitle(data.subtitle);
          setShort_description(data.short_description);
          setDescription(data.description);
          setSeo_keywords(data.seo_keywords);
          setSeo_description(data.seo_description);
          setDefaultCategory(data.defaultCategory);
          setDefaultReference(data.defaultReference);
          setSlug(data.slug);
          
          setIsUpdate(true);
          setIsBasicComplete(true);
          setIsSubmitting(false);
          handleServiceTap("Combination", true);
          notifySuccess("Product Added Successfully!");
        } else {
          setIsUpdate(false);
          notifySuccess("Failed to Add Product");
        }

        if (
          tapValue === "Combination" ||
          (tapValue !== "Combination" && !isCombination)
        ) {
          setIsSubmitting(false);
          closeDrawer();
        }
      }
    } catch (err) {
      console.log("err", err);
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err.message);
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setSlug("");
      setLanguage(lang);
      setValue("language", language);
      handleServiceTap("Anglais", true);
      setResData({});
      setValue("image");
      setValue("icon");
      setValue("title_en");
      setValue("title_fr");
      setValue("title_ar");
      setValue("subtitle_en");
      setValue("subtitle_fr");
      setValue("subtitle_ar");
      setValue("short_description_en");
      setValue("short_description_fr");
      setValue("short_description_ar");
      setValue("description_en");
      setValue("description_fr");
      setValue("description_ar");
      setValue("seo_keywords");
      setValue("seo_description_en");
      setValue("seo_description_fr");
      setValue("seo_description_ar");
      setValue("catalogue");

      

      // setValue("quantity");
      // setValue("stock");
      // setValue("originalPrice");
      // setValue("price");
      // setValue("barcode");
      // setValue("productId");

      setProductId("");
      // setValue('show');
      setImageUrl([]);
      setTag([]);
      setVariants([]);
      setVariant([]);
      setValues({});
      // setTotalStock(0);
      setSelectedCategory([]);
      setDefaultCategory([]);
      if (location.pathname === "/products") {
        resetRefTwo?.current?.resetSelectedValues();
      }

      clearErrors("sku");
      clearErrors("title");
      clearErrors("slug");
      clearErrors("description");
      clearErrors("stock");
      clearErrors("quantity");
      setValue("stock", 0);
      setValue("costPrice", 0);
      setValue("price", 0);
      setValue("originalPrice", 0);
      clearErrors("show");
      clearErrors("barcode");
      setIsCombination(false);
      setIsBasicComplete(false);
      setIsSubmitting(false);
      setAttributes([]);

      setUpdatedId();
      return;
    } else {
      handleServiceTap("French", true);
    }

    if (id) {
      setIsBasicComplete(true);
      (async () => {
        try {
          const res = await ServiceServices.getServiceById(id);

          console.log("res", res);

          if (res) {
            setResData(res);
            setValue("title_en", res.title_en);
            setValue("title_fr", res.title_fr);
            setValue("title_ar", res.title_ar);
            setValue("slug", res.slug);
            setValue("show", res.show);
            setValue("sku", res.sku);
            setValue("barcode", res.barcode);
            setValue("stock", res.stock);
            setValue("productId", res.productId);
            setValue("price", res?.prices?.price);
            setValue("originalPrice", res?.prices?.originalPrice);
            setValue("stock", res.stock);
            setProductId(res.productId ? res.productId : res._id);
            setBarcode(res.barcode);
            setSku(res.sku);

            res.categories.map((category) => {
              category.name = showingTranslateValue(category?.name, lang);

              return category;
            });

            res.category.name = showingTranslateValue(
              res?.category?.name,
              lang
            );

            setSelectedCategory(res.categories);
            setDefaultCategory([res?.category]);
            setTag(JSON.parse(res.tag));
            setImageUrl(res.image);
            setVariants(res.variants);
            setIsCombination(res.isCombination);
            setQuantity(res?.stock);
            // setTotalStock(res.stock);
            setOriginalPrice(res?.prices?.originalPrice);
            setPrice(res?.prices?.price);
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err.message);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
    setValue,
    isDrawerOpen,
    location.pathname,
    clearErrors,
    language,
    lang,
    data
  ]);

  //for filter related attribute and extras for every product which need to update
  useEffect(() => {
    const result = attribue
      ?.filter((att) => att.option !== "Checkbox")
      .map((v) => {
        return {
          label: showingTranslateValue(v?.title, lang),
          value: showingTranslateValue(v?.title, lang),
        };
      });

    setAttTitle([...result]);

    const res = Object?.keys(Object.assign({}, ...variants));
    const varTitle = attribue?.filter((att) => res.includes(att._id));

    // if (variants?.length > 0) {
    //   const totalStock = variants?.reduce((pre, acc) => pre + acc.quantity, 0);
    //   setTotalStock(Number(totalStock));
    // }
    setVariantTitle(varTitle);
  }, [attribue, variants, language, lang]);

  //for adding attribute values
  const handleAddAtt = (v, el) => {
    const result = attribue.filter((att) => {
      const attribueTItle = showingTranslateValue(att?.title, lang);
      return v.some((item) => item.label === attribueTItle);
    });

    const attributeArray = result.map((value) => {
      const attributeTitle = showingTranslateValue(value?.title, lang);
      return {
        ...value,
        label: attributeTitle,
        value: attributeTitle,
      };
    });

    setAttributes(attributeArray);
  };

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
        quantity,
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
          quantity: Number(quantity),
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
          quantity,
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
      setTapValue("French");
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
  
  const handleServiceTap = (e, value, name) => {

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
  const handleQuantityPrice = (value, name, id, variant) => {
    // console.log("handleQuantityPrice", name, "value", value);
    if (name === "price" && Number(variant.originalPrice) < Number(value)) {
      // variants[id][name] = Number(variant.originalPrice);
      notifyError("SalePrice must be less then or equal of product price!");
      setValue("price", variant.originalPrice);
      setIsBulkUpdate(true);
      const timeOutId = setTimeout(() => setIsBulkUpdate(false), 100);
      return () => clearTimeout(timeOutId);
    }
    setVariants((pre) =>
      pre.map((com, i) => {
        if (i === id) {
          const updatedCom = {
            ...com,
            [name]: Math.round(value),
          };

          return updatedCom;
        }
        return com;
      })
    );

    const totalStock = variants.reduce(
      (pre, acc) => pre + Number(acc.quantity),
      0
    );
    // setTotalStock(Number(totalStock));
  };

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
    setSlug(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  };

  return {
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
    imageUrl,
    setImageUrl,
    handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,
    productId,
    onCloseModal,
    isBulkUpdate,
    globalSetting,
    isSubmitting,
    tapValue,
    setTapValue,
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
  };
};

export default useServiceSubmit;
