import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';

const AppContext = createContext();

const getInitialDarkMode = () => {
	const prefersDarkMode = window.matchMedia(
		'(prefers-color-scheme:dark)'
	).matches;
	console.log(prefersDarkMode);
	const storedDarkTheme = localStorage.getItem('darkTheme') === 'true';

	return storedDarkTheme || prefersDarkMode;
};

export const AppProvider = ({ children }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode);
	const [searchTerm, setSearchTerm] = useState('office');

	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme;
		setIsDarkTheme(newDarkTheme);
		// document.body.classList.toggle('dark-theme',newDarkTheme)
		// const body = document.querySelector('body');
		localStorage.setItem('darkTheme', newDarkTheme);
	};

	useEffect(() => {
		document.body.classList.toggle('dark-theme', isDarkTheme);
	}, [isDarkTheme]);

	return (
		<AppContext.Provider
			value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => useContext(AppContext);
