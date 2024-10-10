'use client'; 
import Image from 'next/image';
import StarRating from './StarRating';  
import styles from '../staff.module.scss';

const specialists = [
    {
        id: 1,
        name: 'Anna Nowak',
        specialization: 'Fizjoterapeutka, Warszawa',
        imageUrl: '/path_to_image1.jpg',
        description: 'Specjalizuje się w rehabilitacji pourazowej.',
        education: 'Uniwersytet Medyczny w Warszawie',
        experience: '8 lat doświadczenia w rehabilitacji sportowej',
        reviews: [
            { author: 'Janusz', rating: 5, comment: 'Świetna specjalistka! Polecam.' },
            { author: 'Marta', rating: 4, comment: 'Bardzo dobra fizjoterapeutka, ale trudno się umówić.' },
            { author: 'Krzysztof', rating: 5, comment: 'Profesjonalizm w każdym calu. Pomogła mi wrócić do formy.' },
            { author: 'Agnieszka', rating: 3, comment: 'Dobra, ale mogłaby być bardziej dostępna.' }
        ]
    },
    {
        id: 2,
        name: 'Jan Kowalski',
        specialization: 'Masażysta, Kraków',
        imageUrl: '/path_to_image2.jpg',
        description: 'Zajmuje się masażem relaksacyjnym i leczniczym.',
        education: 'Akademia Wychowania Fizycznego w Krakowie',
        experience: '5 lat doświadczenia w masażu',
        reviews: [
            { author: 'Piotr', rating: 4, comment: 'Dobra obsługa, mogłoby być taniej.' },
            { author: 'Anna', rating: 5, comment: 'Rewelacyjny masaż, bardzo relaksujący.' },
            { author: 'Michał', rating: 4, comment: 'Profesjonalny masaż, choć trochę zbyt intensywny jak na mój gust.' },
            { author: 'Joanna', rating: 5, comment: 'Zrelaksowałam się jak nigdy dotąd, na pewno wrócę!' }
        ]
    },
    {
        id: 3,
        name: 'Katarzyna Wiśniewska',
        specialization: 'Fizjoterapeutka, Gdańsk',
        imageUrl: '/path_to_image3.jpg',
        description: 'Specjalizuje się w terapii manualnej.',
        education: 'Gdański Uniwersytet Medyczny',
        experience: '6 lat doświadczenia w fizjoterapii',
        reviews: [
            { author: 'Ola', rating: 5, comment: 'Niezwykle miła i kompetentna fizjoterapeutka.' },
            { author: 'Ewelina', rating: 4, comment: 'Bardzo dobra terapia, ale terminy są zbyt odległe.' },
            { author: 'Robert', rating: 4, comment: 'Profesjonalna obsługa, choć miejsce nieco zaniedbane.' }
        ]
    },
    {
        id: 4,
        name: 'Michał Zieliński',
        specialization: 'Fizjoterapeuta, Wrocław',
        imageUrl: '/path_to_image4.jpg',
        description: 'Zajmuje się rehabilitacją neurologiczną.',
        education: 'Uniwersytet Medyczny we Wrocławiu',
        experience: '7 lat doświadczenia w rehabilitacji',
        reviews: [
            { author: 'Zbyszek', rating: 5, comment: 'Pomógł mi po udarze. Jestem wdzięczny za pomoc.' },
            { author: 'Maria', rating: 4, comment: 'Bardzo dobry specjalista, ale koszt wizyt jest wysoki.' }
        ]
    },
    {
        id: 5,
        name: 'Magdalena Kamińska',
        specialization: 'Masażystka, Poznań',
        imageUrl: '/path_to_image5.jpg',
        description: 'Zajmuje się masażem sportowym i relaksacyjnym.',
        education: 'Uniwersytet Medyczny w Poznaniu',
        experience: '4 lata doświadczenia w masażu',
        reviews: [
            { author: 'Kasia', rating: 5, comment: 'Najlepszy masaż, na jakim byłam. Polecam każdemu!' },
            { author: 'Tomek', rating: 3, comment: 'Dobry masaż, ale mogło być bardziej dopasowane do moich potrzeb.' },
            { author: 'Dominik', rating: 4, comment: 'Masaż sportowy na wysokim poziomie.' }
        ]
    },
    {
        id: 6,
        name: 'Paweł Dąbrowski',
        specialization: 'Fizjoterapeuta, Łódź',
        imageUrl: '/path_to_image6.jpg',
        description: 'Specjalizuje się w rehabilitacji ortopedycznej.',
        education: 'Uniwersytet Medyczny w Łodzi',
        experience: '9 lat doświadczenia w fizjoterapii',
        reviews: [
            { author: 'Magda', rating: 5, comment: 'Pomógł mi wrócić do zdrowia po kontuzji kolana. Polecam!' },
            { author: 'Jarek', rating: 4, comment: 'Dobra opieka, ale trochę drogo.' }
        ]
    },
    {
        id: 7,
        name: 'Aleksandra Wróbel',
        specialization: 'Fizjoterapeutka, Szczecin',
        imageUrl: '/path_to_image7.jpg',
        description: 'Zajmuje się rehabilitacją pourazową i sportową.',
        education: 'Pomorski Uniwersytet Medyczny w Szczecinie',
        experience: '10 lat doświadczenia w fizjoterapii',
        reviews: [
            { author: 'Karolina', rating: 5, comment: 'Najlepsza fizjoterapeutka! Świetne podejście do pacjenta.' },
            { author: 'Adrian', rating: 4, comment: 'Bardzo profesjonalna, choć czas oczekiwania na wizytę był długi.' }
        ]
    },
    {
        id: 8,
        name: 'Piotr Woźniak',
        specialization: 'Masażysta, Bydgoszcz',
        imageUrl: '/path_to_image8.jpg',
        description: 'Specjalizuje się w masażu leczniczym.',
        education: 'Uniwersytet Kazimierza Wielkiego w Bydgoszczy',
        experience: '6 lat doświadczenia w masażu',
        reviews: [
            { author: 'Beata', rating: 4, comment: 'Dobra jakość masażu, ale mogłoby być przyjemniej.' },
            { author: 'Krzysztof', rating: 5, comment: 'Masaż pomógł mi w moich problemach z kręgosłupem.' }
        ]
    },
    {
        id: 9,
        name: 'Joanna Kaczmarek',
        specialization: 'Fizjoterapeutka, Lublin',
        imageUrl: '/path_to_image9.jpg',
        description: 'Zajmuje się terapią manualną i rehabilitacją sportową.',
        education: 'Uniwersytet Medyczny w Lublinie',
        experience: '8 lat doświadczenia w fizjoterapii',
        reviews: [
            { author: 'Łukasz', rating: 5, comment: 'Polecam z czystym sumieniem, pomogła mi po operacji.' },
            { author: 'Dorota', rating: 4, comment: 'Bardzo dobra fizjoterapeutka, choć ceny są dość wysokie.' }
        ]
    },
    {
        id: 10,
        name: 'Łukasz Pawlak',
        specialization: 'Fizjoterapeuta, Katowice',
        imageUrl: '/path_to_image10.jpg',
        description: 'Specjalizuje się w rehabilitacji neurologicznej.',
        education: 'Śląski Uniwersytet Medyczny w Katowicach',
        experience: '5 lat doświadczenia w fizjoterapii',
        reviews: [
            { author: 'Darek', rating: 5, comment: 'Świetny specjalista od rehabilitacji neurologicznej.' },
            { author: 'Karol', rating: 4, comment: 'Dobra pomoc, choć ceny mogłyby być niższe.' }
        ]
    },
    {
        id: 11,
        name: 'Ewa Szymańska',
        specialization: 'Masażystka, Rzeszów',
        imageUrl: '/path_to_image11.jpg',
        description: 'Zajmuje się masażem relaksacyjnym i leczniczym.',
        education: 'Uniwersytet Rzeszowski',
        experience: '3 lata doświadczenia w masażu',
        reviews: [
            { author: 'Justyna', rating: 5, comment: 'Bardzo miły masaż, relaksujący jak żaden inny.' },
            { author: 'Tomek', rating: 4, comment: 'Dobry masaż, ale mógł być dłuższy.' }
        ]
    },
    {
        id: 12,
        name: 'Piotr Wójcik',
        specialization: 'Fizjoterapeuta, Białystok',
        imageUrl: '/path_to_image12.jpg',
        description: 'Specjalizuje się w rehabilitacji ortopedycznej.',
        education: 'Uniwersytet Medyczny w Białymstoku',
        experience: '4 lata doświadczenia w fizjoterapii',
        reviews: [
            { author: 'Monika', rating: 5, comment: 'Pomógł mi w bólu pleców. Bardzo profesjonalny!' },
            { author: 'Wojtek', rating: 4, comment: 'Dobra fizjoterapia, ale trzeba długo czekać na wizytę.' }
        ]
    }
];


// export default function SpecialistProfile({ params }) {
//     const { id } = params;  // Pobieramy ID z URL

//     // Znalezienie specjalisty na podstawie dynamicznego id
//     const specialist = specialists.find(spec => spec.id === parseInt(id));

//     if (!specialist) {
//         return <p>Nie znaleziono specjalisty.</p>;
//     }

//     return (
//         <div className={styles.specialistProfile}>
//             <Image src={specialist.imageUrl} alt={specialist.name} className={styles.specialistImage} width={150} height={150} />
//             <h1>{specialist.name}</h1>
//             <p className={styles.specialistInfo}>{specialist.specialization}</p>
//             <p className={styles.specialistInfo}>{specialist.description}</p>
//             <p className={styles.specialistInfo}><strong>Wykształcenie:</strong> {specialist.education}</p>
//             <p className={styles.specialistInfo}><strong>Doświadczenie:</strong> {specialist.experience}</p>
//             <button onClick={() => window.history.back()} className={styles.backLink}>Wróć</button>
//         </div>
//     );
// }


export default function SpecialistProfile({ params }) {
    const { id } = params;  // Pobieramy ID z URL

    // Znalezienie specjalisty na podstawie dynamicznego id
    const specialist = specialists.find(spec => spec.id === parseInt(id));

    if (!specialist) {
        return <p>Nie znaleziono specjalisty.</p>;
    }

    return (
        <div className={styles.specialistProfile}>
            <Image src={specialist.imageUrl} alt={specialist.name} className={styles.specialistImage} width={150} height={150} />
            <h1>{specialist.name}</h1>
            <p className={styles.specialistInfo}>{specialist.specialization}</p>
            <p className={styles.specialistInfo}>{specialist.description}</p>
            <p className={styles.specialistInfo}><strong>Wykształcenie:</strong> {specialist.education}</p>
            <p className={styles.specialistInfo}><strong>Doświadczenie:</strong> {specialist.experience}</p>

            {/* Sekcja opinii */}
            <div className={styles.reviewsSection}>
                <h2>Opinie</h2>
                {specialist.reviews.length === 0 ? (
                    <p>Brak opinii.</p>
                ) : (
                    specialist.reviews.map((review, index) => (
                        <div key={index} className={styles.review}>
                            <h3>{review.author}</h3>
                            <StarRating rating={review.rating} />
                            <p>{review.comment}</p>
                        </div>
                    ))
                )}
            </div>

            <button onClick={() => window.history.back()} className={styles.backLink}>Wróć</button>
        </div>
    );
}