export const formatDate = (timestamp: string = '15886987435') => {
  const difference = Date.now() / 1000 - parseInt(timestamp) / 1000;
  // Calculate the number of days
  var days = Math.floor(difference / 86400);
  // Calculate the number of months
  var mois = Math.floor(days / 30);
  // After deducting the days calculate the number of hours
  var hours = Math.floor((difference - days * 86400) / 3600);
  // After days and hours , how many minutes are passed
  var minutes = Math.floor((difference - days * 86400 - hours * 3600) / 60);
  // Finally how many seconds left after removing days, hours and minutes.
  var secs = Math.floor(
    difference - days * 86400 - hours * 3600 - minutes * 60
  );

  const elapsedTime =
    days > 30
      ? ' dep. ' + mois + ' mois '
      : days <= 0
      ? ' auj. '
      : 'dep. ' + days + ' jrs ';

  return elapsedTime;
};
