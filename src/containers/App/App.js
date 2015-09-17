import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators, createStore} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';

const title = 'React Redux TodoMVC Example';
const description = 'All the modern best practices in one example.';
const image = 'https://react-redux.herokuapp.com/logo.jpg';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@erikras',
      'twitter:creator': '@erikras',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200'
    }
  }
};

export default class App extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <DocumentMeta {...meta}/>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }

}


