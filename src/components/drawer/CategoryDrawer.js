import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import SwitchToggle from "components/form/SwitchToggle";
import TextAreaCom from "components/form/TextAreaCom";
import Title from "components/form/Title";
import Uploader from "components/image-uploader/Uploader";
import useCategorySubmit from "hooks/useCategorySubmit";
import SelectProject from "components/form/SelectProject";
import Tree from "rc-tree";
import { SidebarContext } from "context/SidebarContext";
import React , { useEffect, useState ,useContext}from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";
//internal import
import CategoryServices from "services/CategoryServices";
import { notifyError, notifySuccess } from "utils/toast";
import { showingTranslateValue } from "utils/translate";
import ProjectServices from "services/ProjectServices";

const CategoryDrawer = ({ id, data, lang,isLoading, setIsLoading ,  isCheck , setIsCheck }) => {
  const { t } = useTranslation();
  const { closeDrawer } = useContext(SidebarContext)
 

  const {
    checked,
    register,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    published,
    setPublished,
    setChecked,
    selectCategoryName,
    setSelectCategoryName,
    handleSelectLanguage,
    isSubmitting,
  } = useCategorySubmit(id, data);

  // console.log("image=======>", imageUrl);

  const STYLE = `
  .rc-tree-child-tree {
    display: hidden;
  }
  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }
`;
  const [name_en, setName_en] = useState("");
  const [name_fr, setName_fr] = useState("");
  const [name_ar, setName_ar] = useState("");


  const motion = {
    motionName: "node-motion",
    motionAppear: false,
    onAppearStart: (node) => {
      return { height: 0 };
    },
    onAppearActive: (node) => ({ height: node.scrollHeight }),
    onLeaveStart: (node) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        title: showingTranslateValue(category.name, lang),
        key: category.id,
        // children:
        //   category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const findObject = (obj, target) => {
    return obj.id === target
      ? obj
      : obj?.children?.reduce(
        (acc, obj) => acc ?? findObject(obj, target),
        undefined
      );
  };

  const handleSelect = async (key) => {
    // console.log('key', key, 'id', id);
    if (key === undefined) return;
    if (id) {
      const parentCategoryId = await CategoryServices.getCategoryById(key);

      if (id === key) {
        return notifyError("This can't be select as a parent category!");
      } else if (id === parentCategoryId.parentId) {
        return notifyError("This can't be select as a parent category!");
      } else {
        if (key === undefined) return;
        setChecked(key);

        const obj = data[0];
        const result = findObject(obj, key);

        setSelectCategoryName(showingTranslateValue(result?.name, lang));
      }
    } else {
      if (key === undefined) return;
      setChecked(key);

      const obj = data[0];
      const result = findObject(obj, key);

      setSelectCategoryName(showingTranslateValue(result?.name, lang));
    }
  };
  const [projects, setProject] = useState([]);
  const [selecttedProject, setSelecttedProject] = useState(null);

  // const getProjectsData = async () => {
  //   try {
  //     const res = await ProjectServices.getAllProjects();
  //     // Mettez à jour le state avec les départements récupérés depuis l'API
  //     setProject(res.data);
  //     console.log(res.data);
  //   } catch (err) {
  //    console.log('erreur',err);
  //   }
  // }
  // useEffect(() => {
  //   getProjectsData()
  // }, [])
  const Error = ({ errorName }) => {
    return (
      <div className="text-red-500 text-sm mt-1">{errorName && errorName.message}</div>
    );
  };
  const handleSubmit = async (e, data) => {
    e.preventDefault();
    const categoryData = {
      name_en: name_en,
      name_fr: name_fr,
      name_ar: name_ar,
    };

    if (id) {
      try {

        setIsLoading(true);
        const res = await CategoryServices.updateCategory(id, categoryData);
        notifySuccess(res.message);
        closeDrawer();
        setIsCheck([])
        setIsLoading(false);
        console.log("Réponse de mise à jour de catégorie :", res);
        // Traitez la réponse ou faites d'autres actions nécessaires après la mise à jour
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la catégorie :", error);
      }
    } else {
      try {
        setIsLoading(true);
        const res = await CategoryServices.addCategory(categoryData);
        closeDrawer();
        setIsLoading(false);
        setIsCheck([]);
        notifySuccess(res.message);
        


        console.log("Réponse d'ajout de catégorie :", res);
        // Traitez la réponse ou faites d'autres actions nécessaires après l'ajout
      }
      catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie :", error);
      }
  }};
  const initFormForUpdate = async (id) => {

    const res = await CategoryServices.getCategoryById(id)
    console.log('categoryInputForm', res.data)
    setName_en(res.data.name_en);
    setName_fr(res.data.name_fr);
    setName_ar(res.data.name_ar);


  };
  useEffect(() => {
    if (id) {
      initFormForUpdate(id);
    }else{
      setName_en("");
      setName_fr("");
      setName_ar("");
    }
  }, [id]);


  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateCategory")}
            description={t("UpdateCategoryDescription")}
          />
        ) : (
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={t("AddCategoryTitle")}
            description={t("AddCategoryDescription")}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit} className="block" id="block">
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">


            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Name (en)")} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"

                  label="Category Name (en) "
                  name="name_en"
                  type="text"
                  placeholder="Category Name (en) "
                  // onBlur={(e) => handleProductSlug(e.target.value)}
                  onChange={(e) => setName_en(e.target.value)}
                  value={name_en}
                />
                <Error errorName={errors.name_en} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Name (fr)")} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"

                  label="Category Name (fr) "
                  name="name_fr"
                  type="text"
                  placeholder="Category Name (fr) "
                  // onBlur={(e) => handleProductSlug(e.target.value)}
                  onChange={(e) => setName_fr(e.target.value)}
                  value={name_fr}
                />
                <Error errorName={errors.name_fr} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Name (ar)")} />
              <div className="col-span-8 sm:col-span-4">
                <Input

                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"

                  label="Category Name (ar) "
                  name="name_ar"
                  type="text"
                  placeholder="Category Name (ar) "
                  // onBlur={(e) => handleProductSlug(e.target.value)}
                  onChange={(e) => setName_ar(e.target.value)}
                  value={name_ar}
                />
                <Error errorName={errors.name_ar} />
              </div>
            </div>

          </div>

          <DrawerButton id={id} title="Category" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default CategoryDrawer;
