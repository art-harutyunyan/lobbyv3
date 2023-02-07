let a = 'aaaa bbb cc';
let b = ['aaaa', 'bb', 'cc'];

let c = a.split(' ');
console.log(c);
for (let i = 0; i < c.length; i++) {
  for (let j = 0; j < b.length; j++) {
    if (c[i] == b[j]) {
      c[i].replace(/[^a-z]/g, '*');
    }
  }
}
console.log(c);

console.log(a.replace(/[a-z]/g, '*'));

function armstrongNumber(n) {
  let supposedNummber = 0;
  let counter = 0;
  for (let p = 1; p <= n; p++) {
    const number = p.toString().split('');
    for (let i = 0; i < number.length; i++) {
      supposedNummber += Math.pow(+number[i], 3);
    }
    // console.log(supposedNummber);
    if (supposedNummber == p) {
      counter++;
      console.log(p);
    }
    supposedNummber = 0;
  }
  return counter;
}
// console.log(armstrongNumber(100000));

let h = '2/4';
console.log(h.slice(2, 3));
