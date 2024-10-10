'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // używamy next/router do przekierowań
import Image from 'next/image';
import styles from './staff.module.scss';
import { FaSearch } from 'react-icons/fa'; // Dodajemy ikonę wyszukiwania

const specialists = [
    {
        id: 1,
        name: 'Anna',
        surname: 'Nowak',
        specialization: 'Fizjoterapeutka',
        city: 'Warszawa',
        imageUrl: '/path_to_image1.jpg',
        description: 'Specjalizuje się w rehabilitacji pourazowej.',
        education: 'Uniwersytet Medyczny w Warszawie',
        experience: '8 lat doświadczenia w rehabilitacji sportowej'
    },
    {
        id: 2,
        name: 'Jan',
        surname: 'Kowalski',
        specialization: 'Masażysta',
        city: 'Kraków',
        imageUrl: '/path_to_image2.jpg',
        description: 'Zajmuje się masażem relaksacyjnym i leczniczym.',
        education: 'Akademia Wychowania Fizycznego w Krakowie',
        experience: '5 lat doświadczenia w masażu'
    },
    {
        id: 3,
        name: 'Katarzyna',
        surname: 'Wiśniewska',
        specialization: 'Fizjoterapeutka',
        city: 'Gdańsk',
        imageUrl: '/path_to_image3.jpg',
        description: 'Specjalizuje się w terapii manualnej.',
        education: 'Gdański Uniwersytet Medyczny',
        experience: '6 lat doświadczenia w fizjoterapii'
    },
    {
        id: 4,
        name: 'Michał',
        surname: 'Zieliński',
        specialization: 'Fizjoterapeuta',
        city: 'Wrocław',
        imageUrl: '/path_to_image4.jpg',
        description: 'Zajmuje się rehabilitacją neurologiczną.',
        education: 'Uniwersytet Medyczny we Wrocławiu',
        experience: '7 lat doświadczenia w rehabilitacji'
    },
    {
        id: 5,
        name: 'Magdalena',
        surname: 'Kamińska',
        specialization: 'Masażystka',
        city: 'Poznań',
        imageUrl: '/path_to_image5.jpg',
        description: 'Zajmuje się masażem sportowym i relaksacyjnym.',
        education: 'Uniwersytet Medyczny w Poznaniu',
        experience: '4 lata doświadczenia w masażu'
    },
    {
        id: 6,
        name: 'Paweł',
        surname: 'Dąbrowski',
        specialization: 'Fizjoterapeuta',
        city: 'Łódź',
        imageUrl: '/path_to_image6.jpg',
        description: 'Specjalizuje się w rehabilitacji ortopedycznej.',
        education: 'Uniwersytet Medyczny w Łodzi',
        experience: '9 lat doświadczenia w fizjoterapii'
    },
    {
        id: 7,
        name: 'Aleksandra',
        surname: 'Wróbel',
        specialization: 'Fizjoterapeutka',
        city: 'Szczecin',
        imageUrl: '/path_to_image7.jpg',
        description: 'Zajmuje się rehabilitacją pourazową i sportową.',
        education: 'Pomorski Uniwersytet Medyczny w Szczecinie',
        experience: '10 lat doświadczenia w fizjoterapii'
    },
    {
        id: 8,
        name: 'Piotr',
        surname: 'Woźniak',
        specialization: 'Masażysta',
        city: 'Gdańsk',
        imageUrl: '/path_to_image8.jpg',
        description: 'Specjalizuje się w masażu leczniczym.',
        education: 'Uniwersytet Kazimierza Wielkiego w Bydgoszczy',
        experience: '6 lat doświadczenia w masażu'
    },
    {
        id: 9,
        name: 'Joanna',
        surname: 'Kaczmarek',
        specialization: 'Fizjoterapeutka',
        city: 'Lublin',
        imageUrl: '/path_to_image9.jpg',
        description: 'Zajmuje się terapią manualną i rehabilitacją sportową.',
        education: 'Uniwersytet Medyczny w Lublinie',
        experience: '8 lat doświadczenia w fizjoterapii'
    },
    {
        id: 10,
        name: 'Łukasz',
        surname: 'Pawlak',
        specialization: 'Fizjoterapeuta',
        city: 'Katowice',
        imageUrl: '/path_to_image10.jpg',
        description: 'Specjalizuje się w rehabilitacji neurologicznej.',
        education: 'Śląski Uniwersytet Medyczny w Katowicach',
        experience: '5 lat doświadczenia w fizjoterapii'
    },
    {
        id: 11,
        name: 'Ewa',
        surname: 'Szymańska',
        specialization: 'Masażystka',
        city: 'Rzeszów',
        imageUrl: '/path_to_image11.jpg',
        description: 'Zajmuje się masażem relaksacyjnym i leczniczym.',
        education: 'Uniwersytet Rzeszowski',
        experience: '3 lata doświadczenia w masażu'
    },
    {
        id: 12,
        name: 'Piotr',
        surname: 'Wójcik',
        specialization: 'Fizjoterapeuta',
        city: 'Białystok',
        imageUrl: '/path_to_image12.jpg',
        description: 'Specjalizuje się w rehabilitacji ortopedycznej.',
        education: 'Uniwersytet Medyczny w Białymstoku',
        experience: '4 lata doświadczenia w fizjoterapii'
    }
];


const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState(''); // Stan zapytania wyszukiwania (imię/nazwisko)
    const [searchCity, setSearchCity] = useState('');   // Stan wyszukiwania po mieście
    const router = useRouter();

    // Filtrowanie specjalistów na podstawie imienia/nazwiska oraz miasta
    const filteredSpecialists = specialists.filter(specialist =>
        // Sprawdzamy, czy imię lub nazwisko zaczyna się na zapytanie
        (specialist.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
         specialist.surname.toLowerCase().startsWith(searchQuery.toLowerCase())) &&
        // Sprawdzamy, czy miasto zaczyna się na zapytanie
        (searchCity === '' || specialist.city.toLowerCase().startsWith(searchCity.toLowerCase()))
    );

    // Obsługa kliknięcia na specjalistę (przekierowanie do dynamicznej strony)
    const handleSelectSpecialist = (id) => {
        router.push(`/staff/${id}`);
    };

    return (
        <div className={styles.specialistsContainer}>
            <div className={styles.searchContainer}>
                {/* Pole wyszukiwania po imieniu/nazwisku */}
                <div className={styles.searchInputContainer}>
                    <FaSearch className={styles.searchIcon} />  {/* Ikona wyszukiwania */}
                    <input
                        type="text"
                        placeholder="Szukaj po imieniu lub nazwisku..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Aktualizacja zapytania wyszukiwania
                        className={styles.searchInput}
                    />
                </div>

                {/* Pole wyszukiwania po mieście */}
                <div className={styles.searchInputContainer}>
                    <FaSearch className={styles.searchIcon} />  {/* Ikona wyszukiwania */}
                    <input
                        type="text"
                        placeholder="Szukaj po mieście..."
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)} // Aktualizacja miasta
                        className={styles.searchInput}
                    />
                </div>
            </div>

            <div className={styles.specialistsList}>
                {/* Wyświetlanie przefiltrowanych specjalistów */}
                {filteredSpecialists.length > 0 ? (
                    filteredSpecialists.map(specialist => (
                        <div
                            key={specialist.id}
                            className={styles.specialistCard}
                            onClick={() => handleSelectSpecialist(specialist.id)} // Przekierowanie do strony specjalisty
                        >
                            <Image src={specialist.imageUrl} alt={specialist.name} className={styles.specialistImage} width={100} height={100} />
                            <h3 className={styles.specialistName}>{specialist.name}</h3>
                            <p className={styles.specialistInfo}>{specialist.specialization}</p>
                            <p className={styles.specialistInfo}>{specialist.description}</p>
                            <p className={styles.specialistCity}>{specialist.city}</p>  {/* Dodajemy miasto */}
                        </div>
                    ))
                ) : (
                    <p className={styles.noResults}>Brak wyników.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
