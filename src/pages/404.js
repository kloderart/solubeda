import React from 'react';
import styled from 'styled-components';

import SEO from '../components/Seo';

const StyledPage = styled.div`
  display: grid;
  text-align: center;
  
  width: 100%;
  height: 100%;
  
  div.content {
    padding: 60px 18px;
    h1 {
      font-size: 32px;
      margin-bottom: 32px;
    }
  }
`;

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <StyledPage>
      <div className={'content'}>
        <h1>404, página no encontrada...</h1>
        <p>Lo sentimos, no hemos podido encontrar la página que buscas.</p>
      </div>
    </StyledPage>
  </>
);

export default NotFoundPage;

