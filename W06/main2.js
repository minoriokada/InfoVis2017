function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
    document.addEventListener('mousedown',mouse_down_event);

    var vertices = [
	[-1,1,0],//v0
	[-1,-1,0],//v1
	[1,-1,0],//v2
	[1,1,0],//v3
	[1,1,-2],//v4
	[1,-1,-2],//v5
	[-1,-1,-2],//v6
	[-1,1,-2]//v7
    ];

    var faces = [
	[0,1,2],//f0
	[2,3,0],//f1
	[4,5,6],//f2
	[6,7,4],//f3
	[3,2,5],//f4
	[5,4,3],//f5
	[7,6,1],//f6
	[1,0,7],//f7
	[0,3,4],//f8
	[4,7,0],//f9
	[1,6,5],//f10
	[5,2,1]//f11
    ];

    var geometry = new THREE.Geometry();

    for(var i=0;i<8;i++){
	geometry.vertices.push(new THREE.Vector3().fromArray(vertices[i]));
    }

    for(var i=0;i<12;i++){
	geometry.faces.push(new THREE.Face3(faces[i][0],faces[i][1],faces[i][2]));
    }
    
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    
    var material = new THREE.MeshBasicMaterial();
    material.side = THREE.DoubleSide;
    material.vertexColors = THREE.FaceColors;
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.001;
        cube.rotation.y += 0.001;
        renderer.render( scene, camera );
    }

    function mouse_down_event(event)
    {
	var x_win = event.clientX;
	var y_win = event.clientY;

	var vx = renderer.domElement.offsetLeft;
	var vy = renderer.domElement.offsetTop;
	var vw = renderer.domElement.width;
	var vh = renderer.domElement.height;

	var x_NDC = 2 * (x_win - vx)/vw - 1;
	var y_NDC = -(2 * (y_win - vy)/vh - 1);

	var p_NDC = new THREE.Vector3(x_NDC, y_NDC, 1);
	var p_wld = p_NDC.unproject(camera);

	var origin = camera.position;
	var direction = p_wld.sub(camera.position).normalize();
	
	var raycaster = new THREE.Raycaster(origin, direction);
	var intersects = raycaster.intersectObject(cube);
	
	if (intersects.length > 0)
	{
	    intersects[0].face.color.setRGB(1,0,0);
	    intersects[0].object.geometry.colorsNeedUpdate = true;
	}
    }
    
}
