//控制按钮功能
var play = document.getElementById("play");
var playimg = document.getElementById("playimg");

var model = document.getElementById("change-model");
var color = document.getElementById("change-color");
//var texture = document.getElementById("change-texture");
var light = document.getElementById("change-light");


var change = document.getElementById("change");
var change1 = document.getElementById("model");
var change2 = document.getElementById("color");
//var change3 = document.getElementById("texture");
var change4 = document.getElementById("light");

var back1 = document.getElementById("back1");
var back2 = document.getElementById("back2");
//var back3 = document.getElementById("back3");
var back4 = document.getElementById("back4");

var flag = true;
var n;

var model1 = document.getElementById("model1");

var ligth1 = document.getElementById("light1");
var ligth2 = document.getElementById("light2");


//3d模型自动播放
play.addEventListener("click", function(){
  controls.autoRotate = flag;
  console.log(flag, !flag);
  flag = !flag;
  if (flag == true){
    playimg.src = "/icon/播放.svg";
  }
  else{
    playimg.src = "/icon/暂停.svg";
  }
})


//主列表切换
model.addEventListener("click", function(){
  change.style.display = 'none';
  change1.style.display = 'block';
  change2.style.display = 'none';
  change3.style.display = 'none';
  change4.style.display = 'none';
  n = change1;
  render();
})

color.addEventListener("click", function(){
    change.style.display = 'none';
    change1.style.display = 'none';
    change2.style.display = 'block';
    //change3.style.display = 'none';
    change4.style.display = 'none';
    n = change2;
    render();
  })

// texture.addEventListener("click", function(){
//     change.style.display = 'none';
//     change1.style.display = 'none';
//     change2.style.display = 'none';
//     //change3.style.display = 'block';
//     change4.style.display = 'none';
//     n = change3;
//     render();
//   })

light.addEventListener("click", function(){
    change.style.display = 'none';
    change1.style.display = 'none';
    change2.style.display = 'none';
    //change3.style.display = 'none';
    change4.style.display = 'block';
    n = change4;
    render();
  })

//改变模型
model1.addEventListener("click", function(){
    initModel("/model_obj/dining-table_1.obj", 1, 0, 0, 0, 0, 0, 0);
})
model2.addEventListener("click", function(){
  initModel("/model_obj/衣柜_1.obj", 1, 0, 0, 0, 0, 0, 0);
})
model3.addEventListener("click", function(){
  
  initModel("/model_obj/chair_1.obj", 1, 0, 0, 0, 0, 0, 0);
})


//改变光源
ligth1.addEventListener("click", function(){
    initLight1();
  })

ligth2.addEventListener("click", function(){
    initLight2();
  })


//返回按钮
back1.addEventListener("click", function(){
  change.style.display = 'block';
  n.style.display = 'none';
})

back2.addEventListener("click", function(){
    change.style.display = 'block';
    n.style.display = 'none';
  })
  
// back3.addEventListener("click", function(){
//     change.style.display = 'block';
//     n.style.display = 'none';
//   })
  
back4.addEventListener("click", function(){
    change.style.display = 'block';
    n.style.display = 'none';
  })


  //按钮改变颜色
  var color1 = document.getElementById("color1");
  color1.addEventListener("click", function(){
    selectObject.material.color.set(0xFF6A6A);
    selectObject.hasChecked = false;
    console.log(intersects);
    for (var i = 0; i < intersects.length; i++) 
    {
      if (selectObject.position == intersects[i].position) 
      {
        intersects.pop(intersects[i]);
      }
    }
    selectObject = null;
    render();
  })

  var color2 = document.getElementById("color2");
  color2.addEventListener("click", function(){
    selectObject.material.color.set(0x1E90FF);
    selectObject.hasChecked = false;
    console.log(intersects);
    for (var i = 0; i < intersects.length; i++) 
    {
      if (selectObject.position == intersects[i].position) 
      {
        intersects.pop(intersects[i]);
      }
    }
    selectObject = null;
    render();
  })

  var color3 = document.getElementById("color3");
  color3.addEventListener("click", function(){
    selectObject.material.color.set(0x9BCD9B);
    selectObject.hasChecked = false;
    console.log(intersects);
    for (var i = 0; i < intersects.length; i++) 
    {
      if (selectObject.position == intersects[i].position) 
      {
        intersects.pop(intersects[i]);
      }
    }
    selectObject = null;
    render();        
  })