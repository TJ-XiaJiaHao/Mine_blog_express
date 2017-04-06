/**
 * Created by Administrator on 2017/2/27.
 */
$(document).ready(function(){

    //renderer
    var renderer = new THREE.WebGLRenderer({
        canvas:document.getElementById("mainCanvas")
    });

    //set background
    renderer.setClearColor(0x000000);

    //scene
    var scene = new THREE.Scene();

    //camera
    //var camera = new THREE.PerspectiveCamera(45,4/3,1,1000);      //景深，近大远小，也是正面投影
    var camera = new THREE.OrthographicCamera(-2,2,1,-1,1,10);      //正交投影，也就是正面投过去，注意照相机宽度和高度的比例和canvas的相同，不然图像会被拉长或压扁
    camera.position.set(-7.3,-3.3,4);                               //决定了物体所在位置
    camera.lookAt(new THREE.Vector3(5,2,-2));                       //决定了视角方向,x,y,z
    scene.add(camera);

    //light
    var light = new THREE.SpotLight(0xffffff);
    light.position.set(-10, -5, 20);
    scene.add(light);

    //create a car
    var car = new THREE.Object3D();

    var cube2 = new THREE.Mesh(new THREE.CubeGeometry(1,0.5,0.5),
        new THREE.MeshLambertMaterial({
            color:0xD3D3D3
        })
    );
    car.add(cube2);

    //sphere
    var x = [0.3,-0.3,0.3,-0.3];
    var y = [-0.25,-0.25,-0.25,-0.25];
    var z = [-0.25,-0.25,0.25,0.25];
    var spheres = [];
    for(var i=0;i<4;i++) {
        var sphere = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.04, 20, 35),    //半径、经度切片数、维度切片数、经度开始的弧度、经度跨过的弧度、维度开始的弧度、维度跨过的弧度
            new THREE.MeshLambertMaterial({
                color: 0xff0000,
                emissive:0xff0000,
                wireframe:true
            })
        );
        sphere.position.set(x[i], y[i], z[i]);
        spheres.push(sphere);
        car.add(sphere);
    }


    //render the canvas
    scene.add(car);
    renderer.render(scene,camera);


    //animate
    var id;
    function draw() {
        // for(var i=0;i<spheres.length;i++){
        //     spheres[i].rotation.y = (spheres[i].rotation.y + 0.01) % (Math.PI * 2);
        //     spheres[i].rotation.x = (spheres[i].rotation.x + 0.01) % (Math.PI * 2);
        // }
        // cube2.rotation.y = (cube2.rotation.y + 0.01) % (Math.PI * 2);

        car.rotation.y = (car.rotation.y - 0.01) %(Math.PI * 2);
        renderer.render(scene, camera);
        id = requestAnimationFrame(draw);
    }
    id = requestAnimationFrame(draw);

});