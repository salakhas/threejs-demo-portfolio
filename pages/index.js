import Head from 'next/head'
import Image from 'next/image'
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


export default function Home() {
  const canvasRef = useRef();
  const scene = new THREE.Scene();
  useEffect(()=>{
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef?.current
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.position.setZ(30);
camera.position.setX(-3);

  const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
  const material = new THREE.MeshLambertMaterial({color: 0xFF52508D});
  const torus = new THREE.Mesh(geometry,material);

  scene.add(torus);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(30,30,30);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight,ambientLight);

  const controls = new OrbitControls(camera, renderer.domElement);

  function addStar(){
    const geometry = new THREE.SphereGeometry(0.25,30,30);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry,material);

    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    scene.add(star);
  }

  Array(300).fill().forEach(addStar);


  const avatarTexture = new THREE.TextureLoader().load('/profile.jpg');
  const profile = new THREE.Mesh(
    new THREE.BoxGeometry(7,7,7),
    new THREE.MeshBasicMaterial({map: avatarTexture})
  )

  scene.add(profile);

  const moonTexture = new THREE.TextureLoader().load('/moon.jpg');
  const normalTexture = new THREE.TextureLoader().load('/normal.jpg');
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({map: moonTexture,})
  );

  moon.position.z = 30;
  moon.position.setX(-10);
  
  profile.position.z = -5;
  profile.position.x = 2;

  function moveCamera(){
    const t = window.document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.001;
    moon.rotation.y += 0.05;
    moon.rotation.z += 0.002;

    profile.rotation.x+= 0.005;
    profile.rotation.y += 0.01;
    profile.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
  }

  window.document.body.onscroll = moveCamera

  scene.add(moon);

  const spaceTexture = new THREE.TextureLoader().load('/space.jpg');
  scene.background = spaceTexture;

  function animate(){
    window.requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    profile.rotation.x+= 0.005;
    profile.rotation.z+= 0.005;
    moon.rotation.x += 0.005;
    controls.update();
    renderer.render(scene,camera);
  }

  animate();
  })
  return (
    <>
      <canvas id='canvas' className='canvas' ref={canvasRef}></canvas>
      <main className='main'>

      <header>
        <h1 className='text-[40px] text-center text-white font-bold'>Salakha S</h1>
        <p className='text-white text-center'>🚀&nbsp;&nbsp;Welcome to my website!</p>
      </header>

      <br/><br/>
      <blockquote>
        <p className='text-white text-center'>I like making stuff and putting it on the internet</p>
      </blockquote>
      <br/><br/><br/><br/>
      <div className='text-white w-[50%] left-0 right-0 mx-auto mb-[500px]'>
      <section>
        <h2 className='text-[32px] text-center'>📜 Manifesto</h2><br/>
        <p className='text-[20px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <br/>
        <p className='text-[20px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <br/>
        <p className='text-[20px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

      </section>
      </div>
     
     <div className='w-[70%] left-0 right-0 mx-auto text-white mb-[500px]'>
     <section class="light">
        <h2 className='text-[32px] font-semibold text-center'>👩🏽‍🚀 Projects</h2>

        <p className='text-[25px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <br/><br/>
        <h2 className='text-[32px] font-semibold text-center'>🏆 Accomplishments</h2>

        <p className='text-[25px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      <br/><br/>
        <blockquote>
        <p className='text-white text-center'>The best way out is always through <br/>-Robert Frost</p>
      </blockquote>
      </section>
     </div>
      <div className='w-[70%] left-0 right-0 mx-auto text-white mb-[500px]'>
      <section class="left">
        <h2 className='text-[33px] text-center font-bold'>🌮 Work History</h2>

        <h3 className='text-[36px] text-center font-semibold'>McDonalds</h3>
        <p className='text-[20px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3 className='text-[36px] text-center font-semibold'>Burger King</h3>
        <p className='text-[20px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3 className='text-[36px] text-center font-semibold'>Taco Bell</h3>
        <p className='text-[20px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

      </section>
    <br/><br/>
      <blockquote>
        <p className='text-white text-center'>Thanks for watching!</p>
      </blockquote>
      </div>

      
      <div className='text-transparent'>
      <section class="left">
        <h2 className='text-[33px]'>🌮 Work History</h2>

        <h3>McDonalds</h3>
        <p className='text-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3>Burger King</h3>
        <p className='text-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3>Taco Bell</h3>
        <p className='text-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

      </section>

      <blockquote>
        <p>Thanks for watching!</p>
      </blockquote>

      <br/><br/><br/><br/>

      <br/><br/><br/><br/>
      <section class="left">
        <h2 className='text-[33px]'>🌮 Work History</h2>

        <h3>McDonalds</h3>
        <p className='text-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3>Burger King</h3>
        <p className='text-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3>Taco Bell</h3>
        <p className='text-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

      </section>

      <blockquote>
        <p>Thanks for watching!</p>
      </blockquote>

      <br/><br/><br/><br/>

      <br/><br/><br/><br/>
      <section class="left">
        <h2 className='text-[33px]'>🌮 Work History</h2>

        <h3>McDonalds</h3>
        <p className='text-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3>Burger King</h3>
        <p className='text-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3>Taco Bell</h3>
        <p className='text-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

      </section>

      <blockquote>
        <p>Thanks for watching!</p>
      </blockquote>

      <br/><br/><br/><br/>

      <br/><br/><br/><br/>
      <section class="left">
        <h2 className='text-[33px]'>🌮 Work History</h2>

        <h3>McDonalds</h3>
        <p className='text-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3>Burger King</h3>
        <p className='text-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3>Taco Bell</h3>
        <p className='text-[30px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

      </section>

      <blockquote>
        <p>Thanks for watching!</p>
      </blockquote>

      <br/><br/><br/><br/>
      </div>
    </main>
    </>
  )
}
