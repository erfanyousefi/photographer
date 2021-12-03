module.exports = (nationalCode) => {
    nationalCode = String(nationalCode);
    if (!/^\d{10}$/.test(nationalCode)) return false;
    let check = +nationalCode[9];
    let sum = 0;
    for (let i = 0; i < 9; ++i) {
      sum += +nationalCode[i] * (10 - i);
    }
    sum %= 11;
  
    return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
  };