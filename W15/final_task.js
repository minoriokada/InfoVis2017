function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
    var shader_flag = 0;
    var cmap_flag = 0;

    screen.init( volume, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var isovalue = document.getElementById('isovalue').value;
    var surfaces = Isosurfaces( volume, isovalue, screen, shader_flag, cmap_flag );
    screen.scene.add( surfaces );

    
    document.getElementById('change-isovalue-button')
    .addEventListener('click',function(){
                      screen.scene.remove( surfaces );
                      isovalue = document.getElementById('isovalue').value;
                      surfaces = Isosurfaces( volume, isovalue, screen, shader_flag, cmap_flag );
                      screen.scene.add( surfaces );
                      });
    
    document.getElementById('Gouraud-button')
    .addEventListener('click', function(){
                      screen.scene.remove( surfaces );
                      shader_flag = 0;
                      isovalue = document.getElementById('isovalue').value;
                      surfaces = Isosurfaces( volume, isovalue, screen, shader_flag, cmap_flag );
                      screen.scene.add( surfaces );
                      });
    
    document.getElementById('Phong-button')
    .addEventListener('click', function(){
                      screen.scene.remove( surfaces );
                      shader_flag = 1;
                      isovalue = document.getElementById('isovalue').value;
                      surfaces = Isosurfaces( volume, isovalue, screen, shader_flag, cmap_flag );
                      screen.scene.add( surfaces );
                      });

    document.getElementById('C1-button')
    .addEventListener('click', function(){
                      screen.scene.remove( surfaces );
                      cmap_flag = 0;
                      isovalue = document.getElementById('isovalue').value;
                      surfaces = Isosurfaces( volume, isovalue, screen, shader_flag, cmap_flag );
                      screen.scene.add( surfaces );
                      });
    
    document.getElementById('C2-button')
    .addEventListener('click', function(){
                      screen.scene.remove( surfaces );
                      cmap_flag = 1;
                      isovalue = document.getElementById('isovalue').value;
                      surfaces = Isosurfaces( volume, isovalue, screen, shader_flag, cmap_flag );
                      screen.scene.add( surfaces );
                      });
    
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth * 0.8, window.innerHeight ] );
    });

    screen.loop();
}
