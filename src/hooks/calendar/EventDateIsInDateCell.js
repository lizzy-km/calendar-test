export const CheckIsDateEqual = (cellDate, arrDate) => {
  console.log(cellDate, arrDate);
  
  const isEqual = cellDate?.format("YYYY-MM-DD") === arrDate.date.format("YYYY-MM-DD");

  return isEqual;
};

export function filterArray(arrayA, arrayB,arrayC) {
  const filterdArrayAB =()=> arrayA().filter((item) => !arrayB?.includes(item.date)) || []
  const filterdArrayC =()=> arrayC.filter((item) => !arrayB?.includes(item.date)) || []


  return filterdArrayAB().concat(filterdArrayC())
}
