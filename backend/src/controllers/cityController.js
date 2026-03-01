import { City } from "../models/cityModels";
import { citySchema } from "../services/citySchemas";
import { sendResponse } from "../utils/responseHandler";

export const createCityController = async (req, res) => {
  try {
    const result = citySchema.safeParse(req.body);

    if (!result.success) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Zod error",
        error: result.error,
      });
    }

    const { cityName } = result.data;
    const normalizeCity = cityName.toLowerCase().trim();
    const existCity = await City.findOne({ normalizeCity });

    if (existCity) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "City already exist",
      });
    }
    const city = await City.create({ cityName: normalizeCity });

    if (!city) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "City not created",
      });
    }
    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "City created",
      data: city,
    });
  } catch (error) {
    console.log(`Create City error: ${error}`);
    return sendResponse(res, {
      statusCode: 500,
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

// get all cities

export const getAllCitiesController = async (req, res) => {
  try {
    const cities = await City.find();

    if (!cities || cities.length === 0) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "No cities",
      });
    }

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Cities get successfully",
      data: cities,
    });
  } catch (error) {
    console.log(`Create City error: ${error}`);
    return sendResponse(res, {
      statusCode: 500,
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

// update cities

export const updateCityController = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = citySchema.safeParse(req.body);

    if (!updatedData.result) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "zod error",
        error: updatedData.error,
      });
    }
    const cities = await City.findByIdAndUpdate(id, updatedData, { new: true });

    if (!cities) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "city not updated",
      });
    }

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Cities updated successfully",
      data: cities,
    });
  } catch (error) {
    console.log(`Create City error: ${error}`);
    return sendResponse(res, {
      statusCode: 500,
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};

//delete cities

export const deleteCityController = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findByIdAndDelete(id);

    if (!city) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "No cities",
      });
    }

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "City deleted successfully",
      data: city,
    });
  } catch (error) {
    console.log(`Create City error: ${error}`);
    return sendResponse(res, {
      statusCode: 500,
      message: "Internal server error",
      success: false,
      error: error,
    });
  }
};
