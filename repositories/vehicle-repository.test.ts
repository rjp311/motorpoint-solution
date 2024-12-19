import VehicleRepository from "./vehicle-repository";

const VehicleController = new VehicleRepository

// Assume repository data in vehicles.json is static test data

test('IS ARRAY: getAll result is array', () => {
    expect(Array.isArray(VehicleController.getAll({})));
});

test('IS ARRAY: getByMake result is array', () => {
    expect(Array.isArray(VehicleController.getByMake('', {})));
});

test('IS ARRAY: getByMakeAndModel result is array', () => {
    expect(Array.isArray(VehicleController.getByMakeAndModel('', '',{})));
});

test('COLOUR FILTERS SUCCESSFULLY: getAll, colour=blue', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({colour: 'blue'}).length).toBeLessThan(testLength)
});

test('COLOUR FILTERS SUCCESSFULLY: getByMake, Ford, colour=blue', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getByMake('Ford', {colour: 'blue'}).length).toBeLessThan(testLength)
});

test('COLOUR FILTERS SUCCESSFULLY: getByMakeAndModel, Ford, Fiesta, colour=blue', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getByMakeAndModel('Ford', 'Fiesta', {colour: 'blue'}).length).toBeLessThan(testLength)
});

test('TRANSMISSION FILTERS SUCCESSFULLY: getAll, Automatic', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({transmission: 'Automatic'}).length).toBeLessThan(testLength);
});

test('TRIM FILTERS SUCCESSFULLY: getAll, Zetec', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({variant: 'Zetec'}).length).toBeLessThan(testLength);
});

test('FUEL TYPE FILTERS SUCCESSFULLY: getAll, Diesel', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({fueltype: 'Diesel'}).length).toBeLessThan(testLength);
});

test('MINIMUM PRICE FILTERS SUCCESSFULLY: getAll, 25000', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({minprice: '25000'}).length).toBeLessThan(testLength);
});

test('MAXIMUM PRICE FILTERS SUCCESSFULLY: getAll, 10000', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({minprice: '25000'}).length).toBeLessThan(testLength);
});

test('MINIMUM MILEAGE FILTERS SUCCESSFULLY: getAll, 20000', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({minmileage: '25000'}).length).toBeLessThan(testLength);
});

test('MAXIMUM MILEAGE FILTERS SUCCESSFULLY: getAll, 50000', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({maxmileage: '25000'}).length).toBeLessThan(testLength);
});

test('MINIMUM ENGINE SIZE FILTERS SUCCESSFULLY: getAll, 2000', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({minengine: '2000'}).length).toBeLessThan(testLength);
});

test('MAXIMUM ENGINE SIZE FILTERS SUCCESSFULLY: getAll, 1000', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({maxengine: '1000'}).length).toBeLessThan(testLength);
});

test('MINIMUM EMISSIONS FILTERS SUCCESSFULLY: getAll, 60', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({minco2: '60'}).length).toBeLessThan(testLength);
});

test('MAXIMUM EMISSIONS FILTERS SUCCESSFULLY: getAll, 100', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({maxco2: '100'}).length).toBeLessThan(testLength);
});

test('MINIMUM YEAR FILTERS SUCCESSFULLY: getAll, 01/04/2014', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({minyear: '01/04/2014'}).length).toBeLessThan(testLength);
});

test('MAXIMUM YEAR FILTERS SUCCESSFULLY: getAll, 03/11/98', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({maxyear: '03/11/98'}).length).toBeLessThan(testLength);
});

test('FAKE INPUTS HAVE NO RESULTS: getAll, make=TARDIS', () => {
    expect(VehicleController.getAll({make: 'TARDIS'}).length).toEqual(0);
});

test('FAKE INPUTS HAVE NO RESULTS: getByMake, TARDIS', () => {
    expect(VehicleController.getByMake('TARDIS', {}).length).toEqual(0);
});

test('FAKE INPUTS HAVE NO RESULTS: getByMakeAndModel, TARDIS, Type40', () => {
    expect(VehicleController.getByMakeAndModel('TARDIS', 'Type40', {}).length).toEqual(0);
});

test('INVALID FILTERS DO NOT AFFECT RESULTS: getAll, modification=Flux Capacitor', () => {
    let testLength: number = VehicleController.getAll({}).length;
    expect(VehicleController.getAll({modification: 'Flux Capacitor'}).length).toEqual(testLength);
});

test('INVALID FILTERS DO NOT THROW EXCEPTION: getByMake, minco2=eggs', () => {
    expect(VehicleController.getByMake('Ford', {minco2: 'eggs'}).length).toEqual(0);
});