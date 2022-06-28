import { APIGatewayProxyHandler } from "aws-lambda";
import { connectToDatabase } from "../models/database";
import PetModel from "../models/pet";

export const getOne: APIGatewayProxyHandler = async (event, context) => {
  try {
    await connectToDatabase();
    var { id } = event.pathParameters as any;

    const pet = await PetModel.findById(id);

    return {
      statusCode: 200,
      body: JSON.stringify(pet),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not fetch the pet.",
    };
  }
};

export const getAll: APIGatewayProxyHandler = async (event) => {
  try {
    await connectToDatabase();

    const pets = await PetModel.find();

    return {
      statusCode: 200,
      body: JSON.stringify(pets),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not fetch all pets.",
    };
  }
}

export const create: APIGatewayProxyHandler = async (event, context) => {
  try {
    await connectToDatabase();

    var petExpect = {};
    var actualParams = JSON.parse(event.body as any);
    const expectedParams = ["name", "age"];

    Object.keys(actualParams).forEach((key) => {
      if (expectedParams.includes(key)) {
        petExpect[key] = actualParams[key];
      }
    });

    const pet = new PetModel(petExpect);
    await pet.save();

    return {
      statusCode: 200,
      body: JSON.stringify(pet),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not create new pet.",
    };
  }
};
