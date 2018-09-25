Inputmask({"mask": "9999 9999 9999 9999"}).mask("#pay input[name=cardnumber]")
Inputmask({"mask": "99"}).mask("#pay input[name=year]")
Inputmask({"mask": "99"}).mask("#pay input[name=month]")

// const input = password;
// password = '';
// input.addEventListener('keyup', e => {
//   if(input.value.length > password.length){
//     password += input.value[input.value.length-1];
//   }else{
//     password = password.substr(0,input.value.length);
//   }
//   input.value = '*'.repeat(password.length);
//   console.log(password);
// });