import { useState } from 'react';
import firebaseSetup from './setup';

const {firestore, auth} = firebaseSetup();

export const getSports = async () => {
  let data = [];
  const querySnapshot = await firestore().collection('sports').orderBy("name","asc").get();
  for await (const documentSnapshot of querySnapshot.docs) {
    data.push(documentSnapshot.data());
  }
  return data;
};

export const getClassHistory = async (classHistoryAddress) => {
  let data = {};
  const querySnapshot = await firestore()
    .collection(`${classHistoryAddress}/classHistory`)
    .get();
  for await (const documentSnapshot of querySnapshot.docs) {
    data[documentSnapshot.id] = {
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    };
  }
  return data;
};

export const getFacilityBookings = async (facilityID) => {
  let data = [];
  await firestore()
    .collection(`facilities/${facilityID}/bookings`)
    .where('booked', '==', true)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        data = [...data, documentSnapshot.id];
      });
    });
  console.log(data);
  return data;
};

export const getUser = async () => {
  let data = {};
  await firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .get()
    .then((documentSnapshot) => {
      if (!documentSnapshot.exists) {
        data = null;
      } else {
        data = documentSnapshot.data();
        data.id = auth().currentUser.uid;
        data.birthday = data.birthday.toDate();
        data.initials = data.displayName
          .split(' ')
          .map((n, index) => {
            if (index < 2) {
              return n[0];
            }
          })
          .join('');
      }
    });
  return data;
};

export const getFacilities = async (sports) => {
  let tempData = [];
  const querySnapshot = await firestore()
    .collection('facilities')
    .where('sports', '==', sports)
    .get();

  for await (const documentSnapshot of querySnapshot.docs) {
    let data = documentSnapshot.data();
    if (!data.published) {
      continue;
    }
    data.id = documentSnapshot.id;
    tempData.push(data);
  }
  return tempData;
};

export const getAcademies = async (sports) => {
  let tempData = [];
  console.log("Latest Sports: "+sports.uid);
  let tableReference = firestore().collection("sports").doc(sports.uid.trim());
  const querySnapshot = await firestore()
    .collection('academies')
    .where('sports', 'array-contains', sports.uid.trim())
    .get();
  console.log("Length: "+querySnapshot.docs.length);
  for await (const documentSnapshot of querySnapshot.docs) {
    let data = documentSnapshot.data();
    console.log(documentSnapshot.id);
    if (!data.published) {
      continue;
    }
    data.students = [];
    data.id = documentSnapshot.id;
    tempData.push(data);
  }
  return tempData;
};

export const getPlayer = async (id) => {
  let data = {};
  await firestore()
    .collection('players')
    .doc(id)
    .get()
    .then((documentSnapshot) => {
      data = documentSnapshot.data();
      data.id = documentSnapshot.id;
      data.birthday = data.birthday.toDate();
    });
  return data;
};

export const getStudent = async (academyID, studentID) => {
  let data = {};
  await firestore()
    .collection(`academies/${academyID}/students`)
    .doc(studentID)
    .get()
    .then((documentSnapshot) => {
      data = documentSnapshot.data();
      data.studentID = documentSnapshot.id;
    });
  return data;
};

export const getAcademy = async (id) => {
  console.log('acID:',id.trim());
  let data = {};
  await firestore()
    .collection('academies')
    .doc(id)
    .get()
    .then((documentSnapshot) => {
      data = documentSnapshot.data();
      data.id = documentSnapshot.id;
    });
    console.log(data);
  return data;
};

export const getAcademyByID = async (id) => {
  let data = {};
  await firestore()
    .collection(`academies/${id}`)
    .doc(id)
    .get()
    .then((documentSnapshot) => {
      data = documentSnapshot.data();
      data.id = documentSnapshot.id;
    });
  return data;
};

export const calcNextClass = ({days, startTime, endTime}) => {
  const startHour = Math.floor(startTime / 100);
  const startMinute = Math.floor(startTime % 100);
  const endHour = Math.floor(endTime / 100);
  const endMinute = Math.floor(endTime % 100);
  if (!days) {
    return;
  }
  const mapDays = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const times = days.map((day) => {
    const x = mapDays[day];
    let now = new Date();
    now.setHours(startHour);
    now.setMinutes(startMinute);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(now.getDate() + ((x + (7 - now.getDay())) % 7));
    return now.getTime();
  });
  const minimumDay = Math.min(...times);
  const startDateTime = new Date(minimumDay);
  const endDateTime = new Date(minimumDay);
  endDateTime.setHours(endHour);
  endDateTime.setMinutes(endMinute);
  return {startDateTime, endDateTime};
};

export const getBatches = async (academyID) => {
  let tempBatches = {};
  const querySnapshot = await firestore()
    .collection(`academies/${academyID}/batches`)
    .get();
  for await (const documentSnapshot of querySnapshot.docs) {
    tempBatches[documentSnapshot.id] = {
      ...documentSnapshot.data(),
      key: documentSnapshot.id,
    };
  }
  return tempBatches;
};

export const getClass = async (academyID, classID) => {
  let data = {};
  console.log('Get Class');
  await firestore()
    .collection(`academies/${academyID}/classes`)
    .doc(classID)
    .get()
    .then((documentSnapshot) => {
      data = documentSnapshot.data();
      data.id = documentSnapshot.id;
      data.scheduleTime = data.scheduleTime.toDate();
    });
  return data;
};

export const getPrevTrials = async (academyID) => {
  let tempTrials = {};
  console.log("AcademyID: "+academyID);
  const querySnapshot = await firestore()
    .collection(`academies/${academyID}/students`)
    .get();
    for await (const documentSnapshot of querySnapshot.docs) {
      if(documentSnapshot.data().user===auth().currentUser.uid && documentSnapshot.data().status!=='Registered'){
        console.log("Yesssss..");
        tempTrials[academyID] = {
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        };    
      }
    }
    return tempTrials;
  }

export const getPayments = async () => {
  let tempPayments = {};
  const querySnapshot = await firestore()
    .collection(`users/${auth().currentUser.uid}/payments`)
    .get();
  for await (const documentSnapshot of querySnapshot.docs) {
    console.log('here', documentSnapshot.id);
    tempPayments[documentSnapshot.id] = {
      ...documentSnapshot.data(),
      key: documentSnapshot.id,
    };
  }
  return tempPayments;
};

export const getCoupons = async () => {
  let tempCoupons = {};
  const querySnapshot = await firestore()
    .collection(`coupons`)
    .get();
  for await (const documentSnapshot of querySnapshot.docs) {
    tempCoupons[documentSnapshot.id] = {
      ...documentSnapshot.data(),
      key: documentSnapshot.id,
    };
  }
  return tempCoupons;
};


export const getSubscriptions = async () => {
  let tempSubscriptions = {};
  const querySnapshot = await firestore()
    .collection(`users/${auth().currentUser.uid}/subscriptions`)
    .get();
  for await (const documentSnapshot of querySnapshot.docs) {
    if(documentSnapshot.data().status==="Registered"){
      console.log('documentSnapshot.data()',documentSnapshot.data());
      tempSubscriptions[documentSnapshot.id] = {
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
        startDate: documentSnapshot.data().startDate.toDate(),
        dueDate: documentSnapshot.data().dueDate.toDate(),
      };  
    }
  }
  return tempSubscriptions;
};

export const getBookings = async () => {
  let tempBookings = {};
  const querySnapshot = await firestore()
    .collection(`users/${auth().currentUser.uid}/bookings`)
    .get();
  for await (const documentSnapshot of querySnapshot.docs) {
    tempBookings[documentSnapshot.id] = {
      ...documentSnapshot.data(),
      key: documentSnapshot.id,
    };
  }
  return tempBookings;
};

export const getSubscription = async (id) => {
  const documentSnapshot = await firestore()
    .collection(`users/${auth().currentUser.uid}/subscriptions`)
    .doc(id)
    .get();
  return {
    ...documentSnapshot.data(),
    startDate: documentSnapshot.data().startDate.toDate(),
    dueDate: documentSnapshot.data().dueDate.toDate(),
    // startDate:documentSnapshot.data().startDate.toDate(),
    //TODO:add last paid date
    key: documentSnapshot.id,
  };
};
