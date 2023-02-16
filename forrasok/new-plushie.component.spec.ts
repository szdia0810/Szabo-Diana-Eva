import Plushie from './Plushie';

describe('5. feladat - Plushie osztály', () => {
  it('Plüss létrehozása hiba nélkül', () => {
    const plush = new Plushie('Lion', 15);
    expect(plush.toString()).toBe('Lion (15 cm)');
  });

  it('Csak névvel lehessen létrehozni', () => {
    expect(() => {
      new Plushie('', 20);
    }).toThrow();
  });

  it('Csak érvényes mérettel lehessen létrehozni', () => {
    expect(() => {
      new Plushie('Goat', -5);
    }).toThrow();
    expect(() => {
      new Plushie('Goat2', 0);
    }).toThrow();
  });
});
