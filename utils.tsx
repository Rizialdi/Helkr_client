export const formatDate = (timestamp: string = '15886987435') => {
  const date = new Date(parseInt(timestamp));
  return date.getMonth() + ' ' + date.getFullYear();
};
