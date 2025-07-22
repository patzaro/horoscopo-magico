
export enum ZodiacSign {
  Aries = 'Aries',
  Taurus = 'Tauro',
  Gemini = 'Géminis',
  Cancer = 'Cáncer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Escorpio',
  Sagittarius = 'Sagitario',
  Capricorn = 'Capricornio',
  Aquarius = 'Acuario',
  Pisces = 'Piscis',
}

export interface Sign {
    name: ZodiacSign;
    emoji: string;
}