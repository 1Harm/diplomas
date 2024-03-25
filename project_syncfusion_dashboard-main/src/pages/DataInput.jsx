import React from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { Header } from '../components';
import DropFileInput from '../components/DropFileInput';

const DataInput = () => (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="App" title="Drop File Input" />
        <DropFileInput>
            <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
        </DropFileInput>
    </div>
);
export default DataInput;
