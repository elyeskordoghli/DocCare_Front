import { Card, CardBody } from '@windmill/react-ui';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'react-i18next';
import DepartmentContact from "pages/DepartmentContact"

import {
  FiLayout,
  FiTruck,
  FiBookOpen,
  FiCheck,
  FiRefreshCw,
  FiAperture,
  FiServer,
  FiTrello,
  FiGrid,
} from 'react-icons/fi';

const icons = {
  'FiCheck': <FiCheck />,
  'FiTruck': <FiTruck />,
  'FiLayout': <FiLayout />,
  'FiRefreshCw':<FiRefreshCw />,
  'FiBookOpen':<FiBookOpen />, 
  'FiAperture':<FiAperture />,
  'FiTrello':<FiTrello />,
  'FiServer':<FiServer />,
  'FiGrid':<FiGrid />
};

const CardItemTwo = ({
  mode,
  title2,
  icon,
  className,
  price,
  currency,
  cash,
  card,
  credit,
  loading,
  bgColor,
  fontSize,
}) => {
  const { t } = useTranslation();

  return (
    <Card className={`flex justify-center h-full`}>
      <CardBody
        className={`border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg ${className}`}
        style={{ backgroundColor: bgColor }}
      >
        <div className={`text-center inline-block text-3xl ${className}`} style={{ fontSize }}>
          {loading ? 
            <Skeleton count={1} width={30} height={30} className="dark:bg-gray-800 bg-gray-200" />
           : 
              <div>
                {icons[icon]} 
              </div>
          }
        </div>
        <div>
          <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
            {loading ? (
              <Skeleton count={1} height={20} className="dark:bg-gray-800 bg-gray-200" />
            ) : (
              t(`${title2}`)
            )}
          </p>
          <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50" style={{ fontSize: '3rem' }}>
            {loading ? (
              <Skeleton count={1} width={100} height={30} className="dark:bg-gray-800 bg-gray-200" />
            ) : (
              <h2 style={{ fontSize: '2rem' }}>{price}</h2>
            )}
          </p>
        </div>
      </CardBody>

    </Card>
  );
};

export default CardItemTwo;
