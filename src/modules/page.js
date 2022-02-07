import React from 'react';
import { history } from '../redux/configurations/store/configure-store';
import PageRouter from './pageRouter';

const Page = () => {
    return(
        <PageRouter history={history} />
    )
}

export default Page;