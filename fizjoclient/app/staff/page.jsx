'use client';
import React, {useState, useContext, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import styles from './staff.module.scss';
import {FaSearch} from 'react-icons/fa';
import {LanguageContext} from "@/app/contexts/lang/langContext";
import pl from './locales/pl.json';
import en from './locales/en.json';
import apiService, {fetchAvatar} from "@/app/services/apiService/apiService";

const locales = {en, pl};

const Staff = ({recommendStaff = false}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [city, setCity] = useState('');
    const [debouncedCity, setDebouncedCity] = useState('');
    const [averagePrice, setAveragePrice] = useState(null);
    const [debouncedAveragePrice, setDebouncedAveragePrice] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);
    const router = useRouter();
    const [specialists, setSpecialists] = useState([]);
    const [avatars, setAvatars] = useState({});
    const {language} = useContext(LanguageContext);
    const t = locales[language];

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedCity(city);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [city]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedAveragePrice(averagePrice);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [averagePrice]);


    const handleSelectSpecialist = (id) => {
        router.push(`/staff/${id}`);
    };


    const fetchAvatars = async (specialistsList) => {
        const avatarsData = {};
        await Promise.all(
            specialistsList.map(async (specialist) => {
                if (specialist.avatarPath) {
                    const avatarImageUrl = await fetchAvatar(specialist.avatarPath);
                    avatarsData[specialist.physiotherapistId] = avatarImageUrl;
                }
            })
        );
        setAvatars(avatarsData);
    };

    const fetchSpecialists = async () => {
        try {
            const params = {
                pageNumber,
                pageSize,
                ...(debouncedSearchTerm ? {searchTerm: debouncedSearchTerm} : {}),
                ...(debouncedCity ? {city: debouncedCity} : {}),
                ...(debouncedAveragePrice !== null ? {averagePrice: debouncedAveragePrice} : {})
            };

            const response = await apiService.get('/Staff/All', params, false);
            if (response.success) {
                setSpecialists(response.data.staff);
                setTotalPages(Math.ceil(response.data.totalCount / pageSize));
                setTotalCount(response.data.totalCount);
                setMaxPrice(Math.ceil(response.data.maxPrice));
                await fetchAvatars(response.data.staff);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSpecialists();
    }, [debouncedSearchTerm, debouncedCity, debouncedAveragePrice, pageNumber]);

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (pageNumber < totalPages) {
            setPageNumber(prevPage => prevPage + 1);
        }
    };

    return (
        <div className={styles.specialistsContainer}>
            {!recommendStaff && (
                <div className={styles.searchContainer}>
                    <div className={styles.searchInputContainer}>
                        <FaSearch className={styles.searchIcon}/>
                        <input
                            type="text"
                            placeholder={t.searchByTerm}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <div className={styles.searchInputContainer}>
                        <FaSearch className={styles.searchIcon}/>
                        <input
                            type="text"
                            placeholder={t.searchByCity}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <div className={styles.sliderContainer}>
                        <label>{t.averagePrice}: {averagePrice !== null ? averagePrice : t.any} pln</label>
                        <input
                            type="range"
                            min={0}
                            step={10}
                            max={maxPrice}
                            value={averagePrice !== null ? averagePrice : 0}
                            onChange={(e) => {
                                const value = e.target.value;
                                setAveragePrice(value != 0 ? parseInt(value) : null);
                            }}
                            className={styles.slider}
                        />
                    </div>
                </div>
            )}
            <div className={styles.specialistsList}>
                {specialists.length > 0 ? (
                    specialists.map(specialist => (
                        <div
                            key={specialist.physiotherapistId}
                            className={styles.specialistCard}
                            onClick={() => handleSelectSpecialist(specialist.physiotherapistId)}
                        >
                            {avatars[specialist.physiotherapistId] ? (
                                <Image
                                    src={avatars[specialist.physiotherapistId]}
                                    alt={specialist.name}
                                    className={styles.specialistImage}
                                    width={100}
                                    height={100}
                                />
                            ) : (
                                <div className={styles.placeholderImage}></div>
                            )}
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
            {!recommendStaff && (
                <div className={styles.paginationContainer}>
                    <button
                        onClick={handlePreviousPage}
                        disabled={pageNumber === 1}
                        className={styles.paginationButton}
                    >
                        {t.previousPage}
                    </button>
                    <span className={styles.paginationInfo}>
                    {t.page} {pageNumber} {t.of} {totalPages}
                </span>
                    <button
                        onClick={handleNextPage}
                        disabled={pageNumber === totalPages}
                        className={styles.paginationButton}
                    >
                        {t.nextPage}
                    </button>
                </div>
            )}
        </div>

    );

};

export default Staff;