import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function App() {
	const Cats = React.lazy(() => import('cats'));
	const Dogs = React.lazy(() => import('dogs'));

	return (
		<div>
		  <div className="banner">
			<h1 className="banner-title">&#128571; Cats and Dogs &#128021;</h1>
			<h4>Random pics of cats and dogs</h4>
		  </div>
		  <div className="home">
			<div className="content">
			  <div className="cat">
			    <React.Suspense fallback={<div>Loading... </div>}>
				  <Cats />
				</React.Suspense>
			  </div>
			  <div className="dog">
			    <React.Suspense fallback={<div>Loading... </div>}>
				  <Dogs />
				</React.Suspense>
			  </div>
			</div>
		  </div>
		</div>
	);
}

export default App;