import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { RequestHandler, Request, Response, NextFunction } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Here JSON.parse convirte the <Buffer> to json
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../assets/data/tours-simple.json`),
);

/*
Middleware to execute only certain Parameters, in this case, :id.

The objective is to let other functions
to do its main pourpose, and not to check the id.
*/
const checkID = (
  req: Request,
  res: Response,
  next: NextFunction,
  value: number,
) => {
  console.log(`Tour id is ${value}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  next();
};
/*
Middleware to check if body contains name and price properties
*/
const checkBody: RequestHandler = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid Body, missing name or price',
    });
  }
  next();
};

const getAllTours: RequestHandler = (req, res) => {
  //JSON data specification
  res.status(200).json({
    status: 'success',
    resquestedAt: res.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

//Route = http://localhost:5000/api/v1/:id Optional parameter /:id/:x? --> { id: ':id', x: undefined }
const getTour: RequestHandler = (req, res) => {
  //Trick to transform string to number in JS
  const id = req.params.id * 1;

  //We will have an ARRAY wich contains the true values of the condition
  const tour = tours.find((element) => element.id === id);

  res.status(200).json({
    status: 'success',
    results: tour.length,
    data: {
      tours: tour,
    },
  });
};

const createTour: RequestHandler = (req, res) => {
  //Cuando queremos escribir sobre una BBDD buscamos el último objeto
  console.log(tours[8].id); // 8
  const newId = tours[tours.length - 1].id + 1;
  console.log(newId); // 9
  //Create new Object by merging existing one, we do not do {id: req.body.id} to avoid the mutation of the original object
  const newTour = Object.assign({ id: newId }, req.body);
  //Object with the added tour
  tours.push(newTour);
  //Persist data, we are inside the callback, so we will be in the event Loop, and we should never block the thread, so we do not use Sync!
  fs.writeFile(
    `${__dirname}/../assets/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      }); //201 = created
    },
  );
};

const updateTour: RequestHandler = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((element) => element.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated Tour...',
    },
  });
};

const deleteTour: RequestHandler = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

export {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
};
