const list = [1, 2, 3, 4, 5,234,324,2342,3,23,23,23,2,32,32,323,2];


for(let j=0;j < (list.length/3);j++){
    let x=[]
    for (let i = 0; i < 3; i++) {
        if(list[i+(j*3)]){
            x.push(list[i+(j*3)]);

        }
      }
    console.log(x)
}


