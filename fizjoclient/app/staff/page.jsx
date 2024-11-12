'use client';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './staff.module.scss';
import { FaSearch } from 'react-icons/fa';
import { LanguageContext } from "@/app/contexts/lang/langContext"; 
import pl from './locales/pl.json';
import en from './locales/en.json';

const locales = { en, pl }; 

const specialists = [
    {
        id: 1,
        name: 'Anna',
        surname: 'Nowak',
        specialization: 'fizjoterapeutka',
        city: 'Warszawa',
        imageUrl: '/AnnaNowak.jpg',
        description: 'Specjalizuje się w rehabilitacji pourazowej.',
        education: 'Uniwersytet Medyczny w Warszawie',
        experience: '8'
    },
    {
        id: 2,
        name: 'Jan',
        surname: 'Kowalski',
        specialization: 'masażysta',
        city: 'Kraków',
        imageUrl: '/JanKowalski.jpg',
        description: 'Zajmuje się masażem relaksacyjnym i leczniczym.',
        education: 'Akademia Wychowania Fizycznego w Krakowie',
        experience: '5'
    },
    {
        id: 3,
        name: 'Katarzyna',
        surname: 'Wiśniewska',
        specialization: 'fizjoterapeutka',
        city: 'Gdańsk',
        imageUrl: '/KatarzynaWisniewska.jpg',
        description: 'Specjalizuje się w terapii manualnej.',
        education: 'Gdański Uniwersytet Medyczny',
        experience: '6'
    },
    {
        id: 4,
        name: 'Michał',
        surname: 'Zieliński',
        specialization: 'fizjoterapeuta',
        city: 'Wrocław',
        imageUrl: '/MichalZielinski.jpg',
        description: 'Zajmuje się rehabilitacją neurologiczną.',
        education: 'Uniwersytet Medyczny we Wrocławiu',
        experience: '7'
    },
    {
        id: 5,
        name: 'Magdalena',
        surname: 'Kamińska',
        specialization: 'masażystka',
        city: 'Poznań',
        imageUrl: '/MagdalenaKaminska.jpg',
        description: 'Zajmuje się masażem sportowym i relaksacyjnym.',
        education: 'Uniwersytet Medyczny w Poznaniu',
        experience: '4'
    },
    {
        id: 6,
        name: 'Paweł',
        surname: 'Dąbrowski',
        specialization: 'fizjoterapeuta',
        city: 'Łódź',
        imageUrl: '/PawelDabrowski.jpg',
        description: 'Specjalizuje się w rehabilitacji ortopedycznej.',
        education: 'Uniwersytet Medyczny w Łodzi',
        experience: '9'
    },
    {
        id: 7,
        name: 'Aleksandra',
        surname: 'Wróbel',
        specialization: 'fizjoterapeutka',
        city: 'Szczecin',
        imageUrl: '/AleksandraWrobel.jpg',
        description: 'Zajmuje się rehabilitacją pourazową i sportową.',
        education: 'Pomorski Uniwersytet Medyczny w Szczecinie',
        experience: '10'
    },
    {
        id: 8,
        name: 'Piotr',
        surname: 'Woźniak',
        specialization: 'masażysta',
        city: 'Gdańsk',
        imageUrl: '/PiotrWozniak.jpg',
        description: 'Specjalizuje się w masażu leczniczym.',
        education: 'Uniwersytet Kazimierza Wielkiego w Bydgoszczy',
        experience: '6'
    },
    {
        id: 9,
        name: 'Joanna',
        surname: 'Kaczmarek',
        specialization: 'fizjoterapeutka',
        city: 'Lublin',
        imageUrl: '/JoannaKaczmarek.jpg',
        description: 'Zajmuje się terapią manualną i rehabilitacją sportową.',
        education: 'Uniwersytet Medyczny w Lublinie',
        experience: '8'
    },
    {
        id: 10,
        name: 'Łukasz',
        surname: 'Pawlak',
        specialization: 'fizjoterapeuta',
        city: 'Katowice',
        imageUrl: '/LukaszPawlak.jpg',
        description: 'Specjalizuje się w rehabilitacji neurologicznej.',
        education: 'Śląski Uniwersytet Medyczny w Katowicach',
        experience: '5'
    },
    {
        id: 11,
        name: 'Ewa',
        surname: 'Szymańska',
        specialization: 'masażystka',
        city: 'Rzeszów',
        imageUrl: '/EwaSzymanska.jpg',
        description: 'Zajmuje się masażem relaksacyjnym i leczniczym.',
        education: 'Uniwersytet Rzeszowski',
        experience: '3'
    },
    {
        id: 12,
        name: 'Piotr',
        surname: 'Wójcik',
        specialization: 'fizjoterapeuta',
        city: 'Białystok',
        imageUrl: '/PiotrWojcik.jpg',
        description: 'Specjalizuje się w rehabilitacji ortopedycznej.',
        education: 'Uniwersytet Medyczny w Białymstoku',
        experience: '4'
    }
];

const Staff = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const router = useRouter();

    const { language } = useContext(LanguageContext); 
    const t = locales[language]; 

    const filteredSpecialists = specialists.filter(specialist =>
        (specialist.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            specialist.surname.toLowerCase().startsWith(searchQuery.toLowerCase())) &&
        (searchCity === '' || specialist.city.toLowerCase().startsWith(searchCity.toLowerCase()))
    );

    const handleSelectSpecialist = (id) => {
        router.push(`/staff/${id}`);
    };

    return (
        <div className={styles.specialistsContainer}>
            <div className={styles.searchContainer}>
                <div className={styles.searchInputContainer}>
                    <FaSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder={t.searchByName}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.searchInputContainer}>
                    <FaSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder={t.searchByCity}
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            <div className={styles.specialistsList}>
                {filteredSpecialists.length > 0 ? (
                    filteredSpecialists.map(specialist => (
                        <div
                            key={specialist.id}
                            className={styles.specialistCard}
                            onClick={() => handleSelectSpecialist(specialist.id)}
                        >
                            <Image src={specialist.imageUrl} alt={specialist.name} className={styles.specialistImage} width={100} height={100} />
                            <h3 className={styles.specialistName}>{specialist.name} {specialist.surname}</h3>
                            <p className={styles.specialistInfo}>{t.specialists[specialist.specialization]}</p>
                            <p className={styles.specialistInfo}>{specialist.description}</p>
                            <p className={styles.specialistCity}>{specialist.city}</p>
                            <p className={styles.specialistExperience}>{specialist.experience} {t.experience}</p>
                        </div>
                    ))
                ) : (
                    <p className={styles.noResults}>{t.noResults}</p>
                )}
            </div>
        </div>
    );
};

export default Staff;