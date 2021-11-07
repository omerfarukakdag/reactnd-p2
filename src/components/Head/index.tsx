import Helmet from 'react-helmet';
import { IHeaderInfo } from '../../common/interfaces';
import React from 'react';
import { appName } from '../../common/config';

const Head = ({ title, description }: IHeaderInfo) => (
  <Helmet>
    <title>{`${appName}-${title || ''}`.trim()}</title>
    <meta name="description" content={(description || '').trim()} />
  </Helmet>
);

export default Head;
