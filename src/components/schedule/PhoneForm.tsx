
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gift, User, UserRound } from 'lucide-react';
import { countries } from './countryData';
import { usePhoneForm } from '@/hooks/usePhoneForm';
import SuccessMessage from './SuccessMessage';
import FormHeader from './FormHeader';

const PhoneForm = () => {
  const {
    firstName,
    lastName,
    countryCode,
    phone,
    isSubmitting,
    phoneError,
    nameError,
    lastNameError,
    isSubmitted,
    selectedCountry,
    setCountryCode,
    handlePhoneChange,
    handleFirstNameChange,
    handleLastNameChange,
    handleSubmit
  } = usePhoneForm();

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <>
      <FormHeader />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
            <User className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Nombre"
              value={firstName}
              onChange={(e) => handleFirstNameChange(e.target.value)}
              className="flex-1 outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
            />
          </div>
          {nameError && (
            <p className="text-red-500 text-xs mt-1 ml-1">{nameError}</p>
          )}
          
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
            <UserRound className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => handleLastNameChange(e.target.value)}
              className="flex-1 outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
            />
          </div>
          {lastNameError && (
            <p className="text-red-500 text-xs mt-1 ml-1">{lastNameError}</p>
          )}
        </div>
        
        <div className="flex gap-3">
          <div className="w-[140px]">
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[280px]">
                {countries.map((country) => (
                  <SelectItem key={`${country.code}-${country.name}`} value={country.code}>
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>+{country.code}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Input
              type="tel"
              placeholder={`Número (${selectedCountry?.minLength} dígitos)`}
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className={`w-full ${phoneError ? 'border-red-300 focus:ring-red-500' : ''}`}
            />
            {phoneError && (
              <p className="text-red-500 text-xs mt-1">{phoneError}</p>
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:opacity-90 transition-all"
          disabled={isSubmitting || !!phoneError || !!nameError || !!lastNameError}
        >
          {isSubmitting ? "Enviando..." : (
            <span className="flex items-center gap-2">
              <Gift size={18} /> ¡Quiero mi descuento! 🎉
            </span>
          )}
        </Button>
      </form>
    </>
  );
};

export default PhoneForm;
