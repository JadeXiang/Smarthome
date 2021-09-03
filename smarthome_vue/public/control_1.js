
var scene, camera, renderer, controls, light, selectObject;
var model_address, loader, modelMesh;
var objects = [], intersects = [];;

// 场景
function initScene() {
    scene = new THREE.Scene();
}

// 相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 400, 600);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

// 渲染器
function initRenderer() {
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({antialias: true});
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xdccec7);
    document.body.appendChild(renderer.domElement);
}

function initModel(model_address, sc, x, y, z, rx, ry, rz) {
    //加载OBJ格式的模型
    loader = new THREE.OBJLoader();
    
    //loader.load(model_address, Model(loadedMesh));
    loader.load(model_address,function (loadedMesh) {
        var material1 = new THREE.MeshLambertMaterial({color: 0x808080});
        //加载完obj文件是一个场景组，遍历它的子元素，赋值纹理并且更新面和点的发现了
        loadedMesh.children.forEach(function (child) {
            child.material = material1;
            child.geometry.computeFaceNormals();
            child.geometry.computeVertexNormals();
        });

        const meshArr = [] // mesh数组
        const materialArr = [] // 材质数组

        // 获取集合体/材质数组
        loadedMesh.traverse((child) => {
          if (child.isMesh) {
            meshArr.push(child)
            materialArr.push(child.material)
          }
        })
        // 循环合并
        var geometry = new THREE.Geometry()
        for (var i = 0; i < meshArr.length; i++) {
          meshArr[i].updateMatrix()
          geometry.merge(new THREE.Geometry().fromBufferGeometry(meshArr[i].geometry), meshArr[i].matrix, i)
        }

        // 实例化成mesh网格
        /*
        *	geometry合并后的集合体
        *	materialArr 保留的材质数组
        */
        modelMesh = new THREE.Mesh(geometry, materialArr);

        console.log(modelMesh);

        //modelMesh = loadedMesh;
        
          modelMesh.position.set(x, y, z)
          modelMesh.scale.set(sc, sc, sc);
          modelMesh.rotation.set(rx, ry, rz);
          scene.add(modelMesh);
        })
};

// 鼠标双击触发的方法
function onMouseDblclick(event) {

    // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
    intersects = getIntersects(event);

    // 获取选中最近的 Mesh 对象
    if (intersects.length != 0 && intersects[0].object instanceof THREE.Mesh) {
        selectObject = intersects[0].object;
        if(selectObject.hasChecked == true){
            selectObject.hasChecked = false;
            selectObject.material.color.set("gray");
                  for (var i = 0; i < intersects.length; i++) 
                  {
                    if (
                        selectObject.position == intersects[i].position) 
                        {
                            intersects.pop(intersects[i]);
                        }
                    console.log(intersects);
                  }
        }
        else{
            selectObject.hasChecked = true;
            changeMaterial(selectObject);
            intersects.push(selectObject);
        }
        console.log(intersects);
        // objects = intersects;
        // console.log(objects);
    } else {
        alert("未选中 Mesh!");
    }
      
    }

// 获取与射线相交的对象数组
function getIntersects(event) {
    event.preventDefault();
    console.log("event.clientX:" + event.clientX)
    console.log("event.clientY:" + event.clientY)

    // 声明 raycaster 和 mouse 变量
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
    raycaster.setFromCamera(mouse, camera);

    // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
    var intersects1 = raycaster.intersectObjects(scene.children, false);

    //返回选中的对象
    return intersects1;
}

// 窗口变动触发的方法
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 改变对象材质属性
function changeMaterial(object) {

    var material = new THREE.MeshLambertMaterial({
        color: 0xffffff * Math.random(),
        transparent: object.material.transparent ? false : true,
        opacity: 0.8
    });
    object.material = material;
}

//初始化轨迹球控件
function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.noRotate = true;
    //controls.noPan = true;
    controls.enablePan = true;
    // 视角最小距离
    controls.minDistance = 100;
    // 视角最远距离
    controls.maxDistance = 1000;

    // 如果使用animate方法时，将此函数删除
    controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
}


// 添加拖拽控件
function initDragControls() {
    
    // 添加平移控件
    // var transformControls = new THREE.TrackballControls(camera, renderer.domElement);
    // scene.add(transformControls);

    // 过滤不是 Mesh 的物体,例如辅助网格
    console.log(scene.children);
    
    // for (var i = 0; i < scene.children.length; i++) {
    //     if (scene.children[i].isMesh) {
    //         objects.push(scene.children[i]);
    //     }
    //     console.log(objects);
    // }

    objects = scene.children;
    console.log(objects);
    

    
    // 初始化拖拽控件
    var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);

    // 鼠标略过事件
    // dragControls.addEventListener('hoveron', function (event) {
    //     // 让变换控件对象和选中的对象绑定
    //     //transformControls.attach(event.object);
    // });
    // 开始拖拽
    dragControls.addEventListener('dragstart', function (event) {
        if(selectObject.hasChecked == true){
            controls.enabled = false;

            changeMaterial(selectObject);
            intersects.push(selectObject);
        }
        
    });
    // 拖拽结束
    dragControls.addEventListener('dragend', function (event) {
        controls.enabled = true;

        selectObject.hasChecked = false;
        selectObject.material.color.set("gray");
            for (var i = 0; i < intersects.length; i++) 
                {
                    if (selectObject.position == intersects[i].position) 
                        {
                            intersects.pop(intersects[i]);
                        }
                    console.log(intersects);
                }
    });
}

// 初始化灯光
function initLight() {
    point = new THREE.PointLight(0xffffff, 0);
    point.position.set(0, 200, 0); //点光源位置
    scene.add(point); //点光源添加到场景中

    light = new THREE.PointLight(0xffffff, 0.7);
    light.position.set(0,250,0);
    light.castShadow = false;
    scene.add(light);
}

function initLight1() {
    light.intensity = 0;
    point.intensity = 0.7;
}

function initLight2(){
    point.intensity = 0;
    light.intensity = 0.7;
}


// 更新控件
function update() {
    controls.update();
    //transformControls.update();
}
function skyBox(){
    var path = '/客厅_测试/'
    var format = '.jpg'
    var urls = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ]
    var materials = []
    for (var i = 0; i < urls.length; ++i) {
      var loader = new this.THREE.TextureLoader()
      // loader.setCrossOrigin( this.crossOrigin );
      var texture = loader.load(urls[i], function () {}, undefined, function () {})
      materials.push(new this.THREE.MeshBasicMaterial({
        map: texture,
        side: this.THREE.BackSide
        // transparent: true,
        // needsUpdate:true
      })
      )
    }
    var cube = new this.THREE.Mesh(new this.THREE.CubeGeometry(800, 800, 800), materials)
    cube.position.set(-50, 410, 100);
    this.scene.add(cube);       
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    render();
    update();

    controls.update();
}

function render() {
    requestAnimationFrame(render);
    renderer.render( scene, camera );
}

// 初始化
function init() {
    initScene();
    initCamera();
    initRenderer();
    initLight();
    initControls();
    animate();
    skyBox();

    initModel("../model_obj/sofa_1.obj", 1, 0, 0, -210, 0, 0, 0);
    initModel("/model_obj/table_3.obj", 0.7, 230, 0, -250, 0, 0, 0);
    initModel("/model_obj/桌子.obj", 0.25, 30, 50, -60, 0, 0, 0);
    initModel("/model_obj/cabinet_2.obj", 1, 40, 0, 180, 0, Math.PI, 0);
    
    addEventListener('dblclick', onMouseDblclick, false);
    addEventListener('resize', onWindowResize, false);
    initDragControls();
}


