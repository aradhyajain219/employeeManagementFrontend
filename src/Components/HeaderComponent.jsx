import React from 'react';

const HeaderComponent = () => {
  return (

    <div>
      <header className='navbar navbar-dark px-3 app-header'>
        <a className='navbar-brand app-brand' href='/' aria-label='Employee management home'>
          <span className='brand-mark'>E</span>
          <span>Employee management</span>
        </a>
        <span className='header-caption'>WORKSPACE</span>
      </header>
    </div>
  );
};

export default HeaderComponent; 