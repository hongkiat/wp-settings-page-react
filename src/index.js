import domReady from '@wordpress/dom-ready';
import { createRoot } from 'react-dom/client';
import { App } from './App';

domReady( () => {
    const container = document.querySelector('#root');
    if ( container ) {
        createRoot( container ).render( <App /> );
    }
} );