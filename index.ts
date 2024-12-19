import express, { Express, Request, Response } from "express";
import VehicleRepository from "./repositories/vehicle-repository";
import { Vehicle, FilterObject } from "./repositories/vehicle-repository";

const app: Express = express();
const port = 3000;

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World");
// });

enum RequestType {
  ALL,
  MAKE,
  MAKEMODEL
}

function handleRequest(req: Request, res: Response) {
  let reqType: number = RequestType.ALL;
  if (req.params.make && typeof req.params.make === "string") reqType = RequestType.MAKE
  if (req.params.model && typeof req.params.model === "string") reqType = RequestType.MAKEMODEL

  let qFilters = req.query

  const VehicleController: VehicleRepository = new VehicleRepository;
  let Vehicles: Vehicle[]
  switch (reqType) {
    case RequestType.ALL:
      Vehicles = VehicleController.getAll(qFilters as FilterObject);
      break;
    case RequestType.MAKE:
      Vehicles = VehicleController.getByMake(req.params.make, qFilters as FilterObject);
      break;
    case RequestType.MAKEMODEL:
      Vehicles = VehicleController.getByMakeAndModel(req.params.make, req.params.model, qFilters as FilterObject)
      break;
    default:
      Vehicles = VehicleController.getAll(qFilters as FilterObject);
      break;
  }

  return res.status(200).send({cars: Vehicles, count: Vehicles.length});
}

app.get("/cars", (req: Request, res: Response) => {
  try {
    return handleRequest(req, res);
  } catch( e: any ) {
    return res.status(500).send("A problem has occurred.");
  }
});

app.get("/cars/:make", (req: Request, res: Response) => {
  try {
    return handleRequest(req, res);
  } catch( e: any ) {
    return res.status(500).send("A problem has occurred.");
  }
});

app.get("/cars/:make/:model", (req: Request, res: Response) => {
  try {
    return handleRequest(req, res);
  } catch( e: any ) {
    return res.status(500).send("A problem has occurred.");
  }
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});