import { capitalize, isEmpty } from '../../utils/inputHelpers';

const cleanAllAgencies = (data: any[]) => {
  const cleanedData = data.map((el: any) => {
    const object = {
      _id: el?._id,
      name: el?.name,
      email: el?.email,
      phoneNumber: el?.phoneNumber,
      catalog: el?.catalog,
      locations: el?.locations,
      website: el?.website,
      slug: el?.slug,
      averageRating: el?.averageRating,
      columns: [
        {
          title: 'NAME',
          value: !isEmpty(el?.name) ? el?.name : '-'
        },
        {
          title: 'EMAIL',
          value: !isEmpty(el?.email) ? el?.email : '-'
        },
        {
          title: 'PHONE NUMBER',
          value: !isEmpty(el?.phoneNumber)
            ? '+' + el?.phoneNumber.internationalCode.areaCode + ' ' + el?.phoneNumber.phone
            : '-'
        },
        {
          title: 'LOCATIONS',
          value: !isEmpty(el?.locations) ? el?.locations : '-'
        },
        {
          title: 'CATALOG',
          value: !isEmpty(el.catalog) ? el.catalog.map((el: any) => capitalize(el)) : '-'
        },
        {
          title: 'RATING',
          value: !isEmpty(el?.averageRating) ? el?.averageRating : '-'
        }
      ]
    };

    return object;
  });

  return cleanedData;
};
const cleanAgency = (res: any) => {
  const object = {
    _id: res?._id,
    name: res?.name,
    email: res?.email,
    phoneNumber: res?.phoneNumber,
    catalog: res?.catalog,
    locations: res?.locations,
    comments: res?.comments,
    contact: res?.contact,
    website: res?.website,
    rating: res?.rating,
    slug: res?.slug,
    contacts: res?.contact,
    info: [
      {
        title: 'NAME',
        value: !isEmpty(res?.name) ? res?.name : '-'
      },
      {
        title: 'EMAIL',
        value: !isEmpty(res?.email) ? res?.email : '-'
      },
      {
        title: 'PHONE NUMBER',
        value: !isEmpty(res?.phoneNumber)
          ? '+' + res?.phoneNumber.internationalCode.areaCode + ' ' + res?.phoneNumber.phone
          : '-'
      },
      {
        title: 'CATALOG',
        value: !isEmpty(res?.catalog) ? res?.catalog.map((el: any) => capitalize(el)) : '-'
      }
    ]
  };

  return object;
};
const cleanAllCatalog = (data: any[]) => {
  const cleanedData = data.sort().map((el: any) => {
    const object = {
      title: capitalize(el),
      value: el
    };

    return object;
  });

  return cleanedData;
};

const cleanAllLocations = (data: any[]) => {
  const cleanedData = data.sort().map((el: any) => {
    const object = {
      title: el,
      value: el
    };

    return object;
  });

  return cleanedData;
};
export { cleanAllAgencies, cleanAllCatalog, cleanAllLocations, cleanAgency };
