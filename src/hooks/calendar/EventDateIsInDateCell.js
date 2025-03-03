export const CheckIsDateEqual = (cellDate, arrDate) => {
  const isEqual = cellDate.format("YY-MM-DD") === arrDate.date;

  return isEqual;
};

export function filterArray(arrayA, arrayB,arrayC) {
  const filterdArrayAB =()=> arrayA().filter((item) => !arrayB?.includes(item.date)) || []
  const filterdArrayC =()=> arrayC.filter((item) => !arrayB?.includes(item.date)) || []


  return filterdArrayAB().concat(filterdArrayC())
}
