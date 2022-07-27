import React from 'react';
import { IonLoading } from '@ionic/react';

const Loading = ({ loading }) => {

    return (

        <IonLoading
            isOpen={loading}
            message={'Loading...'}
        />
    )
};

export default Loading;
