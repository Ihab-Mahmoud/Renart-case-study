import cloudinary from "cloudinary";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import path from "path";
import { StatusCodes } from "http-status-codes";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";
import * as dotenv from "dotenv";
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const GOLDAPI_KEY = process.env.GOLDAPI_KEY; 

// Fetch gold price per gram in USD
async function getGoldPricePerGramUSD() {
  const response = await fetch("https://www.goldapi.io/api/XAU/USD", {
    headers: {
      "x-access-token": GOLDAPI_KEY,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`GoldAPI error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();

  const pricePerOunceUSD = data.price;

  const pricePerGramUSD = pricePerOunceUSD / 31.1035;
  console.log(pricePerGramUSD);
  
  return pricePerGramUSD;
}



export const getAllProducts = async (req, res, next) =>
{
  try {
    const filePath = path.resolve(__dirname, "../utils/products.json");
    const jsonData = await readFile(filePath, "utf8");
    let data = JSON.parse(jsonData);

    const goldPrice = await getGoldPricePerGramUSD();

     data = data.map((product) => ({
       ...product,
       price: (
         (product.popularityScore + 1) *
         product.weight *
         goldPrice
       ).toFixed(2),
     }));

    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
    const minScore = parseFloat(req.query.minScore) || 0;
    const maxScore = parseFloat(req.query.maxScore) || Infinity;

    data = data.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        product.popularityScore >= minScore &&
        product.popularityScore <= maxScore
    );


    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Error reading or parsing JSON:", err);
    res.status(StatusCodes.OK).json({ error: "Failed to load data" });
  }
};

