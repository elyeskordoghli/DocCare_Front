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
import ReferencesServices from "services/ReferencesServices";

const useReferenceSubmit = (id,data) => {
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
  const [handleTap,setHandleTap] =useState("handleReferenceTap");
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
  const [name_en, setName_en] = useState("");
  const [Short_Description_en, setShort_description_en] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [Seo_Description_en, setSeo_description_en] = useState("");

  const [name_fr, setName_fr] = useState("");
  const [Short_Description_fr, setShort_description_fr] = useState("");
  const [Description_fr, setDescription_fr] = useState("");
  const [Seo_Description_fr, setSeo_description_fr] = useState("");

  const [name_ar, setName_ar] = useState("");
  const [Short_Description_ar, setShort_description_ar] = useState("");
  const [description_ar, setDescription_ar] = useState("");
  const [seo_description_ar, setSeo_description_ar] = useState("");

 
  const [owner,setOwner]=useState("");
  const [views,setViews]=useState("");

  

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

 useEffect(() => {
    if (!isDrawerOpen) {
      // setSlug("");
      setLanguage(lang);
      setValue("language", language);
      handleReferenceTap("Anglais", true);
      setResData({});
      setValue("image");
      setValue("tiitle_en");
      setValue("title_fr");
      setValue("title_ar");

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
      setValue("Responsibilities_en");
      setValue("Responsibilities_fr");
      setValue("Responsibilities_ar");
      setValue("Requirements_en");
      setValue("Requirements_fr");
      setValue("Requirements_ar");

     

      

      // setValue("quantity");
      // setValue("stock");
      // setValue("originalPrice");
      // setValue("price");
      // setValue("barcode");
      // setValue("productId");

      // setProductId("");
      // // setValue('show');
      setImageUrl([]);
      // setTag([]);
      // setVariants([]);
      // setVariant([]);
      // setValues({});
      // // setTotalStock(0);
      // setSelectedCategory([]);
      // setDefaultCategory([]);
      if (location.pathname === "/products") {
        resetRefTwo?.current?.resetSelectedValues();
      }

      clearErrors("sku");
      clearErrors("title");
      clearErrors("slug");
      clearErrors("description");
      clearErrors("stock");
      // clearErrors("quantity");
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
      handleReferenceTap("Anglais", true);
    }

    if (id) {
      setIsBasicComplete(true);
      (async () => {
        try {
          const res = await ReferencesServices.getReferenceById(id);

          console.log("res", res);

          if (res) {
            setResData(res);
            setValue("name_en", res.name_en);
            setValue("name_fr", res.name_fr);
            setValue("name_ar", res.name_ar);
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
            // setDefaultCategory([res?.category]);
            setTag(JSON.parse(res.tag));
            setImageUrl(res.image);
            setVariants(res.variants);
            setIsCombination(res.isCombination);
            // setQuantity(res?.stock);
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
  
  const handleReferenceTap = (e, value, name) => {

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
  // const handleProductSlug = (value) => {
  //   setValue("slug", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  //   setSlug(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  // };

  return {
    tag,
    setTag,
    values,
    language,
    register,
    // onSubmit,
    errors,
    openModal,
    attribue,
    setValues,
    variants,
    tapValue,
    setTapValue,
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
    resetRefTwo,
    handleSkuBarcode,
    handleReferenceTap,
    selectedCategory,
    setSelectedCategory,
    // defaultCategory,
    // handleProductSlug,
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

export default useReferenceSubmit;
