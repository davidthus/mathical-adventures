import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAvbhiMKAf6PGGtDVdHRZoTKMpt-HI05Yk',
	authDomain: 'mathical-adventures.firebaseapp.com',
	projectId: 'mathical-adventures',
	storageBucket: 'mathical-adventures.appspot.com',
	messagingSenderId: '312537606902',
	appId: '1:312537606902:web:67c8fe0086e55ddf081ad7',
	measurementId: 'G-3SVKDB3CKZ'
};

export const app = initializeApp(firebaseConfig);
