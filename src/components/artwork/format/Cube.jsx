import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';

import { createCube } from './Cube/cube';
import { createGuides } from './Cube/guides';

import Close from '../Close';

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

let mount = null;

const Cube = ({ data, images, returnPage }) => {

  // Gets an array with the three box dimensions (width, height, depth)
  const dimensions = data.frontmatter.dimensions.split('x')
    .map(x => parseInt(x, 10));
  
  // Gets the larger dimension
  const maxDimension = dimensions.reduce((accumulator=0, currentValue) =>
    currentValue > accumulator ? currentValue : accumulator
  );

  let scene, camera, renderer, controls, cube, frameId;

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderScene();
  };

  const animate = () => {
    cube.rotation.y += 0.001;
    controls.update();
    renderScene();
    frameId = window.requestAnimationFrame(animate);
  };

  const renderScene = () => {
    renderer.render(scene, camera);
  };

  const start = () => {
    if (!frameId) {
      frameId = requestAnimationFrame(animate);
    }
  };

  const stop = () => {
    cancelAnimationFrame(frameId);
  };

  useEffect(() => {
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // Almost the double of the larger cube dimension
    camera.position.z = maxDimension * 1.2;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = true;
    controls.maxDistance = 1500;
    controls.minDistance = 0;

    // Geometry
    cube = createCube(dimensions, images);
    cube.add(createGuides(dimensions));

    // Put all together
    scene.add(cube);
    controls.update();
    renderScene();
    start();

    window.addEventListener('resize', onWindowResize, false);
    return () => {
      window.removeEventListener('resize', onWindowResize, false);
      stop();
      if (mount) {mount.removeChild(renderer.domElement);}
    };
  }, []);
  
  return (
    <>
      <Close url={returnPage} />
      <StyledContainer ref={m => mount = m} />
    </>
  );
};

export default Cube;

