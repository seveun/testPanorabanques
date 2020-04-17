import React from 'react';
import stylesheet from 'antd/dist/antd.min.css';
import {jquery, boostrap} from '../utils/constant'
class HomePage extends React.Component {

  componentDidMount () {
    [jquery, boostrap].forEach(urlScript => {
      const script = document.createElement('script');
      script.setAttribute('src',  urlScript);
      document.querySelector('head').appendChild(script);
    });
  }

  render() {
    return (
      <>
        <header>
          <title>Homepage</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
          <link rel="stylesheet" href="/css/style.css"/>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </header>
        <div>
          first push
        </div>
      </>
    );
  }

}

export default HomePage;