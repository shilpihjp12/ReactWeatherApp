import moment from 'moment';
import { TEMPERATURE_VARIANTS } from './const';

export const convertDegType = (convToType, degs) => {
  const { FAHRENHEIT, CELSIUS } = TEMPERATURE_VARIANTS;
  if (convToType !== FAHRENHEIT && convToType !== CELSIUS) {
    return null;
  }
  let res;
  // Celsius To => FAHRENHEIT
  if (convToType === TEMPERATURE_VARIANTS.FAHRENHEIT) {
    res = +degs * 1.8 + 32;
  } else {
    // FAHRENHEIT to => Celsius
    res = (+degs - 32) / 1.8;
  }
  return +res.toFixed(2);
};

// Initial Mapping to Redux store
export const temperatureInDays = (hoursList) => {
  const clonedList = [...hoursList];
  const mappedHoursList = clonedList.map(
    (item) => item['dt_txt'].split(' ')[0]
  );
  const objOfUniqueDays = [...new Set(mappedHoursList)].reduce((acc, cur) => {
    return { ...acc, [cur]: [] };
  }, {});
  clonedList.forEach((item) => {
    const exactDayDate = item['dt_txt'].split(' ')[0];
    // DATA ROUNDED
    objOfUniqueDays[exactDayDate] = [
      ...objOfUniqueDays[exactDayDate],
      { ...item, main: { ...item.main, temp: +item.main.temp.toFixed(2) } }
    ];
  });

  // Another Loop for calc avg temperature
  for (const prop in objOfUniqueDays) {
    objOfUniqueDays[prop] = {
      arr: objOfUniqueDays[prop],
      avgTemperature: avgPropInList(objOfUniqueDays[prop]),
      dayFormatted: moment(prop).format('DD, MMM YY'),
      seaLevelAvg: avgPropInList(objOfUniqueDays[prop], 'sea_level'),
      humidity: avgPropInList(objOfUniqueDays[prop], 'humidity')
    };
  }

  return objOfUniqueDays;
};

// Another Mapping for Converting AlreadyMapppedData
export const convertTemperatureInDays = (daysObj, tempTypeTo) => {
  const clonedDaysObj = { ...daysObj };
  for (const prop in clonedDaysObj) {
    clonedDaysObj[prop]['arr'] = clonedDaysObj[prop]['arr'].map(
      (temperatureItem) => {
        return {
          ...temperatureItem,
          main: {
            ...temperatureItem.main,
            temp: convertDegType(tempTypeTo, temperatureItem.main.temp)
          }
        };
      }
    );
    clonedDaysObj[prop]['avgTemperature'] = convertDegType(
      tempTypeTo,
      clonedDaysObj[prop]['avgTemperature']
    );
  }

  return clonedDaysObj;
};

export const avgPropInList = (list, property = 'temp') => {
  const len = list.length;
  const sum = list.reduce((acc, cur) => {
    return acc + cur.main[property];
  }, 0);
  const avg = sum / len;
  const res = +avg.toFixed(2);
  return res;
};

export const prepareDataForBarChart = (selectedDayIndex = 0, daysObj) => {
  if (!daysObj) {
    return [];
  }
  const arrOfDays = Object.values(daysObj);
  let selectedDayValue = arrOfDays[selectedDayIndex];
  let label = [];
  let data = [];
  selectedDayValue.arr.map((item) => {
    const hrWithMins = item['dt_txt']?.split(' ')[1];
    label.push(hrWithMins?.substring(0, hrWithMins.lastIndexOf(':')))
    data.push(item['main']['temp'])
  });
  return {
    labels: label,
    datasets: [
      {
        label: 'temperature',
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  };
};