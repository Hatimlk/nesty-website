import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, PenTool, Key, TrendingUp, MapPin, ArrowRight, Calculator, Info, Wifi, Wind, Waves, Car, Tv, Filter, RefreshCw, Heart, X, CheckSquare, Square, MessageSquare, MapPinned, Building, Calendar, UserCheck, Percent, BarChart2, Globe, Sun, Trash2, Camera } from 'lucide-react';
import { SectionHeader, AnimatedSection } from '@/components/common';
import { SEO } from '@/components/layout';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import investHero from '@/assets/images/invest-hero.png';
import investCsBefore from '@/assets/images/invest-cs-before.png';
import investCsAfter from '@/assets/images/invest-cs-after.png';
import investCsDetail from '@/assets/images/invest-cs-detail.png';
import investCsIken from '@/assets/images/invest-cs-iken.png';

// ... (existing imports and components - StepCard, PropertyCard, ComparisonModal - remain unchanged, skipping to PropertyDetailModal where the iframe is) ...

const StepCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="group h-full">
    <div className="bg-white p-8 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-[0_20px_40px_-5px_rgba(45,212,191,0.15)] hover:border-nesty-accent/40 transition duration-500 h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-nesty-accent/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-700"></div>

      <div className="mb-6 relative">
        <div className="text-nesty-accent bg-teal-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-nesty-accent group-hover:text-white transition duration-500 shadow-sm border border-nesty-accent/20">
          <Icon size={32} strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="text-xl font-bold text-nesty-dark mb-3 group-hover:text-nesty-accent transition duration-300">{title}</h3>
      <p className="text-gray-600 leading-relaxed flex-grow text-sm">{description}</p>
    </div>
  </div>
);

const PropertyCard = ({ id, image, title, location, price, specs, amenities = [], labels, isFavorite, onToggleFavorite, isSelected, onToggleCompare, loading, onClickDetails }: any) => {
  const navigate = useNavigate();

  const handleAskAgent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/contact', { state: { propertyTitle: title, propertyId: id } });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col animate-pulse">
        {/* Skeleton Image */}
        <div className="h-64 bg-gray-200 w-full relative">
          <div className="absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="absolute top-4 left-4 w-20 h-6 bg-gray-300 rounded-md"></div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          {/* Title and Price */}
          <div className="flex justify-between items-start mb-2">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>

          {/* Location */}
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6 mt-2"></div>

          {/* Specs */}
          <div className="border-t border-gray-100 pt-4 flex gap-4 mb-4 items-center">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-5 bg-gray-200 rounded w-20 ml-auto"></div>
          </div>

          {/* Amenities */}
          <div className="flex gap-3 mb-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-9 w-9 bg-gray-200 rounded-lg"></div>)}
          </div>

          {/* Footer Actions */}
          <div className="mt-auto pt-6 flex justify-between items-center border-t border-gray-50">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded-lg w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  const getAmenityIcon = (type: string) => {
    switch (type) {
      case 'wifi': return <Wifi size={16} />;
      case 'ac': return <Wind size={16} />;
      case 'pool': return <Waves size={16} />;
      case 'parking': return <Car size={16} />;
      case 'tv': return <Tv size={16} />;
      default: return null;
    }
  };

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group border h-full flex flex-col relative ${isSelected ? 'ring-2 ring-nesty-accent border-nesty-accent shadow-teal-100' : 'border-gray-100 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.2)] hover:border-gray-200'}`}>
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden flex-shrink-0 cursor-pointer" onClick={onClickDetails}>
        <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 transition-colors"></div>
        {/* Parallax Effect Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-110"
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(id);
          }}
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-transform duration-200 group/heart border border-white/50"
          aria-label="Add to favorites"
        >
          <Heart
            size={18}
            className={`transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/heart:text-red-500'}`}
          />
        </button>

        {/* Compare Checkbox */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleCompare(id);
          }}
          className={`absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 hover:bg-white transition-all duration-300 cursor-pointer group/compare border border-white/50 ${isSelected
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
            }`}
        >
          {isSelected ? (
            <CheckSquare size={16} className="text-nesty-accent" />
          ) : (
            <Square size={16} className="text-gray-400 group-hover/compare:text-nesty-accent" />
          )}
          <span className={`text-xs font-bold ${isSelected ? 'text-nesty-accent' : 'text-gray-600'}`}>
            {labels.compare_btn}
          </span>
        </button>

        {/* Label */}
        <div className="absolute top-4 left-4 bg-nesty-darker/90 backdrop-blur text-white px-3 py-1 rounded-md font-bold text-[10px] uppercase tracking-wider border-l-2 border-nesty-accent z-10 shadow-lg">
          {labels.for_sale || "À Vendre"}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative bg-white z-10">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3
              className="text-lg font-bold text-nesty-dark group-hover:text-nesty-accent transition-colors duration-300 cursor-pointer line-clamp-1"
              onClick={onClickDetails}
              title={title}
            >
              {title}
            </h3>
            <div className="flex items-center text-gray-500 text-xs mt-1.5 gap-2 font-medium">
              <span className="flex items-center"><MapPin size={12} className="mr-1 text-nesty-accent/70" /> {location}</span>
            </div>
          </div>
        </div>

        <div className="flex items-baseline mb-4">
          <span className="text-xl font-extrabold text-nesty-accent">{price}</span>
        </div>

        <div className="flex gap-4 mb-4 text-xs text-gray-500 border-t border-gray-50 pt-3 font-semibold items-center">
          <div className="flex items-center gap-1.5">
            <Square size={14} className="text-gray-400" /> {specs.surface}
          </div>
          <div className="flex items-center gap-1.5">
            <Key size={14} className="text-gray-400" /> {specs.roomsDisplay || `${specs.rooms} ch`}
          </div>

          <div className="ml-auto">
            <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 flex items-center gap-1 text-[10px] uppercase tracking-wide">
              {specs.roi}
            </span>
          </div>
        </div>

        {amenities && amenities.length > 0 && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
            {amenities.slice(0, 4).map((amenity: string, index: number) => (
              <div
                key={index}
                className="bg-slate-50 text-gray-400 p-1.5 rounded-md border border-gray-100 flex-shrink-0"
                title={amenity}
              >
                {getAmenityIcon(amenity)}
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 flex gap-3">
          <button
            onClick={onClickDetails}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-nesty-dark hover:bg-nesty-dark hover:text-white px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 group/btn"
          >
            {labels.viewDetails} <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ComparisonModal = ({ isOpen, onClose, onReset, properties, labels }: any) => {
  if (!isOpen) return null;

  const getAmenityIcon = (type: string) => {
    switch (type) {
      case 'wifi': return <Wifi size={14} />;
      case 'ac': return <Wind size={14} />;
      case 'pool': return <Waves size={14} />;
      case 'parking': return <Car size={14} />;
      case 'tv': return <Tv size={14} />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-2xl font-bold text-nesty-dark flex items-center gap-3">
            <CheckSquare className="text-nesty-accent" /> {labels.compare_title}
          </h3>
          <div className="flex items-center gap-4">
            {properties.length > 0 && (
              <button
                onClick={onReset}
                className="text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition"
              >
                <Trash2 size={16} /> {labels.compare_reset}
              </button>
            )}
            <button onClick={onClose} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition text-gray-500 hover:text-red-500">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto flex-grow bg-white custom-scrollbar">
          {properties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-gray-400 opacity-50">
              <div className="mb-4 p-4 bg-gray-100 rounded-full"><Filter size={48} /></div>
              <p className="text-lg font-medium">{labels.compare_empty || "Sélectionnez des biens pour les comparer"}</p>
            </div>
          ) : (
            <div className="min-w-[800px] p-6">
              <table className="w-full table-fixed border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="w-48 p-4 bg-white sticky top-0 z-10"></th>
                    {properties.map((prop: any) => (
                      <th key={prop.id} className="w-64 p-4 align-bottom bg-white sticky top-0 z-10 pb-6">
                        <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 aspect-[4/3] relative group">
                          <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                            <div className="text-white font-bold text-sm leading-tight shadow-sm">{prop.title}</div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                  {/* Price */}
                  <tr className="group hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-right text-gray-400 uppercase text-xs tracking-wider border-b border-gray-50">{labels.comp_price}</td>
                    {properties.map((prop: any) => (
                      <td key={prop.id} className="p-4 text-center font-bold text-nesty-accent text-lg border-b border-gray-50 bg-white group-hover:bg-slate-50 transition">
                        {prop.displayPrice}
                      </td>
                    ))}
                  </tr>
                  {/* Location */}
                  <tr className="group hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-right text-gray-400 uppercase text-xs tracking-wider border-b border-gray-50">{labels.comp_location}</td>
                    {properties.map((prop: any) => (
                      <td key={prop.id} className="p-4 text-center font-medium border-b border-gray-50 bg-white group-hover:bg-slate-50 transition">
                        <div className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-gray-700">
                          <MapPin size={12} /> {prop.location}
                        </div>
                      </td>
                    ))}
                  </tr>
                  {/* Surface */}
                  <tr className="group hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-right text-gray-400 uppercase text-xs tracking-wider border-b border-gray-50">{labels.comp_surface}</td>
                    {properties.map((prop: any) => (
                      <td key={prop.id} className="p-4 text-center border-b border-gray-50 bg-white group-hover:bg-slate-50 transition">{prop.specs?.surface}</td>
                    ))}
                  </tr>
                  {/* Rooms */}
                  <tr className="group hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-right text-gray-400 uppercase text-xs tracking-wider border-b border-gray-50">{labels.comp_rooms}</td>
                    {properties.map((prop: any) => (
                      <td key={prop.id} className="p-4 text-center border-b border-gray-50 bg-white group-hover:bg-slate-50 transition">{prop.specs?.roomsDisplay}</td>
                    ))}
                  </tr>
                  {/* ROI */}
                  <tr className="group hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-right text-gray-400 uppercase text-xs tracking-wider border-b border-gray-50">{labels.comp_roi}</td>
                    {properties.map((prop: any) => (
                      <td key={prop.id} className="p-4 text-center border-b border-gray-50 bg-white group-hover:bg-slate-50 transition">
                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold border border-green-100">
                          {prop.specs?.roi}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Amenities */}
                  <tr className="group hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-right text-gray-400 uppercase text-xs tracking-wider border-b border-gray-50 align-top pt-6">{labels.comp_amenities}</td>
                    {properties.map((prop: any) => (
                      <td key={prop.id} className="p-4 text-center border-b border-gray-50 bg-white group-hover:bg-slate-50 transition align-top">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {prop.amenities?.map((am: string) => (
                            <div key={am} className="p-2 bg-gray-50 rounded-lg text-nesty-accent border border-nesty-accent/10 flex items-center gap-1" title={am}>
                              {getAmenityIcon(am)}
                              <span className="uppercase text-[10px] font-bold ml-1">{am}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  {/* CTA */}
                  <tr>
                    <td className="p-4"></td>
                    {properties.map((prop: any) => (
                      <td key={prop.id} className="p-4 text-center pt-8">
                        <Link
                          to="/contact"
                          className="inline-block w-full py-3 bg-nesty-darker text-white rounded-xl font-bold hover:bg-nesty-accent hover:text-nesty-darker transition shadow-lg text-sm uppercase tracking-wide"
                        >
                          {labels.contact_hunter_link || "Contacter"}
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PropertyDetailModal = ({ isOpen, onClose, property, labels }: any) => {
  if (!isOpen || !property) return null;

  const getAmenityIcon = (type: string) => {
    switch (type) {
      case 'wifi': return <Wifi size={18} />;
      case 'ac': return <Wind size={18} />;
      case 'pool': return <Waves size={18} />;
      case 'parking': return <Car size={18} />;
      case 'tv': return <Tv size={18} />;
      default: return null;
    }
  };

  const images = property.images && property.images.length > 0 ? property.images : [property.image];
  // Use process.env.API_KEY for map iframe
  const apiKey = process.env.API_KEY;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-nesty-darker/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white md:rounded-3xl w-full h-full md:h-[90vh] md:max-w-6xl overflow-hidden relative z-10 flex flex-col animate-fade-in-up shadow-2xl ring-1 ring-white/10">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-red-50 hover:text-red-500 transition text-gray-800 border border-gray-100"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* Left Column - Images */}
          <div className="md:w-7/12 bg-gray-100 h-[40vh] md:h-auto relative overflow-y-auto custom-scrollbar group">
            <div className="grid grid-cols-2 gap-2 p-2 min-h-full content-start">
              {images.map((img: string, idx: number) => (
                <div key={idx} className={`relative overflow-hidden rounded-2xl ${idx === 0 ? 'col-span-2 h-72 md:h-96' : 'h-40 md:h-56'}`}>
                  <img
                    src={img}
                    alt={`${property.title} - ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-700 cursor-zoom-in"
                  />
                  {idx === 0 && (
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <Camera size={14} /> Photos
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:w-5/12 overflow-y-auto bg-white custom-scrollbar h-full relative flex flex-col">
            <div className="p-8 pb-32 flex-grow">
              {/* Header */}
              <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center gap-1.5 text-nesty-accent font-bold text-xs uppercase tracking-wider bg-nesty-accent/10 px-3 py-1.5 rounded-full border border-nesty-accent/20">
                    <MapPin size={12} /> {property.location}
                  </span>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-wide">
                      {property.type || "Bien"}
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-nesty-dark mb-2 leading-tight tracking-tight">{property.title}</h2>
                <div className="flex items-baseline gap-2 mt-4">
                  <p className="text-3xl font-bold text-nesty-accent">{property.displayPrice}</p>
                  <p className="text-sm text-gray-400 font-medium">F.A.I inclus</p>
                </div>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-3 gap-3 mb-10">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center hover:border-nesty-accent/30 transition group">
                  <Square size={24} className="text-slate-400 group-hover:text-nesty-accent mx-auto mb-2 transition" />
                  <p className="font-bold text-nesty-dark text-lg">{property.specs.surface}</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Surface</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center hover:border-nesty-accent/30 transition group">
                  <Key size={24} className="text-slate-400 group-hover:text-nesty-accent mx-auto mb-2 transition" />
                  <p className="font-bold text-nesty-dark text-lg">{property.specs.rooms}</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Chambres</p>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl border border-green-100 text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-1.5 opacity-50">
                    <TrendingUp size={14} className="text-green-600" />
                  </div>
                  <Percent size={24} className="text-green-500 mx-auto mb-2" />
                  <p className="font-bold text-green-700 text-lg">{property.specs.roi.replace(/[^0-9%]/g, '')}</p>
                  <p className="text-[10px] text-green-600 uppercase font-bold tracking-wide">Rentabilité</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-nesty-dark mb-4 flex items-center gap-2">
                  <Info size={18} className="text-nesty-accent" /> Description
                </h3>
                <p className="text-gray-600 leading-7 text-sm text-justify whitespace-pre-line border-l-4 border-gray-100 pl-4">
                  {property.description || "Description complète bientôt disponible."}
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-nesty-dark mb-4">Équipements</h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities.map((am: string) => (
                    <div key={am} className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-nesty-accent/30 hover:bg-slate-50 transition cursor-default group">
                      <div className="text-nesty-accent bg-teal-50 p-2 rounded-lg group-hover:bg-nesty-accent group-hover:text-white transition shadow-sm">
                        {getAmenityIcon(am)}
                      </div>
                      <span className="capitalize text-sm font-bold text-gray-700">{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Map */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-nesty-dark">Localisation</h3>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location + ", Agadir")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-nesty-accent hover:text-nesty-darker flex items-center gap-1 transition"
                  >
                    Ouvrir Maps <ArrowRight size={12} />
                  </a>
                </div>
                <div className="h-56 w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 relative shadow-inner group">
                  {/* Map Overlay for click */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location + ", Agadir")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/10 transition duration-300"
                  ></a>

                  {apiKey ? (
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(property.location + ", Agadir")}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      className="w-full h-full grayscale-[50%] group-hover:grayscale-0 transition duration-700"
                      title={property.title}
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      Carte non disponible (API Key manquante)
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky Footer Action */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center gap-4 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <div className="hidden md:block">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Prix net</p>
                <p className="text-xl font-bold text-nesty-dark">{property.displayPrice}</p>
              </div>
              <Link
                to="/contact"
                state={{ propertyTitle: property.title, propertyId: property.id }}
                className="flex-grow bg-nesty-darker text-white py-4 rounded-xl font-bold text-center shadow-lg hover:bg-nesty-accent hover:text-nesty-darker hover:shadow-teal-500/20 transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-3 group"
              >
                <MessageSquare size={20} className="group-hover:scale-110 transition" />
                {labels.contact_hunter_link || "Contacter l'agent"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const InvestmentSimulator = () => {
  const { t } = useLanguage();
  const [price, setPrice] = useState(1500000);
  const [occupancy, setOccupancy] = useState(65);
  const [dailyRate, setDailyRate] = useState(800);
  const [feeRate, setFeeRate] = useState(20);

  const daysInYear = 365;
  const grossRevenue = dailyRate * daysInYear * (occupancy / 100);
  const managementFee = grossRevenue * (feeRate / 100);
  const netRevenue = grossRevenue - managementFee;
  const roi = price > 0 ? (netRevenue / price) * 100 : 0;

  return (
    <section id="simulator" className="py-20 bg-nesty-darker relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-nesty-accent rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <SectionHeader
            title={t.investir.sim_title}
            subtitle={t.investir.sim_subtitle}
            light
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Panel */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <AnimatedSection delay={200}>
              <div className="space-y-10">
                {/* Property Price */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-white font-bold flex items-center gap-2 text-lg">
                      <div className="bg-nesty-accent p-1.5 rounded-lg text-nesty-darker shadow-lg shadow-teal-500/20"><TrendingUp size={18} /></div>
                      {t.investir.label_price}
                    </label>
                    <span className="text-nesty-accent font-mono font-bold text-xl">{price.toLocaleString()}</span>
                  </div>
                  <div className="relative h-12 flex items-center">
                    <input
                      type="range"
                      min="500000"
                      max="5000000"
                      step="50000"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700/50 rounded-full appearance-none cursor-pointer accent-nesty-accent hover:accent-teal-300 transition-all z-10"
                    />
                  </div>
                  <div className="mt-1 relative">
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:border-nesty-accent outline-none text-sm font-mono tracking-wide transition focus:bg-slate-800 focus:shadow-[0_0_15px_rgba(45,212,191,0.1)]"
                    />
                    <span className="absolute right-4 top-3 text-gray-500 text-xs font-bold uppercase tracking-wider">MAD</span>
                  </div>
                </div>

                {/* Occupancy Rate */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-white font-bold flex items-center gap-2 text-lg">
                      <div className="bg-blue-500 p-1.5 rounded-lg text-white shadow-lg shadow-blue-500/20"><Key size={18} /></div>
                      {t.investir.label_occupancy}
                    </label>
                    <span className="text-blue-400 font-bold text-xl font-mono">{occupancy}%</span>
                  </div>
                  <div className="relative h-12 flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={occupancy}
                      onChange={(e) => setOccupancy(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700/50 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all z-10"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1 font-bold tracking-wide uppercase">
                    <span>{t.investir.label_occupancy_low} (30%)</span>
                    <span>{t.investir.label_occupancy_mid} (60%)</span>
                    <span>{t.investir.label_occupancy_high} (85%+)</span>
                  </div>
                </div>

                {/* Daily Rate */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-white font-bold flex items-center gap-2 text-lg">
                      <div className="bg-green-500 p-1.5 rounded-lg text-white shadow-lg shadow-green-500/20"><Search size={18} /></div>
                      {t.investir.label_rate}
                    </label>
                    <span className="text-green-400 font-bold text-xl font-mono">{dailyRate} MAD</span>
                  </div>
                  <div className="relative h-12 flex items-center">
                    <input
                      type="range"
                      min="300"
                      max="5000"
                      step="50"
                      value={dailyRate}
                      onChange={(e) => setDailyRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700/50 rounded-full appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-all z-10"
                    />
                  </div>
                  <div className="mt-1 relative">
                    <input
                      type="number"
                      value={dailyRate}
                      onChange={(e) => setDailyRate(Number(e.target.value))}
                      className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:border-green-500 outline-none text-sm font-mono tracking-wide transition focus:bg-slate-800 focus:shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                    />
                    <span className="absolute right-4 top-3 text-gray-500 text-xs font-bold uppercase tracking-wider">MAD</span>
                  </div>
                </div>

                {/* Management Fee (New) */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-white font-bold flex items-center gap-2 text-lg">
                      <div className="bg-purple-500 p-1.5 rounded-lg text-white shadow-lg shadow-purple-500/20"><Percent size={18} /></div>
                      {t.investir.label_fee}
                    </label>
                    <span className="text-purple-400 font-bold text-xl font-mono">{feeRate}%</span>
                  </div>
                  <div className="relative h-12 flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="1"
                      value={feeRate}
                      onChange={(e) => setFeeRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700/50 rounded-full appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all z-10"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1 font-bold tracking-wide uppercase">
                    <span>0%</span>
                    <span>20% (Nesty)</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-5">
            <AnimatedSection delay={400} className="h-full">
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-nesty-dark relative overflow-hidden h-full flex flex-col justify-between border border-white/10">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-nesty-accent via-teal-400 to-nesty-darker"></div>

                <div>
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-nesty-darker">
                    <Calculator className="text-nesty-accent" size={28} /> {t.investir.res_title}
                  </h3>

                  <div className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-widest">{t.investir.res_gross}</p>
                      <p className="text-4xl font-extrabold text-slate-800 tracking-tight">{Math.round(grossRevenue).toLocaleString()} <span className="text-sm text-gray-400 font-normal">MAD</span></p>
                    </div>

                    <div className="flex justify-between items-center px-5 py-4 bg-red-50/50 rounded-xl border border-red-50">
                      <div className="flex items-center gap-2 text-sm text-red-600 font-bold">
                        <Info size={16} /> {t.investir.res_commission} ({feeRate}%)
                      </div>
                      <div className="text-red-500 font-mono font-bold">
                        - {Math.round(managementFee).toLocaleString()} MAD
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border-t border-dashed border-gray-200 my-8"></div>

                  <div className="bg-nesty-darker text-white p-8 rounded-2xl text-center shadow-xl shadow-nesty-darker/20 transform hover:-translate-y-1 transition duration-500 relative overflow-hidden group">
                    {/* Abstract Shapes */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-nesty-accent/10 rounded-full blur-2xl group-hover:bg-nesty-accent/20 transition duration-700"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition duration-700"></div>

                    <p className="text-nesty-accent text-xs uppercase tracking-[0.2em] font-extrabold mb-3 relative z-10">{t.investir.res_net}</p>
                    <p className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter relative z-10">{Math.round(netRevenue).toLocaleString()}</p>
                    <p className="text-sm text-gray-400 font-medium relative z-10">Dirhams Marocains / an</p>

                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 mt-6 border border-white/10 hover:bg-white/20 transition relative z-10">
                      <TrendingUp size={16} className="text-nesty-accent" />
                      <span className="text-white font-bold text-sm">{t.investir.res_roi}: <span className="text-nesty-accent">{roi.toFixed(1)}%</span></span>
                    </div>
                  </div>

                  <p className="text-[10px] text-center text-gray-400 mt-6 leading-relaxed max-w-xs mx-auto">
                    {t.investir.res_disclaimer}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

const Investir: React.FC = () => {
  const { t } = useLanguage();
  const { properties } = useData(); // Use properties from context
  const [isLoading, setIsLoading] = useState(true);

  // Favorites State
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('nesty_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Comparison State
  const [compareList, setCompareList] = useState<number[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Detail Modal State
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const toggleFavorite = (id: number) => {
    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter(favId => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    setFavorites(newFavorites);
    localStorage.setItem('nesty_favorites', JSON.stringify(newFavorites));
  };

  const toggleCompare = (id: number) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(cId => cId !== id));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, id]);
      } else {
        alert(t.investir.compare_limit);
      }
    }
  };

  const resetCompare = () => {
    setCompareList([]);
  };

  const openDetailModal = (property: any) => {
    setSelectedProperty(property);
    setIsDetailModalOpen(true);
  };

  // Filtering Logic
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [minRooms, setMinRooms] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);

  const filteredProperties = properties.filter(property => {
    const matchLocation = selectedLocation === 'all' || property.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchType = selectedType === 'all' || property.type.toLowerCase() === selectedType.toLowerCase();
    const matchRooms = property.specs.rooms >= minRooms;
    const matchPrice = property.rawPrice <= maxPrice;
    return matchLocation && matchType && matchRooms && matchPrice;
  });

  const resetFilters = () => {
    setSelectedLocation('all');
    setSelectedType('all');
    setMinRooms(0);
    setMaxPrice(5000000);
  };

  // Loading Simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-16">
      <SEO
        title={t.investir.meta_title}
        description={t.investir.meta_desc}
      />
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={investHero}
            alt="Investir Agadir Real Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-nesty-darker/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-nesty-darker via-transparent to-transparent opacity-80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full mt-16">
          <AnimatedSection>
            <span className="inline-block py-1 px-3 rounded-full bg-nesty-accent/20 text-nesty-accent text-sm font-bold mb-4 border border-nesty-accent/50 backdrop-blur-sm">
              {t.investir.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              {t.investir.hero_title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-nesty-accent to-teal-200">{t.investir.hero_title_span}</span> {t.investir.hero_suffix}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 font-medium">
              {t.investir.hero_desc}
            </p>

            {/* Simulator CTA */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-nesty-darker font-bold rounded-full hover:bg-gray-100 transition inline-flex items-center gap-2 shadow-lg"
              >
                <Calculator size={20} className="text-nesty-accent" />
                Simuler mon ROI
              </button>
              <Link to="/contact" className="px-8 py-4 bg-nesty-accent text-nesty-darker font-bold rounded-full hover:bg-white hover:text-nesty-accentDark transition inline-flex items-center gap-2 shadow-[0_4px_20px_rgba(45,212,191,0.4)]">
                {t.investir.cta_start} <ArrowRight size={20} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              title={t.investir.process_title}
              subtitle={t.investir.process_subtitle}
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection delay={100} className="h-full">
              <StepCard
                icon={Search}
                title={t.investir.step_1_title}
                description={t.investir.step_1_desc}
              />
            </AnimatedSection>
            <AnimatedSection delay={200} className="h-full">
              <StepCard
                icon={PenTool}
                title={t.investir.step_2_title}
                description={t.investir.step_2_desc}
              />
            </AnimatedSection>
            <AnimatedSection delay={300} className="h-full">
              <StepCard
                icon={Key}
                title={t.investir.step_3_title}
                description={t.investir.step_3_desc}
              />
            </AnimatedSection>
            <AnimatedSection delay={400} className="h-full">
              <StepCard
                icon={TrendingUp}
                title={t.investir.step_4_title}
                description={t.investir.step_4_desc}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Investment Simulator */}
      <InvestmentSimulator />

      {/* Case Study Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader title={t.investir.cs_title} subtitle={t.investir.cs_subtitle} />
          </AnimatedSection>

          <div className="bg-slate-50 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <div className="flex flex-col lg:flex-row">

              {/* Left: Content */}
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <AnimatedSection delay={100}>
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-red-100 text-red-600 rounded-lg"><X size={20} /></div>
                        <h3 className="text-xl font-bold text-gray-800">{t.investir.cs_challenge_title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed pl-12">
                        {t.investir.cs_challenge_desc}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-nesty-accent/20 text-nesty-accent rounded-lg"><CheckSquare size={20} /></div>
                        <h3 className="text-xl font-bold text-gray-800">{t.investir.cs_solution_title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed pl-12">
                        {t.investir.cs_solution_desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-200">
                    <h4 className="font-bold text-nesty-dark mb-6 flex items-center gap-2">
                      <TrendingUp size={20} className="text-nesty-accent" />
                      {t.investir.cs_result_title}
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="text-nesty-accent"><Calendar size={24} className="mx-auto mb-2" /></div>
                        <div className="font-bold text-gray-800 mb-1">640</div>
                        <div className="text-xs text-gray-500 uppercase">Nuitées</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="text-blue-500"><Key size={24} className="mx-auto mb-2" /></div>
                        <div className="font-bold text-gray-800 mb-1">94%</div>
                        <div className="text-xs text-gray-500 uppercase">Occupation</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="text-green-500"><Percent size={24} className="mx-auto mb-2" /></div>
                        <div className="font-bold text-green-600 mb-1">+54%</div>
                        <div className="text-xs text-gray-500 uppercase">Revenus</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="text-orange-500"><UserCheck size={24} className="mx-auto mb-2" /></div>
                        <div className="font-bold text-gray-800 mb-1">800</div>
                        <div className="text-xs text-gray-500 uppercase">Voyageurs</div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Right: Visuals with Before/After */}
              <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
                <AnimatedSection delay={300} className="h-full">
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-white">
                    {/* Before Image */}
                    <div className="relative w-full h-full group overflow-hidden">
                      <img src={investCsBefore} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Avant" />
                      <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded shadow-lg z-10 uppercase tracking-wider">
                        {t.investir.cs_before}
                      </div>
                    </div>

                    {/* After Image */}
                    <div className="relative w-full h-full group overflow-hidden">
                      <img src={investCsAfter} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Après" />
                      <div className="absolute top-3 left-3 bg-nesty-accent text-nesty-darker text-xs font-bold px-3 py-1 rounded shadow-lg border border-white/20 z-10 uppercase tracking-wider">
                        {t.investir.cs_after}
                      </div>
                    </div>

                    <div className="relative overflow-hidden w-full h-full">
                      <img src={investCsDetail} className="w-full h-full object-cover hover:scale-110 transition duration-700" alt="Détail" />
                    </div>

                    <div className="relative overflow-hidden group w-full h-full">
                      <img src={investCsIken} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700 delay-100" alt="Iken Park" />
                      <div className="absolute inset-0 bg-nesty-accent/80 group-hover:bg-nesty-accent/60 transition duration-300 flex flex-col items-center justify-center text-white p-6 text-center backdrop-blur-sm">
                        <span className="text-3xl font-extrabold mb-2 text-white">Iken Park</span>
                        <span className="uppercase tracking-[0.2em] text-xs font-bold border-t border-white/30 pt-2 mt-1">Success Story</span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              title={t.investir.listings_title}
              subtitle={t.investir.listings_subtitle}
            />

            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-12 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t.investir.filter_location}</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent focus:border-transparent outline-none transition appearance-none cursor-pointer"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="all">{t.investir.filter_all}</option>
                      <option value="Marina">Marina Agadir</option>
                      <option value="Talborjt">Talborjt</option>
                      <option value="Sonaba">Sonaba</option>
                      <option value="Founty">Founty</option>
                    </select>
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t.investir.filter_type}</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent focus:border-transparent outline-none transition appearance-none cursor-pointer"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="all">{t.investir.type_all}</option>
                      <option value="Apartment">{t.investir.type_apartment}</option>
                      <option value="Studio">{t.investir.type_studio}</option>
                      <option value="Villa">{t.investir.type_villa}</option>
                    </select>
                  </div>
                </div>

                {/* Rooms Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t.investir.filter_rooms}</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent focus:border-transparent outline-none transition appearance-none cursor-pointer"
                      value={minRooms}
                      onChange={(e) => setMinRooms(Number(e.target.value))}
                    >
                      <option value="0">{t.investir.filter_all}</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                    {t.investir.filter_max_price}
                    <span className="text-nesty-accent">{maxPrice.toLocaleString()} MAD</span>
                  </label>
                  <input
                    type="range"
                    min="500000"
                    max="5000000"
                    step="100000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-nesty-accent mt-3"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="text-sm font-bold text-gray-500 hover:text-nesty-accent flex items-center gap-2 transition"
                >
                  <RefreshCw size={14} /> {t.investir.filter_reset}
                </button>
              </div>
            </div>
          </AnimatedSection>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Show 3 skeletons while loading
              [1, 2, 3].map(i => (
                <div key={i} className="h-[500px]">
                  <PropertyCard loading={true} />
                </div>
              ))
            ) : filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <AnimatedSection key={property.id} className="h-full">
                  <PropertyCard
                    {...property}
                    labels={t.investir}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={toggleFavorite}
                    isSelected={compareList.includes(property.id)}
                    onToggleCompare={toggleCompare}
                    onClickDetails={() => openDetailModal(property)}
                  />
                </AnimatedSection>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
                <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">{t.investir.filter_no_results}</h3>
                <button
                  onClick={resetFilters}
                  className="text-nesty-accent font-bold hover:underline mt-2"
                >
                  {t.investir.filter_reset}
                </button>
              </div>
            )}
          </div>

          {/* Market Trends Section */}
          <section className="mt-20">
            <AnimatedSection>
              <SectionHeader title={t.investir.market_title} subtitle={t.investir.market_subtitle} />
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection delay={100} className="h-full">
                <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-nesty-accent/30 transition duration-300 h-full text-center">
                  <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                    <BarChart2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-nesty-dark mb-3">{t.investir.trend_1_title}</h3>
                  <p className="text-gray-600 leading-relaxed">{t.investir.trend_1_desc}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200} className="h-full">
                <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-nesty-accent/30 transition duration-300 h-full text-center">
                  <div className="w-16 h-16 mx-auto bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <Percent size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-nesty-dark mb-3">{t.investir.trend_2_title}</h3>
                  <p className="text-gray-600 leading-relaxed">{t.investir.trend_2_desc}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300} className="h-full">
                <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-nesty-accent/30 transition duration-300 h-full text-center">
                  <div className="w-16 h-16 mx-auto bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6">
                    <Sun size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-nesty-dark mb-3">{t.investir.trend_3_title}</h3>
                  <p className="text-gray-600 leading-relaxed">{t.investir.trend_3_desc}</p>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <div className="mt-16 text-center bg-nesty-darker rounded-2xl p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">{t.investir.contact_hunter_pre}</h3>
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 border-2 border-nesty-accent text-base font-bold rounded-full text-nesty-accent hover:bg-nesty-accent hover:text-nesty-darker transition duration-300 uppercase tracking-wide">
                {t.investir.contact_hunter_link}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Compare Button */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 animate-fade-in-up">
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="bg-nesty-darker text-white pl-6 pr-8 py-4 rounded-full shadow-2xl flex items-center gap-4 hover:scale-105 transition duration-300 border border-gray-700"
          >
            <div className="relative">
              <CheckSquare size={24} className="text-nesty-accent" />
              <span className="absolute -top-2 -right-2 bg-nesty-accent text-nesty-darker text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {compareList.length}
              </span>
            </div>
            <span className="font-bold text-lg">{t.investir.compare_btn}</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onReset={resetCompare}
        properties={properties.filter(p => compareList.includes(p.id))}
        labels={t.investir}
      />

      <PropertyDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        property={selectedProperty}
        labels={t.investir}
      />

    </div>
  );
};

export default Investir;