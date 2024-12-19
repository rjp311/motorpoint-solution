import fs from "fs";

export type Vehicle = {
  make: string;
  model: string;
  trim: string;
  colour: string;
  price: number;
  co2_level: number;
  transmission: string;
  fuel_type: string;
  engine_size: number;
  date_first_reg: string;
  mileage: number;
};

export interface FilterObject {
  [key: string]: string | number;
}

enum FilterType {
  MAKE = 'make',
  MODEL = 'model',
  VARIANT = 'variant',
  COLOUR = 'colour',
  TRANSMISSION = 'transmission',
  FUEL_TYPE = 'fueltype',
  MIN_PRICE = 'minprice',
  MAX_PRICE = 'maxprice',
  MIN_MILEAGE = 'minmileage',
  MAX_MILEAGE = 'maxmileage',
  MIN_ENGINE = 'minengine',
  MAX_ENGINE = 'maxengine',
  MIN_CO2 = 'minco2',
  MAX_CO2 = 'maxco2',
  MIN_YEAR = 'minyear',
  MAX_YEAR = 'maxyear',
}

class VehicleRepository {
  private _vehicles: Vehicle[];
  
  constructor() {
    const file = fs.readFileSync("./repositories/vehicles.json", "utf8");
    this._vehicles = JSON.parse(file);
  }

  // /cars?filters
  getAll(aFilters: FilterObject): Vehicle[] {
    return this.handleFilters(this._vehicles, aFilters);
  }

  // /cars/make?filters
  getByMake(aMake: string, aFilters: FilterObject): Vehicle[] {
    return this.handleFilters(this._vehicles.filter((v) => {
      return (v.make.toUpperCase() === aMake.toUpperCase());
    }), aFilters)
  }
  
  // /cars/make/model?filters
  getByMakeAndModel(aMake: string, aModel: string, aFilters: FilterObject): Vehicle[] {
    return this.handleFilters(this._vehicles.filter((v) => {
      return (v.make.toUpperCase() === aMake.toUpperCase() && v.model.toUpperCase() === aModel.toUpperCase());
    }), aFilters)
  }

  // Parse through query string, handle each filter
  private handleFilters(aVehicles: Vehicle[], aFilters: FilterObject) : Vehicle[] {
    let fVehicles = aVehicles;

    for (let key in aFilters) {
      let tKey = key as keyof Vehicle
      let value = aFilters[key] as string
      switch (key.toLowerCase()) {
        case FilterType.MAKE:
          fVehicles = this.filterMake(fVehicles, value);
          break;
        case FilterType.MODEL:
          fVehicles = this.filterModel(fVehicles, value);
          break;
        case FilterType.VARIANT:
          fVehicles = this.filterVariant(fVehicles, value);
          break;
        case FilterType.COLOUR:
          fVehicles = this.filterColour(fVehicles, value);
          break;
        case FilterType.TRANSMISSION:
          fVehicles = this.filterTransmission(fVehicles, value);
          break;
        case FilterType.FUEL_TYPE:
          fVehicles = this.filterFuelType(fVehicles, value)
          break;
        case FilterType.MIN_PRICE:
          fVehicles = this.filterPriceMin(fVehicles, value);
          break;
        case FilterType.MAX_PRICE:
          fVehicles = this.filterPriceMax(fVehicles, value);
          break;
        case FilterType.MIN_MILEAGE:
          fVehicles = this.filterMileageMin(fVehicles, value);
          break;
        case FilterType.MAX_MILEAGE:
          fVehicles = this.filterMileageMax(fVehicles, value);
          break;
        case FilterType.MIN_ENGINE:
          fVehicles = this.filterEngineMin(fVehicles, value);
          break;
        case FilterType.MAX_ENGINE:
          fVehicles = this.filterEngineMax(fVehicles, value);
          break;
        case FilterType.MIN_CO2:
          fVehicles = this.filterCo2Min(fVehicles, value);
          break;
        case FilterType.MAX_CO2:
          fVehicles = this.filterCo2Max(fVehicles, value);
          break;
        case FilterType.MIN_YEAR:
          fVehicles = this.filterYearMin(fVehicles, value);
          break;
        case FilterType.MAX_YEAR:
          fVehicles = this.filterYearMax(fVehicles, value);
          break;
        default:
          console.log(`Unknown filter: ${key}`)
          break;
      }
    }

    return fVehicles;
  }

  private filterMake(aVehicles: Vehicle[], aFilterValue: string) {
    return aVehicles.filter((v: Vehicle) => {
      if (aFilterValue) {
        return v.make?.toUpperCase() === aFilterValue.toUpperCase();
      }
    })
  }

  private filterModel(aVehicles: Vehicle[], aFilterValue: string) {
    return aVehicles.filter((v: Vehicle) => {
      if (aFilterValue) {
        return v.model?.toUpperCase() === aFilterValue.toUpperCase();
      }
    })
  }

  private filterVariant(aVehicles: Vehicle[], aFilterValue: string) {
    return aVehicles.filter((v: Vehicle) => {
      if (aFilterValue) {
        return v.trim?.toUpperCase().includes(aFilterValue.toUpperCase());
      }
    })
  }

  private filterColour(aVehicles: Vehicle[], aFilterValue: string) {
    return aVehicles.filter((v: Vehicle) => {
      if (aFilterValue) {
        return v.colour?.toUpperCase().includes(aFilterValue.toUpperCase());
      }
    })
  }

  private filterTransmission(aVehicles: Vehicle[], aFilterValue: string) {
    return aVehicles.filter((v: Vehicle) => {
      if (aFilterValue) {
        return v.transmission?.toUpperCase() === aFilterValue.toUpperCase();
      }
    })
  }

  private filterFuelType(aVehicles: Vehicle[], aFilterValue: string) {
    return aVehicles.filter((v: Vehicle) => {
      if (aFilterValue) {
        return v.fuel_type?.toUpperCase() === aFilterValue.toUpperCase();
      }
    })
  }

  private filterPriceMin(aVehicles: Vehicle[], aFilterValue: string) {
    let aValue: number = parseInt(aFilterValue);
    return aVehicles.filter((v: Vehicle) => {
      if (aValue && v.price) {
        return v.price >= aValue;
      }
    })
  }

  private filterPriceMax(aVehicles: Vehicle[], aFilterValue: string) {
    let aValue: number = parseInt(aFilterValue);
    return aVehicles.filter((v: Vehicle) => {
      if (aValue && v.price) {
        return v.price <= aValue;
      }
    })
  }

  private filterMileageMin(aVehicles: Vehicle[], aFilterValue: string) {
    let aValue: number = parseInt(aFilterValue);
    return aVehicles.filter((v: Vehicle) => {
      if (aValue && v.mileage) {
        return v.mileage >= aValue;
      }
    })
  }

  private filterMileageMax(aVehicles: Vehicle[], aFilterValue: string) {
    let aValue: number = parseInt(aFilterValue);
    return aVehicles.filter((v: Vehicle) => {
      if (aValue && v.mileage) {
        return v.mileage <= aValue;
      }
    })
  }

  private filterEngineMin(aVehicles: Vehicle[], aFilterValue: string) {
    let aValue: number = parseInt(aFilterValue);
    return aVehicles.filter((v: Vehicle) => {
      if (aValue && v.engine_size) {
        return v.engine_size >= aValue;
      }
    })
  }

  private filterEngineMax(aVehicles: Vehicle[], aFilterValue: string) {
    let aValue: number = parseInt(aFilterValue);
    return aVehicles.filter((v: Vehicle) => {
      if (aValue && v.engine_size) {
        return v.engine_size <= aValue;
      }
    })
  }

  private filterCo2Min(aVehicles: Vehicle[], aFilterValue: string) {
    let aValue: number = parseInt(aFilterValue);
    return aVehicles.filter((v: Vehicle) => {
      if (aValue && v.co2_level) {
        return v.co2_level >= aValue;
      }
    })
  }

  private filterCo2Max(aVehicles: Vehicle[], aFilterValue: string) {
    let aValue: number = parseInt(aFilterValue);
    return aVehicles.filter((v: Vehicle) => {
      if (aValue && v.co2_level) {
        return v.co2_level <= aValue;
      }
    })
  }

  private filterYearMin(aVehicles: Vehicle[], aFilterValue: string) {
    let aYear: number = new Date(aFilterValue).getFullYear();
    return aVehicles.filter((v: Vehicle) => {
      if (aYear && v.date_first_reg) {
        let vYear: number = new Date(v.date_first_reg).getFullYear();
        return vYear >= aYear;
      }
    })
  }

  private filterYearMax(aVehicles: Vehicle[], aFilterValue: string) {
    let aYear: number = new Date(aFilterValue).getFullYear();
    return aVehicles.filter((v: Vehicle) => {
      if (aYear && v.date_first_reg) {
        let vYear: number = new Date(v.date_first_reg).getFullYear();
        return vYear <= aYear;
      }
    })
  }
}

export default VehicleRepository;
