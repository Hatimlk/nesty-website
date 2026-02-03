import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData: React.FC = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Nesty",
        "image": "https://nesty.ma/assets/hero-bg.png", // Ensure this path is correct in production
        "description": "Nesty - Agence de conciergerie Airbnb et investissement locatif à Agadir.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Agadir",
            "addressRegion": "Souss-Massa",
            "addressCountry": "MA"
        },
        "url": "https://nesty.ma",
        "telephone": "+212600000000", // Replace with actual phone
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
            }
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default StructuredData;
