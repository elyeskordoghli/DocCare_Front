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
import React , { useEffect, useState }from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";
//internal import
import CategoryServices from "services/CategoryServices";
import { notifyError } from "utils/toast";
import { showingTranslateValue } from "utils/translate";
import ProjectServices from "services/ProjectServices";

const CategoryDrawer = ({ id, data, lang }) => {
  const { t } = useTranslation();

  const {
    checked,
    register,
    onSubmit,
    handleSubmit,
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
  const getProjectsData = async () => {
    try {
      const res = await ProjectServices.getAllProjects();
      // Mettez à jour le state avec les départements récupérés depuis l'API
      setProject(res.data);
      console.log(res.data);
    } catch (err) {
     console.log('erreur',err);
    }
  }
  useEffect(() => {
    getProjectsData()

  }, [])
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateCategory")}
            description={t("UpdateCategoryDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddCategoryTitle")}
            description={t("AddCategoryDescription")}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Name (en)")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Category Name (en) "
                  name="name_en"
                  type="text"
                  placeholder="Category Name (en) "
                />
                <Error errorName={errors.name_en} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Name (fr)")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Category Name (fr)"
                  name="name_fr"
                  type="text"
                  placeholder="Category Name (fr) "
                />
                <Error errorName={errors.name_fr} />
              </div>
            </div>    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Name (ar)")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Category Name (ar)"
                  name="name_ar"
                  type="text"
                  placeholder="Category Name (ar) "
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
