let a = '₺ 5/₺ 10';
// console.log(a.split('/'));

// console.log(a[0].slice(1, 2));

let k = '₺ 5';
k.replace(/[^0-9\,\r]/g, '');
console.log(k.replace(/[^0-9\,\r]/g, ''));
